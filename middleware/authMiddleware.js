
//Verifica si hay un usuario en session y lo asigna a user
const authMiddleware = (req, res, next) => {
  if (req.session && req.session.user) {
    req.user = req.session.user; // Pobla `req.user` con los datos del usuario de la sesión
    res.locals.usuarioAutenticado = req.user; // Hacemos que esté disponible en las vistas
    res.locals.esAdmin = req.user.rol === 'Admin'; // Determinamos si el usuario es Admin
  } else {
    res.locals.usuarioAutenticado = null; // Si no está autenticado, no hay datos de usuario
    res.locals.esAdmin = false; // No es admin si no está autenticado
  }
  next();
};

module.exports = authMiddleware;
