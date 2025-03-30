import { motion } from 'framer-motion';

export default function WaveLoader() {
    return (
        <div className="flex justify-center items-center h-screen bg-white">
            <div className="flex space-x-2">
                {[...Array(5)].map((_, index) => (
                    <motion.div
                        key={index}
                        className="w-2 h-8 bg-blue-500 rounded-md"
                        animate={{
                            scaleY: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            delay: index * 0.15,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
