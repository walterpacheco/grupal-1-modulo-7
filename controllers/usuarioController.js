const usuarioServicio = require('../services/usuarioServicio');
const Usuario = require('../models/Usuario');

const formularioAgregar = (req, res) => {
    res.render('agregar');
};

const agregarUsuario = (req, res) => {
    const { user_name, password, correo, nombre, rut, rol } = req.body;
    usuarioServicio.agregarUsuario(user_name, password, correo, nombre, rut, rol)
        .then(() => res.redirect('/'))
        .catch(err => res.status(500).send('Error al agregar usuario: ' + err.message));
};

const consultarUsuarios = (req, res) => {
    usuarioServicio.consultarUsuarios()
        .then(usuarios => res.render('consultar', { usuarios }))
        .catch(err => res.status(500).send('Error al consultar usuarios: ' + err.message));
}

const formularioConsultarId = (req, res) => {
    res.render('consultar_id');
};

const consultarUsuarioPorId = (req, res) => {
    const { id } = req.body;
    usuarioServicio.consultarUsuarioPorId(id)
        .then(usuario =>{
        if (usuario) {
            res.render('consultar_id', { usuario });
        } else {
            res.status(404).send('No se encontro usuario con ese Id');
        }
        })
        .catch(err => res.status(500).send('Error al consultar por Id:' + err.message));
};

const formularioActualizar = (req, res) => {
    const { id } = req.params;
    usuarioServicio.consultarUsuarioPorId(id)
    .then(usuario =>{
        if (usuario) {
            res.render('actualizar', { usuario });
        } else {
            res.status(404).send('No se encontro usuario con ese Id');
        }
        })
        .catch(err => res.status(500).send('Error al cargar el formulario de actualizacion:' + err.message));
}

const actualizarUsuario = (req, res) => {
    const { user_name, password, correo, nombre, rut, rol } = req.body;
    const id = req.params.id;
    usuarioServicio.actualizarUsuario(id, user_name, password, correo, nombre, rut, rol)
        .then(usuario => {
            if (usuario) {
                res.redirect('/');               
            } else {
                res.status(404).send('No se encontró usuario con ese Id');
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
    formularioConsultarId,
    consultarUsuarioPorId,
    formularioActualizar,
    actualizarUsuario,
    eliminarUsuario,
};