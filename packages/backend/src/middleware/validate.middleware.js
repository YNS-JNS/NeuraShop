import { ApiError } from '../utils/ApiError.js';

/**
 * Middleware pour valider le corps de la requête contre un schéma Joi.
 * @param {import('joi').Schema} schema - Le schéma Joi à utiliser pour la validation.
 * @returns {import('express').RequestHandler}
 */
const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    // Transformer le message d'erreur Joi en un format plus simple
    const errorMessage = error.details.map((detail) => detail.message).join(', ');
    return next(new ApiError(400, errorMessage)); // 400 Bad Request
  }
  next();
};

export { validate };
