const Usuario = require('../models/Usuario');

async function agregarUsuario(user_name, password, correo, nombre, rut, rol) {
    return await Usuario.create({
        user_name,
        password,
        correo,
        nombre,
        rut,
        rol
    });
}

async function consultarUsuarios() {
    return await Usuario.findAll();
}

async function consultarUsuarioPorId(id) {
    return await Usuario.findByPk(id);
}

async function consultarUsuarioPorCorreo(correo) {
    return await Usuario.findOne({
        where: { correo }
    });
}

async function actualizarUsuario(id, user_name, password, correo, nombre, rut, rol) {
    return await Usuario.update({ user_name, password, correo, nombre, rut, rol }, {
        where: { id }
    });
}

async function eliminarUsuario(id) {
    return await Usuario.destroy({
        where: { id }
    });
}

module.exports = {
    agregarUsuario,
    consultarUsuarios,
    consultarUsuarioPorId,
    consultarUsuarioPorCorreo, 
    actualizarUsuario,
    eliminarUsuario
};
