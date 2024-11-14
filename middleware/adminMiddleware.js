// Verifica si el usuario tiene rol 'admin'
const adminMiddleware = (req, res, next) => {
    if (req.user && req.user.rol === 'admin') {
        next();  // El usuario es admin, permite el acceso
    } else {
        return res.status(403).send('Acceso denegado. No eres administrador.');
    }
};

module.exports = adminMiddleware;