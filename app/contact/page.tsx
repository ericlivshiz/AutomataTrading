"use client";

import { Navbar } from "@/components/landing-page/Navbar";
import { useState } from "react";

const Contact = () => {
    const wed = "We'd";
    const well = "we'll";

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log("Form submitted", formData);
        // Add form submission logic here (e.g., send form data to an API)
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-8 flex items-center justify-center">
                <div className="w-full max-w-4xl bg-gray-800 p-8 rounded-lg shadow-lg">
                    <h1 className="text-4xl font-bold text-white text-center mb-8">Contact Us</h1>
                    <p className="text-gray-400 text-center mb-6">{wed} love to hear from you! Please fill out the form below, and {well} get back to you as soon as possible.</p>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-1">
                                <label className="block text-gray-400 mb-2" htmlFor="name">Your Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full p-4 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-gray-400 mb-2" htmlFor="email">Your Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full p-4 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2" htmlFor="message">Your Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                className="w-full p-4 h-40 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Write your message here..."
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-md transition duration-300">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Contact;
