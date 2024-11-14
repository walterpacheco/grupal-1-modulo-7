const Carrito = require('models/Carrito');
const Producto = require('models/Producto');

//Agregar Producto al carro
const agregarProducto = async (req, res) => {
    const {productoId, cantidad} = req.body;
    try {
        //Verificar que el producto exista
        const producto = await Producto.findByPk(productoId);
        if (!producto) {
            return res.status(404).send("Producto no encontrado");
        }

        //Verificar si el producto ya esta en el carrito
        const itemExistente = await Producto.findByPk({where: {productoId}});
        if (!itemExistente) {
            itemExistente.cantidad += cantidad;
            await itemExistente.save();
            return res.status(200).send(itemExistente);
        }

        //si existe lo agregamos al carrito
        const nuevoItem = await Carrito.create({productoId, cantidad})
    } catch (error) {
        throw new Error(error.message);
    }
}

    //Ver el contenido del carrito

const verCarrito = async () => {
    try{
        return await Carrito.findAll({
            include: { model: Producto, as: "producto" },
        })

    } catch (error) {
        throw new Error(error.message);
    }
}
const actualizarCantidad = async (req, res) => {
    const { productoId, cantidad } = req.body;

    try {
        const item = await Carrito.findOne({ where: {productoId} });
        if (!item) {
            return res.status(404).send("Producto no encontrado");
        }
        item.cantidad = cantidad;
        await item.save();
        return res.status(200).send(item);
    } catch (error) {
        throw new Error(error.message);
    }
}

const eliminarProducto = async (req, res) => {
    const { productoId } = req.params;

    try {
        const item = await Carrito.findOne({ where: { productoId }});
        if (!item) {
            return res.status(404).send("Producto no encontrado");
        }
        await item.destroy();
        return res.status(200).send({ mensaje: 'Producto eliminado del carrito' });
    }catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    agregarProducto,
    verCarrito,
    actualizarCantidad,
    eliminarProducto,

}