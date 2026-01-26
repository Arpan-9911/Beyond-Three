import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import Img from "../assets/HeroBG.jpg";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const truncateText = (text, limit = 120) => {
  return text.length > limit ? text.substring(0, limit) + "..." : text;
};

const News = () => {
  const { lang } = useLanguage();

  const newsCategories = [
    {
      id: 1,
      name: { en: "Press Releases", hi: "प्रेस विज्ञप्ति" },
      items: [
        {
          id: 101,
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
            en: "Beyond Three is proud to announce the launch of our National Youth Helpline. This 24/7 service is designed to provide immediate support to young individuals facing mental health challenges or seeking career guidance. In partnership with leading psychologists and industry experts, the helpline will offer a safe space for youth to express their concerns and receive professional advice. The launch event in New Delhi was attended by several dignitaries who praised the initiative for its potential impact on the well-being of the younger generation.",
            hi: "बियॉन्ड थ्री को हमारी राष्ट्रीय युवा हेल्पलाइन के शुभारंभ की घोषणा करते हुए गर्व हो रहा है। यह 24/7 सेवा मानसिक स्वास्थ्य चुनौतियों का सामना करने वाले या करियर मार्गदर्शन चाहने वाले युवाओं को तत्काल सहायता प्रदान करने के लिए डिज़ाइन की गई है। प्रमुख मनोवैज्ञानिकों और उद्योग विशेषज्ञों के साथ साझेदारी में, हेल्पलाइन युवाओं को अपनी चिंताओं को व्यक्त करने और पेशेवर सलाह प्राप्त करने के लिए एक सुरक्षित स्थान प्रदान करेगी। नई दिल्ली में आयोजित लॉन्च इवेंट में कई गणमान्य व्यक्तियों ने भाग लिया, जिन्होंने युवा पीढ़ी के कल्याण पर इसके संभावित प्रभाव के लिए इस पहल की सराहना की।",
          },
          image: Img,
        },
        {
          id: 102,
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
            en: "Our annual charity gala held last week was a resounding success, raising over ₹50 lakhs for our educational initiatives. The star-studded event showcased the impact of Beyond Three's work over the past year and highlighted our vision for 2026. We are deeply grateful to our donors and partners for their unwavering support. These funds will allow us to double the number of community learning centers we operate, reaching thousands more children in underserved areas.",
            hi: "पिछले सप्ताह आयोजित हमारा वार्षिक चैरिटी गाला एक बड़ी सफलता रही, जिसने हमारी शैक्षिक पहलों के लिए ₹50 लाख से अधिक की राशि जुटाई। इस सितारों से सजे कार्यक्रम ने पिछले एक वर्ष में बियॉन्ड थ्री के कार्यों के प्रभाव को प्रदर्शित किया और 2026 के लिए हमारे दृष्टिकोण पर प्रकाश डाला। हम अपने दाताओं और भागीदारों के अटूट समर्थन के लिए गहराई से आभारी हैं। यह धनराशि हमें संचालित सामुदायिक शिक्षण केंद्रों की संख्या को दोगुना करने की अनुमति देगी, जिससे कम सेवा वाले क्षेत्रों में हजारों और बच्चों तक पहुंचा जा सकेगा।",
          },
          image: Img,
        },
      ],
    },
    {
      id: 2,
      name: { en: "Media Coverage", hi: "मीडिया कवरेज" },
      items: [
        {
          id: 201,
          title: {
            en: "Spotlight on Beyond Three's Water Conservation Project",
            hi: "बियॉन्ड थ्री की जल संरक्षण परियोजना पर स्पॉटलाइट",
          },
          date: "Nov 10, 2025",
          source: { en: "NDTV News", hi: "NDTV न्यूज़" },
          excerpt: {
            en: "Our project in Rajasthan has successfully restored three traditional stepwells, providing water to five villages.",
            hi: "राजस्थान में हमारी परियोजना ने सफलतापूर्वक तीन पारंपरिक बावड़ियों को बहाल किया है, जिससे पांच गांवों को पानी मिला है।",
          },
          content: {
            en: "NDTV News recently featured our water conservation efforts in the arid regions of Rajasthan. Our flagship project, 'Sujalam', focuses on reviving ancient water harvesting structures that have fallen into disrepair. By integrating traditional wisdom with modern engineering, we've managed to restore three major stepwells, ensuring a sustainable water supply for local agriculture and household use. This media coverage highlights the importance of local solutions for global environmental challenges.",
            hi: "NDTV न्यूज़ ने हाल ही में राजस्थान के शुष्क क्षेत्रों में हमारे जल संरक्षण प्रयासों को दिखाया है। हमारी प्रमुख परियोजना, 'सुजलम', प्राचीन जल संचयन संरचनाओं को पुनर्जीवित करने पर केंद्रित है जो खराब हो गई थीं। पारंपरिक ज्ञान को आधुनिक इंजीनियरिंग के साथ एकीकृत करके, हमने तीन प्रमुख बावड़ियों को बहाल करने में कामयाबी हासिल की है, जिससे स्थानीय कृषि और घरेलू उपयोग के लिए स्थायी जल आपूर्ति सुनिश्चित हुई है। यह मीडिया कवरेज वैश्विक पर्यावरणीय चुनौतियों के लिए स्थानीय समाधानों के महत्व को उजागर करता है।",
          },
          image: Img,
        },
      ],
    },
  ];

  const [activeTab, setActiveTab] = useState(0);
  const [selectedNews, setSelectedNews] = useState(null);

  const t = {
    title: { en: "Latest News", hi: "ताज़ा समाचार" },
    readMore: { en: "Read Full Story →", hi: "पूरी कहानी पढ़ें →" },
    source: { en: "Source:", hi: "स्रोत:" },
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-16 pt-24 md:pt-28">
        <div className="mb-12">
          <h1 className="border-l-4 border-lime-400 pl-4 text-3xl md:text-4xl font-bold text-emerald-800">
            {t.title[lang]}
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl">
            {lang === "en"
              ? "Stay updated with our latest press releases, media mentions, and organizational updates."
              : "हमारी नवीनतम प्रेस विज्ञप्तियों, मीडिया उल्लेखों और संगठनात्मक अपडेट के साथ बने रहें।"}
          </p>
        </div>

        {/* Categories Tabs */}
        <div className="flex flex-wrap gap-3 mb-10">
          {newsCategories.map((cat, index) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm
                ${activeTab === index
                  ? "bg-emerald-700 text-white"
                  : "bg-white text-emerald-800 hover:bg-emerald-50 border border-emerald-100"}`}
            >
              {cat.name[lang]}
            </button>
          ))}
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {newsCategories[activeTab].items.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col sm:flex-row group"
            >
              <div className="sm:w-2/5 relative overflow-hidden group">
                <img
                  src={item.image}
                  alt={item.title[lang]}
                  className="w-full h-full object-cover min-h-[200px] group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="sm:w-3/5 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center text-xs text-gray-500 mb-2 gap-2">
                    <span className="font-bold text-emerald-600">{item.source[lang]}</span>
                    <span>•</span>
                    <span>{item.date}</span>
                  </div>
                  <h2 className="text-xl font-bold text-emerald-800 mb-3 line-clamp-2">
                    {item.title[lang]}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {item.excerpt[lang]}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedNews(item)}
                  className="text-emerald-700 font-bold text-sm hover:text-emerald-900 transition-colors self-start"
                >
                  {t.readMore[lang]}
                </button>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* News Detail Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-300">
            <button
              onClick={() => setSelectedNews(null)}
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-emerald-900 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
            >
              <span className="text-xl font-bold">×</span>
            </button>
            <div className="overflow-y-auto custom-scrollbar">
              <div className="h-64 sm:h-80 md:h-96 w-full relative">
                <img
                  src={selectedNews.image}
                  alt={selectedNews.title[lang]}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">
                    {selectedNews.title[lang]}
                  </h2>
                </div>
              </div>
              <div className="p-6 md:p-10">
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8 border-b border-gray-100 pb-6">
                  <div className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-md font-bold text-xs uppercase tracking-wider">
                    {newsCategories[activeTab].name[lang]}
                  </div>
                  <span>{t.source[lang]} <span className="font-semibold text-emerald-900">{selectedNews.source[lang]}</span></span>
                  <span className="hidden sm:block text-gray-300">|</span>
                  <span>{selectedNews.date}</span>
                </div>
                <div className="prose prose-emerald max-w-none text-gray-700 leading-relaxed space-y-4">
                  <p className="text-lg font-semibold text-emerald-900 leading-snug">
                    {selectedNews.excerpt[lang]}
                  </p>
                  <p>
                    {selectedNews.content[lang]}
                  </p>
                </div>
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