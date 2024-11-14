const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Producto = require('../models/Producto');

const Carrito = sequelize.define('carrito', {
    productoId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: Producto,
            key: 'id'
        }
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
});

Carrito.belongsTo(Producto, { foreignKey: 'productoId', as: 'producto' });
Producto.hasMany(Carrito, { foreignKey: 'productoId' });

module.exports = Carrito;
