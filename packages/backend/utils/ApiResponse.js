class ApiResponse {
  /**
   * Crée une instance d'ApiResponse.
   * @param {number} statusCode - Le code de statut HTTP.
   * @param {any} data - Les données de la réponse.
   * @param {string} message - Un message de succès.
   */
  constructor(statusCode, data, message = 'Success') {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export { ApiResponse };
