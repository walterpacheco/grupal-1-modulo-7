// app.js
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const { conectarBD, sequelize } = require('./config/db');
const usuarioRutas = require('./routes/usuarioRutas');
const productoRutas = require('./routes/productoRutas');
const authRoutes = require('./routes/authRoutes');
const compradorRutas = require('./routes/compradorRutas');
const authMiddleware = require('./middleware/authMiddleware');
const mainController = require('./controllers/mainController'); // Importamos el controlador principal

dotenv.config();

const app = express();

conectarBD();

sequelize.sync().then(() => {
  console.log('Modelos sincronizados con la base de datos.');
});

// Configuración de sesión
app.use(
  session({
    secret: 'tu_secreto_de_sesion',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, 
  })
);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(authMiddleware); // Incluye el middleware después de configurar la sesión
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Montar rutas
app.use('/auth', authRoutes);
app.use('/usuarios', usuarioRutas);
app.use('/productos', productoRutas);
app.use('/comprador', compradorRutas);

// Ruta principal
app.get('/', mainController.index); // Usamos el controlador para la página principal

const PUERTO = process.env.PUERTO || 3000;
app.listen(PUERTO, () => {
  console.log(`Servidor ejecutándose en el puerto ${PUERTO}`);
});
