const Producto = require('../models/Producto'); // Importa el modelo de productos

const index = async (req, res) => {
  try {
    const productos = await Producto.findAll(); // Obtén todos los productos
    const user = req.user; // Obtenemos los datos del usuario autenticado
    
    // Renderizamos la vista 'index' pasando productos y user
    res.render('index', { productos, user });
  } catch (error) {
    res.status(500).send('Error al cargar la página principal: ' + error.message);
  }
};

module.exports = {
  index
};
