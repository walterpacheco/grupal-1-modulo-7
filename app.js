const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const { conectarBD, sequelize } = require('./config/db');
const { v4: uuidv4 } = require('uuid');
const usuarioRutas = require('./routes/usuarioRutas');
const usuarioController = require('./controllers/usuarioController');

dotenv.config();

const app = express();

conectarBD();

uuidv4();

// Sincronizar modelos
sequelize.sync().then(() => {
  console.log('Modelos sincronizados con la base de datos.');
});

//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//ruta principal
app.get('/', (req, res) => {
  res.render('index');
})
app.use('/usuarios', usuarioRutas);

const PUERTO = process.env.PUERTO || 3000;
app.listen(PUERTO, () => {
  console.log(`Servidor ejecutándose en el puerto ${PUERTO}`);
});
















