Modulo 7 Ecommerce grupal

Modulos necesarios
-express
-express-validator
-express-session
-sequelize
-dotenv
-bcrypt
-multer
-body-parser
-pg
-pug

Grupal 6 usuario al logear debe ver la el listado de productos

Se movió el secret de session al archivo .env
Se modifica authMiddleware para administradores
Se agrega authMiddleware en las rutas de usuario
cambia el post a delete en usuarioRutas para eliminar usuarios
modificación del script en las vistas consultar_correo y consultar 
se agrega un 404 por si no hay productos en productoController
creación de un admin Middleware y se agrega a las rutas de usuario
verificación de usuario admin para el cuadro crear productos en la vista
el boton usuarios solo accesible a administradores
se agrega boton para cerrar sesion
modifica el authMiddleware para gestionar el cierre de sesion
se agrega autentificacion en las rutas de producto
se modifica el mainController para gestionar el acceso a la ruta principal si el usuario esta logeado
