import { Router } from 'express';
import { createContact } from '../controllers/contactController';
import { rateLimiter } from '../middlewares/rateLimiter';

const router = Router();

// Ruta para enviar formulario de contacto (con rate limiting "limite de solicitudes")
router.post('/', rateLimiter(5, 15 * 60 * 1000) as any, createContact);

export default router; 