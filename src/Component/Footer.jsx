// components/Footer.jsx
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
    return (
        <motion.footer 
            className="bg-gray-900 text-white py-10 px-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
        >
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Company Info */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <h2 className="text-2xl font-bold mb-4">Vidya Industries</h2>
                    <p>Leading the way in corrugated box solutions.</p>
                </motion.div>

                {/* Help Section */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <h3 className="text-xl font-semibold mb-4">Help</h3>
                    <ul className="space-y-2">
                        <li><Link to="/faqs" className="hover:text-blue-400">FAQs</Link></li>
                        <li><Link to="/how-it-works" className="hover:text-blue-400">How It Works</Link></li>
                        <li><Link to="/privacy-policy" className="hover:text-blue-400">Privacy Policy</Link></li>
                        <li><Link to="/payment-policy" className="hover:text-blue-400">Payment Policy</Link></li>
                    </ul>
                </motion.div>

                {/* Social Links */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                >
                    <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
                    <div className="flex space-x-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><Facebook size={24} /></a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><Instagram size={24} /></a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><Twitter size={24} /></a>
                    </div>
                </motion.div>
            </div>

            {/* Copyright Section */}
            <motion.div 
                className="text-center mt-10 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
            >
                &copy; {new Date().getFullYear()} Vidya Industries. All rights reserved.
            </motion.div>
        </motion.footer>
    );
}
