// controllers/authController.js
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const Usuario = require('../models/Usuario');

// Renderizar formulario de registro
const formularioRegistro = (req, res) => {
  res.render('auth/registro');
};

// Registrar usuario
const registrarUsuario = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.render('auth/registro', { errores: errores.array() });
  }

  const { nombre, correo, contraseña } = req.body;
  try {
    const usuarioExistente = await Usuario.findOne({ where: { correo } });
    if (usuarioExistente) {
      return res.render('auth/registro', { errores: [{ msg: 'Este correo ya está registrado' }] });
    }

    const hash = await bcrypt.hash(contraseña, 10);
    await Usuario.create({ nombre, correo, contraseña: hash, perfil: 'comprador' });
    res.redirect('/login');
  } catch (error) {
    res.status(500).send('Error en el registro: ' + error.message);
  }
};

// Renderizar formulario de login
const formularioLogin = (req, res) => {
  res.render('auth/login');
};

// Iniciar sesión
const iniciarSesion = async (req, res) => {
  const { correo, contraseña } = req.body;
  try {
    const usuario = await Usuario.findOne({ where: { correo } });
    if (!usuario || !await bcrypt.compare(contraseña, usuario.contraseña)) {
      return res.render('auth/login', { errores: [{ msg: 'Credenciales incorrectas' }] });
    }
    // Redirección según perfil
    if (usuario.perfil === 'administrador') {
      return res.redirect('/admin');
    } else {
      return res.redirect('/productos');
    }
  } catch (error) {
    res.status(500).send('Error en el login: ' + error.message);
  }
};

module.exports = {
  formularioRegistro,
  registrarUsuario,
  formularioLogin,
  iniciarSesion
};
