const Producto = require('../models/Producto'); // Importa el modelo de productos

const index = async (req, res) => {
  try {
    if (req.user) {  // Si el usuario ya está logueado
      return res.redirect('/productos');  // Redirige a la página de productos
    }

    // Si no está logueado, obtiene los productos y renderiza la página principal
    const productos = await Producto.findAll();  // Obtén todos los productos
    const user = req.user;  // Si no hay usuario, esto será null o undefined

    // Renderizamos la vista 'index' pasando productos y user (si está logueado)
    res.render('index', { productos, user });
  } catch (error) {
    res.status(500).send('Error al cargar la página principal: ' + error.message);
  }
};

module.exports = {
  index
};

