import React from "react";
import { FaHeartbeat, FaUsers, FaSun } from "react-icons/fa";
import { useLanguage } from "../../context/LanguageContext";

const Resolution = () => {
  const { lang } = useLanguage();
  const resolutions = [
    {
      icon: <FaHeartbeat className="text-4xl text-amber-700" />,
      title: {
        en: "Pure Health",
        hi: "शुद्ध स्वास्थ्य",
      },
      description: {
        en: "Rejuvenation of the body without chemicals.",
        hi: "रसायनों के बिना शरीर का कायाकल्प।",
      },
    },
    {
      icon: <FaUsers className="text-4xl text-amber-700" />,
      title: {
        en: "Empowered Society",
        hi: "सशक्त समाज",
      },
      description: {
        en: "A community dedicated to mutual help.",
        hi: "आपसी मदद के लिए समर्पित एक समुदाय।",
      },
    },
    {
      icon: <FaSun className="text-4xl text-amber-700" />,
      title: {
        en: "Natural Joy",
        hi: "प्राकृतिक आनंद",
      },
      description: {
        en: "Mental peace in the presence of nature.",
        hi: "प्रकृति की उपस्थिति में मानसिक शांति।",
      },
    },
  ];

  return (
    <section className="relative bg-linear-to-b from-amber-800 via-amber-700 to-amber-900 py-12">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-yellow-300 mb-10 tracking-wide">
          {lang === "hi" ? "हमारा संकल्प" : "Our Resolution"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resolutions.map((res, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-amber-200 hover:-translate-y-1"
            >
              <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-linear-to-br from-amber-500 to-yellow-500 text-white shadow-md group-hover:scale-110 transition">
                {res.icon}
              </div>

              <h3 className="mt-4 text-lg font-bold text-amber-800">
                {res.title[lang]}
              </h3>
              <p className="mt-2 text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">
                {res.description[lang]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resolution;
