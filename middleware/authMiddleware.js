const CarritoServicio = require('../services/CarritoServicio');
//Verifica si hay un usuario en session y lo asigna a user
const authMiddleware = async (req, res, next) => {
  if (req.session && req.session.user) {
    req.user = req.session.user; // Pobla `req.user` con los datos del usuario de la sesión
    res.locals.usuarioAutenticado = req.user; // Hacemos que esté disponible en las vistas
    res.locals.esAdmin = req.user.rol === 'admin'; // Determinamos si el usuario es Admin
    //cada vez que se inicie sesion se cargara el carrito
    const carrito = await CarritoServicio.verCarrito(req.user.id);
    req.user.carrito = carrito || [];//cargar el carrito al usuario o lo inicializa vacio

  } else {
    res.locals.usuarioAutenticado = null; // Si no está autenticado, no hay datos de usuario
    res.locals.esAdmin = false; // No es admin si no está autenticado
  }
  next();
};

module.exports = authMiddleware;
