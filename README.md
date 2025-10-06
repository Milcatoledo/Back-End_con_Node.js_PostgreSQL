# API REST con Express y PostgreSQL

Este proyecto es una API REST básica construida con Express.js y PostgreSQL, utilizando Docker para la contenerización de los servicios.

## Requisitos Previos

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Estructura del Proyecto

```
ServerBasicExpress/
│
├── sql/
│   └── init.sql          # Script de inicialización de la base de datos
│
├── Dockerfile            # Configuración para construir la imagen de la API
├── docker-compose.yml    # Configuración de los servicios (API y PostgreSQL)
├── package.json         # Dependencias del proyecto
└── server.js            # Código principal de la API
```

## Configuración

El proyecto utiliza las siguientes variables de entorno (ya configuradas en docker-compose.yml):

- `DB_USER`: Usuario de la base de datos (default: admin)
- `DB_PASSWORD`: Contraseña de la base de datos (default: admin123)
- `DB_NAME`: Nombre de la base de datos (default: usuarios_db)
- `DB_HOST`: Host de la base de datos (default: db)
- `DB_PORT`: Puerto de la base de datos (default: 5432)

## Instalación y Ejecución

1. Clonar o descargar este repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd ServerBasicExpress
   ```

2. Iniciar los servicios con Docker Compose:
   ```bash
   docker-compose up --build
   ```
   Este comando:
   - Construirá la imagen de la API
   - Iniciará el contenedor de PostgreSQL
   - Creará la tabla necesaria
   - Iniciará la API en el puerto 3000

## Endpoints Disponibles

### Prueba de Conexión
- `GET /`: Mensaje de bienvenida
- `GET /test-db`: Prueba la conexión con la base de datos

### Gestión de Usuarios
- `GET /usuarios`: Obtiene la lista de todos los usuarios
- `GET /usuarios/:id`: Obtiene un usuario por su ID

## Base de Datos

La base de datos PostgreSQL se inicializa con una tabla `usuarios` que tiene la siguiente estructura:

```sql
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contraseña VARCHAR(100) NOT NULL
);
```

## Pruebas

Para probar los endpoints, puedes usar curl o cualquier cliente HTTP:

```bash
# Probar que la API está funcionando
curl http://localhost:3000

# Probar la conexión a la base de datos
curl http://localhost:3000/test-db

# Obtener todos los usuarios
curl http://localhost:3000/usuarios
```

## Detener los Servicios

Para detener los servicios:
```bash
docker-compose down
```

Para detener los servicios y eliminar los volúmenes (esto eliminará los datos de la base de datos):
```bash
docker-compose down -v
```

## Solución de Problemas

1. Si hay problemas con los permisos de la base de datos:
   ```bash
   docker-compose down -v
   docker-compose up --build
   ```

2. Si la API no se puede conectar a la base de datos:
   - Asegúrate de que ambos servicios estén corriendo:
     ```bash
     docker-compose ps
     ```
   - Revisa los logs:
     ```bash
     docker-compose logs
     ```