import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const FloatingSocials = () => {
  const socialLinks = [
    { icon: <FaFacebook />, url: "#", color: "bg-blue-600" },
    { icon: <FaTwitter />, url: "#", color: "bg-sky-500" },
    { icon: <FaInstagram />, url: "#", color: "bg-pink-600" },
    { icon: <FaLinkedin />, url: "#", color: "bg-blue-700" },
    { icon: <FaYoutube />, url: "#", color: "bg-red-600" },
  ];

  return (
    <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-1">
      {socialLinks.map((social, index) => (
        <a
          key={index}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${social.color} text-white p-3 hover:pr-6 transition-all duration-300 flex items-center justify-center rounded-l-md shadow-lg hover:w-14 w-10`}
        >
          <span className="text-xl">{social.icon}</span>
        </a>
      ))}
    </div>
  );
};

export default FloatingSocials;
