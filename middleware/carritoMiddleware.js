const CarritoServicio = require('./services/carritoServicio');

const cargarCarrito = async (req, res, next) => {
    try {
        if (!req.session.user) {
            return res.redirect('/auth/login');
        }

        const carrito = await CarritoServicio.verCarrito(req.session.user.id);
        req.user.carrito = carrito && carrito.length ? carrito : 'Carrito vacío';

        next();
    } catch (error) {
        console.error("Error al cargar el carrito:", error);
        res.status(500).send("Error en el servidor al cargar el carrito");
    }
};

module.exports = cargarCarrito;