const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validarRegistro, validarLogin } = require('../middleware/authValidator');

router.get('/registro', authController.formularioRegistro);
router.post('/registro', validarRegistro, authController.registrarUsuario);

router.get('/login', authController.formularioLogin);
router.post('/login', validarLogin, authController.iniciarSesion);

module.exports = router;
