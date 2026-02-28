import React, { useState, useEffect, useMemo } from "react";
import { FaTimes } from "react-icons/fa";
import { useLanguage } from "../../context/LanguageContext";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Youth = () => {
  const { lang } = useLanguage();
  const projectCategories = useSelector(
    (state) => state.projectCategories
  );
  const projects = useSelector(
    (state) => state.projects
  );

  const [isVisible, setIsVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  // ✅ Get first category safely
  const firstCategory = projectCategories?.[0];
  // ✅ Filter top 2 projects for first category
  const topProjects = useMemo(() => {
    if (!firstCategory || !projects) return [];
    return projects
      .filter(
        (project) =>
          project.category === firstCategory._id
      )
      .slice(0, 2);
  }, [projects, firstCategory]);
  // ✅ Show popup only if data exists
  useEffect(() => {
    if (firstCategory && topProjects.length > 0) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [firstCategory, topProjects]);

  // ✅ Helper for multilingual fallback
  const getLangValue = (obj) =>
    obj?.[lang] || obj?.en || obj?.hi || "";

  if (
    isClosed ||
    !firstCategory ||
    topProjects.length === 0
  ) return null;

  return (
    <div
      className={`fixed z-50 bottom-[5%] left-[3%] w-[94%] md:w-md transition-all duration-700 ${
        isVisible
          ? "translate-y-0 opacity-100 scale-100"
          : "translate-y-20 opacity-0 scale-90"
      }`}
    >
      <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-amber-500/20">
        <div className="absolute top-0 left-0 right-0 h-24 bg-linear-to-r from-amber-700 to-amber-600"></div>
        <button
          onClick={() => setIsClosed(true)}
          className="absolute cursor-pointer top-4 right-4 z-20 w-8 h-8 flex items-center justify-center bg-black/20 hover:bg-black/40 text-white rounded-full transition"
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
                {lang === "hi" ? "सशक्तिकरण" : "Empowerment"}
              </p>
              <h3 className="text-white text-xl font-bold leading-none">
                {getLangValue(firstCategory.name)}
              </h3>
            </div>
          </div>
          <div className="mt-8 space-y-4">
            {topProjects.map((project) => {
              const title = getLangValue(project.title);
              const rawDesc = getLangValue(project.description);
              const desc = rawDesc
                ? rawDesc.replace(/<[^>]*>/g, " ")
                : "";
              return (
                <div
                  key={project._id}
                  className="p-4 bg-gray-50 rounded-xl hover:bg-amber-50 transition border border-gray-100"
                >
                  <h4 className="font-bold text-gray-800 text-sm">
                    {title}
                  </h4>

                  {desc && (
                    <p className="text-xs text-gray-500 mt-1">
                      {desc.length > 80
                        ? desc.substring(0, 80) + "..."
                        : desc}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
          <Link
            to="/projects"
            className="mt-6 block w-full bg-amber-600 hover:bg-amber-700 text-white text-center font-bold py-3 rounded-xl transition shadow-lg shadow-amber-600/30"
          >
            {lang === "hi"
              ? "विवरण देखें"
              : "View Details"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Youth;