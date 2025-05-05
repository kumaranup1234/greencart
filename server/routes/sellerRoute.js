import express from 'express';
import { isSellerAuth, sellerLogin, sellerLogout, getAllSummary } from '../controllers/sellerController.js';
import authSeller from '../middlewares/authSeller.js';
import {loginLimiter} from "../rateLimit/loginLimiter.js";

const sellerRouter = express.Router();

sellerRouter.post('/login', loginLimiter, sellerLogin);
sellerRouter.get('/is-auth', authSeller, isSellerAuth);
sellerRouter.post('/logout', sellerLogout);
sellerRouter.get('/analytics/summary', authSeller, getAllSummary);

export default sellerRouter;