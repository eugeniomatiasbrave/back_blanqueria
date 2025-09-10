import nodemailer from 'nodemailer';
import config from '../config/config';

// Crear transporter para el envío de emails
const transporter = nodemailer.createTransport({
  host: config.mail.host, 
  port: config.mail.port,
  secure: config.mail.secure,
  auth: {
    user: config.mail.auth.user,
    pass: config.mail.auth.pass,
  },
});

/**
 * Envía un email de confirmación al cliente (usuario)
 * @param name Nombre del Usuario
 * @param email Email del Usuario
 */
export const sendConfirmationEmail = async (name: string, email: string): Promise<void> => {
  try {
    const mailOptions = {
      from: config.mail.from, // Email del Admistrador
      to: email,   // Email del Usuario
      subject: 'Gracias por contactarnos - Blanquería',
      text: `Hola ${name},\n\nGracias por contactarnos. Hemos recibido tu mensaje y te responderemos a la brevedad posible.\n\nSaludos,\nEquipo de Blanquería`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4b5563;">Gracias por contactarnos</h2>
          <p>Hola <strong>${name}</strong>,</p>
          <p>Hemos recibido tu mensaje y te responderemos a la brevedad posible.</p>
          <p>Saludos,<br>Equipo de Blanquería</p>
        </div>
      `,
    };

    // En desarrollo, logeamos el email pero también lo enviamos
    if (config.server.nodeEnv === 'development') {
      console.log('Email de confirmación:', mailOptions);
    }

    await transporter.sendMail(mailOptions);
    console.log(`Email de confirmación enviado a ${email}`);
  } catch (error) {
    console.error('Error al enviar email de confirmación:', error);
    throw error;
  }
};

/**
 * Envía un email de notificación al administrador
 * @param contactData Datos del formulario de contacto
 */
export const sendAdminNotificationEmail = async (contactData: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}): Promise<void> => {
  try {
    const mailOptions = {
      from: config.mail.from,
      to: config.mail.auth.user, // Email del administrador
      subject: 'Nuevo contacto desde la web - Blanquería',
      text: `
        Nuevo contacto:
        Nombre: ${contactData.name}
        Email: ${contactData.email}
        Teléfono: ${contactData.phone || 'No proporcionado'}
        Mensaje: ${contactData.message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4b5563;">Nuevo contacto desde la web</h2>
          <p><strong>Nombre:</strong> ${contactData.name}</p>
          <p><strong>Email:</strong> ${contactData.email}</p>
          <p><strong>Teléfono:</strong> ${contactData.phone || 'No proporcionado'}</p>
          <p><strong>Mensaje:</strong><br>${contactData.message.replace(/\n/g, '<br>')}</p>
        </div>
      `,
    };

    // En desarrollo, logeamos el email pero también lo enviamos
    if (config.server.nodeEnv === 'development') {
      console.log('Email de notificación al admin:', mailOptions);
    }

    await transporter.sendMail(mailOptions);
    console.log('Email de notificación enviado al administrador');
  } catch (error) {
    console.error('Error al enviar email de notificación al admin:', error);
    throw error;
  }
}; 


/*
Se envían dos tipos de notificaciones a través del servicio de correo electrónico:

Notificación de Confirmación al Usuario:

Quien envía: La aplicación (a través de la función sendConfirmationEmail en emailService.ts).
Quien recibe: El usuario que ha contactado a la empresa.
Contenido: Un correo de confirmación que agradece al usuario por su mensaje y le informa que se responderá a la 
brevedad posible. Este correo se envía desde la dirección eugeniomatiasbrave@gmail.com.

Notificación al Administrador:

Quien envía: La aplicación (a través de la función sendAdminNotificationEmail en emailService.ts).
Quien recibe: El administrador, que en este caso es la misma dirección de correo eugeniomatiasbrave@gmail.com.
Contenido: Un correo que contiene los datos del formulario de contacto enviado por el usuario, incluyendo el nombre, 
correo electrónico, teléfono (si se proporciona) y el mensaje del usuario.

En resumen:
Envíos:
La aplicación envía correos de confirmación a los usuarios.
La aplicación envía notificaciones de contacto al administrador.
Recepciones:
Los usuarios reciben correos de confirmación.
El administrador recibe notificaciones de contacto.
Ambos tipos de correos se envían desde la misma dirección de correo electrónico (eugeniomatiasbrave@gmail.com).
*/