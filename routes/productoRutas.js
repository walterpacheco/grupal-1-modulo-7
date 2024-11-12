const express = require('express');
const router = express.Router();
const productoControlador = require('../controllers/productoController');
const upload = require('../middleware/uploadImage');
const authMiddleware = require('../middleware/authMiddleware');

// Rutas públicas (no requieren autenticación)
router.get('/', productoControlador.obtenerProductos);  // Lista de productos (pública)
router.get('/:id', productoControlador.obtenerProducto); // Detalles del producto (público)

// Rutas protegidas (requieren autenticación y rol de admin)
router.get('/crear', authMiddleware, (req, res) => {
    if (req.user && req.user.rol === 'admin') {
        res.render('productos/crearProducto');  // Vista para crear producto
    } else {
        res.status(403).send('Acceso denegado: Solo los administradores pueden crear productos');
    }
});

router.post('/', authMiddleware, upload.single('image'), (req, res, next) => {
    if (req.user && req.user.rol === 'admin') {
        productoControlador.crearProducto(req, res);
    } else {
        res.status(403).send('Acceso denegado: Solo los administradores pueden crear productos');
    }
});

// Rutas para editar y eliminar productos (solo admin)
router.get('/:id/editar', authMiddleware, (req, res) => {
    if (req.user && req.user.rol === 'admin') {
        productoControlador.mostrarFormularioEditarProducto(req, res);
    } else {
        res.status(403).send('Acceso denegado: Solo los administradores pueden editar productos');
    }
});

router.post('/:id/actualizar', authMiddleware, (req, res) => {
    if (req.user && req.user.rol === 'admin') {
        productoControlador.actualizarProducto(req, res);
    } else {
        res.status(403).send('Acceso denegado: Solo los administradores pueden editar productos');
    }
});

router.post('/:id/eliminar', authMiddleware, (req, res) => {
    if (req.user && req.user.rol === 'admin') {
        productoControlador.eliminarProducto(req, res);
    } else {
        res.status(403).send('Acceso denegado: Solo los administradores pueden eliminar productos');
    }
});

module.exports = router;

