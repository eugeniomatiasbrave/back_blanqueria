import { Request, Response } from 'express';
import Contact from '../models/Contact';
import { sendConfirmationEmail, sendAdminNotificationEmail } from '../services/emailService';
import { validateContact, sanitizeContact } from '../services/validationService';

/**
 * Controlador para la creación de un nuevo contacto
 */
export const createContact = async (req: Request, res: Response): Promise<void> => {
  try {
    // Validar los datos del formulario
    const validationErrors = validateContact(req.body);
    if (validationErrors) {
      res.status(400).json({
        success: false,
        errors: validationErrors,
        message: 'Hay errores en el formulario',
      });
      return;
    }

    // Sanitizar los datos
    const sanitizedData = sanitizeContact(req.body);

    // Crear nuevo contacto en la base de datos
    const contact = await Contact.create(sanitizedData);

    // Enviar emails
    await Promise.all([
      sendConfirmationEmail(sanitizedData.name, sanitizedData.email),
      sendAdminNotificationEmail(sanitizedData),
    ]);

    // Responder con éxito
    res.status(201).json({
      success: true,
      message: 'Formulario enviado con éxito',
      data: {
        id: contact.id,
        createdAt: contact.createdAt,
      },
    });
  } catch (error) {
    console.error('Error al procesar formulario de contacto:', error);
    res.status(500).json({
      success: false,
      message: 'Error al procesar el formulario de contacto',
    });
  }
}; 