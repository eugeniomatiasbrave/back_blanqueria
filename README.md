# Backend Blanquería Landing Page

Backend para la landing page de Blanquería, desarrollado con Express.js, TypeScript, MySQL y Sequelize.

## Características

- API RESTful para el procesamiento de formularios de contacto
- Validación y sanitización de datos
- Envío de emails de confirmación
- Almacenamiento en base de datos MySQL
- Limitación de tasa de peticiones para prevenir ataques
- Implementación con TypeScript para mayor robustez

## Requisitos

- Node.js 14.x o superior
- MySQL 5.7 o superior

## Despliegue en Railway

### Backend

1. Clona este repositorio en Railway o conecta tu GitHub.

2. Crea un nuevo proyecto Railway tipo "Node.js" y sube el código.

3. Configura las variables de entorno en Railway:

- MYSQLHOST
- MYSQLUSER
- MYSQLPASSWORD
- MYSQLDATABASE
- MYSQLPORT
- PORT (puerto del backend, por defecto 3001)

1. Railway instalará las dependencias automáticamente.

2. El backend se ejecutará en Railway y expondrá la API.

### Base de datos MySQL

1. En Railway, crea un nuevo servicio "MySQL".

2. Copia las credenciales generadas por Railway y configúralas como variables de entorno en el backend.

3. Sube el esquema de la base de datos usando los archivos en `src/database/Contacts.sql` y `src/database/Users.sql`.
  Puedes usar el panel de Railway o conectarte con un cliente MySQL externo.

### Variables de entorno ejemplo

```env
MYSQLHOST=tu_host_mysql_railway
MYSQLUSER=tu_usuario_mysql_railway
MYSQLPASSWORD=tu_password_mysql_railway
MYSQLDATABASE=tu_db_mysql_railway
MYSQLPORT=3306
PORT=3001
```

## Instalación local

1. Clonar el repositorio
2. Instalar dependencias:

  npm install

1. Crear el archivo `.env` y configurar las variables de entorno
2. Crear la base de datos en MySQL:
  CREATE DATABASE blanqueria_db;

3. Ejecutar el servidor en modo desarrollo:

  npm run dev

## Estructura del proyecto

src/
├── config/         # Configuración de la aplicación
├── controllers/    # Controladores para las rutas
├── middlewares/    # Middlewares personalizados
├── models/         # Modelos de Sequelize
├── routes/         # Definición de rutas
├── utils/          # Utilidades y helpers
└── index.ts        # Punto de entrada de la aplicación

## API Endpoints

### Formulario de Contacto

**POST /api/contact

Recibe los datos del formulario de contacto y envía confirmación por email.

Parámetros (JSON):

```json
{
  "name": "Nombre Completo",
  "email": "correo@ejemplo.com",
  "phone": "123456789", // Opcional
  "message": "Mensaje del usuario"
}
```

Respuesta de éxito:

```json
{
  "success": true,
  "message": "Formulario enviado con éxito",
  "data": {
    "id": 1,
    "createdAt": "2023-05-23T12:34:56.789Z"
  }
}
```

## Despliegue

-Si ya tienes la carpeta dist generada, puedes iniciar el servidor con:

npm start

-Si necesitas compilar el código TypeScript antes para desplegar en producción ejecuta:

npm run build  
npm start

-Si quieres trabajar en modo desarrollo (con recarga automática), usa:

npm run dev

## Integración con el Frontend

El frontend debe enviar los datos del formulario de contacto a la API REST mediante una petición POST a la URL `http://localhost:3001/api/contact` (o la URL correspondiente al entorno de producción).

Ejemplo de integración en SvelteKit (dentro del componente Contact.svelte):

```typescript
async function handleSubmit() {
  loading = true;
  error = null;
  
  try {
    const response = await fetch('http://localhost:3001/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        message
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      error = data.message || 'Error al enviar el formulario';
      return;
    }

    // Éxito
    submitted = true;
  } catch (err) {
    error = 'Error de conexión, intente nuevamente';
    console.error('Error:', err);
  } finally {
    loading = false;
  }
}
```

## Licencia

Este proyecto está bajo licencia MIT.
