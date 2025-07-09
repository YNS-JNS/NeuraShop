import { productService } from '../services/product.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js'; // Nous allons créer ce fichier !
import { PublicProductDto } from '../dto/public/product.dto.js'; // DTO

// --- Contrôleurs pour l'Admin Dashboard ---

const createAdminProduct = asyncHandler(async (req, res) => {
  const product = await productService.createProduct(req.body);
  return res.status(201).json(new ApiResponse(201, product, 'Product created successfully'));
});

const getAdminProducts = asyncHandler(async (req, res) => {
  const products = await productService.getAllProducts();
  return res.status(200).json(new ApiResponse(200, products));
});

const getAdminProductDetails = asyncHandler(async (req, res) => {
  const product = await productService.getProductById(req.params.id);
  return res.status(200).json(new ApiResponse(200, product));
});

const updateAdminProduct = asyncHandler(async (req, res) => {
  const product = await productService.updateProduct(req.params.id, req.body);
  return res.status(200).json(new ApiResponse(200, product, 'Product updated successfully'));
});

const deleteAdminProduct = asyncHandler(async (req, res) => {
  await productService.deleteProduct(req.params.id);
  return res.status(200).json(new ApiResponse(200, {}, 'Product deleted successfully'));
});

// --- Contrôleurs pour le Store Front Public ---

const getPublicProducts = asyncHandler(async (req, res) => {
  const productsFromDB = await productService.getAllProducts({ status: 'active' });

  // Utilisation le DTO pour transformer la liste
  const productsForStore = productsFromDB.map((product) => new PublicProductDto(product));

  return res.status(200).json(new ApiResponse(200, productsForStore));
});

const getPublicProductDetails = asyncHandler(async (req, res) => {
  const productFromDB = await productService.getProductById(req.params.id);
  if (productFromDB.status !== 'active') {
    throw new ApiError(404, 'Product not found');
  }

  // Utiliser le DTO pour transformer l'objet unique.
  const productForStore = new PublicProductDto(productFromDB);

  return res.status(200).json(new ApiResponse(200, productForStore));
});

export const productController = {
  createAdminProduct,
  getAdminProducts,
  getAdminProductDetails,
  updateAdminProduct,
  deleteAdminProduct,
  getPublicProducts,
  getPublicProductDetails
};
