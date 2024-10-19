const express = require('express');
const { Client } = require('pg');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const app = express()

const client = new Client({
    user: process.env.DB_USUARIO,
    host: process.env.DB_HOST,
    database: process.env.DB_NOMBRE,
    password: process.env.DB_CONTRASENA,
    port: process.env.DB_PUERTO,
    ssl: false

});

// Conectar a la base de datos
client.connect();

app.set('view engine', 'pug');
app.set('views', './views');



async function agregarEstudiante(nombre, rut, curso, nivel) {
    const query = 'INSERT INTO estudiantes (nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [nombre, rut, curso, nivel];
    try {
        const res = await client.query(query, values);
        console.log('Estudiante agregado:', res.rows[0]);
    } catch (err) {
        console.error('Error al agregar el estudiante:', err);
    }
}

async function consultarEstudiantes() {
    try {
        const res = await client.query('SELECT * FROM estudiantes');
        console.log('Estudiantes registrados:', res.rows);
    } catch (err) {
        console.error('Error al consultar los estudiantes:', err);
    }
}

async function consultarEstudiantePorRut(rut) {
    const query = 'SELECT * FROM estudiantes WHERE rut = $1';
    const values = [rut];
    try {
        const res = await client.query(query, values);
        if (res.rows.length > 0) {
            console.log('Estudiante encontrado:', res.rows[0]);
        } else {
            console.log('No se encontró ningún estudiante con ese RUT.');
        }
    } catch (err) {
        console.error('Error al consultar por RUT:', err);
    }
}

async function actualizarEstudiante(nombre, rut, curso, nivel) {
    const query = 'UPDATE estudiantes SET nombre = $1, curso = $2, nivel = $3 WHERE rut = $4 RETURNING *';
    const values = [nombre, curso, nivel, rut];
    try {
        const res = await client.query(query, values);
        if (res.rowCount > 0) {
            console.log('Estudiante actualizado:', res.rows[0]);
        } else {
            console.log('No se encontró ningún estudiante con ese RUT para actualizar.');
        }
    } catch (err) {
        console.error('Error al actualizar el estudiante:', err);
    }
}
async function eliminarEstudiante(rut) {
    const query = 'DELETE FROM estudiantes WHERE rut = $1 RETURNING *';
    const values = [rut];
    try {
        const res = await client.query(query, values);
        if (res.rowCount > 0) {
            console.log('Estudiante eliminado:', res.rows[0]);
        } else {
            console.log('No se encontró ningún estudiante con ese RUT para eliminar.');
        }
    } catch (err) {
        console.error('Error al eliminar el estudiante:', err);
    }
}

const action = process.argv[2];
const args = process.argv.slice(3);

switch (action) {
    case 'agregar':
        agregarEstudiante(args[0], args[1], args[2], args[3]);
        break;
    case 'consultar':
        consultarEstudiantes();
        break;
    case 'consultar-rut':
        consultarEstudiantePorRut(args[0]);
        break;
    case 'actualizar':
        actualizarEstudiante(args[0], args[1], args[2], args[3]);
        break;
    case 'eliminar':
        eliminarEstudiante(args[0]);
        break;
    default:
        console.log('Acción no reconocida. Usa "agregar", "consultar", "consultar-rut", "actualizar" o "eliminar".');
        break;
}


const PUERTO = process.env.PUERTO || 3000;
app.listen(PUERTO, () => {
  console.log(`Servidor ejecutándose en el puerto ${PUERTO}`);
});