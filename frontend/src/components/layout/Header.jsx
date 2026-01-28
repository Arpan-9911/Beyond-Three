import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
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
    langBtn: "EN",
  },
};

const Header = () => {
  const { lang, toggleLang } = useLanguage();
  const t = text[lang];

  const location = useLocation();
  const isHome = location.pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navClass = ({ isActive }) =>
    `relative transition-all duration-300 
     ${isActive ? "text-lime-500 font-bold" : isHome && !scrolled ? "text-black" : "text-emerald-700"}
     after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-lime-500
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
    <header
      className={`fixed top-0 left-0 w-full z-50 transition duration-300
      ${isHome && !scrolled && !menuOpen ? "bg-white/30" : "bg-white shadow-lg"}
      `}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:py-3 py-2">
        <div className="flex items-center gap-2 text-lg font-bold">
          <div className="sm:w-9 w-5 sm:h-9 h-5 p-1 rounded-full bg-emerald-600 flex items-center justify-center text-white shadow-md">
            <FaLeaf />
          </div>
          <span className={isHome && !scrolled ? "text-black" : "text-emerald-700"}>
            {lang === "en" ? "Beyond Three" : "बियॉन्ड थ्री"}
          </span>
        </div>
        <nav className="hidden lg:flex gap-3.5 text-xs items-center font-bold">
          {navLinks}
          <button
            onClick={toggleLang}
            className="cursor-pointer border border-emerald-500 px-2 py-1 rounded-full text-emerald-600 hover:bg-emerald-500 hover:text-white"
          >
            {t.langBtn}
          </button>
          <button className="cursor-pointer bg-lime-400 text-black px-3 py-1 rounded-full font-semibold hover:bg-lime-300 shadow-md">
            {t.appointment}
          </button>
          <button className="cursor-pointer bg-emerald-700 text-white px-3 py-1 rounded-full font-semibold hover:bg-emerald-600 shadow-md">
            {t.login}
          </button>
        </nav>

        <div className="lg:hidden flex items-center gap-3">
          <button
            onClick={toggleLang}
            className="border border-emerald-500 px-2 py-1 rounded-full text-emerald-600 text-xs"
          >
            {t.langBtn}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-emerald-700 text-xl"
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
          <button className="bg-lime-400 text-black px-5 py-1 rounded-full font-semibold shadow-md">
            {t.appointment}
          </button>
          <button className="bg-emerald-700 text-white px-5 py-1 rounded-full font-semibold shadow-md">
            {t.login}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
