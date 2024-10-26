const usuarioServicio = require('../services/usuarioServicio');
const Usuario = require('../models/Usuario');

// Renderizar el formulario para agregar un nuevo usuario
const formularioAgregar = (req, res) => {
    res.render('usuario/agregar');
};

// Agregar un nuevo usuario
const agregarUsuario = (req, res) => {
    console.log(req.body);  // Depuración

    const { user_name, password, correo, nombre, rut, rol } = req.body;

    // Verificar si todos los campos están presentes
    if (!user_name || !password || !correo || !nombre || !rut || !rol) {
        return res.status(400).send('Todos los campos son obligatorios.');
    }

    usuarioServicio.agregarUsuario(user_name, password, correo, nombre, rut, rol)
        .then(() => res.redirect('/usuarios'))
        .catch(err => res.status(500).send('Error al agregar usuario: ' + err.message));
};

// Consultar todos los usuarios
const consultarUsuarios = (req, res) => {
    usuarioServicio.consultarUsuarios()
        .then(usuarios => res.render('usuario/consultar', { usuarios }))
        .catch(err => res.status(500).send('Error al consultar usuarios: ' + err.message));
}

const formularioBuscarCorreo = (req, res) => {
    console.log("Renderizando la página de búsqueda por correo");
    res.render('buscar');
};

// Consultar un usuario por correo
const consultarUsuarioPorCorreo = (req, res) => {
    const { correo } = req.body;  // Obtener el correo desde el formulario

    usuarioServicio.consultarUsuarioPorCorreo(correo)
        .then(usuario => {
            if (usuario) {
                res.render('consultar_correo', { usuario });  // Renderizar vista con los datos del usuario
            } else {
                res.status(404).send('No se encontró usuario con ese correo');
            }
        })
        .catch(err => res.status(500).send('Error al consultar por correo: ' + err.message));
};

// Renderizar formulario para actualizar un usuario
const formularioActualizar = (req, res) => {
    const { id } = req.params;
    usuarioServicio.consultarUsuarioPorId(id)
    .then(usuario => {
        if (usuario) {
            res.render('usuario/actualizar', { usuario });
        } else {
            res.status(404).send('No se encontró usuario con ese Id');
        }
    })
    .catch(err => res.status(500).send('Error al cargar el formulario de actualización: ' + err.message));
};

// Actualizar un usuario
const actualizarUsuario = (req, res) => {
    const { user_name, password, correo, nombre, rut, rol } = req.body;
    const id = req.params.id;
    usuarioServicio.actualizarUsuario(id, user_name, password, correo, nombre, rut, rol)
        .then(usuario => {
            if (usuario) {
                res.redirect('/');               
            } else {
                res.status(404).send('No se encontró usuario con ese Id');
            }
        })
        .catch(err => res.status(500).send('Error al actualizar el usuario: ' + err.message));
};

// Eliminar un usuario
const eliminarUsuario = (req, res) => {
    const { id } = req.params;
    usuarioServicio.eliminarUsuario(id)
        .then(usuario => {
            if (usuario) {
                res.redirect('/');
            } else {
                res.status(404).send('No se encontró al usuario con ese Id');
            }
        })
        .catch(err => res.status(500).send('Error al eliminar el usuario: ' + err.message));
}

module.exports = {
    formularioAgregar,
    agregarUsuario,
    consultarUsuarios,
    formularioBuscarCorreo,
    consultarUsuarioPorCorreo,
    formularioActualizar,
    actualizarUsuario,
    eliminarUsuario,
};
