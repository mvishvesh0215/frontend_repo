import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaTimesCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { getCancelledOrder } from '../Services/AdminService';

export default function CancelledOrders() {
    const [orders, setOrders] = useState([]);
    const [expandedOrderId, setExpandedOrderId] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getCancelledOrder();
                setOrders(data || []);
            } catch (error) {
                toast.error('Failed to fetch cancelled orders.');
            }
        };
        fetchOrders();
    }, []);

    const handleToggleDetails = (orderId) => {
        setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6 bg-white shadow-md rounded-md"
        >
            <h2 className="text-2xl font-bold text-center mb-4">Cancelled Orders</h2>

            {orders.length === 0 ? (
                <p className="text-center text-gray-500">No cancelled orders available.</p>
            ) : (
                <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                    {orders.map((order) => (
                        <motion.div 
                            key={order.id} 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                            className="border p-4 rounded-md"
                        >
                            {/* Order Header */}
                            <div
                                className="flex justify-between items-center cursor-pointer"
                                onClick={() => handleToggleDetails(order.id)}
                            >
                                <div className="flex items-center space-x-3">
                                    <FaTimesCircle className="text-red-500 text-2xl" />
                                    <div>
                                        <p className="text-lg font-medium">Customer: {order.user.name}</p>
                                        <p className="text-gray-600">Order ID: {order.id}</p>
                                    </div>
                                </div>
                                <span className="text-blue-500">{expandedOrderId === order.id ? '▲' : '▼'}</span>
                            </div>

                            {/* Order Details (Expanded) */}
                            {expandedOrderId === order.id && (
                                <div className="mt-4 p-4 border-t bg-gray-50 rounded-md">
                                    <p><strong>Paper Type:</strong> {order.paperType}</p>
                                    <p><strong>Layers:</strong> {order.layers}</p>
                                    <p><strong>Quantity:</strong> {order.quantity}</p>
                                    <p><strong>Dimensions:</strong> {order.dimensions}</p>
                                    <p><strong>Order Status:</strong> <span className="text-red-500 font-semibold">{order.orderStatus}</span></p>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            )}
        </motion.div>
    );
}
