import { ApiError } from '../utils/ApiError.js';

/**
 * Middleware centralisé pour la gestion des erreurs.
 * Il capture les erreurs (y compris les ApiError) et envoie une réponse JSON standardisée.
 * @param {Error|ApiError} err - L'objet d'erreur.
 * @param {import('express').Request} req - L'objet de requête Express.
 * @param {import('express').Response} res - L'objet de réponse Express.
 * @param {import('express').NextFunction} next - Le prochain middleware.
 */
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Log de l'erreur pour le débogage (sauf en production pour les erreurs non gérées)
  console.error(`[ERROR] ${statusCode} - ${message}\nStack: ${err.stack}`);

  res.status(statusCode).json({
    success: false,
    message: message,
    errors: err.errors || [],
  });
};

export { errorHandler };
