import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getCustomerStats, getOrderStats } from '../Services/AdminService';
import { motion } from 'framer-motion';

export default function AdminOverview() {
    const [customerData, setCustomerData] = useState([]);
    const [orderData, setOrderData] = useState([]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const customerStats = await getCustomerStats();
                const orderStats = await getOrderStats();
                setCustomerData(customerStats || []);
                setOrderData(orderStats || []);
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            }
        };
        fetchStats();
    }, []);

    return (
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6 bg-white shadow-md rounded-md max-h-[80vh] overflow-y-auto"
        >
            <h2 className="text-2xl font-bold text-center mb-6">Admin Overview</h2>

            {/* Customer Sign-ups Graph */}
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">Customer Sign-ups (Monthly)</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={customerData}>
                        <XAxis dataKey="month" stroke="#8884d8"/>
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="customers" fill="#8884d8" barSize={50} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Orders Graph */}
            <div>
                <h3 className="text-xl font-semibold mb-3">Orders (Monthly)</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={orderData}>
                        <XAxis dataKey="month" stroke="#82ca9d"/>
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="completed" fill="#4CAF50" barSize={40} name="Completed Orders" />
                        <Bar dataKey="pending" fill="#FFC107" barSize={40} name="Pending Orders" />
                        <Bar dataKey="cancelled" fill="#F44336" barSize={40} name="Cancelled Orders" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
}
