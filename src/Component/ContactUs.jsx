import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import backgroundImage from '../images/contact-bg.webp';
import { sendContactMessage } from '../Services/HomeService';

export default function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        email: '',
        phone: '',
        message: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Field validation
        const requiredFields = ['name', 'company', 'email', 'phone'];
        let hasError = false;

        requiredFields.forEach((field) => {
            if (!formData[field].trim()) {
                toast.error(`${field.charAt(0).toUpperCase() + field.slice(1)} is required.`);
                hasError = true;
            }
        });

        if (hasError) return; // Prevent submission if validation fails

        setIsLoading(true); // Start loading animation

        try {
            const result = await sendContactMessage(formData.name, formData.company, formData.email, formData.phone, formData.message);
            console.log(result)
            if (result === "success") {
                toast.success('Message sent successfully!');
                setFormData({ name: '', company: '', email: '', phone: '', message: '' });
            } else {
                toast.error('Failed to send message. Please try again.');
            }
        } catch (error) {
            toast.error('An error occurred. Please try again later.');
        } finally {
            setIsLoading(false); // Stop loading animation
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 text-center relative">
            <ToastContainer/>
            <motion.div 
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-30"
                style={{ backgroundImage: `url(${backgroundImage})` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ duration: 1.5 }}
            />

            <section id="contact" className="py-20 px-4 relative">
                <motion.h1
                    className="text-5xl font-bold mb-8"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Contact Us
                </motion.h1>
                <motion.p
                    className="text-lg text-gray-600 max-w-3xl mx-auto mb-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    Reach out to us for inquiries, support, or collaboration. We're here to help!
                </motion.p>

                <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                    <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
                        <motion.input 
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your Name"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            whileFocus={{ scale: 1.05 }}
                        />
                        <motion.input 
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Company Name"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            whileFocus={{ scale: 1.05 }}
                        />
                        <motion.input 
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Your Email"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            whileFocus={{ scale: 1.05 }}
                        />
                        <motion.input 
                            type="number"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            whileFocus={{ scale: 1.05 }}
                        />
                        <motion.textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Your Message"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="5"
                            whileFocus={{ scale: 1.05 }}
                        />
                        <motion.button
                            type="submit"
                            className={`w-full py-3 rounded-lg text-white shadow-md flex items-center justify-center gap-2 ${
                                isLoading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-blue-500 hover:bg-blue-600'
                            }`}
                            whileHover={{ scale: !isLoading ? 1.1 : 1 }}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin h-5 w-5 border-4 border-white border-t-transparent rounded-full"></div>
                                    Sending...
                                </>
                            ) : (
                                'Send Message'
                            )}
                        </motion.button>
                    </form>
                </div>
            </section>
        </div>
    );
}
