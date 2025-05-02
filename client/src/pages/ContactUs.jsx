import React from 'react';

const ContactUs = () => {
    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-semibold mb-6 text-green-700">Contact Us</h1>

            <p className="text-gray-700 mb-4">Have questions or need help? Reach out to us!</p>

            <div className="space-y-4 text-gray-800">
                <p><strong>Email:</strong> <a href="mailto:support@greencart.com" className="text-green-600">support@greencart.com</a></p>
                <p><strong>Phone:</strong> +91 98765 43210 (Mon–Sat, 9 AM–7 PM)</p>
                <p><strong>Address:</strong> Green Cart HQ, 123 Eco Street, Bengaluru, India</p>
            </div>

            <form className="mt-8 space-y-4">
                <input type="text" placeholder="Your Name" className="border-gray-300 w-full border rounded px-4 py-2" />
                <input type="email" placeholder="Your Email" className="border-gray-300 w-full border rounded px-4 py-2" />
                <textarea placeholder="Your Message" className="border-gray-300 w-full border rounded px-4 py-2 h-32"></textarea>
                <button type="submit" className="bg-green-600 hover:bg-green-700 text-white rounded px-6 py-2">
                    Send Message
                </button>
            </form>
        </div>
    );
};

export default ContactUs;
