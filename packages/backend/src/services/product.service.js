import Product from '../models/Product.model.js';
import { ApiError } from '../utils/ApiError.js';

/**
 * Service pour créer un nouveau produit.
 * @param {object} productData - Les données du produit à créer.
 * @returns {Promise<Document>} Le document du produit créé.
 */
const createProduct = async (productData) => {
  const product = new Product(productData);
  return await product.save();
};

/**
 * Service pour récupérer tous les produits avec un filtre optionnel
 * et peupler les catégories et les tags.
 * @param {object} filter - Filtre Mongoose.
 * @returns {Promise<Array<Document>>} Un tableau de produits.
 */
const getAllProducts = async (filter = {}) => {
  return await Product.find(filter).populate('category').populate('tags');
};

/**
 * Service pour récupérer un produit par son ID
 * et peupler ses catégories et tags.
 * @param {string} productId - L'ID du produit.
 * @returns {Promise<Document>} Le document du produit.
 */
const getProductById = async (productId) => {
  const product = await Product.findById(productId).populate('category').populate('tags');
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }
  return product;
};

/**
 * Service pour mettre à jour un produit.
 * @param {string} productId - L'ID du produit à mettre à jour.
 * @param {object} updateData - Les données de mise à jour.
 * @returns {Promise<Document>} Le document du produit mis à jour.
 * @throws {ApiError} Si le produit n'est pas trouvé.
 */
const updateProduct = async (productId, updateData) => {
  const product = await Product.findByIdAndUpdate(productId, updateData, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }
  return product;
};

/**
 * Service pour supprimer un produit.
 * @param {string} productId - L'ID du produit à supprimer.
 */
const deleteProduct = async (productId) => {
  const product = await Product.findByIdAndDelete(productId);
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }
};

export const productService = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
