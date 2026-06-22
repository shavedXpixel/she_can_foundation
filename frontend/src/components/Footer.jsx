import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">She Can Foundation</h3>
            <p className="text-sm leading-relaxed">
              Empowering women and creating a more equitable society. We provide support, resources, and training to women in communities across the globe.
            </p>
          </div>
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/#about" className="hover:text-shecanRed transition-colors">About Us</a></li>
              <li><a href="/#impact" className="hover:text-shecanRed transition-colors">Our Impact</a></li>
              <li><a href="/#gallery" className="hover:text-shecanRed transition-colors">Gallery</a></li>
              <li><a href="/admin" className="hover:text-shecanRed transition-colors">Admin Portal</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Get in touch</h3>
            <p className="text-sm mb-2">Email: info@shecanfoundation.org</p>
            <p className="text-sm">Contact: +91- 8283841830</p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
              <span className="text-gray-600">|</span>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} She Can Foundation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
