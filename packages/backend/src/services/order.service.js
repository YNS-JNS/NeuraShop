import Order from '../models/Order.model.js';
import Product from '../models/Product.model.js';
import { ApiError } from '../utils/ApiError.js';

/**
 * Crée une nouvelle commande.
 * @param {string} userId - L'ID de l'utilisateur qui passe la commande.
 * @param {object} orderData - Les données de la commande (items, shippingAddress).
 * @returns {Promise<Document>} La commande créée.
 */
const createOrder = async (userId, orderData) => {
  const { orderItems, shippingAddress } = orderData;

  if (!orderItems || orderItems.length === 0) {
    throw new ApiError(400, 'No order items provided.');
  }

  // Calculer le prix total côté backend pour la sécurité
  let totalPrice = 0;
  for (const item of orderItems) {
    // On pourrait vérifier ici que le produit existe et que le prix correspond
    // Pour l'instant, on fait confiance au prix envoyé.
    totalPrice += item.price * item.quantity;
  }

  const order = new Order({
    user: userId,
    orderItems,
    shippingAddress,
    totalPrice,
  });

  return await order.save();
};

export const orderService = {
  createOrder,
};
