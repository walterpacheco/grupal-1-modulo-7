const express = require('express');
const router = express.Router();
const categoriaControlador = require('../controllers/categoriaController');



router.get('/', categoriaControlador.obtenerCategorias);
router.post('/', categoriaControlador.crearCategoria);

module.exports = router;
