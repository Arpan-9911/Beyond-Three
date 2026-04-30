import React from "react";
import { FaLeaf, FaBalanceScale, FaBrain } from "react-icons/fa";
import { useLanguage } from "../../context/LanguageContext";

const Resolution = () => {
  const { lang } = useLanguage();
  const resolutions = [
    {
      icon: <FaLeaf className="text-3xl text-white" />,
      title: {
        en: "Natural Healing",
        hi: "प्राकृतिक उपचार",
      },
      description: {
        en: "Heal naturally, live fully",
        hi: "प्राकृतिक रूप से उपचार करें, पूर्ण जीवन जिएं",
      },
    },
    {
      icon: <FaBalanceScale className="text-3xl text-white" />,
      title: {
        en: "Inner Balance",
        hi: "आंतरिक संतुलन",
      },
      description: {
        en: "Balance within, peace beyond",
        hi: "भीतर संतुलन, बाहर शांति",
      },
    },
    {
      icon: <FaBrain className="text-3xl text-white" />,
      title: {
        en: "Conscious Living",
        hi: "सचेत जीवन",
      },
      description: {
        en: "Live aware, live aligned",
        hi: "जागरूक रहें, संतुलित जीवन जिएं",
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
