import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaTruck, FaBoxOpen, FaCheck, FaIndustry, FaShippingFast, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const steps = [
    { label: 'Ordered', icon: <FaBoxOpen className="text-yellow-500" /> },
    { label: 'Accepted', icon: <FaCheck className="text-green-500" /> },
    { label: 'Manufacturing', icon: <FaIndustry className="text-blue-500" /> },
    { label: 'Dispatched', icon: <FaShippingFast className="text-green-500" /> },
    { label: 'Delivered', icon: <FaCheckCircle className="text-purple-500" /> },
    { label: 'Cancelled', icon: <FaTimesCircle className="text-red-500" /> }, // Special case
];

export default function OrderTracker({ currentStatus }) {
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        const normalizedStatus = currentStatus?.trim().toLowerCase();
        const stepIndex = steps.findIndex(step => step.label.toLowerCase() === normalizedStatus);

        if (stepIndex !== -1) {
            setActiveStep(stepIndex);
        }
    }, [currentStatus]);

    return (
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6">Order Tracker</h2>

            <div className="relative flex items-center justify-between">
                {steps.map((step, index) => (
                    <div key={step.label} className="flex flex-col items-center w-1/6">
                        {step.icon}
                        <p className={`text-sm mt-2 ${index <= activeStep ? 'font-bold text-blue-600' : 'text-gray-400'}`}>
                            {step.label}
                        </p>
                    </div>
                ))}

                <motion.div
                    className="absolute top-1/2 left-0 h-1 bg-blue-500"
                    initial={{ width: '0%' }}
                    animate={{ 
                        width: activeStep === steps.length - 1 
                            ? '100%' 
                            : `${(activeStep / (steps.length - 1)) * 100}%`
                    }}
                    transition={{ duration: 1 }}
                />

                <motion.div
                    className="absolute -top-3 transform -translate-x-1/2"
                    initial={{ left: '0%' }}
                    animate={{
                        left: activeStep === steps.length - 1 
                            ? '100%' 
                            : `${(activeStep / (steps.length - 1)) * 100}%`
                    }}
                    transition={{ duration: 1 }}
                >
                    <FaTruck className="text-2xl text-blue-500" />
                </motion.div>
            </div>
        </div>
    );
}
