import express from 'express';
import authUser from '../middlewares/authUser.js';
import { getAllOrders, getUserOrders, placeOrderCOD, placeOrderStripe, updateOrderStatus } from '../controllers/orderController.js';
import authSeller from '../middlewares/authSeller.js';
import {orderLimiter} from "../rateLimit/orderLimiter.js";

const orderRouter = express.Router();

orderRouter.post('/cod', orderLimiter, authUser, placeOrderCOD)
orderRouter.get('/user', authUser, getUserOrders)
orderRouter.get('/seller', authSeller, getAllOrders)
orderRouter.put('/seller/:id/status', authSeller, updateOrderStatus)
orderRouter.post('/stripe', orderLimiter, authUser, placeOrderStripe)

export default orderRouter;