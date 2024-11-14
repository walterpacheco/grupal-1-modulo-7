const express = require('express');
const CarritoController = require('../controllers/carritoController');

const router = express.Router();

router.post('/agregar', CarritoController.agregarProducto);
router.get('/ver', CarritoController.verCarrito);
router.put('/actualizar', CarritoController.actualizarCantidad);
router.delete('/eliminar/:productoId', CarritoController.eliminarProducto);

module.exports = router;