import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getOrders } from '../Services/CustomerService'; // Import service

export default function CustomerOrders() {
    const [pendingOrders, setPendingOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);
    const [canceledOrders, setCancelledOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const userId = sessionStorage.getItem('id');
                const orders = await getOrders(userId); // Fetch data from service
                setPendingOrders(orders.filter(order => order.orderStatus.toLowerCase() !== 'delivered' && order.orderStatus.toLowerCase() !== 'cancelled'));
                setCompletedOrders(orders.filter(order => order.orderStatus.toLowerCase() === 'delivered'));
                setCancelledOrders(orders.filter(order => order.orderStatus.toLowerCase() === 'cancelled'));
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const renderOrderList = (orders) => (
        <ul className="space-y-3 max-h-64 overflow-y-auto">
            {orders.map((order) => (
                <motion.li
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.05, backgroundColor: '#f0f9ff' }}
                    transition={{ duration: 0.5 }}
                    className="bg-white p-4 rounded-lg shadow-md cursor-pointer"
                >
                    <p><strong>Order Id:</strong> {order.id}</p>
                    <p><strong>Type:</strong> {order.paperType}</p>
                    <p><strong>Quantity:</strong> {order.quantity}</p>
                    <p><strong>Status:</strong> {order.orderStatus}</p>
                </motion.li>
            ))}
        </ul>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
            {/* Pending Orders */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-yellow-100 p-6 rounded-lg shadow-lg"
            >
                <h2 className="text-xl font-bold mb-4">Pending Orders</h2>
                {renderOrderList(pendingOrders)}
            </motion.div>

            {/* Completed Orders */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-green-100 p-6 rounded-lg shadow-lg"
            >
                <h2 className="text-xl font-bold mb-4">Completed Orders</h2>
                {renderOrderList(completedOrders)}
            </motion.div>

            {/* Canceled Orders */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-red-100 p-6 rounded-lg shadow-lg"
            >
                <h2 className="text-xl font-bold mb-4">Cancelled Orders</h2>
                {renderOrderList(canceledOrders)}
            </motion.div>
        </div>
    );
}
