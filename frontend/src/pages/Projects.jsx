import React, { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Youth from "../components/project_foms/Youth";
import Other from "../components/project_foms/Other";
import { useSelector } from "react-redux";

const truncateText = (text = "", limit = 90) =>
  text.length > limit ? text.substring(0, limit) + "..." : text;

// 🔥 language fallback helper
const getLangText = (lang, obj) => {
  if (!obj) return "";
  return lang === "hi"
    ? obj?.hi || obj?.en || ""
    : obj?.en || obj?.hi || "";
};

const Projects = () => {
  const { lang } = useLanguage();

  const projectCategories = useSelector((state) => state.projectCategories) || [];
  const projects = useSelector((state) => state.projects) || [];

  const [activeTab, setActiveTab] = useState(0);
  const [activeProject, setActiveProject] = useState(null);
  const [showFormFor, setShowFormFor] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  // 🔥 body scroll lock
  useEffect(() => {
    document.body.style.overflow = activeProject || showFormFor ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [activeProject, showFormFor]);

  const activeCategory = projectCategories?.[activeTab];
  const filteredItems = projects.filter(
    (proj) => proj.category === activeCategory?._id
  );
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const items = filteredItems.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="bg-amber-100">
      <Header />
      <div className="max-w-7xl mx-auto px-4 md:py-10 py-4 min-h-dvh">
        <h1 className="border-l-4 border-yellow-400 pl-4 md:text-4xl text-3xl font-bold text-amber-700 md:mb-8 mb-4">
          {lang === "hi" ? "हमारी परियोजनाएँ" : "Our Projects"}
        </h1>
        <div className="flex flex-wrap max-md:text-xs gap-2 md:mb-8 mb-4">
          {projectCategories.map((cat, index) => (
            <button
              key={cat._id}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-1 rounded-full cursor-pointer font-medium ${
                activeTab === index
                  ? "bg-amber-700 text-white"
                  : "bg-white hover:bg-yellow-200"
              }`}
            >
              {getLangText(lang, cat.name)}
            </button>
          ))}
        </div>
        {!items.length && (
          <p className="text-center text-gray-500 py-10">
            {lang === "hi"
              ? "कोई परियोजना उपलब्ध नहीं है"
              : "No projects available"}
          </p>
        )}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 md:gap-8 gap-4">
          {items.map((project) => (
            <div
              key={project._id}
              className="bg-white rounded-4xl shadow-xl hover:shadow-2xl overflow-hidden flex flex-col group"
            >
              <div className="w-full h-48 overflow-hidden bg-black">
                <img
                  src={
                    project.image
                      ? import.meta.env.VITE_UPLOADS +
                        project.image
                      : "/placeholder.jpg"
                  }
                  alt={getLangText(lang, project.title)}
                  className="w-full h-full object-cover group-hover:scale-110 duration-300"
                />
              </div>
              <div className="p-5 flex flex-col grow">
                <h3 className="text-lg font-semibold text-amber-700 mb-2">
                  {getLangText(lang, project.title)}
                </h3>
                <p className="text-gray-600 text-sm mb-4 grow">
                  {truncateText(
                    getLangText(lang, project.description)
                  )}
                </p>
                <div className="flex flex-wrap gap-3 items-center">
                  <button
                    onClick={() => setActiveProject(project)}
                    className="text-amber-700 font-medium hover:underline text-sm cursor-pointer"
                  >
                    {lang === "hi"
                      ? "और पढ़ें"
                      : "Read More"}
                  </button>
                  <button
                    onClick={() => setShowFormFor(project)}
                    className="bg-amber-700 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-amber-800 transition cursor-pointer"
                  >
                    {lang === "hi"
                      ? "अभी आवेदन करें"
                      : "Apply Now"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3 py-1 rounded bg-white shadow disabled:opacity-40"
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-amber-700 text-white"
                    : "bg-white"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1 rounded bg-white shadow disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>
      <Footer />

      {/* Project Modal */}
      {activeProject && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-3xl">
            <button
              onClick={() => setActiveProject(null)}
              className="absolute cursor-pointer top-4 right-4 bg-white w-9 h-9 rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 hover:text-white transition z-20"
            >
              ✕
            </button>
            <div className="bg-white rounded-4xl overflow-y-auto max-h-[90vh] hide-scrollbar">
              <img
                src={
                  import.meta.env.VITE_UPLOADS +
                  activeProject.image
                }
                className="w-full max-h-[60vh] object-contain bg-black"
              />
              <div className="p-6">
                <h2 className="sm:text-2xl text-xl font-bold text-amber-700 mb-3">
                  {getLangText(lang, activeProject.title)}
                </h2>
                <p className="text-gray-700 whitespace-pre-line">
                  {getLangText(
                    lang,
                    activeProject.description
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {showFormFor && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setShowFormFor(null)}
              className="absolute cursor-pointer top-4 right-4 bg-white w-9 h-9 rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 hover:text-white transition z-20"
            >
              ✕
            </button>
            <div className="bg-amber-100 rounded-4xl overflow-y-auto max-h-[90vh] hide-scrollbar">
              {showFormFor._id === projectCategories[0]?._id ? (
                <Youth />
              ) : (
                <Other />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
