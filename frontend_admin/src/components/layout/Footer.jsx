import React from "react";
import { FaLeaf, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 px-6 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          <FaLeaf className="text-yellow-400 text-3xl" />
          <h1 className="text-2xl font-bold">Beyond Three</h1>
        </div>
        <p className="text-gray-400 max-w-xs">A new healthy life in the lap of nature.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-yellow-400 transition-colors">
            <FaFacebookF size={20} />
          </a>
          <a href="#" className="hover:text-yellow-400 transition-colors">
            <FaInstagram size={20} />
          </a>
          <a href="#" className="hover:text-yellow-400 transition-colors">
            <FaYoutube size={20} />
          </a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
        <p>
          © {new Date().getFullYear()} Beyond Three Trust. All rights reserved. Developed by{" "}
          <a href="#" className="hover:text-yellow-400 transition-colors">
            Surpanix
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;