
const authMiddleware = (req, res, next) => {
    if (req.session && req.session.user) {
      req.user = req.session.user; // Pobla `req.user` con los datos del usuario de la sesión
    } else {
      req.user = null;
    }
    next();
  };
  
  module.exports = authMiddleware;
  