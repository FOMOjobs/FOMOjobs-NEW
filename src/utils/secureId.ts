/**
 * Secure ID Generation
 *
 * Uses cryptographically secure random values instead of Math.random()
 * to prevent ID collisions and predictability attacks.
 */

/**
 * Generate a cryptographically secure UUID v4
 *
 * Uses crypto.randomUUID() if available (modern browsers)
 * Falls back to crypto.getRandomValues() for older browsers
 *
 * @returns UUID string (e.g., "550e8400-e29b-41d4-a716-446655440000")
 */
export const generateSecureId = (): string => {
  // Modern browsers support crypto.randomUUID()
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // Fallback for older browsers using crypto.getRandomValues()
  // This generates a RFC 4122 compliant UUID v4
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (crypto.getRandomValues(new Uint8Array(1))[0] % 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

/**
 * Generate a short secure ID for UI purposes
 *
 * Not recommended for critical security (use generateSecureId instead)
 * but much better than Math.random()
 *
 * @returns Short ID (e.g., "a7b3c9d2")
 */
export const generateShortSecureId = (): string => {
  const bytes = crypto.getRandomValues(new Uint8Array(4));
  return Array.from(bytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

/**
 * Generate a prefixed secure ID
 *
 * Useful for specific entity types
 *
 * @param prefix - Prefix for the ID (e.g., "cv", "exp", "edu")
 * @returns Prefixed UUID (e.g., "cv_550e8400-e29b-41d4-a716-446655440000")
 */
export const generatePrefixedId = (prefix: string): string => {
  return `${prefix}_${generateSecureId()}`;
};
