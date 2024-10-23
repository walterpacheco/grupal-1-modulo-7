const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const { conectarBD, sequelize } = require('./config/db');
const usuarioRutas = require('./routes/usuarioRutas');

dotenv.config();

const app = express();

conectarBD();

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
});

// Montar rutas de usuarios bajo /usuarios
app.use('/usuarios', usuarioRutas);

const PUERTO = process.env.PUERTO || 3000;
app.listen(PUERTO, () => {
  console.log(`Servidor ejecutándose en el puerto ${PUERTO}`);
});











