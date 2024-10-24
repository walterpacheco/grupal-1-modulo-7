const usuarioServicio = require('../services/usuarioServicio');
const Usuario = require('../models/Usuario');

const formularioAgregar = (req, res) => {
    res.render('usuario/agregar');
};

const agregarUsuario = (req, res) => {
    const { user_name, password, correo, nombre, rut, rol } = req.body;

    if (!user_name || !password || !correo || !nombre || !rut || !rol) {
        return res.status(400).send('Todos los campos son obligatorios.');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
        return res.status(400).send('El formato del correo electrónico no es válido.');
    }


    usuarioServicio.agregarUsuario(user_name, password, correo, nombre, rut, rol)
        .then(() => res.redirect('/'))
        .catch(err => res.status(500).send('Error al agregar usuario: ' + err.message));
};

const consultarUsuarios = (req, res) => {
    usuarioServicio.consultarUsuarios()
        .then(usuarios => res.render('usuario/consultar', { usuarios }))
        .catch(err => res.status(500).send('Error al consultar usuarios: ' + err.message));
}

const formularioConsultarUsername = (req, res) => {
    res.render('usuario/consultar_user');
};

const consultarUsuarioPorUsername = (req, res) => {
    const { user_name } = req.body;
    usuarioServicio.consultarUsuarioPorUsername(user_name)
        .then(usuario =>{
        if (usuario) {
            res.render('usuario/consultar_user', { usuario });
        } else {
            res.status(404).send('No se encontro usuario con ese Username');
        }
        })
        .catch(err => res.status(500).send('Error al consultar por Username:' + err.message));
};

const formularioActualizar = (req, res) => {
    const { user_name } = req.params;
    usuarioServicio.consultarUsuarioPorUsername(user_name)
    .then(usuario =>{
        if (usuario) {
            res.render('usuario/actualizar', { usuario });
        } else {
            res.status(404).send('No se encontro usuario con ese Username');
        }
        })
        .catch(err => res.status(500).send('Error al cargar el formulario de actualizacion:' + err.message));
}

const actualizarUsuario = (req, res) => {
    const { user_name, password, correo, nombre, rut, rol } = req.body;
    usuarioServicio.actualizarUsuario(user_name, { password, correo, nombre, rut, rol })
        .then(usuario => {
            if (usuario) {
                res.redirect('/');               
            } else {
                res.status(404).send('No se encontró usuario con ese username');
            }
        })
        .catch(err => res.status(500).send('Error al actualizar el usuario: ' + err.message));
};


const eliminarUsuario = (req, res) => {
    const { id } = req.params;
    usuarioServicio.eliminarUsuario(id)
        .then(usuario => {
            if (usuario) {
                res.redirect('/');
            } else {
                res.status(404).send('No se encontró al usuario con ese Id');
            }
        })
        .catch(err => res.status(500).send('Error al eliminar el usuario' + err.message));
}

module.exports = {
    formularioAgregar,
    agregarUsuario,
    consultarUsuarios,
    formularioConsultarUsername,
    consultarUsuarioPorUsername,
    formularioActualizar,
    actualizarUsuario,
    eliminarUsuario,
};