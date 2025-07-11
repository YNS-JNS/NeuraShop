import Stripe from 'stripe';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import Order from '../models/Order.model.js';

// Initialiser Stripe avec la clé secrète
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * Crée une session de paiement Stripe Checkout.
 */
const createCheckoutSession = asyncHandler(async (req, res) => {
  const { orderId } = req.body;

  if (!orderId) {
    throw new ApiError(400, 'Order ID is required.');
  }

  // 1. Récupérer la commande de notre base de données
  const order = await Order.findById(orderId);
  if (!order) {
    throw new ApiError(404, 'Order not found.');
  }

  // 2. Transformer nos items de commande au format attendu par Stripe
  const line_items = order.orderItems.map((item) => ({
    price_data: {
      currency: 'eur', // ou 'usd', etc.
      product_data: {
        name: item.name,
        images: [item.image],
      },
      unit_amount: Math.round(item.price * 100), // Stripe attend le prix en centimes
    },
    quantity: item.quantity,
  }));

  // 3. Créer la session de paiement sur Stripe
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items,
    mode: 'payment',
    // URLs de redirection après le paiement
    success_url: `${process.env.FRONTEND_URL}/order/${order._id}?success=true`,
    cancel_url: `${process.env.FRONTEND_URL}/order/${order._id}?canceled=true`,
    // On passe l'ID de notre commande dans les métadonnées pour le retrouver dans le webhook
    metadata: {
      orderId: order._id.toString(),
    },
  });

  // 4. Mettre à jour notre commande avec l'ID de la session de paiement Stripe
  order.paymentDetails.paymentId = session.id;
  await order.save();

  // 5. Envoyer l'URL de la session de paiement au client
  res.status(200).json(new ApiResponse(200, { url: session.url }, 'Checkout session created'));
});

export const paymentController = {
  createCheckoutSession,
};
