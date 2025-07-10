import User from '../models/User.model.js';
import { ApiError } from '../utils/ApiError.js';

/**
 * Service pour inscrire un nouvel utilisateur.
 * @param {object} userData - Données de l'utilisateur (name, email, password).
 * @returns {Promise<Document>} Le document de l'utilisateur créé (sans le mot de passe).
 * @throws {ApiError} Si l'email est déjà utilisé.
 */
const registerUser = async (userData) => {
  // 1. Vérifier si l'utilisateur existe déjà
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new ApiError(409, 'An account with this email already exists.'); // 409 Conflict
  }

  // 2. Créer l'utilisateur (le hook pre-save hachera le mot de passe)
  const user = await User.create(userData);

  // 3. Récupérer l'utilisateur sans le mot de passe pour le retourner
  const createdUser = await User.findById(user._id).select('-password');
  return createdUser;
};

/**
 * Service pour connecter un utilisateur.
 * @param {string} email - L'email de l'utilisateur.
 * @param {string} password - Le mot de passe de l'utilisateur.
 * @returns {Promise<object>} Un objet contenant l'utilisateur connecté et son token d'accès.
 * @throws {ApiError} Si les identifiants sont incorrects.
 */
const loginUser = async (email, password) => {
  // 1. Trouver l'utilisateur par email
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, 'Invalid email or password.'); // Message générique pour la sécurité
  }

  // 2. Vérifier si le mot de passe est correct
  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, 'Invalid email or password.');
  }

  // 3. Générer le token d'accès
  const accessToken = user.generateAccessToken();

  // 4. Préparer les données de l'utilisateur à renvoyer (sans le mot de passe)
  const loggedInUser = await User.findById(user._id).select('-password');

  return { user: loggedInUser, accessToken };
};

export const authService = {
  registerUser,
  loginUser,
};
