import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-shecanDark text-white sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 bg-shecanRed p-2 rounded text-white font-bold text-xl tracking-wider hover:opacity-90 transition-opacity">
              SheCan
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="/#about" className="hover:text-shecanRed px-3 py-2 rounded-md text-sm font-medium transition-colors">About Us</a>
                <a href="/#impact" className="hover:text-shecanRed px-3 py-2 rounded-md text-sm font-medium transition-colors">Our Impact</a>
                <a href="/#gallery" className="hover:text-shecanRed px-3 py-2 rounded-md text-sm font-medium transition-colors">Gallery</a>
                <a href="/#volunteer" className="bg-shecanRed hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">Volunteer Now</a>
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-shecanDark">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-800">
            <a href="/#about" className="hover:text-shecanRed block px-3 py-2 rounded-md text-base font-medium">About Us</a>
            <a href="/#impact" className="hover:text-shecanRed block px-3 py-2 rounded-md text-base font-medium">Our Impact</a>
            <a href="/#gallery" className="hover:text-shecanRed block px-3 py-2 rounded-md text-base font-medium">Gallery</a>
            <a href="/#volunteer" className="bg-shecanRed block text-center mt-4 text-white px-4 py-2 rounded-md text-base font-medium">Volunteer Now</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
