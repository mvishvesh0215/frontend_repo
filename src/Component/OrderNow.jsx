import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import { OrderNow as placeOrder } from '../Services/CustomerService';

export default function OrderNow() {
    const [formData, setFormData] = useState({
        paperType: '',
        layers: '',
        quantity: '',
        dimensions: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const userId = sessionStorage.getItem('id');

        try {
            const result = await placeOrder(
                userId,
                formData.paperType,
                formData.layers,
                formData.quantity,
                formData.dimensions
            );

            const { message } = result;

            if (message === 'success') {
                toast.success('Order Placed Successfully');
                setFormData({ paperType: '', layers: '', quantity: '', dimensions: '' });
            } else {
                toast.error(message);
            }
        } catch (error) {
            toast.error('Failed to place the order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg mx-auto mt-10"
        >
            <ToastContainer/>
            <h2 className="text-2xl font-bold text-center mb-6">Order Now</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {['paperType', 'layers', 'quantity', 'dimensions'].map((field) => (
                    <motion.div
                        key={field}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        whileFocus={{ scale: 1.05 }}
                        className="flex flex-col"
                    >
                        <label className="text-gray-700 capitalize">
                            {field.replace(/([A-Z])/g, ' $1')}
                        </label>
                        <input
                            type="text"
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </motion.div>
                ))}

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-blue-500 text-white py-2 rounded-md transition ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                >
                    {loading ? (
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="inline-block border-2 border-white border-t-transparent rounded-full w-5 h-5"
                        />
                    ) : (
                        'Submit Order'
                    )}
                </motion.button>
            </form>
        </motion.div>
    );
}
