import React, { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const truncateText = (text = "", limit = 90) => {
  return text.length > limit ? text.substring(0, limit) + "..." : text;
};

const News = () => {
  const { lang } = useLanguage();
  const { id } = useParams();

  const news = useSelector((state) => state.news) || [];

  const ITEMS_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const getText = (obj) => {
    if (!obj) return "";
    return lang === "hi"
      ? obj?.hi || obj?.en || ""
      : obj?.en || obj?.hi || "";
  };

  const totalPages = Math.ceil(news.length / ITEMS_PER_PAGE);

  const paginatedNews = news.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const selectedNews = id
    ? news.find((item) => String(item._id) === String(id))
    : null;

  const t = {
    title: { en: "Latest News", hi: "ताज़ा समाचार" },
    readMore: { en: "Read More", hi: "और पढ़ें" },
  };

  useEffect(() => {
    document.body.style.overflow = selectedNews ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [selectedNews]);

  return (
    <div className="bg-amber-100">
      <Header />
      <main className="max-w-7xl mx-auto px-4 md:py-10 py-4 min-h-dvh">
        <h1 className="border-l-4 border-yellow-400 pl-4 md:text-4xl text-3xl font-bold text-amber-700 md:mb-8 mb-4">
          {getText(t.title)}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:gap-8 gap-4">
          {paginatedNews.map((item) => (
            <article
              key={item._id}
              className="bg-white rounded-4xl shadow-xl hover:shadow-2xl transition overflow-hidden flex flex-col group"
            >
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={import.meta.env.VITE_UPLOADS + item.image}
                  alt={getText(item.title)}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />
              </div>
              <div className="p-5 flex flex-col grow">
                <span className="text-xs text-gray-500">
                  {new Date(item.date).toLocaleDateString("en-GB")}
                </span>
                <h3 className="text-lg font-semibold text-amber-700 mb-2">
                  {getText(item.title)}
                </h3>
                <div
                  className="grow prose prose-sm mb-2 leading-snug max-w-none text-gray-700
                            prose-p:m-0
                            prose-ul:m-0
                            prose-ol:m-0
                            prose-li:m-0
                            prose-headings:m-0"
                  dangerouslySetInnerHTML={{
                    __html: truncateText(getText(item.content))
                  }}
                />
                <Link
                  to={`/news/${item._id}`}
                  className="text-amber-700 font-medium hover:underline text-sm self-start"
                >
                  {getText(t.readMore)}
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-2 flex-wrap">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-4 py-2 bg-amber-200 rounded-full disabled:opacity-50"
            >
              Prev
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-full ${
                  currentPage === i + 1
                    ? "bg-amber-600 text-white"
                    : "bg-amber-100"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-4 py-2 bg-amber-200 rounded-full disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </main>

      {/* Modal */}
      {selectedNews && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-3xl">
            <Link
              to="/news"
              className="absolute top-4 right-4 bg-white text-black w-9 h-9 rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 hover:text-white transition z-20"
            >
              ✕
            </Link>
            <div className="bg-white rounded-4xl overflow-y-auto max-h-[90vh] hide-scrollbar">
              <img
                src={import.meta.env.VITE_UPLOADS + selectedNews.image}
                alt={getText(selectedNews.title)}
                className="w-full max-h-[60vh] object-contain bg-black"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-amber-700 mb-3">
                  {getText(selectedNews.title)}
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  {new Date(selectedNews.date).toLocaleDateString("en-GB")}
                </p>
                <div
                  className="prose prose-md leading-snug max-w-none text-gray-700
                            prose-p:m-0
                            prose-ul:m-0
                            prose-ol:m-0
                            prose-li:m-0
                            prose-headings:m-0"
                  dangerouslySetInnerHTML={{
                    __html: getText(selectedNews.content),
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default News;
