import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiBox, FiUser, FiSettings, FiLogOut, FiXCircle } from 'react-icons/fi';
import CustomerOverview from '../Component/CustomerOverview';
import CustomerOrders from '../Component/CustomerOrders';
import Profile from '../Component/Profile';
import RequestQuotation from '../Component/RequestQuotation';
import OrderNow from '../Component/OrderNow';
import RequestCancellation from '../Component/RequestCancellation'; // New Component
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

export default function CustomerDashboard() {
    const [activeTab, setActiveTab] = useState('overview');
    const [refreshKey, setRefreshKey] = useState(0);

    const location = useLocation();
        // Show success message if redirected from Login page
        useEffect(() => {
            if (location.state?.successMessage) {
                toast.success(location.state.successMessage);
        
                // ✅ Clear state without navigating by modifying history
                window.history.replaceState({}, document.title);
            }
        }, [location]);

    const handleLogout = () => {
        sessionStorage.clear();
        window.location.href = "/";

        setTimeout(() => {
            window.history.pushState(null, null, window.location.href);
            window.onpopstate = () => {
                window.history.pushState(null, null, window.location.href);
            };
        }, 0);
    };

    const handleOrderSuccess = () => {
        setRefreshKey((prevKey) => prevKey + 1);
        setActiveTab('overview');
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return <CustomerOverview key={refreshKey} />;
            case 'orders':
                return <CustomerOrders />;
            case 'profile':
                return <Profile />;
            case 'Request quotation':
                return <RequestQuotation />;
            case 'orderNow':
                return <OrderNow onOrderSuccess={handleOrderSuccess} />;
            case 'requestCancellation':
                return <RequestCancellation />; // New Component
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <ToastContainer/>
            <motion.aside 
                initial={{ x: -200 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.5 }}
                className="w-64 bg-blue-600 text-white p-6 space-y-4 shadow-lg"
            >
                <h1 className="text-3xl font-bold text-center mb-8">Dashboard</h1>
                <ul className="space-y-4">
                    <li className="cursor-pointer flex items-center gap-2" onClick={() => setActiveTab('overview')}>
                        <FiBox /> Overview
                    </li>
                    <li className="cursor-pointer flex items-center gap-2" onClick={() => setActiveTab('orders')}>
                        <FiBox /> Orders
                    </li>
                    <li className="cursor-pointer flex items-center gap-2" onClick={() => setActiveTab('profile')}>
                        <FiUser /> Profile
                    </li>
                    <li className="cursor-pointer flex items-center gap-2" onClick={() => setActiveTab('Request quotation')}>
                        <FiSettings /> Request Quotation
                    </li>
                    <li className="cursor-pointer flex items-center gap-2" onClick={() => setActiveTab('orderNow')}>
                        <FiBox /> Place Order
                    </li>
                    <li className="cursor-pointer flex items-center gap-2" onClick={() => setActiveTab('requestCancellation')}>
                        <FiXCircle /> Request Cancellation
                    </li>
                    <li className="cursor-pointer flex items-center gap-2 text-red-500 hover:text-red-400" onClick={handleLogout}>
                        <FiLogOut /> Logout
                    </li>
                </ul>
            </motion.aside>

            {/* Main Content */}
            <div className="flex-1 p-10 bg-gray-100">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white p-8 rounded-lg shadow-md"
                >
                    {renderContent()}
                </motion.div>
            </div>
        </div>
    );
}
