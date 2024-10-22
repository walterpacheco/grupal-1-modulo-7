const { Client } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const client = new Client({
    user: process.env.DB_USUARIO,
    host: process.env.DB_HOST,
    database: process.env.DB_NOMBRE,
    password: process.env.DB_CONTRASENA,
    port: process.env.DB_PUERTO,
    ssl: false

});

client.connect();

async function agregarUsuario(user_name, password, correo, nombre, rut, rol) {
    const query = 'INSERT INTO usuarios (user_name, password, correo, nombre, rut, rol) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = [user_name, password, correo, nombre, rut, rol];
    const res = await client.query(query, values);
    return res.rows[0];
}

async function consultarUsuarios() {
    const res = await client.query('SELECT * FROM usuarios');
    return res.rows;
}

async function consultarUsuarioPorId(id) {
    const query = 'SELECT * FROM usuarios WHERE id = $1';
    const values = [id];
    const res = await client.query(query, values);
    return res.rows.length > 0 ? res.rows[0] :null;
}

async function actualizarUsuario(id, user_name, password, correo, nombre, rut, rol) {
    const query = 'UPDATE usuarios SET user_name = $1, password = $2, correo = $3, nombre = $4, rut = $5, rol = $6 WHERE id = $7 RETURNING *';
    const values = [user_name, password, correo, nombre, rut, rol, id];
    const res = await client.query(query, values);
    return res.rowCount > 0 ? res.rows[0] : null;
}


async function eliminarUsuario(id) {
    const query = 'DELETE FROM usuarios WHERE id = $1 RETURNING *';
    const values = [id];
    const res = await client.query(query, values);
    return res.rowCount > 0 ? res.rows[0] :null;
}

module.exports = {
    agregarUsuario,
    consultarUsuarios,
    consultarUsuarioPorId,
    actualizarUsuario,
    eliminarUsuario
};