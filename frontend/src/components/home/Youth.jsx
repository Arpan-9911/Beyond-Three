import React from 'react';
import { FaBolt, FaUsers } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';
import { Link } from 'react-router-dom';

const Youth = () => {
  const { lang } = useLanguage();
  const youthData = {
    subtitle: { en: "EMPOWERMENT", hi: "सशक्तिकरण" },
    title: { en: "Youth Projects", hi: "युवा परियोजनाएं" },
    button: { en: "View All", hi: "सभी देखें" },
    projects: [
      {
        icon: <FaBolt className="text-3xl text-lime-400" />,
        title: { en: "Mental Health Awareness", hi: "मानसिक स्वास्थ्य जागरूकता" },
        desc: {
          en: "Strengthening youth mental health through natural ways.",
          hi: "प्राकृतिक तरीकों से युवाओं के मानसिक स्वास्थ्य को मजबूत करना।"
        }
      },
      {
        icon: <FaUsers className="text-3xl text-lime-400" />,
        title: { en: "Skill Development", hi: "कौशल विकास" },
        desc: {
          en: "Initiative to make youth self-reliant through nature-based jobs.",
          hi: "प्रकृति-आधारित नौकरियों के माध्यम से युवाओं को आत्मनिर्भर बनाने की पहल।"
        }
      }
    ]
  };

  return (
    <section className="bg-emerald-800 py-10 px-4 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div className="space-y-2 text-left">
            <span className="text-lime-400 font-bold tracking-widest text-xs uppercase">
              {youthData.subtitle[lang]}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">
              {youthData.title[lang]}
            </h2>
          </div>
          <Link to={"/projects"} className="bg-lime-400 text-emerald-700 px-8 py-3 rounded-full font-bold hover:bg-lime-300 transition-colors w-fit">
            {youthData.button[lang]}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 gap-4">
          {youthData.projects.map((project, index) => (
            <div
              key={index}
              className="bg-emerald-700 p-6 rounded-2xl border border-white/10 hover:bg-emerald-600 transition duration-300 group"
            >
              <div className="mb-6 group-hover:-translate-y-2 transition duration-300">
                {project.icon}
              </div>
              <h3 className="md:text-2xl text-xl font-bold md:mb-4 mb-2">
                {project.title[lang]}
              </h3>
              <p className="text-gray-300 md:text-lg leading-relaxed">
                {project.desc[lang]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Youth;