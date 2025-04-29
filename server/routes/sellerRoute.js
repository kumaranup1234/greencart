import express from 'express';
import { isSellerAuth, sellerLogin, sellerLogout, getAllSummary } from '../controllers/sellerController.js';
import authSeller from '../middlewares/authSeller.js';

const sellerRouter = express.Router();

sellerRouter.post('/login', sellerLogin);
sellerRouter.get('/is-auth', authSeller, isSellerAuth);
sellerRouter.get('/logout', sellerLogout);
sellerRouter.get('/analytics/summary', authSeller, getAllSummary);

export default sellerRouter;