import { Router } from 'express';
import contactRoutes from './contactRoutes';

const router = Router();

// Ruta de prueba para verificar que la API funciona
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString(),
  });
});

// Agregar rutas de contacto
router.use('/contact', contactRoutes);

export default router; 