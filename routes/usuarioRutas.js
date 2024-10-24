const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Rutas para los usuarios
router.get('/agregar', usuarioController.formularioAgregar);
router.post('/agregar', usuarioController.agregarUsuario);

router.get('/', usuarioController.consultarUsuarios);
router.post('/consultar-user/', usuarioController.consultarUsuarioPorUsername);
router.get('/consultar-user/', usuarioController.formularioConsultarUsername);



router.get('/:user_name/actualizar', usuarioController.formularioActualizar);
router.post('/:user_name/actualizar', usuarioController.actualizarUsuario);

router.post('/:id/eliminar', usuarioController.eliminarUsuario);

module.exports = router;
