// controllers/compradorController.js
const Producto = require('../models/Producto');

const vistaComprador = async (req, res) => {
  try {
    const productos = await Producto.findAll(); // Consulta todos los productos disponibles
    res.render('comprador/vistaComprador', { productos }); // Renderiza la vista con los productos
  } catch (error) {
    res.status(500).send('Error al cargar la vista del comprador: ' + error.message);
  }
};

module.exports = {
  vistaComprador,
};
