import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
    FiBox, 
    FiUser, 
    FiSettings, 
    FiLogOut, 
    FiChevronDown, 
    FiChevronUp 
} from 'react-icons/fi';
import AdminOverview from '../Component/AdminOverview';
import CompletedOrders from '../Component/CompletedOrder';
import PendingOrders from '../Component/PendingOrders';
import CancelledOrders from '../Component/CancelledOrders';
import Profile from '../Component/Profile';
import RequestedQuotation from '../Component/RequestedQuotation';
import { toast, ToastContainer } from 'react-toastify';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('overview');
    const [showOrderSubMenu, setShowOrderSubMenu] = useState(false);
    const navigate = useNavigate();
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
        navigate('/');
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return <AdminOverview />;
            case 'completedOrders':
                return <CompletedOrders />;
            case 'pendingOrders':
                return <PendingOrders />;
            case 'cancelledOrders':
                return <CancelledOrders />;
            case 'profile':
                return <Profile />;
            case 'Requested quotation':
                return <RequestedQuotation />;
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
                    <li 
                        className="cursor-pointer flex items-center gap-2"
                        onClick={() => setActiveTab('overview')}
                    >
                        <FiBox /> Overview
                    </li>

                    {/* Orders Submenu */}
                    <li 
                        className="cursor-pointer flex items-center gap-2"
                        onClick={() => setShowOrderSubMenu(!showOrderSubMenu)}
                    >
                        <FiBox /> Orders 
                        {showOrderSubMenu ? <FiChevronUp /> : <FiChevronDown />}
                    </li>
                    {showOrderSubMenu && (
                        <ul className="pl-6 space-y-2">
                            <li 
                                className="cursor-pointer" 
                                onClick={() => setActiveTab('completedOrders')}
                            >
                                ➤ Completed Orders
                            </li>
                            <li 
                                className="cursor-pointer" 
                                onClick={() => setActiveTab('pendingOrders')}
                            >
                                ➤ Pending Orders
                            </li>
                            <li 
                                className="cursor-pointer" 
                                onClick={() => setActiveTab('cancelledOrders')}
                            >
                                ➤ Cancelled Orders
                            </li>
                        </ul>
                    )}

                    <li 
                        className="cursor-pointer flex items-center gap-2"
                        onClick={() => setActiveTab('profile')}
                    >
                        <FiUser /> Profile
                    </li>
                    <li 
                        className="cursor-pointer flex items-center gap-2"
                        onClick={() => setActiveTab('Requested quotation')}
                    >
                        <FiSettings /> Requested Quotation
                    </li>
                    <li 
                        className="cursor-pointer flex items-center gap-2 text-red-500 hover:text-red-400"
                        onClick={handleLogout}
                    >
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
