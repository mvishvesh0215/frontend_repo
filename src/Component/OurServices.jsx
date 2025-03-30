// components/OurServices.jsx
import { motion } from 'framer-motion';
import service1Img from '../images/our-service1.webp';
import service2Img from '../images/our-service2.webp';
import service3Img from '../images/our-service3.webp';
import backgroundImage from '../images/our-service3.webp';

export default function OurServices() {
    const services = [
        { img: service1Img, title: 'Custom Packaging', text: 'Tailored packaging solutions designed for your unique products.' },
        { img: service2Img, title: 'Bulk Orders', text: 'Efficient large-scale production to meet high-demand needs.' },
        { img: service3Img, title: 'Eco-Friendly Solutions', text: 'Sustainable packaging materials for a greener tomorrow.' }
    ];

    return (
        <div className="min-h-screen bg-gray-100 text-center relative">
            {/* Background Image with Effect */}
            <motion.div 
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-30"
                style={{ backgroundImage: `url(${backgroundImage})` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ duration: 1.5 }}
            />

            {/* Services Section */}
            <section id="service" className="py-20 px-4 relative">
                <motion.h1
                    className="text-5xl font-bold mb-8"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Our Premium Services
                </motion.h1>
                <motion.p
                    className="text-lg text-gray-600 max-w-3xl mx-auto mb-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    Explore our diverse range of packaging solutions, designed to meet the needs of various industries.
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            className="p-6 border rounded-lg shadow-lg bg-white relative overflow-hidden"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.5 }}
                        >
                            <motion.img 
                                src={service.img} 
                                alt={service.title} 
                                className="rounded-lg mb-4 hover:scale-110 transition-transform duration-500"
                            />
                            <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
                            <p className="text-gray-600">{service.text}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}

