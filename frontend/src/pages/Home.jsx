import React, { useState } from 'react';
import { motion } from 'framer-motion';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import api from '../api/axios';

// Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const markers = [
  { markerOffset: -15, name: "New Delhi, India", coordinates: [77.2090, 28.6139] },
  { markerOffset: -15, name: "Nairobi, Kenya", coordinates: [36.8219, -1.2921] },
  { markerOffset: 15, name: "Manila, Philippines", coordinates: [120.9842, 14.5995] },
  { markerOffset: 15, name: "Bogotá, Colombia", coordinates: [-74.0721, 4.7110] },
];

const Home = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', city: '', state: '', areaOfInterest: '', volunteerReason: '', message: '', newsletter: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      await api.post('/submissions', formData);
      setSubmitStatus({ type: 'success', message: 'Form Submitted Successfully!' });
      setFormData({ name: '', email: '', phone: '', city: '', state: '', areaOfInterest: '', volunteerReason: '', message: '', newsletter: false });
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Failed to submit form. Please try again later.' });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1920&q=80" 
            alt="Women Empowerment" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-shecanDark to-transparent"></div>
        </div>
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative z-10 text-center px-4 max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6">
            Together We Can Change <span className="text-shecanRed">The World</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Empowering women through education, skill development, and community support. We don't ask for much, just help us with what you can.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="#volunteer" className="px-8 py-4 bg-shecanRed hover:bg-red-700 text-white font-bold rounded-md transition-transform transform hover:scale-105">
              Become a Volunteer
            </a>
            <a href="#about" className="px-8 py-4 bg-transparent border-2 border-white hover:bg-white hover:text-black text-white font-bold rounded-md transition-colors">
              Learn More
            </a>
          </div>
        </motion.div>
      </section>

      {/* 2. About Section */}
      <section id="about" className="py-20 bg-shecanDark overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-sm font-bold text-gray-400 tracking-widest uppercase mb-2">Who We Are</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-white">About Us</h3>
            <div className="w-16 h-1 bg-shecanRed mx-auto mt-6"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80" 
                alt="Community Support" 
                className="rounded-lg shadow-2xl"
              />
            </motion.div>
            <motion.div
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6 }}
            >
              <h4 className="text-2xl font-bold mb-4 text-white">How it started?</h4>
              <p className="text-gray-300 leading-relaxed mb-6">
                She Can Foundation was founded by a group of individuals who shared a common vision of creating a world where every woman has the opportunity to thrive and succeed. The idea for the organization was born out of a desire to make a real difference in the lives of women in communities across the globe.
              </p>
              <p className="text-gray-300 leading-relaxed">
                We recognized that there are countless barriers that prevent women from reaching their full potential, and we wanted to create an organization that could help break down those barriers and provide women with the resources and support they need to succeed.
              </p>
            </motion.div>
          </div>

          <motion.div 
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true }}
             variants={fadeInUp}
             className="bg-[#1a1a1a] p-10 rounded-xl border border-gray-800 text-center"
          >
            <h4 className="text-3xl font-bold mb-6">What is <span className="text-shecanRed">She Can?</span></h4>
            <p className="text-gray-300 leading-relaxed max-w-4xl mx-auto">
              She Can Foundation is a non-profit organization dedicated to empowering women and creating a more equitable society. We provide support, resources, and training to women in communities across the globe, and we raise awareness of women's issues through advocacy campaigns and initiatives.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. Impact Section */}
      <section id="impact" className="py-20 bg-black relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h3 className="text-4xl md:text-5xl font-extrabold text-white">Our Impact</h3>
            <div className="w-16 h-1 bg-shecanRed mx-auto mt-6"></div>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { end: 500, suffix: '+', label: 'Women Supported' },
              { end: 120, suffix: '+', label: 'Volunteers' },
              { end: 85, suffix: '', label: 'Workshops Conducted' },
              { end: 24, suffix: '', label: 'Communities Reached' },
            ].map((stat, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="p-6 bg-[#111] rounded-lg border border-gray-800 transform hover:-translate-y-2 transition-transform duration-300">
                <div className="text-4xl md:text-5xl font-bold text-shecanRed mb-2">
                  {stat.end}{stat.suffix}
                </div>
                <div className="text-gray-400 font-medium uppercase tracking-wide text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* NEW: Global Reach Map */}
      <section className="py-20 bg-shecanDark overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h3 className="text-4xl md:text-5xl font-extrabold text-white">Global Reach</h3>
            <div className="w-16 h-1 bg-shecanRed mx-auto mt-6"></div>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">We are expanding our reach to communities worldwide, bringing education and empowerment where it's needed most.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-4xl mx-auto border border-gray-800 rounded-xl bg-[#111] p-4"
          >
            <ComposableMap projectionConfig={{ scale: 140 }}>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography 
                      key={geo.rsmKey} 
                      geography={geo} 
                      fill="#1a1a1a" 
                      stroke="#333" 
                      strokeWidth={0.5} 
                      style={{
                        default: { outline: "none" },
                        hover: { fill: "#222", outline: "none" },
                        pressed: { outline: "none" },
                      }}
                    />
                  ))
                }
              </Geographies>
              {markers.map(({ name, coordinates, markerOffset }) => (
                <Marker key={name} coordinates={coordinates}>
                  <circle r={4} fill="#ff0000" stroke="#fff" strokeWidth={1.5} />
                  <text
                    textAnchor="middle"
                    y={markerOffset}
                    style={{ fontFamily: "Inter, sans-serif", fill: "#fff", fontSize: "10px", fontWeight: "bold" }}
                  >
                    {name}
                  </text>
                </Marker>
              ))}
            </ComposableMap>
          </motion.div>
        </div>
      </section>

      {/* 4. Gallery Section (Carousel) */}
      <section id="gallery" className="py-20 bg-black">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h3 className="text-4xl md:text-5xl font-extrabold text-white">Our Gallery</h3>
            <div className="w-16 h-1 bg-shecanRed mx-auto mt-6"></div>
          </motion.div>
          
          <motion.div
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
          >
            <Swiper
              modules={[Navigation, Pagination, Autoplay, EffectFade]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="pb-12"
            >
              {[
                "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=800&q=80",
              ].map((src, idx) => (
                <SwiperSlide key={idx}>
                  <img src={src} alt={`Gallery ${idx}`} className="w-full h-80 object-cover rounded-xl" />
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </div>
      </section>

      {/* 5. Volunteer Form */}
      <section id="volunteer" className="py-20 bg-shecanDark">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
           <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h3 className="text-4xl md:text-5xl font-extrabold text-white">Join Our Team</h3>
            <p className="mt-4 text-gray-400">Join our team and make a difference in the lives of women in need.</p>
            <div className="w-16 h-1 bg-shecanRed mx-auto mt-6"></div>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="bg-[#1a1a1a] p-8 md:p-12 rounded-xl border border-gray-800 relative shadow-2xl"
          >
             {submitStatus && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }} 
                animate={{ opacity: 1, y: 0 }}
                className={`absolute top-0 left-0 w-full p-4 rounded-t-xl text-center font-bold ${submitStatus.type === 'success' ? 'bg-green-600' : 'bg-red-600'} text-white z-20`}
              >
                {submitStatus.message}
              </motion.div>
            )}
            
            <form onSubmit={handleSubmit} className={`space-y-6 ${submitStatus ? 'mt-8' : ''}`}>
               <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name *</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full bg-[#111] border border-gray-700 rounded px-4 py-3 text-white focus:outline-none focus:border-shecanRed focus:ring-1 focus:ring-shecanRed transition-colors" placeholder="Jane Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full bg-[#111] border border-gray-700 rounded px-4 py-3 text-white focus:outline-none focus:border-shecanRed focus:ring-1 focus:ring-shecanRed transition-colors" placeholder="jane@example.com" />
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number *</label>
                  <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} className="w-full bg-[#111] border border-gray-700 rounded px-4 py-3 text-white focus:outline-none focus:border-shecanRed focus:ring-1 focus:ring-shecanRed transition-colors" placeholder="+1 (555) 000-0000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">City *</label>
                  <input type="text" name="city" required value={formData.city} onChange={handleInputChange} className="w-full bg-[#111] border border-gray-700 rounded px-4 py-3 text-white focus:outline-none focus:border-shecanRed focus:ring-1 focus:ring-shecanRed transition-colors" placeholder="Mumbai" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">State *</label>
                  <input type="text" name="state" required value={formData.state} onChange={handleInputChange} className="w-full bg-[#111] border border-gray-700 rounded px-4 py-3 text-white focus:outline-none focus:border-shecanRed focus:ring-1 focus:ring-shecanRed transition-colors" placeholder="Maharashtra" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Area of Interest *</label>
                <select name="areaOfInterest" required value={formData.areaOfInterest} onChange={handleInputChange} className="w-full bg-[#111] border border-gray-700 rounded px-4 py-3 text-white focus:outline-none focus:border-shecanRed focus:ring-1 focus:ring-shecanRed transition-colors appearance-none">
                  <option value="" disabled>Select an area</option>
                  <option value="Women Empowerment">Women Empowerment</option>
                  <option value="Education">Education</option>
                  <option value="Skill Development">Skill Development</option>
                  <option value="Community Outreach">Community Outreach</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Why Do You Want To Volunteer?</label>
                <textarea name="volunteerReason" rows="3" value={formData.volunteerReason} onChange={handleInputChange} className="w-full bg-[#111] border border-gray-700 rounded px-4 py-3 text-white focus:outline-none focus:border-shecanRed focus:ring-1 focus:ring-shecanRed transition-colors" placeholder="Tell us a bit about your motivation..."></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea name="message" rows="4" value={formData.message} onChange={handleInputChange} className="w-full bg-[#111] border border-gray-700 rounded px-4 py-3 text-white focus:outline-none focus:border-shecanRed focus:ring-1 focus:ring-shecanRed transition-colors" placeholder="Any additional information..."></textarea>
              </div>

              <div className="flex items-center">
                <input type="checkbox" name="newsletter" id="newsletter" checked={formData.newsletter} onChange={handleInputChange} className="h-4 w-4 text-shecanRed focus:ring-shecanRed border-gray-700 rounded bg-[#111]" />
                <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-300">
                  Subscribe to our newsletter for updates
                </label>
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full bg-shecanRed hover:bg-red-700 text-white font-bold py-4 rounded transition-colors disabled:opacity-70 flex justify-center items-center">
                {isSubmitting ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : 'Submit Application'}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Home;
