import React, { useState, useEffect } from "react";
import { FaBolt, FaUsers, FaTimes } from "react-icons/fa";
import { useLanguage } from "../../context/LanguageContext";
import { Link } from "react-router-dom";

const Youth = () => {
  const { lang } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  const youthData = {
    subtitle: { en: "EMPOWERMENT", hi: "सशक्तिकरण" },
    title: { en: "Youth Projects", hi: "युवा परियोजनाएं" },
    button: { en: "View Details", hi: "विवरण देखें" },
    projects: [
      {
        icon: <FaBolt className="text-xl text-yellow-500" />,
        title: { en: "Mental Health", hi: "मानसिक स्वास्थ्य" },
        desc: {
          en: "Strengthening youth mental health.",
          hi: "युवाओं के मानसिक स्वास्थ्य को मजबूत करना।",
        },
      },
      {
        icon: <FaUsers className="text-xl text-yellow-500" />,
        title: { en: "Skill Dev", hi: "कौशल विकास" },
        desc: {
          en: "Nature-based jobs initiative.",
          hi: "प्रकृति-आधारित नौकरियों की पहल।",
        },
      },
    ],
  };

  useEffect(() => {
    // Trigger popup after a short delay or scroll
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isClosed) return null;

  return (
    <>
      {/* Overlay to dim background (optional, removed for 'pop up' feel, keeping it interactive) */}

      {/* 3rd Quarter Popup (Bottom-Left) */}
      <div
        className={`fixed z-50 bottom-[5%] left-[3%] w-[94%] md:w-[28rem] transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1) ${isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-20 opacity-0 scale-90"
          }`}
      >
        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-amber-500/20">

          {/* Header Background */}
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-amber-700 to-amber-600"></div>

          {/* Close Button */}
          <button
            onClick={() => setIsClosed(true)}
            className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors cursor-pointer"
          >
            <FaTimes />
          </button>

          <div className="relative z-10 p-6 pt-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg text-2xl">
                🚀
              </div>
              <div>
                <p className="text-amber-200 text-xs font-bold tracking-wider uppercase mb-0.5">
                  {youthData.subtitle[lang]}
                </p>
                <h3 className="text-white text-xl font-bold leading-none">
                  {youthData.title[lang]}
                </h3>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              {youthData.projects.map((project, index) => (
                <div key={index} className="flex gap-4 p-3 bg-gray-50 rounded-xl hover:bg-amber-50 transition-colors border border-gray-100">
                  <div className="mt-1">{project.icon}</div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">{project.title[lang]}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{project.desc[lang]}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/projects"
              className="mt-6 block w-full bg-amber-600 hover:bg-amber-700 text-white text-center font-bold py-3 rounded-xl transition-colors shadow-lg shadow-amber-600/30"
            >
              {youthData.button[lang]}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Youth;