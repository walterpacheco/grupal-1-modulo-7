const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validarRegistro, validarLogin } = require('../middleware/authValidator');

// Ruta para mostrar el formulario de registro y manejar el registro de usuarios
router.get('/registro', authController.formularioRegistro);
router.post('/registro', validarRegistro, authController.registrarUsuario);

// Ruta para mostrar el formulario de login y manejar el inicio de sesión
router.get('/login', authController.formularioLogin);
router.post('/login', validarLogin, authController.iniciarSesion);

// Ruta para cerrar sesión
router.get('/logout', authController.cerrarSesion);

module.exports = router;

