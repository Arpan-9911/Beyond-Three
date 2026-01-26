import React from 'react';
import { FaHeartbeat, FaUsers, FaSun } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';

const Resolution = () => {
  const { lang } = useLanguage();

  const resolutions = [
    {
      icon: <FaHeartbeat className="text-4xl text-emerald-800" />,
      title: {
        en: "Pure Health",
        hi: "शुद्ध स्वास्थ्य"
      },
      description: {
        en: "Rejuvenation of the body without chemicals.",
        hi: "रसायनों के बिना शरीर का कायाकल्प।"
      }
    },
    {
      icon: <FaUsers className="text-4xl text-emerald-800" />,
      title: {
        en: "Empowered Society",
        hi: "सशक्त समाज"
      },
      description: {
        en: "A community dedicated to mutual help.",
        hi: "आपसी मदद के लिए समर्पित एक समुदाय।"
      }
    },
    {
      icon: <FaSun className="text-4xl text-emerald-800" />,
      title: {
        en: "Natural Joy",
        hi: "प्राकृतिक आनंद"
      },
      description: {
        en: "Mental peace in the presence of nature.",
        hi: "प्रकृति की उपस्थिति में मानसिक शांति।"
      }
    }
  ];

  return (
    <section className="py-20 bg-gray-50 px-6 md:px-16 text-center">
      <h2 className="text-4xl font-bold text-emerald-900 mb-16">
        {lang === "hi" ? "हमारा संकल्प" : "Our Resolution"}
      </h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {resolutions.map((res, index) => (
          <div
            key={index}
            className="bg-white rounded-[2rem] p-10 shadow-sm flex flex-col items-center gap-6 hover:shadow-md transition-shadow duration-300 border border-gray-100"
          >
            <div className="p-4 rounded-full">
              {res.icon}
            </div>
            <h3 className="text-2xl font-bold text-gray-800">
              {res.title[lang]}
            </h3>
            <p className="text-gray-500 text-lg max-w-[250px]">
              {res.description[lang]}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Resolution;