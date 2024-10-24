const { DataTypes } = require('sequelize'); // "T" mayúscula en DataTypes
const { sequelize } = require('../config/db');

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.UUID,  // Tipo de dato UUID
        defaultValue: DataTypes.UUIDV4,  // Genera automáticamente un UUID versión 4
        allowNull: false,
        primaryKey: true,
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rut: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rol: {
        type: DataTypes.ENUM('admin', 'comprador'),
        allowNull: false,
    },
});

module.exports = Usuario;
