const CarritoServicio = require('../services/carritoServicio');

const agregarProducto = async (req, res) => {
    const { productoId, cantidad } = req.body;

    if (!productoId || !cantidad || cantidad.length <=0 ) {
        return res.status(400).json({ message: 'Producto ID y cantidad son requeridos y la cantidad debe ser positiva.' });
    }

    try{
        await CarritoServicio.agregarProducto(req.session.user.id, productoId, cantidad);
        res.redirect('/carrito');
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar el producto al carrito.' });
    }

}

const verCarrito = async (req, res) => {
    try{
        const carrito = await CarritoServicio.verCarrito(req.session.user.id);
        const total = carrito.reduce((sum, item) => sum + (item.producto.precio * item.cantidad), 0); // Calcular total

        res.render('carrito', { carrito, total });

    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el carrito.' });
    }
}

const actualizarCantidad = async (req, res) => {
    const { productoId, cantidad } = req.body;

    if (cantidad <= 0) {
        return res.status(400).json({message: 'La cantidad debe ser mayor que 0.'});
    }

    try{
        const itemActualizado = await CarritoServicio.actualizarCantidad(productoId, cantidad)
        res.status(200).send(itemActualizado);//Responder con el item actualizado
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la cantidad del producto.' });
    }
}

const eliminarProducto = async (req, res) => {
    const { productoId } = req.params;

    try {
        const resultado = await CarritoServicio.eliminarProducto(req.session.user.id, productoId);
        res.status(200).send(resultado);//Responder con el item actualiado
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto del carrito.' });
    }
};

module.exports = {
    agregarProducto,
    verCarrito,
    actualizarCantidad,
    eliminarProducto,

};