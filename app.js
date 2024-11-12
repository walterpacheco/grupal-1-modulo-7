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

// Carga las variables de entorno desde el archivo .env
dotenv.config();

const app = express();

// Conexión a la base de datos
conectarBD();

sequelize.sync().then(() => {
  console.log('Modelos sincronizados con la base de datos.');
});

// Configuración de sesión
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },   //usar true en producción
  })
);
//ruta para cerrar sesión
app.post('/cerrar-sesion', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Error al cerrar sesión');
    }
    res.redirect('/');  // Redirige a la página principal después de cerrar sesión
  });
});


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/uploads', express.static('uploads'));

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Montar rutas
app.use('/auth', authRoutes);  // No requiere autenticación
app.use('/usuarios', authMiddleware, usuarioRutas);  // Protege la ruta de usuarios
app.use('/productos', authMiddleware, productoRutas);  // Protege la ruta de productos
app.use('/comprador', authMiddleware, compradorRutas); // Protege la ruta de comprador

// Ruta principal
app.get('/', mainController.index); // Usamos el controlador para la página principal

const PUERTO = process.env.PUERTO || 3000;
app.listen(PUERTO, () => {
  console.log(`Servidor ejecutándose en el puerto ${PUERTO}`);
});
