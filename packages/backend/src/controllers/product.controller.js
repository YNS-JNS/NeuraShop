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
  // Créez une copie des filtres de la requête pour pouvoir la modifier sans risque
  const queryForFeatures = { ...req.query };

  // Le filtre de base qui est NON-NÉGOCIABLE pour cette route
  const baseFilter = { status: 'active' };

  // S'il y a un paramètre de recherche, on l'enlève de la copie
  // pour que la méthode .filter() de APIFeatures ne le voie pas.
  if (queryForFeatures.search) {
    delete queryForFeatures.search;
  }

  // On initialise la requête Mongoose avec notre filtre de base
  let mongoQuery = Product.find(baseFilter);

  // S'il y avait une recherche, on l'ajoute manuellement à la requête Mongoose
  if (req.query.search) {
    mongoQuery = mongoQuery.find({ $text: { $search: req.query.search } });
  }

  // Maintenant, on passe la requête pré-filtrée et la querystring nettoyée à APIFeatures
  const features = new APIFeatures(mongoQuery, queryForFeatures)
    // On n'appelle plus .search() ici, car on l'a déjà géré
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const productsFromDB = await features.query.populate('category').populate('tags');

  // transformation (DTO) des produits pour le store front
  const productsForStore = productsFromDB.map((product) => new PublicProductDto(product));

  // La query pour le comptage doit suivre EXACTEMENT la même logique
  let countQuery = Product.find(baseFilter);
  if (req.query.search) {
    countQuery = countQuery.find({ $text: { $search: req.query.search } });
  }

  // La query pour compter le total doit être identique
  const totalQueryFeatures = new APIFeatures(countQuery, queryForFeatures).filter();
  const totalDocuments = await Product.countDocuments(totalQueryFeatures.query.getFilter());


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
