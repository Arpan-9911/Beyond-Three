import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import Img from "../assets/HeroBG.jpg";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const truncateText = (text, limit = 90) => {
  return text.length > limit ? text.substring(0, limit) + "..." : text;
};

const News = () => {
  const { lang } = useLanguage();

  const news = [
    {
      id: 1,
      title: {
        en: "Beyond Three Launches National Youth Helpline",
        hi: "बियॉन्ड थ्री ने राष्ट्रीय युवा हेल्पलाइन शुरू की",
      },
      date: "Jan 20, 2026",
      source: { en: "Times of India", hi: "टाइम्स ऑफ इंडिया" },
      excerpt: {
        en: "A new initiative aiming to provide 24/7 mental health support and career counseling to youth across the country.",
        hi: "देश भर के युवाओं को 24/7 मानसिक स्वास्थ्य सहायता और करियर परामर्श प्रदान करने के उद्देश्य से एक नई पहल।",
      },
      content: {
        en: "Beyond Three is proud to announce the launch of our National Youth Helpline. This 24/7 service is designed to provide immediate support to young individuals facing mental health challenges or seeking career guidance...",
        hi: "बियॉन्ड थ्री को हमारी राष्ट्रीय युवा हेल्पलाइन के शुभारंभ की घोषणा करते हुए गर्व हो रहा है...",
      },
      image: Img,
    },
    {
      id: 2,
      title: {
        en: "Annual Charity Gala Raises Over ₹50 Lakhs",
        hi: "वार्षिक चैरिटी गाला ने ₹50 लाख से अधिक जुटाए",
      },
      date: "Dec 15, 2025",
      source: { en: "Economic Times", hi: "इकोनॉमिक टाइम्स" },
      excerpt: {
        en: "The funds will be directed towards expanding our rural education projects in the coming year.",
        hi: "आने वाले वर्ष में हमारे ग्रामीण शिक्षा परियोजनाओं के विस्तार के लिए धन का उपयोग किया जाएगा।",
      },
      content: {
        en: "Our annual charity gala held last week was a resounding success...",
        hi: "पिछले सप्ताह आयोजित हमारा वार्षिक चैरिटी गाला एक बड़ी सफलता रही...",
      },
      image: Img,
    },
    {
      id: 3,
      title: {
        en: "Spotlight on Beyond Three's Water Conservation Project",
        hi: "बियॉन्ड थ्री की जल संरक्षण परियोजना पर स्पॉटलाइट",
      },
      date: "Nov 10, 2025",
      source: { en: "NDTV News", hi: "NDTV न्यूज़" },
      excerpt: {
        en: "Our project in Rajasthan has successfully restored three traditional stepwells, providing water to five villages.",
        hi: "राजस्थान में हमारी परियोजना ने सफलतापूर्वक तीन पारंपरिक बावड़ियों को बहाल किया है...",
      },
      content: {
        en: "NDTV News recently featured our water conservation efforts...",
        hi: "NDTV न्यूज़ ने हाल ही में राजस्थान के शुष्क क्षेत्रों में हमारे जल संरक्षण प्रयासों को दिखाया है...",
      },
      image: Img,
    },
  ];

  const [selectedNews, setSelectedNews] = useState(null);

  const t = {
    title: { en: "Latest News", hi: "ताज़ा समाचार" },
    readMore: { en: "Read More →", hi: "और पढ़ें →" },
    source: { en: "Source:", hi: "स्रोत:" },
  };

  return (
    <div className="bg-gray-100">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-10 pt-20 min-h-dvh">
        <h1 className="border-l-4 border-lime-400 pl-4 md:text-4xl text-3xl font-bold text-emerald-700 mb-8">
          {t.title[lang]}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {news.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden flex flex-col"
            >
              <img
                src={item.image}
                alt={item.title[lang]}
                className="w-full h-48 object-cover"
              />

              <div className="p-5 flex flex-col grow">
                <span className="text-xs text-gray-500">
                  {t.source[lang]} {item.source[lang]} • {item.date}
                </span>

                <h3 className="text-lg font-semibold text-emerald-700 mb-2">
                  {item.title[lang]}
                </h3>

                <p className="text-gray-600 text-sm mb-4 grow">
                  {truncateText(item.excerpt[lang])}
                </p>

                <button
                  onClick={() => setSelectedNews(item)}
                  className="text-emerald-700 font-medium hover:underline text-sm self-start"
                >
                  {t.readMore[lang]}
                </button>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Modal (same as Blogs) */}
      {selectedNews && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-3xl">
            <button
              onClick={() => setSelectedNews(null)}
              className="absolute top-4 right-4 bg-white text-black w-9 h-9 rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 hover:text-white transition z-20"
            >
              ✕
            </button>

            <div className="bg-white rounded-xl overflow-y-auto max-h-[90vh] hide-scrollbar">
              <img
                src={selectedNews.image}
                alt={selectedNews.title[lang]}
                className="w-full max-h-[60vh] object-contain bg-black"
              />

              <div className="p-6">
                <h2 className="text-2xl font-bold text-emerald-700 mb-3">
                  {selectedNews.title[lang]}
                </h2>

                <p className="text-sm text-gray-500 mb-4">
                  {t.source[lang]} {selectedNews.source[lang]} •{" "}
                  {selectedNews.date}
                </p>

                <p className="text-gray-700">
                  {selectedNews.excerpt[lang]}
                </p>
                <p className="text-gray-700 mt-2">
                  {selectedNews.content[lang]}
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

export default News;
