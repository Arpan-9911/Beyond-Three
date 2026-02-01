import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaLeaf, FaBars, FaTimes } from "react-icons/fa";
import { useLanguage } from "../../context/LanguageContext";

const text = {
  en: {
    home: "HOME",
    about: "ABOUT US",
    projects: "PROJECTS",
    events: "EVENTS",
    blogs: "BLOGS",
    join: "JOIN US",
    news: "NEWS",
    tours: "TOURS",
    media: "MEDIA",
    contact: "CONTACT",
    appointment: "APPOINTMENT",
    login: "LOGIN",
    memberLogin: "Member Login",
    adminLogin: "Admin Login",
    langBtn: "हिंदी",
  },
  hi: {
    home: "होम",
    about: "हमारे बारे में",
    projects: "परियोजनाएं",
    events: "कार्यक्रम",
    blogs: "ब्लॉग",
    join: "हमसे जुड़ें",
    news: "समाचार",
    tours: "यात्राएं",
    media: "मीडिया",
    contact: "संपर्क",
    appointment: "अपॉइंटमेंट",
    login: "लॉगिन",
    memberLogin: "सदस्य लॉगिन",
    adminLogin: "एडमिन लॉगिन",
    langBtn: "EN",
  },
};

const Header = () => {
  const { lang, toggleLang } = useLanguage();
  const t = text[lang];
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navClass = ({ isActive }) =>
    `relative transition-all duration-300 
     ${isActive ? "text-yellow-500 font-bold" : "text-amber-700"}
     after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-yellow-500
     after:transition-all after:duration-300 
     ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`;

  const navLinks = (
    <>
      <NavLink to="/" className={navClass} onClick={() => setMenuOpen(false)}>{t.home}</NavLink>
      <NavLink to="/about" className={navClass} onClick={() => setMenuOpen(false)}>{t.about}</NavLink>
      <NavLink to="/projects" className={navClass} onClick={() => setMenuOpen(false)}>{t.projects}</NavLink>
      <NavLink to="/events" className={navClass} onClick={() => setMenuOpen(false)}>{t.events}</NavLink>
      <NavLink to="/blogs" className={navClass} onClick={() => setMenuOpen(false)}>{t.blogs}</NavLink>
      <NavLink to="/join" className={navClass} onClick={() => setMenuOpen(false)}>{t.join}</NavLink>
      <NavLink to="/news" className={navClass} onClick={() => setMenuOpen(false)}>{t.news}</NavLink>
      <NavLink to="/tours" className={navClass} onClick={() => setMenuOpen(false)}>{t.tours}</NavLink>
      <NavLink to="/media" className={navClass} onClick={() => setMenuOpen(false)}>{t.media}</NavLink>
      <NavLink to="/contact" className={navClass} onClick={() => setMenuOpen(false)}>{t.contact}</NavLink>
    </>
  );

  return (
    <header className={`${menuOpen ? "fixed" : "sticky"} top-0 left-0 w-full z-50 transition duration-300 bg-white shadow-lg`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:py-3 py-2">
        <div className="flex items-center gap-2 text-lg font-bold">
          <div className="sm:w-9 w-5 sm:h-9 h-5 p-1 rounded-full bg-amber-600 flex items-center justify-center text-white shadow-md">
            <FaLeaf />
          </div>
          <span className="text-amber-700">
            {lang === "en" ? "Beyond Three" : "बियॉन्ड थ्री"}
          </span>
        </div>
        <nav className="hidden lg:flex gap-3.5 text-xs items-center font-bold">
          {navLinks}
          <button
            onClick={toggleLang}
            className="cursor-pointer border border-amber-500 px-2 py-1 rounded-full text-amber-600 hover:bg-amber-500 hover:text-white"
          >
            {t.langBtn}
          </button>
          <Link to="/appointment" className="cursor-pointer bg-yellow-400 text-black px-3 py-1 rounded-full font-semibold hover:bg-yellow-300 shadow-md">
            {t.appointment}
          </Link>
          <div className="relative">
            <button
              onClick={() => setLoginOpen(!loginOpen)}
              className="cursor-pointer bg-amber-700 text-white px-3 py-1 rounded-full font-semibold hover:bg-amber-600 shadow-md"
            >
              {t.login}
            </button>
            {loginOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg text-xs z-50">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 rounded-lg hover:bg-amber-100 text-amber-700"
                  onClick={() => setLoginOpen(false)}
                >
                  {t.memberLogin}
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 rounded-lg hover:bg-amber-100 text-amber-700"
                  onClick={() => setLoginOpen(false)}
                >
                  {t.adminLogin}
                </a>
              </div>
            )}
          </div>
        </nav>
        <div className="lg:hidden flex items-center gap-3">
          <button
            onClick={toggleLang}
            className="border border-amber-500 px-2 py-1 rounded-full text-amber-600 text-xs"
          >
            {t.langBtn}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-amber-700 text-xl"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 bg-white shadow-lg
        ${menuOpen ? "py-4" : "max-h-0"}
        `}
      >
        <div className="flex flex-col items-start gap-3 px-6 text-xs font-semibold">
          {navLinks}
          <Link to="/appointment" className="block bg-yellow-400 text-black px-5 py-1 rounded-full font-semibold shadow-md">
            {t.appointment}
          </Link>
          <div className="">
            <p className="text-amber-700 font-bold mb-1">{t.login}</p>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="block bg-yellow-400 text-black px-5 py-1 rounded-full font-semibold shadow-md mb-2"
            >
              {t.memberLogin}
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="block bg-amber-700 text-white px-5 py-1 rounded-full font-semibold shadow-md"
            >
              {t.adminLogin}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;