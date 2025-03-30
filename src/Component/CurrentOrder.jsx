import { motion } from 'framer-motion';

export default function CurrentOrder({ order }) {
    if (!order) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg mx-auto mt-10"
            >
                <h2 className="text-2xl font-bold text-center mb-4">Current Order</h2>
                <p className="text-center text-gray-500">No active order currently in progress.</p>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg mx-auto mt-10"
        >
            <h2 className="text-2xl font-bold text-center mb-6">Current Order Details</h2>
            <ul className="space-y-3">
                <li><strong>Paper Type:</strong> {order.paperType}</li>
                <li><strong>Layers:</strong> {order.layers}</li>
                <li><strong>Quantity:</strong> {order.quantity}</li>
                <li><strong>Dimensions:</strong> {order.dimensions}</li>
                <li><strong>Status:</strong> {order.orderStatus}</li>
            </ul>
        </motion.div>
    );
}
