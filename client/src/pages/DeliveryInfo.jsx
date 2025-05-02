import React from 'react';

const DeliveryInfo = () => {
    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-semibold mb-6 text-green-700">Delivery Information</h1>

            <div className="space-y-4 text-gray-700">
                <p><strong>Delivery Timings:</strong> We deliver every day from <span className="font-medium">7 AM to 9 PM</span>.</p>
                <p><strong>Same-Day Delivery:</strong> Available for orders placed before <span className="font-medium">12 PM</span>.</p>
                <p><strong>Delivery Charges:</strong> Free delivery on orders above ₹499. A nominal ₹30 charge applies otherwise.</p>
                <p><strong>Service Areas:</strong> We currently deliver in all over Jharkhand.</p>
                <p><strong>No Deliveries on:</strong> National holidays and extreme weather days (updates via SMS/Email).</p>
                <p>Track your real-time order status from the <span className="text-green-600 font-medium">Track Your Order</span> page.</p>
            </div>
        </div>
    );
};

export default DeliveryInfo;
