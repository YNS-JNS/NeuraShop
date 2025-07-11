class ApiResponse {
  /**
   * Crée une instance d'ApiResponse.
   * @param {number} statusCode - Le code de statut HTTP.
   * @param {any} data - Les données de la réponse.
   * @param {string} message - Un message de succès.
   * @param {object} [meta] - Métadonnées additionnelles (ex: pagination).
   */
  constructor(statusCode, data, message = 'Success', meta = {}) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;

    // Ajouter les métadonnées si elles existent
    if (Object.keys(meta).length > 0) {
      this.meta = meta;
    }
  }
}

export { ApiResponse };
