import React from 'react';
import { FaBolt, FaUsers } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';

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
    <section className="bg-[#0a4d3c] py-20 px-6 md:px-16 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2 text-left">
            <span className="text-lime-400 font-bold tracking-widest text-sm uppercase">
              {youthData.subtitle[lang]}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold">
              {youthData.title[lang]}
            </h2>
          </div>
          <button className="bg-lime-400 text-[#0a4d3c] px-8 py-3 rounded-full font-bold hover:bg-lime-300 transition-colors w-fit">
            {youthData.button[lang]}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {youthData.projects.map((project, index) => (
            <div
              key={index}
              className="bg-[#1a5d4c] p-10 rounded-[2rem] border border-white/10 hover:bg-[#1f6d5a] transition-all group"
            >
              <div className="mb-6 group-hover:scale-110 transition-transform duration-300 text-left">
                {project.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-left">
                {project.title[lang]}
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed text-left">
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