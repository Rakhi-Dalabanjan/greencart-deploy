import React from 'react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10 lg:px-24 xl:px-32 text-gray-800">
      <h1 className="text-3xl font-semibold mb-6 text-primary">Contact Us</h1>

      <p className="mb-8 max-w-2xl text-gray-600">
        Have a question, suggestion, or need help with your order? We’re here to help! Feel free to reach out using the form below, or get in touch via our contact details.
      </p>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <form className="space-y-5 bg-white p-6 shadow rounded-lg">
          <div>
            <label className="block mb-1 font-medium">Your Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 px-4 py-2 rounded outline-none focus:border-primary"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email Address</label>
            <input
              type="email"
              className="w-full border border-gray-300 px-4 py-2 rounded outline-none focus:border-primary"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Message</label>
            <textarea
              rows="4"
              className="w-full border border-gray-300 px-4 py-2 rounded outline-none focus:border-primary"
              placeholder="Your message"
              required
            ></textarea>
          </div>
          <button type="submit" className="bg-primary hover:bg-primary-dull text-white py-2 px-6 rounded transition">
            Send Message
          </button>
        </form>

        {/* Contact Details */}
        <div className="bg-white p-6 shadow rounded-lg space-y-4">
          <h2 className="text-xl font-semibold mb-3">Get in Touch</h2>
          <p><strong>Email:</strong> support@greencart.com</p>
          <p><strong>Phone:</strong> +91 89717 78370</p>
          <p><strong>Address:</strong> GreenCart HQ, 123 Fresh Avenue, Bangalore, India</p>
          <div className="mt-6">
            <h3 className="font-medium mb-2">Follow us:</h3>
            <div className="flex gap-4 text-primary">
              <a href="#" className="hover:underline">Instagram</a>
              <a href="#" className="hover:underline">Twitter</a>
              <a href="#" className="hover:underline">Facebook</a>
              <a href="#" className="hover:underline">YouTube</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
