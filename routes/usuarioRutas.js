const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// Rutas para agregar un nuevo usuario
router.get('/agregar', authMiddleware, adminMiddleware, usuarioController.formularioAgregar);
router.post('/agregar', authMiddleware, adminMiddleware, usuarioController.agregarUsuario);

// Ruta para consultar usuarios por correo
router.get('/buscar', authMiddleware, adminMiddleware, usuarioController.formularioBuscarCorreo);
router.post('/consultar-correo', authMiddleware, adminMiddleware, usuarioController.consultarUsuarioPorCorreo);

// Ruta para ver todos los usuarios 
router.get('/', authMiddleware, adminMiddleware, usuarioController.consultarUsuarios);

// Rutas para actualizar un usuario 
router.get('/:id/actualizar', authMiddleware, adminMiddleware, usuarioController.formularioActualizar);
router.post('/:id/actualizar', authMiddleware, adminMiddleware, usuarioController.actualizarUsuario);

// Ruta para eliminar un usuario 
router.delete('/:id/eliminar', authMiddleware, adminMiddleware, usuarioController.eliminarUsuario);

module.exports = router;
