import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaClock } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import { getPendingOrders, updateOrderStatus } from '../Services/AdminService';

export default function PendingOrders() {
    const [orders, setOrders] = useState([]);
    const [expandedOrderId, setExpandedOrderId] = useState(null);
    const [statusUpdateData, setStatusUpdateData] = useState({
        orderStatus: '',
        orderDetails: ''
    });
    const [loadingId, setLoadingId] = useState(null); // Tracks loading state per item

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getPendingOrders();
                setOrders(data || []);
            } catch (error) {
                toast.error('Failed to fetch pending orders.');
            }
        };
        fetchOrders();
    }, []);

    const handleToggleDetails = (orderId) => {
        setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStatusUpdateData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (orderId) => {
        setLoadingId(orderId); // Start loading animation
        try {
            const response = await updateOrderStatus(orderId, statusUpdateData.orderStatus, statusUpdateData.orderDetails);
            if (response.message === "success") {
                toast.success(`Order ${orderId} updated successfully!`);
            } else {
                toast.error(response.message || "Failed to update order.");
            }
        } catch (error) {
            toast.error("Error updating order status.");
        } finally {
            setLoadingId(null); // Stop loading animation
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
            <h2 className="text-2xl font-bold text-center mb-4">Pending Orders</h2>
            {orders.length === 0 ? (
                <p className="text-center text-gray-500">No pending orders available.</p>
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
                            <div
                                className="flex justify-between items-center cursor-pointer"
                                onClick={() => handleToggleDetails(order.id)}
                            >
                                <div className="flex items-center space-x-3">
                                    <FaClock className="text-yellow-500 text-2xl" />
                                    <div>
                                        <p className="text-lg font-medium">Customer: {order.user.name}</p>
                                        <p className="text-gray-600">Order ID: {order.id}</p>
                                    </div>
                                </div>
                                <span className="text-blue-500">{expandedOrderId === order.id ? '▲' : '▼'}</span>
                            </div>

                            {expandedOrderId === order.id && (
                                <div className="mt-4 p-4 border-t">
                                    <p><strong>Paper Type:</strong> {order.paperType}</p>
                                    <p><strong>Layers:</strong> {order.layers}</p>
                                    <p><strong>Quantity:</strong> {order.quantity}</p>
                                    <p><strong>Dimensions:</strong> {order.dimensions}</p>
                                    <p><strong>Order Status:</strong> {order.orderStatus}</p>
                                    <p><strong>Order Details:</strong> {order.orderDetails}</p>

                                    <div className="flex items-center gap-4 mt-4">
                                        <select
                                            name="orderStatus"
                                            value={statusUpdateData.orderStatus}
                                            onChange={handleInputChange}
                                            className="p-2 border rounded-md w-1/3"
                                        >
                                            <option value="ORDERED">Select Status</option>
                                            <option value="ACCEPTED">Accepted</option>
                                            <option value="MANUFACTURING">Manufacturing</option>
                                            <option value="DISPATCHED">Dispatched</option>
                                            <option value="DELIVERED">Delivered</option>
                                            <option value="CANCELLED">Cancelled</option>
                                        </select>

                                        <select
                                            name="orderDetails"
                                            value={statusUpdateData.orderDetails}
                                            onChange={handleInputChange}
                                            className="p-2 border rounded-md w-1/3"
                                        >
                                            <option value="">Order Details</option>
                                            <option value="CURRENT">Current</option>
                                            <option value="COMPLETED">Completed</option>
                                        </select>

                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handleSubmit(order.id)}
                                            disabled={loadingId === order.id}
                                            className={`bg-blue-500 text-white px-4 py-2 rounded-md transition ${loadingId === order.id ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                                        >
                                            {loadingId === order.id ? (
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                                    className="inline-block border-2 border-white border-t-transparent rounded-full w-5 h-5"
                                                />
                                            ) : (
                                                'Update'
                                            )}
                                        </motion.button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            )}
        </motion.div>
    );
}
