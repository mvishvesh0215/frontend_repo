import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getProfile, updateProfile } from '../Services/CustomerService';
import { toast, ToastContainer } from 'react-toastify';

export default function Profile() {
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        position: '',
        company: ''
    });

    useEffect(() => {
        // Simulate fetching data from the backend
        const fetchData = async () => {
            const userId = sessionStorage.getItem('id');
            const userData = await getProfile(userId); // Fetch data from service
            setProfileData(userData);
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userId = sessionStorage.getItem("id")
            const result = await updateProfile(
                userId,
                profileData.name,
                profileData.email,
                profileData.phone,
                profileData.position,
                profileData.company,
                profileData.address,
                profileData.password
                )
        if (result.message === "success") {
            toast.success("Profile Updated successfully!");
            } else {
                toast.error(result.message || "Unexpected error occurred.");
            }
        } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile. Please try again.");
    } 
}

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-lg mx-auto mt-10"
        >
            <ToastContainer/>
            <h2 className="text-2xl font-bold text-center mb-6">Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {Object.keys(profileData).map((field) => (
                    <div key={field} className="flex flex-col">
                        <label className="text-gray-700 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
                        <input
                            type={field === 'password' ? 'password' : 'text'}
                            name={field}
                            value={field === 'password' ? profileData[field].slice(0, 10) : profileData[field]}
                            onChange={handleChange}
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                ))}

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                >
                    Update Profile
                </motion.button>
            </form>
        </motion.div>
    );
}