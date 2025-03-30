import { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';
import logo from '../images/Logo.jpg';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);
    const toggleDarkMode = () => setDarkMode(!darkMode);

    return (
        <nav className={`fixed top-0 w-full z-10 shadow-md ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
            <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <img src={logo} alt="Logo" className="h-20 w-20" />
                    <h1 className="text-2xl font-bold">Vidya Industries</h1>
                </div>

                {/* Desktop Menu */}
                <ul className="hidden md:flex space-x-6">
                    <li><ScrollLink to="home" smooth={true} duration={500} className="cursor-pointer hover:text-blue-500">Home</ScrollLink></li>
                    <li><ScrollLink to="about" smooth={true} duration={500} className="cursor-pointer hover:text-blue-500">About Us</ScrollLink></li>
                    <li><ScrollLink to="service" smooth={true} duration={500} className="cursor-pointer hover:text-blue-500">Services</ScrollLink></li>
                    <li><ScrollLink to="clients" smooth={true} duration={500} className="cursor-pointer hover:text-blue-500">Our Client</ScrollLink></li>
                    <li><ScrollLink to="contact" smooth={true} duration={500} className="cursor-pointer hover:text-blue-500">Contact</ScrollLink></li>
                    <li><Link to="/login" className="cursor-pointer hover:text-blue-500">Login</Link></li>
                </ul>

                {/* Mobile Menu Button */}
                <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </div>

                {/* Dark Mode Toggle */}
                <button 
                    onClick={toggleDarkMode} 
                    className="ml-4 p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600">
                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
            </div>

            {/* Mobile Menu Content */}
            {isOpen && (
                <ul className="md:hidden bg-blue-100 p-4 space-y-4">
                    <li><ScrollLink to="home" smooth={true} duration={500}>Home</ScrollLink></li>
                    <li><ScrollLink to="about" smooth={true} duration={500}>About Us</ScrollLink></li>
                    <li><ScrollLink to="service" smooth={true} duration={500}>Services</ScrollLink></li>
                    <li><ScrollLink to="clients" smooth={true} duration={500}>Our Client</ScrollLink></li>
                    <li><ScrollLink to="contact" smooth={true} duration={500}>Contact</ScrollLink></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            )}
        </nav>
    );
}