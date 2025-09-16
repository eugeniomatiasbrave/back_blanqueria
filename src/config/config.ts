import dotenv from 'dotenv';

// Cargar variables de entorno.
dotenv.config();

// Configuración por defecto si no hay variables de entorno
const config = {
  server: {
    port: process.env.PORT || 3001,
    nodeEnv: process.env.NODE_ENV || 'development',
  },
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || '3306',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'railway',
    dialect: 'mysql'
  },
  mail: {
    host: process.env.MAIL_HOST || 'smtp.gmail.com',
    port: process.env.MAIL_PORT || '465',
    secure: true,
    auth: {
      user: process.env.MAIL_USER || '', 
      pass: process.env.MAIL_PASSWORD || 'password',
    },
    from: process.env.MAIL_FROM || 'Blanquería <eugeniomatiasbrave@gmail.com>', // Email del Aminitrador
  },
  cors: {
    origin: process.env.CORS_ORIGIN || 'https://front-blanqueria.vercel.app',
  }
};

export default config; 