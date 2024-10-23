const { Datatypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Usuario = sequelize.define('Usuario', {
    id: {
        type: Datatypes.UUIDV4,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    user_name: {
        type: Datatypes.STRING,
        allowNull: false,
    },
    password: {
        type: Datatypes.STRING,
        allowNull: false,
    },
    correo: {
        type: Datatypes.STRING,
        allowNull: false,
    },
    nombre: {
        type: Datatypes.STRING,
        allowNull: false,
    },
    rut: {
        type: Datatypes.STRING,
        allowNull: false,
    },
    rol: {
        type: Datatypes.STRING,
        allowNull: false,
    },
});

module.exports = Usuario;