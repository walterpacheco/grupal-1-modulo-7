const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Rutas para los usuarios
router.get('/agregar', usuarioController.formularioAgregar);
router.post('/agregar', usuarioController.agregarUsuario);

router.get('/consultar', usuarioController.consultarUsuarios);
router.get('/consultar-id', usuarioController.formularioConsultarId);
router.post('/consultar-id', usuarioController.consultarUsuarioPorId);

router.get('/actualizar/:id', usuarioController.formularioActualizar);
router.post('/actualizar/:id', usuarioController.actualizarUsuario);

router.post('/eliminar/:id', usuarioController.eliminarUsuario);

module.exports = router;
