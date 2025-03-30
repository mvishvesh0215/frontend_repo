// components/OurClientPage.jsx
import { motion } from 'framer-motion';
import client1Img from '../images/our_client_3m.png';
import client2Img from '../images/our_client_Mylan.png';
import client3Img from '../images/our_client_3m.png';
import backgroundImage from '../images/our-client-bg.webp';

export default function OurClient() {
    return (
        <div className="min-h-screen bg-gray-100 text-center relative">
            {/* Background Effect with Image */}
            <motion.div 
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-30"
                style={{ backgroundImage: `url(${backgroundImage})` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ duration: 1.5 }}
            />

            {/* Our Clients Section */}
            <section id="clients" className="py-20 px-4 relative">
                <motion.h1
                    className="text-5xl font-bold mb-8"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Our Clients
                </motion.h1>
                <motion.p
                    className="text-lg text-gray-600 max-w-3xl mx-auto mb-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    We are proud to have partnered with industry leaders to deliver top-notch packaging solutions worldwide.
                </motion.p>

                {/* Client Showcase Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {[{ img: client1Img, title: '3M', text: 'Leading e-commerce brand with innovative packaging needs.' },
                      { img: client2Img, title: 'MyLan', text: 'Global logistics partner enhancing packaging safety.' },
                      { img: client3Img, title: 'Client Three', text: 'Sustainable retail business committed to eco-friendly solutions.' }]
                      .map((item, index) => (
                        <motion.div 
                            key={index} 
                            className="p-6 border rounded-lg shadow-sm hover:scale-105 transition-transform bg-white"
                        >
                            <img src={item.img} alt={item.title} className="rounded-lg mb-4" />
                            <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                            <p className="text-gray-600">{item.text}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
