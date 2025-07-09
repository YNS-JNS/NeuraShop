import Joi from 'joi';

// Schéma de validation pour la création d'un produit
const createProductSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).required(),
  price: Joi.number().positive().required(),
  category: Joi.string().required(),
  stock: Joi.number().integer().min(0).required(),
  images: Joi.array().items(Joi.string().uri()).min(1).required(),
  brand: Joi.string(),
});

// Schéma pour la mise à jour (tous les champs sont optionnels)
const updateProductSchema = Joi.object({
  name: Joi.string().min(3).max(100),
  description: Joi.string().min(10),
  price: Joi.number().positive(),
  category: Joi.string(),
  stock: Joi.number().integer().min(0),
  images: Joi.array().items(Joi.string().uri()).min(1),
  brand: Joi.string(),
  status: Joi.string().valid('active', 'draft', 'archived'),
});

export { createProductSchema, updateProductSchema };
