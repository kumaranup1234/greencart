import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import RatingModal from "../components/RatingModal.jsx";
import TrackingModal from "../components/TrackingModal.jsx";

const MyOrders = () => {

    const [myOrders, setMyOrders] = useState([])
    const {currency, axios, user} = useAppContext()
    const [selectedProductId, setSelectedProductId] = useState(null)
    const [ratingModal, setRatingModal] = useState(false)
    const [trackingModal, setTrackingModal] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [selectedItem, setSelectedItem] = useState(null)
    const [existingReview, setExistingReview] = useState(null)

    const fetchMyOrders = async ()=>{
        try {
            const { data } = await axios.get('/api/order/user')
            console.log(data);
            if(data.success){
                setMyOrders(data.orders)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleRatingModalOpen = (item) => {
        const existingReview = {
            rating: item.product.userRating,
            comment: item.product.userComment
        };
        setSelectedProductId(item.product._id);
        setRatingModal(true);
        setExistingReview(existingReview);
    }

    const handleTrackOrder = (order, item) => {
        setSelectedOrder(order);
        setSelectedItem(item);
        setTrackingModal(true);
    }

    useEffect(() => {
        if(user){
            fetchMyOrders()
        }
    },[user])

    return (
        <div className='mt-16 pb-16'>
            <div className='flex flex-col items-end w-max mb-8'>
                <p className='text-2xl font-medium uppercase'>My orders</p>
                <div className='w-16 h-0.5 bg-primary rounded-full'></div>
            </div>
            {myOrders.map((order, index)=>(
                <div key={index} className='border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl'>
                    <p className='flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col'>
                        <span>OrderId : {order._id}</span>
                        <span>Payment : {order.paymentType}</span>
                        <span>Total Amount : {currency}{order.amount}</span>
                    </p>
                    {order.items.map((item, index)=>(
                        <div key={index}
                             className={`relative bg-white text-gray-500/70 ${
                                 order.items.length !== index + 1 && "border-b"
                             } border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 md:gap-16 w-full max-w-4xl`}>

                            <div className='flex items-center mb-4 md:mb-0'>
                                <div className='bg-primary/10 p-4 rounded-lg'>
                                    <img src={item.product.image[0]} alt="" className='w-16 h-16' />
                                </div>
                                <div className='ml-4'>
                                    <h2 className='text-xl font-medium text-gray-800'>{item.product.name}</h2>
                                    <p>Category: {item.product.category}</p>
                                </div>
                            </div>

                            <div className='flex flex-col justify-center md:ml-8 mb-4 md:mb-0'>
                                <p>Quantity: {item.quantity || "1"}</p>
                                <p>Status: {order.status}</p>
                                {order.status === 'Delivered' && <p>Delivered At: {new Date(order.deliveredAt).toLocaleDateString()}</p>}
                                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                                <div className="flex flex-col gap-2 mt-2">
                                    <button
                                        className="text-blue-500 font-medium hover:text-blue-700 transition-colors text-left cursor-pointer"
                                        onClick={() => handleTrackOrder(order, item)}
                                    >
                                        Track Order
                                    </button>

                                    {order.status === 'Delivered' && (
                                        <button
                                            className="text-blue-500 hover:text-blue-700 transition-colors text-left cursor-pointer"
                                            onClick={() => handleRatingModalOpen(item)}
                                        >
                                            Rate & Review Product
                                        </button>
                                    )}
                                </div>
                            </div>
                            <p className='text-primary text-lg font-medium'>
                                Amount: {currency}{item.product.offerPrice * item.quantity}
                            </p>

                        </div>
                    ))}
                </div>
            ))}
            {ratingModal && <RatingModal modal={ratingModal} setOpenModal={setRatingModal} productId={selectedProductId} existingReview={existingReview} setExistingReview={setExistingReview}/>}
            <TrackingModal
                isOpen={trackingModal}
                onClose={() => setTrackingModal(false)}
                order={selectedOrder}
                selectedItem={selectedItem}
            />
        </div>
    )
}

export default MyOrders