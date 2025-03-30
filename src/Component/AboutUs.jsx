// components/AboutPage.jsx
import { motion } from 'framer-motion';
import teamworkImg from '../images/mission.webp';
import visionImg from '../images/vision.webp';
import valuesImg from '../images/value.webp';
import backgroundImage from '../images/about-bg.webp';

export default function AboutPage() {
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

            {/* About Us Section */}
            <section id="about" className="py-20 px-4 relative">
                <motion.h1
                    className="text-5xl font-bold mb-8"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    About Us
                </motion.h1>
                <motion.p
                    className="text-lg text-gray-600 max-w-3xl mx-auto mb-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    We are committed to delivering high-quality corrugated box solutions with innovation, teamwork, and strong values at our core.
                </motion.p>

                {/* Combined Section with Images */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {[{ img: teamworkImg, title: 'Our Teamwork', text: 'Our dedicated team works together to provide top-notch packaging solutions.' },
                      { img: visionImg, title: 'Our Vision', text: 'Striving for a sustainable future through innovation and excellence.' },
                      { img: valuesImg, title: 'Our Values', text: 'We believe in integrity, trust, and customer satisfaction as our guiding principles.' }]
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
