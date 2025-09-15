import express from 'express';
import cors from 'cors';
import { initDatabase } from './models';
import routes from './routes';
import config from './config/config';

// Inicializar la aplicación Express
const app = express();
const PORT = config.server.port || 3001;

// Middleware para CORS
app.use(cors({
  origin: config.cors.origin,
  optionsSuccessStatus: 200,
  credentials: true,
}));

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de logging básico
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Configurar rutas de la API
app.use('/api', routes);

// Middleware para manejo de errores 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada',
  });
});

// Middleware para manejo de errores
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error en el servidor:', err);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
  });
});

// Inicializar la base de datos y el servidor
const startServer = async () => {
  try {
    // Conectar a la base de datos
    await initDatabase();

    // Iniciar el servidor
    app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en Railway o local en el puerto ${PORT}`);
  console.log(`API disponible en /api`);
      console.log(`Modo: ${config.server.nodeEnv}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

// Iniciar el servidor
startServer(); 