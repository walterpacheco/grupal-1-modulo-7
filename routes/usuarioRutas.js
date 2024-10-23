const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Rutas para agregar un nuevo usuario
router.get('/agregar', usuarioController.formularioAgregar);
router.post('/agregar', usuarioController.agregarUsuario);

router.get('/buscar', usuarioController.formularioBuscarCorreo);
// Ruta para consultar usuarios por correo
router.post('/consultar-correo', usuarioController.consultarUsuarioPorCorreo);

// Ruta para ver todos los usuarios
router.get('/', usuarioController.consultarUsuarios);

// Ruta para actualizar un usuario
router.get('/:id/actualizar', usuarioController.formularioActualizar);
router.post('/:id/actualizar', usuarioController.actualizarUsuario);

// Ruta para eliminar un usuario
router.post('/:id/eliminar', usuarioController.eliminarUsuario);

module.exports = router;
