import React from 'react';

const FAQs = () => {
    const faqs = [
        {
            question: 'What is Green Cart?',
            answer: 'Green Cart is your go-to platform for fresh groceries, dairy, and daily essentials delivered to your doorstep.',
        },
        {
            question: 'How long does delivery take?',
            answer: 'Most orders are delivered within 24 hours. Delivery slots can be selected at checkout.',
        },
        {
            question: 'Can I cancel my order?',
            answer: 'Yes, you can cancel your order before it is dispatched from our store.',
        },
        {
            question: 'Do you offer same-day delivery?',
            answer: 'Yes, same-day delivery is available for orders placed before 12 PM.',
        },
        {
            question: 'How do I track my order?',
            answer: 'You can track your order from the "My Orders" section after login.',
        },
    ];

    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-semibold mb-6 text-green-700">Frequently Asked Questions</h1>
            <div className="space-y-6">
                {faqs.map((faq, index) => (
                    <div key={index} className="border-b pb-4">
                        <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
                        <p className="text-gray-600 mt-1">{faq.answer}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQs;
