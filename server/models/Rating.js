import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
    productId: {type: String, required: true},
    userId: {type: String, required: true},
    rating: {type: Number, required: true},
    comment: {type: String, required: true},
},  {timestamps: true})

const Rating = mongoose.models.rating || mongoose.model('rating', ratingSchema);

export default Rating;