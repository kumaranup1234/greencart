import {useState} from "react"
import axios from "axios";
import toast from "react-hot-toast";
import {useAppContext} from "../context/AppContext.jsx";

export default function OfferModal({ modal, setOpenModal, product}) {
    const [newPrice, setNewPrice] = useState(product.offerPrice || 0);
    const {currency} = useAppContext()


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPrice < 0 || newPrice > product.price) {
            toast.success("Please enter a valid price");
            return;
        }

        try {
            toast.loading("Updating offer Price");
            const response = await axios.post(`/api/product/${product._id}/offer`, {
                newOfferPrice: newPrice
            });
            console.log(response);
            if (response.data.success) {
                toast.dismiss();
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
            setOpenModal(false);
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div>
            {modal && (
                <div className="fixed bg-opacity-30 backdrop-blur-sm inset-0 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 animate-fade-in border border-gray-300">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">Manage Offer for {product.name}</h2>
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
                            <div className="flex items-center space-x-4">
                                <img src={product.image[0]} alt="Product" className="w-16 h-16 object-cover rounded-md" />
                                <div>
                                    <h3 className="text-gray-700 font-semibold">{product.name}</h3>
                                    <p className="text-gray-500">{product.category}</p>
                                    <p className="text-gray-500">Actual Price: {currency}{product.price}</p>
                                    <p className="text-gray-500">Current Offer Price: {currency}{product.offerPrice}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-600 mb-2">New Offer Price</label>
                            <input
                                type="number"
                                value={newPrice}
                                onChange={(e) => {
                                    setNewPrice(e.target.value);
                                }}
                                min="0"
                                max="99"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter offer percentage"
                            />
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
                                disabled={newPrice === 0}
                                className={`px-4 py-2 rounded-md text-white ${newPrice > 0 ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-400 cursor-not-allowed"} transition-colors`}
                            >
                                {existingOffer ? "Update Offer" : "Add Offer"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
