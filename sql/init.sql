-- Crear la tabla usuarios si no existe
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contraseña VARCHAR(100) NOT NULL
);

-- Insertar algunos datos de prueba
INSERT INTO usuarios (nombre, correo, contraseña) VALUES
    ('Usuario Prueba', 'test@ejemplo.com', '123456'),
    ('Milca Toledo', 'milca@test.com', 'password123')
ON CONFLICT DO NOTHING;