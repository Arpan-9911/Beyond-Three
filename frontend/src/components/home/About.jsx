import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { useSelector } from "react-redux";

const About = () => {
  const { lang } = useLanguage();

  // Dummy data simulating textarea input
  const about = useSelector((state) => state?.about);
  if(!about || !about?.whoWeAre) return null

  const getText = (localizedObj) => (lang === "hi" ? localizedObj?.hi || localizedObj?.en : localizedObj?.en || localizedObj?.hi);

  const stripHtml = (html) => {
    if (!html) return "";
    const temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || "";
  };

  // Truncate text up to 200 characters while keeping line breaks
  const truncateText = (text, limit = 300) => {
    if (!text) return "";
    const lines = text.split("\n");
    let result = "";
    for (let line of lines) {
      if ((result + line).length > limit) {
        const remaining = limit - result.length;
        result += line.slice(0, remaining) + "...";
        break;
      }
      result += line + "\n";
    }
    return result.trim();
  };

  return (
    <section className="bg-amber-50 text-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">

        {/* Who We Are */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-700">
            {lang === "hi" ? "हम कौन हैं" : "Who We Are"}
          </h2>
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed whitespace-pre-line">
            {truncateText(stripHtml(getText(about.whoWeAre.description)))}
          </p>
          <Link
            to={"/join"}
            className="inline-block px-6 py-2 bg-amber-700 text-white font-semibold rounded-lg hover:bg-amber-800 transition"
          >
            { lang === "hi" ? "जोड़ें" : "Join Us"}
          </Link>
        </div>

        {/* Founder */}
        <div className="flex flex-col md:flex-row items-center justify-center md:gap-12 gap-4">
          <div>
            <img
              src={import.meta.env.VITE_UPLOADS + about.founder.image}
              alt={getText(about.founder.name)}
              className="w-full md:min-w-80 md:max-w-100 rounded-3xl shadow-lg object-cover mx-auto"
            />
          </div>
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold text-amber-700">
              {getText(about.founder.name)}
            </h3>
            <p className="text-amber-600 font-semibold">{getText(about.founder.title)}</p>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg md:text-base">
              {truncateText(stripHtml(getText(about.founder.description)))}
            </p>
            <Link
              to={"/about"}
              className="inline-block mt-2 px-6 py-2 bg-amber-800 text-white font-semibold rounded-lg hover:bg-amber-900 transition"
            >
              {lang === "hi" ? "जानें" : "Learn More"}
            </Link>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 text-center md:text-left">
          <div className="bg-white md:p-8 p-4 rounded-3xl shadow-md space-y-2">
            <h3 className="text-2xl font-semibold text-amber-700">
              {lang === "hi" ? "हमारा मिशन" : "Our Mission"}
            </h3>
            <p className="text-gray-700 whitespace-pre-line">
              {truncateText(getText(about.missionVision.mission))}
            </p>
          </div>
          <div className="bg-white md:p-8 p-4 rounded-3xl shadow-md space-y-2">
            <h3 className="text-2xl font-semibold text-amber-700">
              {lang === "hi" ? "हमारी दृष्टि" : "Our Vision"}
            </h3>
            <p className="text-gray-700 whitespace-pre-line">
              {truncateText(getText(about.missionVision.vision))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
