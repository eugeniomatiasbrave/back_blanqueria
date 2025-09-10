import { Request, Response, NextFunction } from 'express';

// Implementación simple de rate limiting basado en memoria
// En producción se recomienda usar Redis u otro almacenamiento externo
const ipRequests: Map<string, { count: number; resetTime: number }> = new Map();

/**
 * Middleware para limitar el número de peticiones por IP
 * @param maxRequests Número máximo de peticiones permitidas en el periodo
 * @param windowMs Ventana de tiempo en milisegundos
 */
export const rateLimiter = (maxRequests = 5, windowMs = 15 * 60 * 1000) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Obtener IP (en producción usar req.ip)
    const ip = req.headers['x-forwarded-for'] as string || req.socket.remoteAddress || 'unknown';
    
    const now = Date.now();
    const ipData = ipRequests.get(ip);
    
    // Si no hay datos previos para esta IP o ha expirado el tiempo, inicializar
    if (!ipData || now > ipData.resetTime) {
      ipRequests.set(ip, {
        count: 1,
        resetTime: now + windowMs,
      });
      return next();
    }
    
    // Incrementar contador
    ipData.count += 1;
    
    // Si excede el límite, rechazar la petición
    if (ipData.count > maxRequests) {
      return res.status(429).json({
        success: false,
        message: 'Demasiadas solicitudes, por favor intente nuevamente más tarde',
      });
    }
    
    // Actualizar en el mapa
    ipRequests.set(ip, ipData);
    next();
  };
}; 