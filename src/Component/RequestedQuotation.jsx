import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaFileInvoice } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import { getRequestedQuotations, updateQuotationStatus } from '../Services/AdminService';

export default function RequestedQuotation() {
    const [quotations, setQuotations] = useState([]);
    const [expandedQuotationId, setExpandedQuotationId] = useState(null);
    const [statusUpdateData, setStatusUpdateData] = useState({
        quotationStatus: '',
    });
    const [loadingId, setLoadingId] = useState(null); // Tracks loading state per item

    useEffect(() => {
        const fetchQuotations = async () => {
            try {
                const data = await getRequestedQuotations();
                setQuotations(data || []);
            } catch (error) {
                toast.error('Failed to fetch requested quotations.');
            }
        };
        fetchQuotations();
    }, []);

    const handleToggleDetails = (quotationId) => {
        setExpandedQuotationId((prev) => (prev === quotationId ? null : quotationId));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStatusUpdateData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (quotationId) => {
        setLoadingId(quotationId); // Start loading animation
        try {
            const response = await updateQuotationStatus(quotationId, statusUpdateData.quotationStatus);
            if (response.message === "success") {
                toast.success(`Quotation ${quotationId} updated successfully!`);
            } else {
                toast.error(response.message || "Failed to update quotation.");
            }
        } catch (error) {
            toast.error("Error updating quotation status.");
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
            <h2 className="text-2xl font-bold text-center mb-4">Requested Quotations</h2>
            {quotations.length === 0 ? (
                <p className="text-center text-gray-500">No requested quotations available.</p>
            ) : (
                <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                    {quotations.map((quotation) => (
                        <motion.div
                            key={quotation.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                            className="border p-4 rounded-md"
                        >
                            {/* Quotation Header */}
                            <div
                                className="flex justify-between items-center cursor-pointer"
                                onClick={() => handleToggleDetails(quotation.id)}
                            >
                                <div className="flex items-center space-x-3">
                                    <FaFileInvoice className="text-blue-500 text-2xl" />
                                    <div>
                                        <p className="text-lg font-medium">Company: {quotation.user.company}</p>
                                        <p className="text-gray-600">Quotation ID: {quotation.id}</p>
                                        <p className="text-gray-600">Quotation Status: {quotation.quotationStatus}</p>
                                    </div>
                                </div>
                                <span className="text-blue-500">{expandedQuotationId === quotation.id ? '▲' : '▼'}</span>
                            </div>

                            {/* Quotation Details (Expanded) */}
                            {expandedQuotationId === quotation.id && (
                                <div className="mt-4 p-4 border-t">
                                    <p><strong>Paper Type:</strong> {quotation.paperType}</p>
                                    <p><strong>Layers:</strong> {quotation.layers}</p>
                                    <p><strong>Quantity:</strong> {quotation.quantity}</p>
                                    <p><strong>Dimensions:</strong> {quotation.dimensions}</p>
                                    <p><strong>Message:</strong> {quotation.message}</p>

                                    {/* Status Update Form */}
                                    <div className="flex items-center gap-4 mt-4">
                                        <select
                                            name="quotationStatus"
                                            value={statusUpdateData.quotationStatus}
                                            onChange={handleInputChange}
                                            className="p-2 border rounded-md w-1/3"
                                        >
                                            <option value="PENDING">Select Status</option>
                                            <option value="PENDING">Pending</option>
                                            <option value="COMPLETED">Completed</option>
                                            <option value="REJECTED">Rejected</option>
                                        </select>

                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handleSubmit(quotation.id)}
                                            disabled={loadingId === quotation.id} // Disable button while loading
                                            className={`bg-blue-500 text-white px-4 py-2 rounded-md transition ${loadingId === quotation.id ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                                        >
                                            {loadingId === quotation.id ? (
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
