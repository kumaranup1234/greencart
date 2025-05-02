"use client"

import { useState } from "react"
import axios from "axios";
import toast from "react-hot-toast";

export default function RatingModal({ modal, setOpenModal, productId, existingReview}) {
    const [rating, setRating] = useState(existingReview?.rating || 0)
    const [hoveredRating, setHoveredRating] = useState(0)
    const [description, setDescription] = useState(existingReview?.comment || " ")

    const handleStarClick = (selectedRating) => {
        setRating(selectedRating)
    }

    const handleStarHover = (hoveredRating) => {
        setHoveredRating(hoveredRating)
    }

    const handleStarLeave = () => {
        setHoveredRating(0)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(`/api/product/${productId}/rate`, {rating, comment: description})
            console.log(response)
            if(response.data.success){
                toast.success(response.data.message)
            }else{
                toast.error(response.data.message)
            }
            setOpenModal(false)
            setRating(0)
            setDescription("")
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div>
            {modal && (
                <div className="fixed bg-opacity-30 backdrop-blur-sm inset-0 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 animate-fade-in border border-gray-300">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">Rate Your Experience</h2>
                            <button onClick={() => setOpenModal(false)} className="text-gray-500 hover:text-gray-700">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="mb-6">
                            <p className="text-gray-600 mb-2">How would you rate your experience?</p>
                            <div className="flex justify-center space-x-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onClick={() => handleStarClick(star)}
                                        onMouseEnter={() => handleStarHover(star)}
                                        onMouseLeave={handleStarLeave}
                                        className="focus:outline-none"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={`h-8 w-8 transition-colors ${
                                                star <= (hoveredRating || rating)
                                                    ? "text-yellow-400 fill-yellow-400"
                                                    : "text-gray-300 fill-gray-300"
                                            }`}
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    </button>
                                ))}
                            </div>
                            <p className="text-center mt-2 text-sm text-gray-600">
                                {rating > 0 ? `You have rated ${rating} star${rating > 1 ? "s" : ""}` : "Select a rating"}
                            </p>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="description" className="block text-gray-600 mb-2">
                                Tell us about your experience (optional)
                            </label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                rows={4}
                                placeholder="Write your feedback here..."
                            ></textarea>
                        </div>

                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setOpenModal(false)}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={rating === 0}
                                className={`px-4 py-2 rounded-md text-white ${
                                    rating > 0 ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-400 cursor-not-allowed"
                                } transition-colors`}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
