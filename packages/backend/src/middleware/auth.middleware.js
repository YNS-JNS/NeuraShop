import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';
import { ApiError } from '../utils/ApiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * Middleware pour vérifier si un utilisateur est authentifié via un token JWT.
 * Le token peut provenir soit d'un cookie "accessToken", soit d'un header "Authorization".
 */
export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    // 1. Extraire le token
    const token = req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new ApiError(401, 'Unauthorized request: No token provided');
    }

    // 2. Vérifier le token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Trouver l'utilisateur dans la base de données
    const user = await User.findById(decodedToken?._id).select('-password');

    if (!user) {
      // Cas où le token est valide mais l'utilisateur a été supprimé
      throw new ApiError(401, 'Invalid Access Token');
    }

    // 4. Attacher l'utilisateur à l'objet de la requête
    req.user = user;
    next();
  } catch (error) {
    // Gérer les erreurs de token expiré ou invalide
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      throw new ApiError(401, 'Invalid or expired access token.');
    }
    throw error; // Renvoyer les autres erreurs
  }
});

/**
 * Middleware pour vérifier si un utilisateur authentifié a un rôle spécifique.
 * Doit être utilisé APRÈS le middleware verifyJWT.
 * @param {...string} roles - La liste des rôles autorisés.
 * @returns {import('express').RequestHandler}
 */
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new ApiError(
        403, // 403 Forbidden
        `Forbidden: Your role (${req.user.role}) is not authorized to access this resource.`,
      );
    }
    next();
  };
};
