const CarritoServicio = require('/services/carritoServicio');

const agregarProducto = async (req, res) => {
    const { productoId, cantidad } = req.body;

    if (!productoId || !cantidad || cantidad.length < 1) {
        return res.status(400).json({ message: 'Producto ID y cantidad son requeridos y la cantidad debe ser positiva.' });
    }

    try{
        const nuevoItem = await CarritoServicio.agregarProducto(req.session.user.id, productoId, cantidad);
        res.redirect('/');
    } catch (error) {
        throw new Error(error.message);
    }

}

const verCarrito = async (req, res) => {
    try{
        const carrito = await CarritoServicio.verCarrito(req.session.user.id);
        res.render('carrito', { carrito });

    } catch (error) {
        throw new Error(error.message);
    }
}

const actualizarCantidad = async (req, res) => {
    const { productoId, cantidad } = req.body;

    try{
        const itemActualizado = await CarritoServicio.actualizarCantidad(productoId, cantidad)
        res.status(200).send(itemActualizado);
    } catch (error) {
        throw new Error(error.message);
    }
}

const eliminarProducto = async (req, res) => {
    const { productoId } = req.params;

    try {
        const resultado = await CarritoServicio.eliminarProducto(productoId);
        res.status(200).send(resultado);
    } catch (error) {
        throw new Error(error.message);
    }
}
module.exports = {
    agregarProducto,
    verCarrito,
    actualizarCantidad,
    eliminarProducto,

}