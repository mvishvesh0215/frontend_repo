import { useState } from "react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import { requestQuotation } from "../Services/CustomerService";

export default function RequestQuotation() {
    const [formData, setFormData] = useState({
        paperType: "",
        layers: "",
        quantity: "",
        dimensions: "",
        notes: "",
    });

    const [loading, setLoading] = useState(false); // Added loading state

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading animation
        try {
            const userId = sessionStorage.getItem("id");
            const result = await requestQuotation(
                userId,
                formData.paperType,
                formData.layers,
                formData.quantity,
                formData.dimensions,
                formData.notes
            );

            if (result.message === "success") {
                setFormData({
                    paperType: "",
                    layers: "",
                    quantity: "",
                    dimensions: "",
                    notes: "",
                });

                toast.success("Quotation submitted successfully!");

            } else {
                toast.error(result.message || "Unexpected error occurred.");
            }
        } catch (error) {
            console.error("Error submitting quotation:", error);
            toast.error("Failed to submit quotation. Please try again.");
        } finally {
            setLoading(false); // Stop loading animation
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg mx-auto mt-10"
        >
            <ToastContainer/>
            <h2 className="text-2xl font-bold text-center mb-6">Request Quotation</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {["paperType", "layers", "quantity", "dimensions"].map((field) => (
                    <motion.div
                        key={field}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        whileFocus={{ scale: 1.05 }}
                        className="flex flex-col"
                    >
                        <label className="text-gray-700 capitalize">
                            {field.replace(/([A-Z])/g, " $1")}
                        </label>
                        <input
                            type="text"
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </motion.div>
                ))}

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileFocus={{ scale: 1.05 }}
                    className="flex flex-col"
                >
                    <label className="text-gray-700 capitalize">Notes</label>
                    <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="3"
                    />
                </motion.div>

                <motion.button
                    whileHover={!loading ? { scale: 1.05 } : {}}
                    whileTap={!loading ? { scale: 0.95 } : {}}
                    type="submit"
                    className={`w-full py-2 rounded-md transition ${
                        loading
                            ? "bg-blue-300 cursor-not-allowed"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                    disabled={loading} // Button disabled during submission
                >
                    {loading ? (
                        <div className="flex justify-center items-center gap-2">
                            <div className="animate-spin h-5 w-5 border-4 border-white border-t-transparent rounded-full"></div>
                            Submitting...
                        </div>
                    ) : (
                        "Submit Request"
                    )}
                </motion.button>
            </form>
        </motion.div>
    );
}
