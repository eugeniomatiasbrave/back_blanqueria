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
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
    dialect: 'mysql'
  },
  mail: {
    host: process.env.MAIL_HOST || 'smtp.example.com',
    port: parseInt(process.env.MAIL_PORT || '587', 10),
    secure: false,
    auth: {
      user: process.env.MAIL_USER || '', 
      pass: process.env.MAIL_PASSWORD || 'password',
    },
    from: process.env.MAIL_FROM || 'Blanquería <eugeniomatiasbrave@gmail.com>', // Email del Aminitrador
  },
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  }
};

export default config; 