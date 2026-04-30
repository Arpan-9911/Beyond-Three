import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { useSelector } from "react-redux";

const About = () => {
  const { lang } = useLanguage();

  // Dummy data simulating textarea input
  const about = useSelector((state) => state?.about);
  if(!about || !about?.whoWeAre || !about?.founder || !about?.methodology) return null

  const getText = (localizedObj) => (lang === "hi" ? localizedObj?.hi || localizedObj?.en : localizedObj?.en || localizedObj?.hi);

  const stripHtml = (html) => {
    if (!html) return "";
    const temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || "";
  };

  // Truncate text up to 200 characters while keeping line breaks
  const truncateText = (text, limit = 500) => {
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
    <section className="overflow-hidden bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 py-10 md:space-y-20 space-y-6">
        <div className="text-center">
          <span className="uppercase tracking-[0.25em] text-amber-700 font-bold">{lang === "hi" ? "हमारे बारे में" : "Who we are"}</span>
        </div>
        <div className="grid md:grid-cols-2 md:gap-20 gap-6 items-center text-justify">
          <div>
            <h2 className="text-amber-900 text-2xl md:text-4xl font-extrabold leading-tight mb-2">{lang === "hi" ? "बिऑन्ड थ्री के बारे में" : "About Beyond Three"}</h2>
            <p className="text-gray-700 sm:leading-relaxed mb-6">{truncateText(stripHtml(getText(about?.whoWeAre?.description)))}</p>
            <Link
              to="/join"
              className="inline-flex items-center gap-2 px-7 py-3 
                      bg-amber-700 text-white font-semibold rounded-xl 
                        shadow-md hover:bg-amber-800 hover:shadow-xl 
                        transition-all duration-300 group"
            >
              Join Our Mission
              <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-xl ring-4 ring-amber-900">
            <img
              src={import.meta.env.VITE_UPLOADS + about?.whoWeAre?.image}
              className="w-full h-full object-cover max-h-100"
              alt=""
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-20 gap-6 items-center text-justify">
          <div className="rounded-3xl overflow-hidden shadow-xl ring-4 ring-amber-900 max-md:hidden">
            <img
              src={import.meta.env.VITE_UPLOADS + about?.founder?.image}
              className="w-full h-full object-cover max-h-100"
              alt=""
            />
          </div>
          <div>
            <h2 className="text-amber-900 text-2xl md:text-4xl font-extrabold leading-tight">{getText(about?.founder?.name)}</h2>
            <p className="mb-2 text-amber-700">{getText(about?.founder?.title)}</p>
            <p className="text-gray-700 md:leading-relaxed mb-6">{truncateText(stripHtml(getText(about?.founder?.description)))}</p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-7 py-3 
                      bg-amber-700 text-white font-semibold rounded-xl 
                        shadow-md hover:bg-amber-800 hover:shadow-xl 
                        transition-all duration-300 group"
            >
              Read More
              <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-xl ring-4 ring-amber-900 md:hidden">
            <img
              src={import.meta.env.VITE_UPLOADS + about?.founder?.image}
              className="w-full h-full object-cover max-h-100"
              alt=""
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-20 gap-6 items-center text-justify">
          <div>
            <h2 className="text-amber-900 text-2xl md:text-4xl font-extrabold leading-tight mb-2">{lang === "hi" ? "हमारी पद्धती" : "Our Methodology"}</h2>
            <p className="text-gray-700 md:leading-relaxed mb-6">{truncateText(stripHtml(getText(about?.methodology?.description)))}</p>
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 px-7 py-3 
                      bg-amber-700 text-white font-semibold rounded-xl 
                        shadow-md hover:bg-amber-800 hover:shadow-xl 
                        transition-all duration-300 group"
            >
              View Our Blogs
              <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-xl ring-4 ring-amber-900">
            <img
              src={import.meta.env.VITE_UPLOADS + about?.methodology?.image}
              className="w-full h-full object-cover max-h-100"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;