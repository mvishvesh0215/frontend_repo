// components/HomePage.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroImg from '../images/hero.webp';

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Hero Section */}
            <section id="home" className="h-screen bg-gradient-to-r from-blue-500 to-purple-500 flex flex-col items-center justify-center text-white text-center p-8 relative">
                <motion.img 
                    src={heroImg} 
                    alt="Hero" 
                    className="absolute top-0 left-0 w-full h-full object-cover opacity-30"
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                />
                <motion.h1 
                    className="text-5xl font-bold mb-4 relative"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Welcome to Vidya Industries
                </motion.h1>
                <p className="text-lg mb-6 max-w-xl relative">
                    Your trusted partner for high-quality, eco-friendly corrugated box solutions.
                    Connect With Us Now!
                </p>
                <Link to="/sign-up">
                    <motion.button 
                        className="bg-white text-blue-500 px-6 py-2 rounded-lg shadow-md hover:bg-blue-100 relative"
                        whileHover={{ scale: 1.1 }}
                    >
                        Signup Now
                    </motion.button>
                </Link>
            </section>
        </div>
    );
}
