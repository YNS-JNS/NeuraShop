/**
 * Un wrapper pour les fonctions de contrôleur asynchrones.
 * Il attrape les erreurs et les passe au prochain middleware (notre errorHandler).
 * Évite d'avoir à écrire des blocs try-catch dans chaque contrôleur.
 * @param {Function} requestHandler - La fonction de contrôleur asynchrone.
 * @returns {Function}
 */
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };
