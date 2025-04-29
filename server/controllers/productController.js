import { v2 as cloudinary } from "cloudinary"
import Product from "../models/Product.js"
import Rating from "../models/Rating.js";
import Order from "../models/Order.js";
import mongoose from "mongoose";

// Add Product : /api/product/add
export const addProduct = async (req, res)=>{
    try {
        let productData = JSON.parse(req.body.productData)

        const images = req.files

        let imagesUrl = await Promise.all(
            images.map(async (item)=>{
                let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'});
                return result.secure_url
            })
        )

        await Product.create({...productData, image: imagesUrl})

        res.json({success: true, message: "Product Added"})

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// Get Product : /api/product/list
export const productList = async (req, res)=>{
    try {
        const products = await Product.find({})
        res.json({success: true, products})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// Get single Product : /api/product/id
export const productById = async (req, res)=>{
    try {
        const { id } = req.body
        const product = await Product.findById(id)
        res.json({success: true, product})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// Change Product inStock : /api/product/stock
export const changeStock = async (req, res)=>{
    try {
        const { id, inStock } = req.body
        await Product.findByIdAndUpdate(id, {inStock})
        res.json({success: true, message: "Stock Updated"})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// Add Rating /:id/rate
export const addRating = async (req, res)=>{
    try {
        const { rating, comment, userId } = req.body;
        const { id } = req.params;
        const numericRating = Number(rating);
        if (numericRating < 1 || numericRating > 5) {
            return res.status(400).json({ success: false, message: "Rating must be between 1 and 5" });
        }

        const deliveredOrder = await Order.findOne({
            userId: userId,
            "items.product":id,
            status: "Delivered",
        });

        if (!deliveredOrder) {
            return res.status(400).json({ success: false, message: "You can only rate products after delivery." });
        }

        const existingRating = await Rating.findOne({ productId: id, userId });

        if (existingRating) {
            return res.status(400).json({ success: false, message: "You have already rated this product." });
        }
        const addRating = {
            rating : numericRating,
            userId,
            productId : id,
            comment : comment
        }

        await Rating.create(addRating)
        const product = await Product.findById(id);

        const newCount = product.ratings.count + 1;
        const newAverage = ((product.ratings.average * product.ratings.count) + numericRating) / newCount;

        product.ratings.count = newCount;
        product.ratings.average = newAverage;
        await product.save();
        res.json({success: true, message: "Rating Added"})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// Update Rating /:id/rate
export const updateRating = async (req, res)=>{
    try {
        const { rating, comment } = req.body;
        const { id } = req.params;
        const numericRating = Number(rating);
        if (numericRating < 1 || numericRating > 5) {
            return res.status(400).json({ success: false, message: "Rating must be between 1 and 5" });
        }

        const ratingDoc = await Rating.findOne({ productId: id, userId: req.user._id });

        if (!ratingDoc) {
            return res.status(404).json({ success: false, message: "No existing rating found" });
        }

        const oldRating = ratingDoc.rating;

        ratingDoc.rating = numericRating;
        if (comment !== undefined) {
            ratingDoc.comment = comment;
        }
        await ratingDoc.save();

        const product = await Product.findById(id);
        const count = product.ratings.count;
        const newAverage = ((product.ratings.average * count) - oldRating + numericRating) / count;
        product.ratings.average = newAverage;
        await product.save();

        res.json({ success: true, message: "Rating updated successfully" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// Get All reviews /:id/reviews
export const getProductReviews = async (req, res)=>{
    try {
        const { id } = req.params;
        const reviews = await Rating.find({productId: id})
        res.json({success: true, reviews})
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}