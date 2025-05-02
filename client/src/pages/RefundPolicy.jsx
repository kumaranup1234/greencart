import React from 'react';

const RefundPolicy = () => {
    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-semibold mb-6 text-green-700">Refund Policy</h1>
            <p className="text-gray-700 mb-4">We care about your satisfaction. Here’s our transparent refund policy:</p>

            <ul className="list-disc list-inside space-y-3 text-gray-800">
                <li>Refunds are applicable within <strong>7 days</strong> of product delivery.</li>
                <li>Items must be unused, in original packaging, and with proof of purchase.</li>
                <li>Refunds will be credited to your original payment method within 5–7 business days after approval.</li>
                <li>Perishable goods (vegetables, fruits, dairy) are <strong>non-refundable</strong>.</li>
                <li>For refund requests, contact us at <span className="text-green-600 font-medium">support@greencart.com</span></li>
            </ul>
        </div>
    );
};

export default RefundPolicy;
