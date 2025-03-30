import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import { getPendingOrder, requestOrderCancellation } from '../Services/CustomerService';

export default function RequestCancellation() {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState('');
    const [reason, setReason] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Loading state

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const userId = sessionStorage.getItem('id');
                const data = await getPendingOrder(userId);
                setOrders(data || []);
            } catch (error) {
                toast.error('Failed to fetch your orders.');
            }
        };
        fetchOrders();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedOrder || !reason.trim()) {
            toast.error('Please select an order and provide a reason.');
            return;
        }

        setIsLoading(true); // Start loading

        try {
            const userId = sessionStorage.getItem('id');
            const result = await requestOrderCancellation(userId, selectedOrder, reason);
            if (result === 'success') {
                toast.success('Cancellation request submitted successfully.');
                setSelectedOrder('');
                setReason('');
            } else {
                toast.error(result || 'Failed to submit request.');
            }
        } catch (error) {
            console.error('Error submitting cancellation request:', error);
            toast.error('Failed to submit cancellation request.');
        } finally {
            setIsLoading(false); // End loading
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6 bg-white shadow-md rounded-md"
        >
            <ToastContainer/>
            <h2 className="text-2xl font-bold text-center mb-4">Request Order Cancellation</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Select Order</label>
                    <select
                        value={selectedOrder}
                        onChange={(e) => setSelectedOrder(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="" disabled>Select an order</option>
                        {orders.map((order) => (
                            <option key={order.id} value={order.id}>
                                Order ID: {order.id}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Reason for Cancellation</label>
                    <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        rows="4"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Explain your reason for cancellation..."
                        required
                    />
                </div>

                <motion.button
                    whileHover={{ scale: !isLoading ? 1.05 : 1 }}
                    whileTap={{ scale: !isLoading ? 0.95 : 1 }}
                    type="submit"
                    className={`w-full py-2 rounded-md transition flex items-center justify-center gap-2 ${
                        isLoading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-red-500 hover:bg-red-600 text-white'
                    }`}
                    disabled={isLoading} // Disable while loading
                >
                    {isLoading ? (
                        <>
                            <div className="animate-spin h-5 w-5 border-4 border-white border-t-transparent rounded-full"></div>
                            Processing...
                        </>
                    ) : (
                        'Submit Request'
                    )}
                </motion.button>
            </form>
        </motion.div>
    );
}
