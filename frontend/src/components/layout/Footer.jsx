import React from "react";
import { Link } from "react-router-dom";
import { FaLeaf, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { useLanguage } from "../../context/LanguageContext";

const Footer = () => {
  const { lang } = useLanguage();

  const contactData = {
    address: {
      hi: "शांति आश्रम, ऋषिकेश",
      en: "Shanti Ashram, Rishikesh",
    },
    phone: "+91 9990001111",
    email: "info@beyondthree.org",
  };

  return (
    <footer className="bg-black text-white py-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <FaLeaf className="text-yellow-400 text-3xl" />
            <h2 className="text-2xl font-bold">{lang === "en" ? "Beyond Three" : "बियॉन्ड थ्री"}</h2>
          </div>
          <p className="text-gray-400 max-w-xs">
            {lang === "hi"
              ? "प्रकृति की गोद में एक नया स्वस्थ जीवन।"
              : "A new healthy life in the lap of nature."}
          </p>
          <div className="flex gap-4">
            <a href="https://www.facebook.com/groups/669434656870727" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="hover:text-yellow-400 transition-colors">
              <FaInstagram size={20} />
            </a>
            <a href="https://www.youtube.com/@beyondthreeofficial" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors">
              <FaYoutube size={20} />
            </a>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            {lang === "hi" ? "संपर्क" : "Contact"}
          </h3>
          <div className="space-y-2 text-gray-400">
            <p>{contactData.address[lang]}</p>
            <p>{contactData.phone}</p>
            <p>{contactData.email}</p>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            {lang === "hi" ? "परियोजनाएँ" : "Projects"}
          </h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link to="/projects" className="hover:text-yellow-400 transition-colors">
                {lang === "hi" ? "युवा परियोजनाएँ" : "Youth Projects"}
              </Link>
            </li>
            <li>
              <Link to="/projects" className="hover:text-yellow-400 transition-colors">
                {lang === "hi" ? "रोग मुक्त अभियान" : "Disease Free Campaign"}
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            {lang === "hi" ? "संसाधन" : "Resources"}
          </h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link to="/about" className="hover:text-yellow-400 transition-colors">
                {lang === "hi" ? "कानूनी दस्तावेज़" : "Legal Documents"}
              </Link>
            </li>
            <li>
              <Link to="/blogs" className="hover:text-yellow-400 transition-colors">
                {lang === "hi" ? "ब्लॉग" : "Blogs"}
              </Link>
            </li>
            <li>
              <Link to="/events" className="hover:text-yellow-400 transition-colors">
                {lang === "hi" ? "कार्यक्रम" : "Events"}
              </Link>
            </li>
            <li>
              <Link to="/news" className="hover:text-yellow-400 transition-colors">
                {lang === "hi" ? "समाचार" : "News"}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
        <p>
          © {new Date().getFullYear()} Beyond Three Trust.{" "}
          {lang === "hi" ? "सभी अधिकार सुरक्षित।" : "All rights reserved."} |{" "}
          Developed by{" "}
          <a href="#" className="hover:text-yellow-400 transition-colors">
            Surpanix
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
