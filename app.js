const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const { conectarBD, sequelize } = require('./config/db');
const usuarioRutas = require('./routes/usuarioRutas');
const productoRutas = require('./routes/productoRutas');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();

conectarBD();

sequelize.sync().then(() => {
  console.log('Modelos sincronizados con la base de datos.');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Montar rutas
app.use('/auth', authRoutes); // Coloca esto después de configurar bodyParser
app.use('/usuarios', usuarioRutas);
app.use('/productos', productoRutas); // Monta la ruta para productos

// Ruta principal
app.get('/', (req, res) => {
  res.render('index');
});

const PUERTO = process.env.PUERTO || 3000;
app.listen(PUERTO, () => {
  console.log(`Servidor ejecutándose en el puerto ${PUERTO}`);
});

