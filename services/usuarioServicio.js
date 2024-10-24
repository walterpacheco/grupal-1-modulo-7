const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');

const agregarUsuario = async (user_name, password, correo, nombre, rut, rol) => {
    const hashedPassword = await bcrypt.hash(password, 10)
    return await Usuario.create({user_name, password: hashedPassword, correo, nombre, rut, rol});
    };

const consultarUsuarios = async () => {
    return await Usuario.findAll();
};

const consultarUsuarioPorUsername = async (user_name) => {
    return await Usuario.findOne({ where: { user_name } });
    };

const actualizarUsuario = async (user_name, datos) => {
    const usuario = await Usuario.findOne({ where: { user_name } });
    if (usuario) {
        return await usuario.update(datos);
    }
    return null;
    };

const eliminarUsuario = async (id) => {
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
        await usuario.destroy();
        return usuario;
    }
    return null;
    };



module.exports = {
    agregarUsuario,
    consultarUsuarios,
    consultarUsuarioPorUsername,
    actualizarUsuario,
    eliminarUsuario
};