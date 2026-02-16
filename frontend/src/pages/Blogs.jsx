import React, { useEffect, useState, useMemo } from "react";
import { useLanguage } from "../context/LanguageContext";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const truncateText = (text = "", limit = 90) =>
  text.length > limit ? text.substring(0, limit) + "..." : text;

const Blogs = () => {
  const { lang } = useLanguage();
  const { id } = useParams();
  const blogs = useSelector((state) => state.blogs);

  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 8;

  const selectedBlog = useMemo(() => {
    if (id) {
      return blogs.find((b) => String(b._id) === String(id)) || null;
    }
    return null;
  }, [id, blogs]);

  const t = {
    title: { en: "Our Blogs", hi: "हमारे ब्लॉग" },
    readMore: { en: "Read More", hi: "और पढ़ें" },
    author: { en: "By", hi: "द्वारा" },
  };

  // language fallback
  const getLangText = (obj) => {
    if (!obj) return "";
    return lang === "hi"
      ? obj?.hi || obj?.en || ""
      : obj?.en || obj?.hi || "";
  };

  // pagination
  const totalPages = Math.ceil(blogs.length / ITEMS_PER_PAGE);

  const paginatedBlogs = useMemo(
    () =>
      blogs.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
      ),
    [blogs, currentPage]
  );

  useEffect(() => {
    document.body.style.overflow = selectedBlog ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [selectedBlog]);

  return (
    <div className="bg-amber-100">
      <Header />
      <main className="max-w-7xl mx-auto px-4 md:py-10 py-4 min-h-dvh">
        <h1 className="border-l-4 border-yellow-400 pl-4 md:text-4xl text-3xl font-bold text-amber-700 md:mb-8 mb-4">
          {t.title[lang]}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:gap-8 gap-4">
          {paginatedBlogs.map((blog) => (
            <article
              key={blog._id}
              className="bg-white rounded-4xl shadow-xl hover:shadow-2xl transition overflow-hidden flex flex-col group"
            >
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={import.meta.env.VITE_UPLOADS + blog.image}
                  alt={getLangText(blog.title)}
                  className="w-full h-48 object-cover group-hover:scale-110 transition duration-300"
                />
              </div>
              <div className="p-5 flex flex-col grow">
                <span className="text-xs text-gray-500">
                  {t.author[lang]} {blog.author} •{" "}
                  {new Date(blog.date).toLocaleDateString("en-GB")}
                </span>
                <h3 className="text-lg font-semibold text-amber-700 mb-2">
                  {getLangText(blog.title)}
                </h3>
                <p className="text-gray-600 text-sm mb-4 grow">
                  {truncateText(getLangText(blog.content))}
                </p>
                <Link
                  to={`/blogs/${blog._id}`}
                  className="text-amber-700 font-medium hover:underline text-sm self-start cursor-pointer"
                >
                  {t.readMore[lang]}
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
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

        {blogs.length === 0 && (
          <p className="text-center text-gray-500 py-10">
            {lang === "hi" ? "कोई ब्लॉग उपलब्ध नहीं है" : "No blogs available"}
          </p>
        )}
      </main>

      {/* Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-3xl">
            <Link
              to="/blogs"
              className="absolute top-4 right-4 bg-white w-9 h-9 rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 hover:text-white transition z-20"
            >
              ✕
            </Link>
            <div className="bg-white rounded-4xl overflow-y-auto max-h-[90vh] hide-scrollbar">
              <img
                src={import.meta.env.VITE_UPLOADS + selectedBlog.image}
                alt={getLangText(selectedBlog.title)}
                className="w-full max-h-[60vh] object-contain bg-black"
              />
              <div className="p-6">
                <h2 className="sm:text-2xl text-xl font-bold text-amber-700 mb-3">
                  {getLangText(selectedBlog.title)}
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  {t.author[lang]} {selectedBlog.author} •{" "}
                  {new Date(selectedBlog.date).toLocaleDateString("en-GB")}
                </p>
                <p className="text-gray-700 whitespace-pre-line">
                  {getLangText(selectedBlog.content)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Blogs;