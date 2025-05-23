import { v2 as cloudinary } from "cloudinary"
import Product from "../models/Product.js"
import Rating from "../models/Rating.js";
import Order from "../models/Order.js";
import fs from "fs";
import { GoogleGenerativeAI } from '@google/generative-ai';

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

// Get singleProduct:/api/product/id
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

// Change Product inStock: /api/product/stock
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

// Generate AI Description POST: /generate-description
export const generateAiDescription = async (req, res) => {
    try {
        const modelName = 'gemini-2.0-flash';
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: modelName });
        const { productName, category } = req.body;

        if (!productName || !category) {
            return res.status(400).json({ error: 'Product name and category are required.' });
        }

        const prompt = `Generate a short and practical 3-point product description for "${productName}" in the "${category}" category.
        Each point should:
        - Be clear and simple.
        - Mention either a key benefit, nutrient, or common use case.
        - Avoid heavy or generic marketing words.
        - Be concise (max 8–10 words).
        - Format each point on a new line.
        Do not include stars, numbers, or quotes.`;

        const result = await model.generateContent(prompt);
        const generatedText = result.response?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (generatedText) {
            // create the array
            const descriptionArray = generatedText.split('\n').map(line => line.trim()).filter(line => line !== '');
            console.log('Generated description:', descriptionArray);
            res.json({ success: true, description: descriptionArray });
        } else {
            res.status(500).json({ error: 'Failed to generate description.' });
        }
    } catch (error) {
        console.error('Error generating description:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}


// Add, Edit, Update the offer Post /:productId/offer
export const updateProductOffer = async (req, res) => {
    try {
        const { productId } = req.params;
        const { newOfferPrice } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        if (newOfferPrice > product.price || newOfferPrice < 0) {
            return res.status(400).json({ success: false, message: 'Offer price can exceed the product price or below then that' });
        }

        product.offerPrice = newOfferPrice;

        await product.save();
        res.json({ success: true, message: 'Offer updated successfully' });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

// image search
// multer.single('image')
export const imageSearchResults = async (req, res) => {
    try {
        const modelName = 'gemini-2.0-flash';
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: modelName });

        const imageFile = req.file;
        if (!imageFile) {
            return res.status(400).json({ success: false, message: "No image file uploaded." });
        }

        const imageData = await fs.promises.readFile(imageFile.path);
        const base64ImageData = imageData.toString('base64');
        const mimeType = imageFile.mimetype;

        const prompt = "Give a short and specific label or name for the main item in this image. Avoid long descriptions. Example: 'Chocolate', 'Amul Chocolate', 'Milk Carton'.";

        const result = await model.generateContent({
            contents: [
                {
                    parts: [
                        {
                            inlineData: {
                                mimeType,
                                data: base64ImageData,
                            },
                        },
                        { text: prompt },
                    ],
                },
            ],
        });

        const textResponse = result.response.text();

        res.status(200).json({ success: true, description: textResponse });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};