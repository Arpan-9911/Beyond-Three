import React from 'react';
import { FaHeartbeat, FaUsers, FaSun } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';

const Resolution = () => {
  const { lang } = useLanguage();
  const resolutions = [
    {
      icon: <FaHeartbeat className="text-4xl text-amber-700" />,
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
      icon: <FaUsers className="text-4xl text-amber-700" />,
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
      icon: <FaSun className="text-4xl text-amber-700" />,
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
    <section className="bg-amber-100">
      <section className="max-w-7xl mx-auto px-4 text-center py-10">
        <h2 className="md:text-4xl text-3xl font-bold text-amber-700 mb-8">
          {lang === "hi" ? "हमारा संकल्प" : "Our Resolution"}
        </h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 md:gap-8 gap-4">
          {resolutions.map((res, index) => (
            <div
              key={index}
              className="bg-white rounded-4xl p-6 shadow-xl hover:shadow-2xl flex flex-col items-center transition duration-300 border border-gray-200"
            >
              <div className="p-3 rounded-full">
                {res.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800">
                {res.title[lang]}
              </h3>
              <p className="text-gray-500 max-w-60 text-sm mt-2">
                {res.description[lang]}
              </p>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default Resolution;