const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const usuarioController = require('./controllers/usuarioController');

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
app.get('/agregar', usuarioController.formularioAgregar);
app.post('/agregar', usuarioController.agregarUsuario);

app.get('/consultar', usuarioController.consultarUsuarios);
app.get('/consultar-id', usuarioController.formularioConsultarId);
app.post('/consultar-id', usuarioController.consultarUsuarioPorId);

app.get('/actualizar/:id', usuarioController.formularioActualizar);
app.post('/actualizar/:id', usuarioController.actualizarUsuario);

app.get('/eliminar/:id', usuarioController.formularioEliminar);
app.post('/eliminar/:id', usuarioController.eliminarUsuario);


const PUERTO = process.env.PUERTO || 3000;
app.listen(PUERTO, () => {
  console.log(`Servidor ejecutándose en el puerto ${PUERTO}`);
});