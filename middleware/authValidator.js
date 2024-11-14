// middleware/authValidator.js
const { body } = require('express-validator');

const validarRegistro = [
  body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
  body('correo').isEmail().withMessage('Ingresa un correo válido'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('La contraseña debe tener al menos 8 caracteres')
];

const validarLogin = [
  body('correo').isEmail().withMessage('Ingresa un correo válido'),
  body('password').notEmpty().withMessage('La contraseña es obligatoria')
];

module.exports = {
  validarRegistro,
  validarLogin
};
