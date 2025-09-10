/**
 * Servicio de validación para diferentes entidades de la aplicación
 * Este servicio centraliza las validaciones de datos para reutilizarlas en múltiples partes
 */

/**
 * Errores de validación con un mensaje por cada campo
 */
export type ValidationErrors = { [key: string]: string } | null;

/**
 * Interface para contacto
 */
interface ContactData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

/**
 * Valida los datos del formulario de contacto
 * @param data Datos del formulario de contacto
 * @returns Objeto con errores o null si no hay errores
 */
export const validateContact = (data: ContactData): ValidationErrors => {
  const errors: { [key: string]: string } = {};

  // Validar nombre
  if (!data.name || data.name.trim() === '') {
    errors.name = 'El nombre es requerido';
  } else if (data.name.length > 100) {
    errors.name = 'El nombre no puede exceder los 100 caracteres';
  }

  // Validar email
  if (!data.email || data.email.trim() === '') {
    errors.email = 'El correo electrónico es requerido';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'El correo electrónico no es válido';
  } else if (data.email.length > 100) {
    errors.email = 'El correo electrónico no puede exceder los 100 caracteres';
  }

  // Validar teléfono (opcional)
  if (data.phone && data.phone.length > 20) {
    errors.phone = 'El teléfono no puede exceder los 20 caracteres';
  }

  // Validar mensaje
  if (!data.message || data.message.trim() === '') {
    errors.message = 'El mensaje es requerido';
  } else if (data.message.length > 1000) {
    errors.message = 'El mensaje no puede exceder los 1000 caracteres';
  }

  return Object.keys(errors).length > 0 ? errors : null;
};

/**
 * Sanitiza los datos del formulario de contacto
 * @param data Datos del formulario de contacto
 * @returns Datos sanitizados
 */
export const sanitizeContact = (data: ContactData): ContactData => {
  return {
    name: data.name.trim().substring(0, 100),
    email: data.email.trim().substring(0, 100),
    phone: data.phone ? data.phone.trim().substring(0, 20) : undefined,
    message: data.message.trim().substring(0, 1000),
  };
};

// Funciones genéricas de validación que se pueden reutilizar

/**
 * Valida que un email tenga formato correcto
 * @param email Email a validar
 * @returns true si el email es válido
 */
export const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

/**
 * Valida que un texto no esté vacío
 * @param text Texto a validar
 * @returns true si el texto no está vacío
 */
export const isNotEmpty = (text: string): boolean => {
  return text !== undefined && text !== null && text.trim() !== '';
};

/**
 * Valida que un texto no exceda cierta longitud
 * @param text Texto a validar
 * @param maxLength Longitud máxima permitida
 * @returns true si el texto no excede la longitud máxima
 */
export const isValidLength = (text: string, maxLength: number): boolean => {
  return text.length <= maxLength;
};

// Podemos añadir más validaciones genéricas aquí según crezca la aplicación
// Por ejemplo: validación de contraseñas, códigos postales, etc. 