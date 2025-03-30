import { useEffect, useState } from 'react';
import CurrentOrder from './CurrentOrder';
import OrderTracker from './OrderTracker';
import { getCurrentOrder } from '../Services/CustomerService';
import { toast } from 'react-toastify';
import WaveLoader from './WaveLoader';

export default function CustomerOverview() {
    const [currentOrders, setCurrentOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrderData = async () => {
            const userId = sessionStorage.getItem('id');

            if (!userId) {
                toast.error('Please log in again.');
                setLoading(false);
                return;
            }

            try {
                const dataRetrieved = await getCurrentOrder(userId);
                if (Array.isArray(dataRetrieved.data)) {
                    setCurrentOrders(dataRetrieved.data);
                } else {
                    setCurrentOrders([]);
                }
            } catch (error) {
                toast.error('Failed to fetch order data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrderData();
    }, []);

    if (loading) {
        return <WaveLoader />;
    }

    return (
        <div className="p-6 bg-white shadow-md rounded-md max-h-[80vh] overflow-y-auto">
            {currentOrders.length > 0 ? (
                currentOrders.map((order) => (
                    <div 
                        key={order.id} 
                        className="p-4 bg-gray-50 shadow-sm rounded-md mb-4"
                    >
                        <OrderTracker currentStatus={order.orderStatus} />
                        <CurrentOrder order={order} />
                    </div>
                ))
            ) : (
                <div className="text-center text-red-500">
                    No processing orders available.
                </div>
            )}
        </div>
    );
}
