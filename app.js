const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const estudianteController = require('./controllers/estudianteController');

dotenv.config();

const app = express()

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//ruta principal
app.get('/', (req, res) => {
    res.render('index');
})

//rutas
app.get('/agregar', estudianteController.formularioAgregar);
app.get('/agregar', estudianteController.agregarEstudiante);

app.get('/consultar', estudianteController.consultarEstudiantes);
app.get('/consultar-rut', estudianteController.formularioConsultarRut);
app.post('/consultar-rut', estudianteController.consultarEstudiantePorRut);

app.get('/actualizar/:rut', estudianteController.formularioActualizar);
app.post('/actualizar', estudianteController.actualizarEstudiante);

app.get('/eliminar', estudianteController.formularioEliminar);
app.post('eliminar', estudianteController.eliminarEstudiante);


const PUERTO = process.env.PUERTO || 3000;
app.listen(PUERTO, () => {
  console.log(`Servidor ejecutándose en el puerto ${PUERTO}`);
});