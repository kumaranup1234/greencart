import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {type: String, required: true },
    description: {type: Array, required: true},
    price: {type: Number, required: true },
    offerPrice: {type: Number, required: true },
    image: {type: Array, required: true },
    category: {type: String, required: true },
    inStock: {type: Boolean, default: true },
    ratings: {
        average: { type: Number, default: 0 },
        count: { type: Number, default: 0 }
    },
    offer: {
        isActive: { type: Boolean, default: false },
        percentage: { type: Number, default: 0 },
        validTill: { type: Date },
    },
}, { timestamps: true})

const Product = mongoose.models.product || mongoose.model('product', productSchema)

export default Product