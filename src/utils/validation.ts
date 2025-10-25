/**
 * Input Validation Utilities
 * Security-focused validation for user inputs
 */

/**
 * Validate email format
 * Max length: 254 characters (RFC 5321)
 */
export const validateEmail = (email: string): boolean => {
  if (!email || email.length > 254) return false;

  // RFC 5322 compliant regex (simplified)
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Validate phone number
 * Supports Polish formats: +48 123 456 789, 123-456-789, 123456789
 */
export const validatePhone = (phone: string): boolean => {
  if (!phone) return false;

  // Remove all spaces and dashes
  const cleaned = phone.replace(/[\s-]/g, '');

  // Polish phone: optional +48, then 9 digits
  const regex = /^(\+48)?[0-9]{9}$/;
  return regex.test(cleaned);
};

/**
 * Validate URL
 * Only allows http:// and https:// protocols
 * Blocks javascript:, data:, file:, etc.
 */
export const validateURL = (url: string): boolean => {
  if (!url || url.length > 2048) return false;

  try {
    const parsed = new URL(url);
    // Only allow http and https
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};

/**
 * Sanitize text input
 * - Removes HTML tags
 * - Trims whitespace
 * - Enforces max length
 */
export const sanitizeInput = (input: string, maxLength: number = 500): string => {
  if (!input) return '';

  // Remove HTML tags and script content
  let sanitized = input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  sanitized = sanitized.replace(/<[^>]*>/g, '');

  // Decode HTML entities to prevent double-encoding
  const textarea = document.createElement('textarea');
  textarea.innerHTML = sanitized;
  sanitized = textarea.value;

  // Trim to max length
  sanitized = sanitized.slice(0, maxLength);

  // Trim whitespace
  return sanitized.trim();
};

/**
 * Validate text length
 */
export const validateTextLength = (text: string, min: number, max: number): boolean => {
  if (!text) return min === 0;
  return text.length >= min && text.length <= max;
};

/**
 * Validate name (letters, spaces, hyphens only)
 * Supports Polish characters: ąćęłńóśźżĄĆĘŁŃÓŚŹŻ
 */
export const validateName = (name: string): boolean => {
  if (!name) return false;

  // 2-100 characters, letters, spaces, hyphens only
  const regex = /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s-]{2,100}$/;
  return regex.test(name);
};

/**
 * Validate date format (YYYY-MM)
 */
export const validateDateFormat = (date: string): boolean => {
  if (!date) return false;

  const regex = /^\d{4}-(0[1-9]|1[0-2])$/;
  return regex.test(date);
};

/**
 * Validate date is not in the future
 */
export const validateDateNotFuture = (date: string): boolean => {
  if (!validateDateFormat(date)) return false;

  const inputDate = new Date(date + '-01');
  const now = new Date();

  return inputDate <= now;
};

/**
 * Validate end date is after start date
 */
export const validateDateRange = (startDate: string, endDate: string): boolean => {
  if (!validateDateFormat(startDate) || !validateDateFormat(endDate)) {
    return false;
  }

  const start = new Date(startDate + '-01');
  const end = new Date(endDate + '-01');

  return end >= start;
};

/**
 * Sanitize and validate input with error message
 */
export interface ValidationResult {
  isValid: boolean;
  value: string;
  error?: string;
}

export const validateAndSanitizeEmail = (email: string): ValidationResult => {
  const sanitized = sanitizeInput(email, 254);

  if (!sanitized) {
    return { isValid: false, value: '', error: 'Email jest wymagany' };
  }

  if (!validateEmail(sanitized)) {
    return { isValid: false, value: sanitized, error: 'Nieprawidłowy format email' };
  }

  return { isValid: true, value: sanitized };
};

export const validateAndSanitizePhone = (phone: string): ValidationResult => {
  const sanitized = sanitizeInput(phone, 20);

  if (!sanitized) {
    return { isValid: false, value: '', error: 'Telefon jest wymagany' };
  }

  if (!validatePhone(sanitized)) {
    return { isValid: false, value: sanitized, error: 'Nieprawidłowy format telefonu (np. +48 123 456 789)' };
  }

  return { isValid: true, value: sanitized };
};

export const validateAndSanitizeName = (name: string): ValidationResult => {
  const sanitized = sanitizeInput(name, 100);

  if (!sanitized) {
    return { isValid: false, value: '', error: 'Imię i nazwisko jest wymagane' };
  }

  if (!validateName(sanitized)) {
    return { isValid: false, value: sanitized, error: 'Imię i nazwisko może zawierać tylko litery, spacje i myślniki (2-100 znaków)' };
  }

  return { isValid: true, value: sanitized };
};

export const validateAndSanitizeURL = (url: string): ValidationResult => {
  if (!url) {
    return { isValid: true, value: '' }; // URL is optional
  }

  const sanitized = sanitizeInput(url, 2048);

  if (!validateURL(sanitized)) {
    return { isValid: false, value: sanitized, error: 'Nieprawidłowy URL (tylko http:// lub https://)' };
  }

  return { isValid: true, value: sanitized };
};
