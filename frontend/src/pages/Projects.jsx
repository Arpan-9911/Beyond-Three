import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import Img from "../assets/HeroBG.jpg";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const truncateText = (text, limit = 90) => {
  return text.length > limit ? text.substring(0, limit) + "..." : text;
};

const Projects = () => {
  const { lang } = useLanguage();
  const projectCategories = [
    {
      id: 1,
      title: { en: "Youth Projects", hi: "युवा परियोजनाएँ" },
      projects: [
        {
          id: 101,
          title: {
            en: "Youth Awareness Program",
            hi: "युवा जागरूकता कार्यक्रम",
          },
          desc: {
            en: "This program focuses on educating youth about social responsibility, leadership, and community development through workshops and interactive sessions.",
            hi: "यह कार्यक्रम युवाओं को सामाजिक जिम्मेदारी, नेतृत्व और सामुदायिक विकास के बारे में शिक्षित करने पर केंद्रित है।",
          },
          image: Img,
        },
        {
          id: 102,
          title: {
            en: "Skill Development Initiative",
            hi: "कौशल विकास पहल",
          },
          desc: {
            en: "A structured initiative to enhance technical and soft skills among young individuals to prepare them for future opportunities.",
            hi: "युवाओं के तकनीकी और सॉफ्ट स्किल्स को विकसित करने के लिए एक संरचित पहल।",
          },
          image: Img,
        },
      ],
    },
    {
      id: 2,
      title: { en: "Disease Free Campaign", hi: "रोग मुक्त अभियान" },
      projects: [
        {
          id: 201,
          title: {
            en: "Health Awareness Drive",
            hi: "स्वास्थ्य जागरूकता अभियान",
          },
          desc: {
            en: "A campaign aimed at spreading awareness about healthy lifestyle, disease prevention, and holistic well-being.",
            hi: "स्वस्थ जीवनशैली, रोग रोकथाम और समग्र कल्याण के बारे में जागरूकता फैलाने के लिए अभियान।",
          },
          image: Img,
        },
      ],
    },
  ];
  const [activeTab, setActiveTab] = useState(0);
  const [activeProject, setActiveProject] = useState(null);

  return (
    <div className="bg-gray-100">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-10 min-h-dvh">
        <h1 className="border-l-4 border-lime-400 pl-4 md:text-4xl text-3xl font-bold text-emerald-700 mb-8">
          {lang === "hi" ? "हमारी परियोजनाएँ" : "Our Projects"}
        </h1>
        <div className="flex flex-wrap gap-2 mb-8">
          {projectCategories.map((cat, index) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-1 rounded-full cursor-pointer text-sm font-medium ${
                activeTab === index
                  ? "bg-emerald-700 text-white"
                  : "bg-white hover:bg-lime-200"
              }`}
            >
              {lang === "hi" ? cat.title.hi : cat.title.en}
            </button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projectCategories[activeTab].projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-4xl shadow-xl hover:shadow-2xl overflow-hidden flex flex-col group"
            >
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title[lang]}
                  className="w-full h-full object-cover group-hover:scale-110 duration-300"
                />
              </div>
              <div className="p-5 flex flex-col grow">
                <h3 className="text-lg font-semibold text-emerald-700 mb-2">
                  {project.title[lang]}
                </h3>
                <p className="text-gray-600 text-sm mb-4 grow">
                  {truncateText(project.desc[lang])}
                </p>
                <button
                  onClick={() => setActiveProject(project)}
                  className="text-emerald-700 font-medium hover:underline text-sm self-start cursor-pointer"
                >
                  {lang === "hi" ? "और पढ़ें →" : "Read More →"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />

      {activeProject && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-3xl">
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-4 right-4 bg-white text-black w-9 h-9 rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 hover:text-white transition z-20 cursor-pointer"
            >
              ✕
            </button>
            <div className="bg-white rounded-xl overflow-y-auto max-h-[90vh] hide-scrollbar">
              <img
                src={activeProject.image}
                alt={activeProject.title[lang]}
                className="w-full max-h-[60vh] object-contain bg-black"
              />
              <div className="p-6">
                <h2 className="sm:text-2xl text-xl font-bold text-emerald-700 mb-3">
                  {activeProject.title[lang]}
                </h2>
                <p className="text-gray-700">
                  {activeProject.desc[lang]}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;