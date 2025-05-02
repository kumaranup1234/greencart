import React from 'react';

const PaymentMethods = () => {
    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-semibold mb-6 text-green-700">Payment Methods</h1>
            <p className="text-gray-700 mb-4">We offer multiple secure and convenient payment options to make your shopping experience seamless.</p>

            <ul className="list-disc list-inside space-y-2 text-gray-800">
                <li><strong>Credit/Debit Cards:</strong> Visa, MasterCard, RuPay, American Express</li>
                <li><strong>UPI:</strong> PhonePe, Google Pay, Paytm, BHIM</li>
                <li><strong>Net Banking:</strong> Available for all major Indian banks</li>
                <li><strong>Cash on Delivery (COD):</strong> Available on selected items</li>
                <li><strong>Wallets:</strong> Paytm Wallet, Amazon Pay</li>
            </ul>
        </div>
    );
};

export default PaymentMethods;
