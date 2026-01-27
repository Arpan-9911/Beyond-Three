import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import Img from "../assets/HeroBG.jpg";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const truncateText = (text, limit = 90) => {
  return text.length > limit ? text.substring(0, limit) + "..." : text;
};

const Blogs = () => {
  const { lang } = useLanguage();
  const blogs = [
    {
      id: 1,
      title: {
        en: "Empowering Rural Youth through Education",
        hi: "शिक्षा के माध्यम से ग्रामीण युवाओं को सशक्त बनाना",
      },
      date: "Jan 15, 2026",
      author: { en: "Team Beyond Three", hi: "बियॉन्ड थ्री टीम" },
      excerpt: {
        en: "Our recent initiative in rural areas has shown significant improvement in digital literacy among youth.",
        hi: "ग्रामीण क्षेत्रों में हमारी हालिया पहल ने युवाओं के बीच डिजिटल साक्षरता में महत्वपूर्ण सुधार दिखाया है।",
      },
      content: {
        en: "Full blog content goes here...",
        hi: "पूरा ब्लॉग कंटेंट यहाँ होगा...",
      },
      image: Img,
    },
    {
      id: 2,
      title: {
        en: "Holistic Health in Modern Times",
        hi: "आधुनिक समय में समग्र स्वास्थ्य",
      },
      date: "Jan 05, 2026",
      author: { en: "Dr. Anjali Verma", hi: "डॉ. अंजलि वर्मा" },
      excerpt: {
        en: "Balancing mental and physical well-being is crucial.",
        hi: "मानसिक और शारीरिक कल्याण को संतुलित करना महत्वपूर्ण है।",
      },
      content: {
        en: "Full blog content goes here...",
        hi: "पूरा ब्लॉग कंटेंट यहाँ होगा...",
      },
      image: Img,
    },
  ];
  const [selectedBlog, setSelectedBlog] = useState(null);
  const t = {
    title: { en: "Our Blogs", hi: "हमारे ब्लॉग" },
    readMore: { en: "Read More →", hi: "और पढ़ें →" },
    author: { en: "By", hi: "द्वारा" },
    postedOn: { en: "Posted on", hi: "प्रकाशित" },
  };

  return (
    <div className="bg-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-10 pt-20 min-h-dvh">
        <h1 className="border-l-4 border-lime-400 pl-4 md:text-4xl text-3xl font-bold text-emerald-700 mb-8">
          {t.title[lang]}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden flex flex-col"
            >
              <img
                src={blog.image}
                alt={blog.title[lang]}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 flex flex-col grow">
                <span className="text-xs text-gray-500">{t.author[lang]} {blog.author[lang]} •{" "}{blog.date}</span>
                <h3 className="text-lg font-semibold text-emerald-700 mb-2">
                  {blog.title[lang]}
                </h3>
                <p className="text-gray-600 text-sm mb-4 grow">
                  {truncateText(blog.excerpt[lang])}
                </p>
                <button
                  onClick={() => setSelectedBlog(blog)}
                  className="text-emerald-700 font-medium hover:underline text-sm self-start"
                >
                  {lang === "hi" ? "और पढ़ें →" : "Read More →"}
                </button>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-3xl">
            <button
              onClick={() => setSelectedBlog(null)}
              className="absolute top-4 right-4 bg-white text-black w-9 h-9 rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 hover:text-white transition z-20"
            >
              ✕
            </button>
            <div className="bg-white rounded-xl overflow-y-auto max-h-[90vh] hide-scrollbar">
              <img
                src={selectedBlog.image}
                alt={selectedBlog.title[lang]}
                className="w-full max-h-[60vh] object-contain bg-black"
              />
              <div className="p-6">
                <h2 className="sm:text-2xl text-xl font-bold text-emerald-700 mb-3">
                  {selectedBlog.title[lang]}
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  {t.author[lang]} {selectedBlog.author[lang]} •{" "}
                  {selectedBlog.date}
                </p>
                <p className="text-gray-700">
                  {selectedBlog.excerpt[lang]}
                </p>
                <p className="text-gray-700 mt-2">
                  {selectedBlog.content[lang]}
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
