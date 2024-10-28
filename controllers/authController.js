// controllers/authController.js
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const Usuario = require('../models/Usuario');

// Renderizar formulario de registro
const formularioRegistro = (req, res) => {
  res.render('auth/registro', { errores: [] });  // Enviamos errores como array vacío
};

// Registrar usuario
const registrarUsuario = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.render('auth/registro', { errores: errores.array() });
  }

  const { user_name, nombre, rut, correo, password } = req.body;
  
  try {
    const usuarioExistente = await Usuario.findOne({ where: { correo } });
    if (usuarioExistente) {
      return res.render('auth/registro', { errores: [{ msg: 'Este correo ya está registrado' }] });
    }

    // Cifrar la contraseña
    const hash = await bcrypt.hash(password, 10);
    
    // Crear el usuario con la contraseña cifrada
    await Usuario.create({ user_name, nombre, rut, correo, password: hash, rol: 'comprador' });
    res.redirect('/auth/login');
  } catch (error) {
    res.status(500).send('Error en el registro: ' + error.message);
  }
};

// Renderizar formulario de login
const formularioLogin = (req, res) => {
  res.render('auth/login', { errores: [] });  // Inicializamos errores como un array vacío
};

// Iniciar sesión
const iniciarSesion = async (req, res) => {
  const { correo, password } = req.body;
  try {
    const usuario = await Usuario.findOne({ where: { correo } });
    
    // Verificar que el usuario existe y tiene una contraseña almacenada
    if (!usuario || !usuario.password) {
      return res.render('auth/login', { errores: [{ msg: 'Credenciales incorrectas' }] });
    }

    // Comparar contraseñas
    const esContraseñaCorrecta = await bcrypt.compare(password, usuario.password);
    if (!esContraseñaCorrecta) {
      return res.render('auth/login', { errores: [{ msg: 'Credenciales incorrectas' }] });
    }

    // Guardar el usuario en la sesión
    req.session.user = { id: usuario.id, rol: usuario.rol, correo: usuario.correo };

    // Redirección según perfil
    if (usuario.rol === 'administrador') {
      return res.redirect('/admin');
    } else {
      return res.redirect('/productos');
    }
  } catch (error) {
    res.status(500).send('Error en el login: ' + error.message);
  }
};

// Cerrar sesión
const cerrarSesion = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/auth/login');
  });
};

module.exports = {
  formularioRegistro,
  registrarUsuario,
  formularioLogin,
  iniciarSesion,
  cerrarSesion
};
