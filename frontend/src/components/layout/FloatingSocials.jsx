import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

const FloatingSocials = () => {
  const socialLinks = [
    { icon: <FaFacebook />, url: "https://www.facebook.com/groups/669434656870727", color: "bg-blue-600" },
    { icon: <FaTwitter />, url: "#", color: "bg-sky-500" },
    { icon: <FaInstagram />, url: "#", color: "bg-pink-600" },
    { icon: <FaLinkedin />, url: "https://www.linkedin.com/in/beyond-three-1311231a0/", color: "bg-blue-700" },
    { icon: <FaYoutube />, url: "https://www.youtube.com/@beyondthreeofficial", color: "bg-red-600" },
    { icon: <FaWhatsapp />, url: "https://wa.me/917018149221", color: "bg-green-500" },
    { icon: <FaPhoneAlt />, url: "tel:+917018149221", color: "bg-amber-600" },
  ];

  return (
    <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-1">
      {socialLinks.map((social, index) => (
        <a
          key={index}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${social.color} text-white w-10 p-3 transition-all duration-300 flex items-center justify-center rounded-l-md shadow-lg hover:-translate-x-2 hover:scale-110 hover:shadow-xl`}
        >
          <span className="text-xl">{social.icon}</span>
        </a>
      ))}
    </div>
  );
};

export default FloatingSocials;
