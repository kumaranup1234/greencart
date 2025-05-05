import express from 'express';
import { isAuth, login, logout, register } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';
import {loginLimiter} from "../rateLimit/loginLimiter.js";

const userRouter = express.Router();

userRouter.post('/register', register)
userRouter.post('/login', loginLimiter, login)
userRouter.get('/is-auth', authUser, isAuth)
userRouter.post('/logout', authUser, logout)

export default userRouter