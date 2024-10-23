const Usuario = require('../models/Usuario');

const agregarUsuario = async (datos) => {
    return await Usuario.create(datos);
    };

const consultarUsuarios = async () => {
    return await Usuario.findAll();
};

const consultarUsuarioPorId = async (id) => {
    return await Usuario.findByPk(id);
    };

const actualizarUsuario = async (id, datos) => {
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
        return await usuario.update(datos);
    }
    return null;
    };

const eliminarUsuario = async (id) => {
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
        return await usuario.destroy();
    }
    return null;
    };



module.exports = {
    agregarUsuario,
    consultarUsuarios,
    consultarUsuarioPorId,
    actualizarUsuario,
    eliminarUsuario
};