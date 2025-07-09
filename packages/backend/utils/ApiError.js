class ApiError extends Error {
  /**
   * Crée une instance d'ApiError.
   * @param {number} statusCode - Le code de statut HTTP.
   * @param {string} message - Le message d'erreur.
   * @param {Array} errors - Un tableau d'erreurs de validation (optionnel).
   * @param {string} stack - La pile d'appels (optionnel).
   */
  constructor(statusCode, message = 'Something went wrong', errors = [], stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
