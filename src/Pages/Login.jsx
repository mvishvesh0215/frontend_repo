import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import loginBg from '../images/hero.webp';
import { toast, ToastContainer } from 'react-toastify';
import { login } from '../Services/HomeService';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.state?.successMessage) {
            toast.success(location.state.successMessage);
            window.history.replaceState({}, document.title);
        }
    }, [location]);    
    
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
            toast.warning('Please enter email');
        } else if (!password.trim()) {
            toast.warning('Please enter password');
        } else {
            try {
                setLoading(true);
                const result = await login(email, password);
                const { loginResponse, jwt } = result;
                if (loginResponse.message === 'success') {
                    const token = jwt;
                    sessionStorage.setItem('token', token);
                    sessionStorage.setItem('id', loginResponse.id);
                    
                    if (loginResponse.role === 'ROLE_CUSTOMER') {
                        navigate('/customer-dashboard', { state: { successMessage: 'Login Successful!' } });
                    } else {
                        navigate('/admin-dashboard', { state: { successMessage: 'Login Successful!' } });
                    }
                } else {
                    toast.error(loginResponse.message);
                }
            } catch (error) {
                toast.error('Login failed. Please check email and password then try again.');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div
            className="h-screen flex items-center justify-center bg-cover bg-center relative overflow-hidden"
            style={{ backgroundImage: `url(${loginBg})` }}
        >
            <ToastContainer/>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md relative z-10"
            >
                <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="text-right">
                        <Link to="/forgot-password" className="text-blue-500 hover:underline">
                            Forgot Password?
                        </Link>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition flex items-center justify-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : 'Login'}
                    </motion.button>
                </form>

                <p className="text-center mt-4">
                    Don't have an account?{' '}
                    <Link to="/sign-up" className="text-blue-500 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0 bg-black z-0"
            />
        </div>
    );
}
