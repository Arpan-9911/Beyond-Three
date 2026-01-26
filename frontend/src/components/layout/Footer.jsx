import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { GiLeafSkeleton } from 'react-icons/gi';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <GiLeafSkeleton className="text-lime-400 text-3xl" />
            <h2 className="text-2xl font-bold">Beyond Three</h2>
          </div>
          <p className="text-gray-400 max-w-xs">
            A new healthy life in the lap of nature.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-lime-400 transition-colors">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="hover:text-lime-400 transition-colors">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="hover:text-lime-400 transition-colors">
              <FaYoutube size={20} />
            </a>
          </div>
        </div>

        {/* Contact Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Contact</h3>
          <div className="space-y-2 text-gray-400">
            <p>Shanti Ashram, Rishikesh</p>
            <p>+91 9990001111</p>
            <p>info@beyondthree.org</p>
          </div>
        </div>

        {/* Projects Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Projects</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#" className="hover:text-lime-400 transition-colors">Youth Projects</a>
            </li>
            <li>
              <a href="#" className="hover:text-lime-400 transition-colors">Med-Free Campaign</a>
            </li>
          </ul>
        </div>

        {/* Resources Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Resources</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#" className="hover:text-lime-400 transition-colors">Legal Documents</a>
            </li>
            <li>
              <a href="#" className="hover:text-lime-400 transition-colors">Blog</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
        <p>© 2024 Beyond Three Trust. All rights reserved. | Developed by <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-lime-400 transition-colors">Surpanix</a></p>
      </div>
    </footer>
  );
};

export default Footer;