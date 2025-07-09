import { productService } from '../services/product.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js'; // Nous allons créer ce fichier !

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

// Fonction de transformation pour le store
// const transformProductForStore = (product) => ({
//   id: product._id,
//   name: product.name,
//   image: product.images[0],
//   brand: product.brand,
//   review: product.averageRating,
//   price: product.price,
//   offerPrice: product.offerPrice,
// });

// const getPublicProducts = asyncHandler(async (req, res) => {
//   const productsFromDB = await productService.getAllProducts({ status: 'active' });
//   const productsForStore = productsFromDB.map(transformProductForStore);
//   return res.status(200).json(new ApiResponse(200, productsForStore));
// });

/**
 * Fonction de transformation pour adapter les données du produit au format attendu par le frontend du "Store".
 * C'est ici que la magie opère : on passe du modèle de la base de données au modèle de la vue.
 * @param {Document} product - Le document produit complet provenant de Mongoose.
 * @returns {object} Un objet formaté pour le store front.
 */
const transformProductForStore = (product) => {
  // Fonction utilitaire pour formater les prix en chaînes de caractères avec un symbole monétaire.
  const formatPrice = (priceValue) => {
    if (typeof priceValue !== 'number') return null;
    return `$${priceValue.toFixed(2)}`;
  };

  return {
    // Mapping champ par champ
    id: product._id,
    title: product.name, // 'name' devient 'title'
    image: product.images && product.images.length > 0 ? product.images[0] : 'default-product-image.jpg', // On prend la première image du tableau
    brand: product.brand || null,
    review: Math.round(product.averageRating) || 0, // On utilise le champ virtuel 'averageRating' et on l'arrondit
    
    // Formatage des prix en chaînes de caractères
    price: formatPrice(product.price),
    offer_price: formatPrice(product.offerPrice), // 'offerPrice' devient 'offer_price' et est formaté

    // Mapping des booléens et autres champs
    campaingn_product: product.isCampaignProduct, // 'isCampaignProduct' devient 'campaingn_product'

    // Ces champs n'existent pas dans notre modèle de base de données.
    // On renvoie 'null' comme dans l'exemple pour assurer la cohérence avec le frontend.
    cam_product_available: null,
    cam_product_sale: null,
    product_type: product.category, // On peut mapper 'category' à 'product_type'
  };
};

// On utilise maintenant notre nouveau transformateur.
const getPublicProducts = asyncHandler(async (req, res) => {
  // On récupère uniquement les produits actifs pour le store
  const productsFromDB = await productService.getAllProducts({ status: 'active' });
  
  // On applique notre transformation détaillée sur chaque produit
  const productsForStore = productsFromDB.map(transformProductForStore);
  
  return res.status(200).json(new ApiResponse(200, productsForStore));
});

// Le contrôleur pour le détail d'un produit doit aussi utiliser la transformation
const getPublicProductDetails = asyncHandler(async (req, res) => {
    const productFromDB = await productService.getProductById(req.params.id);

    // On s'assure que le produit est visible publiquement
    if (productFromDB.status !== 'active') {
        throw new ApiError(404, 'Product not found');
    }

    const productForStore = transformProductForStore(productFromDB);
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
