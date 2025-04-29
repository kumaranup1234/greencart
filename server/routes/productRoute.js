import express from 'express';
import { upload } from '../configs/multer.js';
import authSeller from '../middlewares/authSeller.js';
import { addProduct, changeStock, productById, productList, addRating, updateRating, getProductReviews } from '../controllers/productController.js';
import authUser from "../middlewares/authUser.js";

const productRouter = express.Router();

productRouter.post('/add', upload.array(["images"]), authSeller, addProduct);
productRouter.get('/list', productList)
productRouter.get('/id', productById)
productRouter.post('/stock', authSeller, changeStock)
productRouter.post('/:id/rate', authUser, addRating);
productRouter.put('/:id/rate', authUser, updateRating);
productRouter.get('/:id/reviews', getProductReviews);

export default productRouter;