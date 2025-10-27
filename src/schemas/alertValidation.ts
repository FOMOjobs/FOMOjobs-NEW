import { z } from 'zod';

/**
 * Alert Validation Schema
 * Security: Validates all user inputs for alert creation/editing
 */

// Time format: HH:MM (07:00 - 21:00)
const timeRegex = /^([0-1][0-9]|2[0-1]):[0-5][0-9]$/;

export const alertSchema = z.object({
  alert_name: z
    .string()
    .trim()
    .min(3, 'Nazwa alertu musi mieć co najmniej 3 znaki')
    .max(100, 'Nazwa alertu może mieć maksymalnie 100 znaków')
    .regex(/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ0-9\s,\-_.]+$/, 
      'Nazwa może zawierać tylko litery, cyfry, spacje i podstawowe znaki interpunkcyjne'),
  
  notification_time: z
    .string()
    .regex(timeRegex, 'Nieprawidłowy format czasu (oczekiwano HH:MM)'),
  
  selected_companies: z
    .array(z.string())
    .min(1, 'Wybierz co najmniej jedną firmę')
    .max(50, 'Możesz wybrać maksymalnie 50 firm'),
  
  selected_levels: z
    .array(z.string())
    .min(1, 'Wybierz co najmniej jeden poziom doświadczenia')
    .max(20, 'Możesz wybrać maksymalnie 20 poziomów'),
  
  selected_categories: z
    .array(z.string())
    .min(1, 'Wybierz co najmniej jedną kategorię')
    .max(50, 'Możesz wybrać maksymalnie 50 kategorii'),
});

export type AlertFormData = z.infer<typeof alertSchema>;

/**
 * Validate alert data before submission
 */
export const validateAlertData = (data: unknown) => {
  return alertSchema.safeParse(data);
};
