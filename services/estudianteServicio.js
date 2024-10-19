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

async function agregarEstudiante(nombre, rut, curso, nivel) {
    const query = 'INSERT INTO estudiantes (nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [nombre, rut, curso, nivel];
    const res = await client.query(query, values);
    return res.rows[0];
}

async function consultarEstudiantes() {
    const res = await client.query('SELECT * FROM estudiantes');
    return res.rows;
}

async function consultarEstudiantePorRut(rut) {
    const query = 'SELECT * FROM estudiantes WHERE rut = $1';
    const values = [rut];
    const res = await client.query(query, values);
    return res.rows.length > 0 ? res.rows[0] :null;
}

async function actualizarEstudiante(nombre, rut, curso, nivel) {
    const query = 'UPDATE estudiantes SET nombre = $1, curso = $2, nivel = $3 WHERE rut = $4 RETURNING *';
    const values = [nombre, curso, nivel, rut];
    const res = await client.query(query, values);
    return res.rowsCount > 0 ? res.rows[0] :null;
}

async function eliminarEstudiante(rut) {
    const query = 'DELETE FROM estudiantes WHERE rut = $1 RETURNING *';
    const values = [rut];
    const res = await client.query(query, values);
    return res.rowsCount > 0 ? res.rows[0] :null;
}

module.exports = {
    agregarEstudiante,
    consultarEstudiantes,
    consultarEstudiantePorRut,
    actualizarEstudiante,
    eliminarEstudiante
};