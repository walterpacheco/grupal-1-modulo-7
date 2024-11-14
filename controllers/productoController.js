const productoServicio = require('../services/productoServicio');
const categoriaServicio = require('../services/categoriaServicio');

const Producto = require('../models/Producto');

const obtenerProductos = async (req, res) => {
  const productos = await productoServicio.obtenerTodosLosProductos();
  const categorias = await categoriaServicio.obtenerTodoslasCategorias();

  if (!productos) {
    return res.status(404).send('No se encontraron productos');
  }

  const usuario = req.session.user;  // Accede a la información del usuario en la sesión
  const esAdmin = usuario && usuario.rol === 'admin';  // Verifica si el usuario es administrador

  res.render('productos/producto', {
    productos,
    categorias,
    esAdmin,
  });
};

const obtenerProducto = async (req, res) => {
  const producto = await productoServicio.obtenerProductoPorId(req.params.id);
  res.render('productos/detalle', { producto });
};

const crearProducto = async (req, res) => {
  const { nombre, descripcion, precio, inventario, categoria } = req.body;

  if (!nombre || !precio || !inventario) {
    console.log(`el valor de nombre es: ${nombre}, precio: ${precio}, categoria: ${categoria}`);
    return res.status(400).send('Nombre, precio e inventario son obligatorios');
  }
  if (isNaN(precio) || isNaN(inventario)) {
    return res.status(400).send('Precio e inventario deben ser números');
  }

  const imagen = req.file ? req.file.path : null;

  await Producto.create({
    nombre,
    descripcion,
    precio,
    inventario,
    categoria,
    imagen,
  });


  res.redirect('/productos');
};

const actualizarProducto = async (req, res) => {
  await productoServicio.actualizarProducto(req.params.id, req.body);
  res.redirect('/productos');
};

const eliminarProducto = async (req, res) => {
  await productoServicio.eliminarProducto(req.params.id);
  res.redirect('/productos');
};

const mostrarFormularioEditarProducto = async (req, res) => {
  const producto = await Producto.findByPk(req.params.id);
  if (!producto) {
    return res.status(404).send('Producto no encontrado');
  }
  res.render('productos/editarProducto', { producto });
};

module.exports = {
  obtenerProductos,
  obtenerProducto,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  mostrarFormularioEditarProducto
};