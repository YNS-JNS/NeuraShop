import Joi from 'joi';

// Schéma de validation pour l'inscription (register)
const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  // Le rôle n'est pas inclus ici, car un utilisateur ne peut pas s'auto-attribuer le rôle d'admin.
});

// Schéma de validation pour la connexion (login)
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export { registerSchema, loginSchema };
