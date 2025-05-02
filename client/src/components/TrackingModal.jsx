import React from 'react';

const TrackingModal = ({ isOpen, onClose, order, selectedItem }) => {
    if (!isOpen) return null;

    const orderStatuses = ["Order Placed", "Processing", "Packed", "Out for Delivery", "Delivered", "Cancelled"];

    const currentStatusIndex = orderStatuses.indexOf(order.status);

    return (
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg no-scrollbar max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gray-300">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-medium">Track Order</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                        <div className="flex flex-col md:flex-row md:justify-between mb-4">
                            <div>
                                <p className="text-gray-500">Order ID:</p>
                                <p className="font-medium">{order._id}</p>
                            </div>
                            <div className="mt-2 md:mt-0">
                                <p className="text-gray-500">Date Ordered:</p>
                                <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div className="mt-2 md:mt-0">
                                <p className="text-gray-500">Payment Method:</p>
                                <p className="font-medium">{order.paymentType}</p>
                            </div>
                        </div>

                        {/* Selected Item Info */}
                        {selectedItem && (
                            <div className="flex items-center mt-4 border-t pt-4 border-gray-200">
                                <div className="bg-primary/10 p-3 rounded-lg">
                                    <img src={selectedItem.product.image[0]} alt="" className="w-16 h-16 object-contain" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="font-medium">{selectedItem.product.name}</h3>
                                    <p className="text-gray-500">Quantity: {selectedItem.quantity || "1"}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Tracking Timeline */}
                    <div className="mb-6">
                        <h3 className="text-lg font-medium mb-4">Shipping Status</h3>

                        <div className="relative">
                            {order.status === "Cancelled" ? (
                                <>
                                    {/* Red progress bar for canceled orders */}
                                    <div className="absolute left-6 top-6 ml-px h-[calc(100%-48px)] w-1 bg-gray-200">
                                        <div className="absolute top-0 left-0 w-full bg-red-500 h-full"></div>
                                    </div>

                                    {/* Only show Order Placed and Canceled status for canceled orders */}
                                    {["Order Placed", "Cancelled"].map((status, index) => {
                                        const isFirst = index === 0;
                                        const isLast = index === 1;
                                        let statusDate = null;

                                        if (isFirst) {
                                            statusDate = new Date(order.createdAt).toLocaleDateString();
                                        }

                                        return (
                                            <div key={index} className="relative flex items-start mb-8 last:mb-0">
                                                <div className={`flex-shrink-0 h-12 w-12 rounded-full flex items-center justify-center border-2 ${
                                                    isLast ? "border-red-500 bg-red-500" : "border-primary bg-primary"
                                                }`}>
                                                    {isLast ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                        </svg>
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    )}
                                                </div>

                                                <div className="ml-6">
                                                    <p className={`font-medium ${isLast ? "text-red-500" : "text-primary"}`}>{status}</p>
                                                    {statusDate && <p className="text-sm text-gray-500">{statusDate}</p>}
                                                    {isLast && <p className="text-sm text-red-500">Your order has been cancelled</p>}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </>
                            ) : (
                                <>
                                    <div className="absolute left-5 top-6 ml-px h-[calc(100%-48px)] w-1 bg-gray-200">
                                        <div
                                            className="absolute top-0 left-0 w-full bg-primary"
                                            style={{
                                                height: `${currentStatusIndex >= 0 ? (currentStatusIndex / (orderStatuses.length - 2)) * 100 : 0}%`
                                            }}
                                        ></div>
                                    </div>

                                    {orderStatuses.filter(status => status !== "Cancelled").map((status, index) => {
                                        const isCompleted = index <= currentStatusIndex;
                                        const isActive = index === currentStatusIndex && status !== "Delivered";
                                        const isDelivered = status === "Delivered" && order.status === "Delivered";
                                        let statusDate = null;

                                        if (status === "Order Placed") {
                                            statusDate = new Date(order.createdAt).toLocaleDateString();
                                        } else if (status === "Delivered" && order.deliveredAt) {
                                            statusDate = new Date(order.deliveredAt).toLocaleDateString();
                                        }

                                        return (
                                            <div key={index} className="relative flex items-start mb-8 last:mb-0">
                                                <div className={`flex-shrink-0 h-12 w-12 rounded-full flex items-center justify-center border-2 ${
                                                    isActive ? "border-primary bg-primary/10" :
                                                        isCompleted || isDelivered ? "border-primary bg-primary" :
                                                            "border-gray-200 bg-white"
                                                }`}>
                                                    {(isCompleted && !isActive) || isDelivered ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                        </svg>
                                                    ) : isActive ? (
                                                        <div className="h-4 w-4 rounded-full bg-primary"></div>
                                                    ) : (
                                                        <div className="h-4 w-4 rounded-full bg-gray-200"></div>
                                                    )}
                                                </div>

                                                <div className="ml-6">
                                                    <p className={`font-medium ${isCompleted ? "text-primary" : "text-gray-500"}`}>{status}</p>
                                                    {statusDate && <p className="text-sm text-gray-500">{statusDate}</p>}
                                                    {status === "Packed" && isCompleted && (
                                                        <p className="text-sm text-gray-500">Your order has been packed and is ready for shipment</p>
                                                    )}
                                                    {status === "Out for Delivery" && isCompleted && (
                                                        <p className="text-sm text-gray-500">Your order is out for delivery in your area</p>
                                                    )}
                                                    {status === "Processing" && isCompleted && (
                                                        <p className="text-sm text-gray-500">We are processing your order</p>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </>
                            )}
                        </div>
                    </div>

                    {order.status !== "Delivered" && order.status !== "Cancelled" && (
                        <div className="bg-blue-50 p-4 rounded-lg text-blue-700">
                            <p className="font-medium">Estimated Delivery Date: {getEstimatedDeliveryDate(order.createdAt)}</p>
                            <p className="text-sm">*Estimated date may vary based on shipping conditions</p>
                            <p className="text-xs">*We usually deliver within the day</p>
                        </div>
                    )}

                    {order.status === "Cancelled" && (
                        <div className="bg-red-50 p-4 rounded-lg text-red-700">
                            <p className="font-medium">Order Cancelled</p>
                            <p className="text-sm">This order has been cancelled and will not be processed further</p>
                        </div>
                    )}

                    <div className="mt-6 flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const getEstimatedDeliveryDate = (orderDate) => {
    const date = new Date(orderDate);
    date.setDate(date.getDate() + 1);
    return date.toLocaleDateString();
};

export default TrackingModal;