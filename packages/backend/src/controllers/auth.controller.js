import { authService } from '../services/auth.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';

/**
 * Contrôleur pour l'inscription d'un nouvel utilisateur.
 */
const register = asyncHandler(async (req, res) => {
  // Les données du corps de la requête ont déjà été validées par le middleware
  const user = await authService.registerUser(req.body);

  return res.status(201).json(new ApiResponse(201, user, 'User registered successfully'));
});

/**
 * Contrôleur pour la connexion d'un utilisateur.
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const { user, accessToken } = await authService.loginUser(email, password);

  // Optionnel mais recommandé : envoyer le token dans un cookie sécurisé
  const options = {
    httpOnly: true, // Empêche l'accès via JavaScript côté client (sécurité XSS)
    secure: process.env.NODE_ENV === 'production', // N'envoyer que sur HTTPS en production
  };

  return res
    .status(200)
    .cookie('accessToken', accessToken, options)
    .json(new ApiResponse(200, { user, accessToken }, 'User logged in successfully'));
});

/**
 * Contrôleur pour la déconnexion d'un utilisateur.
 */
const logout = asyncHandler(async (req, res) => {
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie('accessToken', options)
    .json(new ApiResponse(200, {}, 'User logged out successfully'));
});

export const authController = {
  register,
  login,
  logout,
};
