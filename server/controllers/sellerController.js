import jwt from 'jsonwebtoken';
import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import {getTotalRevenue} from "../analyticsUtils/totalRevenue.js";
import {topSellingProduct} from "../analyticsUtils/topSellingProduct.js";
import {getRevenueTrend} from "../analyticsUtils/revenueOverTime.js";
import {getOrdersPerDay} from "../analyticsUtils/ordersPerDay.js";
import {getPaymentType} from "../analyticsUtils/paymentType.js";

// Login Seller : /api/seller/login
export const sellerLogin = async (req, res) =>{
    try {
        const { email, password } = req.body;

        if(password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL){
            const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: '7d'});

            res.cookie('sellerToken', token, {
                httpOnly: true, 
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            return res.json({ success: true, message: "Logged In" });
        }else{
            return res.json({ success: false, message: "Invalid Credentials" });
        }
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// Seller isAuth : /api/seller/is-auth
export const isSellerAuth = async (req, res)=>{
    try {
        return res.json({success: true})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// Logout Seller : /api/seller/logout

export const sellerLogout = async (req, res)=> {
    try {
        res.clearCookie('sellerToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });

        return res.json({ success: true, message: "Logged Out" })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// Get Analytics Summary : /api/seller/analytics
export const getAllSummary = async (req, res)=>{
    try {
        const [
            totalUsers,
            totalProducts,
            totalOrders,
            topSellingProducts,
            revenueData,
            revenueTrend,
            ordersPerDay,
            paymentTypeCount,
        ] = await Promise.all([
            User.countDocuments(),
            Product.countDocuments(),
            Order.countDocuments(),
            topSellingProduct(),
            getTotalRevenue(),
            getRevenueTrend(),
            getOrdersPerDay(),
            getPaymentType(),
        ]);
        return res.json({success: true, analytics: {
                totalUsers,
                totalProducts,
                totalOrders,
                topSellingProducts,
                revenueData,
                revenueTrend,
                ordersPerDay,
                paymentTypeCount,
        }})

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}