const estudianteServicio = require('../services/estudianteServicio');

const formularioAgregar = (req, res) => {
    res.render('agregar');
};

const agregarEstudiante = (req, res) => {
    const { nombre, rut, curso, nivel } = req.body;
    estudianteServicio.agregarEstudiante(nombre, rut, curso, nivel)
        .then(() => res.redirect('/'))
        .catch(err => res.status(500).send('Error al agregar estudiante: ' + err.message));
};

const consultarEstudiantes = (req, res) => {
    estudianteServicio.consultarEstudiantes()
        .then(estudiantes => res.render('consultar', { estudiantes }))
        .catch(err => res.status(500).send('Error al consultar estudiantes: ' + err.message));
}

const formularioConsultarRut = (req, res) => {
    res.render('consultar_rut');
};

const consultarEstudiantePorRut = (req, res) => {
    const { rut } = req.body;
    estudianteServicio.consultarEstudiantePorRut(rut)
        .then(estudiante =>{
        if (estuiante) {
            res.render('consultar_rut', { estudiante });
        } else {
            res.status(404).send('No se encontro estudiante con ese RUT');
        }
        })
        .catch(err => res.status(500).send('Error al consultar por RUT:' + err.message));
};

const formularioActualizar = (req, res) => {
    const { rut } = req.params;
    estudianteServicio.consultarEstudiantePorRut(rut)
    .then(estudiante =>{
        if (estuiante) {
            res.render('actualizar', { estudiante });
        } else {
            res.status(404).send('No se encontro estudiante con ese RUT');
        }
        })
        .catch(err => res.status(500).send('Error al cargar el formulario de actualizacion:' + err.message));
}

const actualizarEstudiante = (req, res) => {
    const { nombre, rut, curso, nivel } = req.body;
    estudianteServicio.actualizarEstudiante(nombre, rut, curso, nivel)
        .then(estudainte => {
            if (estudiante) {
                res.redirect('/');               
            } else {
                res.status(404).send('No se encontro estudiante con ese RUT');
            }
        })
        .catch(err => res.status(500).send('Error al actualizar el estudiante' + err.message));
};

const formularioEliminar = (req, res) => {
    res.render('eliminar');
};

const eliminarEstudiante = (req, res) => {
    const { rut } = req.body;
    estudianteServicio.eliminarEstudiante(rut)
        .then(estudiante => {
            if (estudiante) {
                res.redirect('/');
            } else {
                res.status(404).send('No se encontró al estudiante con ese RUT');
            }
        })
        .catch(err => res.status(500).send('Error al eliminar el estudiante' + err.message));
}

module.exports = {
    formularioAgregar,
    agregarEstudiante,
    consultarEstudiantes,
    formularioConsultarRut,
    consultarEstudiantePorRut,
    formularioActualizar,
    actualizarEstudiante,
    formularioEliminar,
    eliminarEstudiante,
};