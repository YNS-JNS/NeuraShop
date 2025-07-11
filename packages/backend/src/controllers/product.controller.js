import Product from '../models/Product.model.js';
import * as factory from './handlerFactory.js';
import { PublicProductDto } from '../dto/public/product.dto.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { APIFeatures } from '../utils/APIFeatures.js';

// --- Contrôleurs pour l'Admin Dashboard (utilisent maintenant la factory) ---

// Options pour peupler les champs de référence
const adminPopulateOptions = [{ path: 'category' }, { path: 'tags' }];

export const createAdminProduct = factory.createOne(Product);
export const getAdminProducts = factory.getAll(Product); //  Utilise => APIFeatures !
export const getAdminProductDetails = factory.getOne(Product, adminPopulateOptions);
export const updateAdminProduct = factory.updateOne(Product);
export const deleteAdminProduct = factory.deleteOne(Product);

// --- Contrôleurs pour le Store Front Public (logique personnalisée) ---

export const getPublicProducts = asyncHandler(async (req, res) => {
  // On ajoute un filtre de base pour ne montrer que les produits actifs
  req.query.status = 'active';

  // 1) Initialiser APIFeatures avec le filtre de base
  const features = new APIFeatures(Product.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  // 2) Exécuter la requête
  const productsFromDB = await features.query.populate('category').populate('tags');

  // 3) Transformer les résultats avec notre DTO
  const productsForStore = productsFromDB.map((product) => new PublicProductDto(product));

  // 4) Gérer les métadonnées de pagination
  const totalQuery = new APIFeatures(Product.find(), req.query).filter();
  const totalDocuments = await Product.countDocuments(totalQuery.query.getFilter());

  // 5) Envoyer la réponse
  res.status(200).json(
    new ApiResponse(
      200,
      {
        results: productsForStore.length,
        data: productsForStore,
      },
      'Products retrieved successfully',
      {
        pagination: {
          currentPage: parseInt(req.query.page, 10) || 1,
          limit: parseInt(req.query.limit, 10) || 100,
          totalPages: Math.ceil(totalDocuments / (parseInt(req.query.limit, 10) || 100)),
          totalDocuments,
        },
      },
    ),
  );
});

export const getPublicProductDetails = asyncHandler(async (req, res) => {
  const productFromDB = await Product.findById(req.params.id).populate('category').populate('tags');

  if (!productFromDB || productFromDB.status !== 'active') {
    throw new ApiError(404, 'Product not found');
  }

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
  getPublicProductDetails,
};

// import { productService } from '../services/product.service.js';
// import { asyncHandler } from '../utils/asyncHandler.js';
// import { ApiResponse } from '../utils/ApiResponse.js'; // Nous allons créer ce fichier !
// import { PublicProductDto } from '../dto/public/product.dto.js'; // DTO

// // --- Contrôleurs pour l'Admin Dashboard ---

// const createAdminProduct = asyncHandler(async (req, res) => {
//   const product = await productService.createProduct(req.body);
//   return res.status(201).json(new ApiResponse(201, product, 'Product created successfully'));
// });

// const getAdminProducts = asyncHandler(async (req, res) => {
//   const products = await productService.getAllProducts();
//   return res.status(200).json(new ApiResponse(200, products));
// });

// const getAdminProductDetails = asyncHandler(async (req, res) => {
//   const product = await productService.getProductById(req.params.id);
//   return res.status(200).json(new ApiResponse(200, product));
// });

// const updateAdminProduct = asyncHandler(async (req, res) => {
//   const product = await productService.updateProduct(req.params.id, req.body);
//   return res.status(200).json(new ApiResponse(200, product, 'Product updated successfully'));
// });

// const deleteAdminProduct = asyncHandler(async (req, res) => {
//   await productService.deleteProduct(req.params.id);
//   return res.status(200).json(new ApiResponse(200, {}, 'Product deleted successfully'));
// });

// // --- Contrôleurs pour le Store Front Public ---

// const getPublicProducts = asyncHandler(async (req, res) => {
//   const productsFromDB = await productService.getAllProducts({ status: 'active' });

//   // Utilisation le DTO pour transformer la liste
//   const productsForStore = productsFromDB.map((product) => new PublicProductDto(product));

//   return res.status(200).json(new ApiResponse(200, productsForStore));
// });

// const getPublicProductDetails = asyncHandler(async (req, res) => {
//   const productFromDB = await productService.getProductById(req.params.id);
//   if (productFromDB.status !== 'active') {
//     throw new ApiError(404, 'Product not found');
//   }

//   // Utiliser le DTO pour transformer l'objet unique.
//   const productForStore = new PublicProductDto(productFromDB);

//   return res.status(200).json(new ApiResponse(200, productForStore));
// });

// export const productController = {
//   createAdminProduct,
//   getAdminProducts,
//   getAdminProductDetails,
//   updateAdminProduct,
//   deleteAdminProduct,
//   getPublicProducts,
//   getPublicProductDetails
// };
