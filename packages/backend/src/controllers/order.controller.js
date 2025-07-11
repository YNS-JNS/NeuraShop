import { orderService } from '../services/order.service.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const addOrderItems = asyncHandler(async (req, res) => {
  // req.user est disponible grâce au middleware verifyJWT
  const order = await orderService.createOrder(req.user._id, req.body);
  res.status(201).json(new ApiResponse(201, order, 'Order created successfully'));
});

export const orderController = {
  addOrderItems,
};
