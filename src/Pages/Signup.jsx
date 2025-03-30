import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import signupBg from '../images/hero.webp';
import { toast, ToastContainer } from 'react-toastify';
import { register } from '../Services/HomeService';

export default function SignupPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        position: '',
        company: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const navigate = useNavigate();

    const handleSignup = async (event) => {
        event.preventDefault();  
        if (!formData.name.trim()) {
            toast.warning('Please enter name.');
            return;
        }
        else if (!formData.email.trim()) {
            toast.warning('Please enter email.');
            return;
        }
        else if (!formData.phone.trim()) {
            toast.warning('Please enter phone.');
            return;
        } 
        else if (!formData.address.trim()) {
            toast.warning('Please enter address.');
            return;
        } 
        else if (!formData.position.trim()) {
            toast.warning('Please enter position.');
            return;
        } 
        else if (!formData.company.trim()) {
            toast.warning('Please enter company.');
            return;
        } 
        else if (!formData.password.trim() || !formData.confirmPassword.trim()) {
            toast.warning('Please enter password.');
            return;
        } 
        else if (formData.password !== formData.confirmPassword) {  
            toast.warning('Passwords do not match!');
            return;
        }
        
        try {
            setLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
            const result = await register(
                formData.name,
                formData.email,
                formData.phone,
                formData.address,
                formData.position,
                formData.company,
                formData.password
            );

            if (result.message === 'success') {
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    address: '',
                    position: '',
                    company: '',
                    password: '',
                    confirmPassword: ''
                });
                navigate('/login', { state: { successMessage: 'Signup successful! Please log in.' } });
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center p-4 relative overflow-auto"
             style={{ backgroundImage: `url(${signupBg})` }}>
            <ToastContainer/>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-lg relative z-10 border-t-4 border-blue-500"
            >
                <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-8">Create an Account</h1>

                <form onSubmit={handleSignup} className="space-y-5">
                    {['name', 'email', 'phone', 'address', 'position', 'company'].map((field) => (
                        <div key={field}>
                            <label className="block text-gray-700 font-medium capitalize">{field}</label>
                            <input
                                type={field === 'email' ? 'email' : 'text'}
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                            />
                        </div>
                    ))}

                    <div>
                        <label className="block text-gray-700 font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition flex items-center justify-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                <span className="ml-2">Processing...</span>
                            </>
                        ) : (
                            'Sign Up'
                        )}
                    </motion.button>
                </form>

                <p className="text-center mt-4 text-gray-600">
                    Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0 bg-black z-0"
            />
        </div>
    );
}