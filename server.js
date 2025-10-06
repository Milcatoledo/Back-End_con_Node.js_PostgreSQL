import express from "express";
import pkg from 'pg';
const { Pool } = pkg;

const app = express();
const PORT = 3000;

app.use(express.json());

const pool = new Pool({
    user: process.env.DB_USER || 'admin',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'usuarios_db',
    password: process.env.DB_PASSWORD || 'admin123',
    port: parseInt(process.env.DB_PORT || '5432'),
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
});

app.get("/usuarios", async (req, res) => {
    try {
        const result = await pool.query('SELECT id, nombre, correo FROM usuarios');
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.post("/usuarios", async (req, res) => {
    const { nombre, correo, contraseña } = req.body;

    if (!nombre || !correo || !contraseña) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO usuarios (nombre, correo, contraseña) VALUES ($1, $2, $3) RETURNING id, nombre, correo',
            [nombre, correo, contraseña]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        if (error.code === '23505') {
            return res.status(400).json({ error: 'El correo ya está registrado' });
        }
        console.error('Error al crear usuario:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
