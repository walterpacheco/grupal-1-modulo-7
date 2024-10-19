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

module.exports = {
    agregarEstudiante,
    consultarEstudiantes,
    consultarEstudiantePorRut,
    actualizarEstudiante,
    eliminarEstudiante
};