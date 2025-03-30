import AboutUs from '../Component/AboutUs';
import ContactUs from '../Component/ContactUs';
import Footer from '../Component/Footer';
import Home from '../Component/Home';
import Navbar from '../Component/Navbar';
import OurClient from '../Component/OurClient';
import OurServices from '../Component/OurServices';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar/>
      <Home/>
      <AboutUs/>
      <OurServices/>
      <OurClient/>
      <ContactUs/>
      <Footer/>
    </div>
  )
}
