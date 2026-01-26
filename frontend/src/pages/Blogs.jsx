import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import Img from "../assets/HeroBG.jpg";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const truncateText = (text, limit = 120) => {
  return text.length > limit ? text.substring(0, limit) + "..." : text;
};

const Blogs = () => {
  const { lang } = useLanguage();

  const blogCategories = [
    {
      id: 1,
      name: { en: "Community Impact", hi: "सामुदायिक प्रभाव" },
      blogs: [
        {
          id: 101,
          title: {
            en: "Empowering Rural Youth through Education",
            hi: "शिक्षा के माध्यम से ग्रामीण युवाओं को सशक्त बनाना",
          },
          date: "Jan 15, 2026",
          author: { en: "Team Beyond Three", hi: "बियॉन्ड थ्री टीम" },
          excerpt: {
            en: "Our recent initiative in rural areas has shown significant improvement in digital literacy among youth. We focus on providing the right tools and mentorship.",
            hi: "ग्रामीण क्षेत्रों में हमारी हालिया पहल ने युवाओं के बीच डिजिटल साक्षरता में महत्वपूर्ण सुधार दिखाया है।",
          },
          content: {
            en: "In the heart of rural India, access to quality education remains a challenge. Beyond Three's 'Digital Gram' initiative aims to bridge this gap by setting up community learning centers. These centers are equipped with high-speed internet and tablets, providing students with access to global educational resources. Our mentors work closely with each student to foster a culture of curiosity and continuous learning. The results have been heartening, with many students now pursuing higher education in STEM fields.",
            hi: "ग्रामीण भारत के केंद्र में, गुणवत्तापूर्ण शिक्षा तक पहुँच एक चुनौती बनी हुई है। बियॉन्ड थ्री की 'डिजिटल ग्राम' पहल सामुदायिक शिक्षण केंद्र स्थापित करके इस अंतर को पाटने का लक्ष्य रखती है। ये केंद्र हाई-स्पीड इंटरनेट और टैबलेट से लैस हैं, जो छात्रों को वैश्विक शैक्षिक संसाधनों तक पहुँच प्रदान करते हैं। हमारे मेंटर प्रत्येक छात्र के साथ मिलकर काम करते हैं ताकि जिज्ञासा और निरंतर सीखने की संस्कृति को बढ़ावा दिया जा सके। परिणाम उत्साहजनक रहे हैं, कई छात्र अब STEM क्षेत्रों में उच्च शिक्षा प्राप्त कर रहे हैं।",
          },
          image: Img,
        },
        {
          id: 102,
          title: {
            en: "Sustainable Farming: A New Perspective",
            hi: "सतत खेती: एक नया दृष्टिकोण",
          },
          date: "Jan 10, 2026",
          author: { en: "Rajesh Kumar", hi: "राजेश कुमार" },
          excerpt: {
            en: "Exploring how organic farming techniques are transforming local livelihoods while preserving the environment for future generations.",
            hi: "यह पता लगाना कि जैविक खेती की तकनीकें भविष्य की पीढ़ियों के लिए पर्यावरण को सुरक्षित रखते हुए स्थानीय आजीविका को कैसे बदल रही हैं।",
          },
          content: {
            en: "Chemical-heavy farming has taken a toll on soil health and farmer profitability. At Beyond Three, we are promoting sustainable agricultural practices that focus on soil regeneration and natural pest management. By training farmers in organic techniques, we've helped them reduce input costs by 40% while improving the market value of their produce. This blog explores the journey of three villages that have completely transitioned to sustainable farming, becoming a beacon of hope for neighboring communities.",
            hi: "रसायन-भारी खेती ने मिट्टी के स्वास्थ्य और किसान की लाभप्रदता पर असर डाला है। बियॉन्ड थ्री में, हम सतत कृषि प्रथाओं को बढ़ावा दे रहे हैं जो मिट्टी के पुनर्जन्म और प्राकृतिक कीट प्रबंधन पर ध्यान केंद्रित करती हैं। किसानों को जैविक तकनीकों में प्रशिक्षित करके, हमने उन्हें इनपुट लागत को 40% तक कम करने में मदद की है और साथ ही उनकी उपज के बाजार मूल्य में सुधार किया है। यह ब्लॉग तीन गांवों की यात्रा की पड़ताल करता है जिन्होंने पूरी तरह से सतत खेती की ओर रुख किया है।",
          },
          image: Img,
        },
      ],
    },
    {
      id: 2,
      name: { en: "Health & Wellness", hi: "स्वास्थ्य और कल्याण" },
      blogs: [
        {
          id: 201,
          title: {
            en: "Holistic Health in Modern Times",
            hi: "आधुनिक समय में समग्र स्वास्थ्य",
          },
          date: "Jan 05, 2026",
          author: { en: "Dr. Anjali Verma", hi: "डॉ. अंजलि वर्मा" },
          excerpt: {
            en: "Balancing mental and physical well-being is crucial. Learn about simple daily habits that can significantly boost your overall health.",
            hi: "मानसिक और शारीरिक कल्याण को संतुलित करना महत्वपूर्ण है। उन सरल दैनिक आदतों के बारे में जानें जो आपके समग्र स्वास्थ्य को काफी हद तक बढ़ा सकती हैं।",
          },
          content: {
            en: "The fast-paced modern lifestyle often leads to neglecting core health. Our 'Health-First' campaign emphasizes the integration of traditional wellness practices with modern medicine. From morning yoga to mindful eating, small changes can lead to big results. We believe that health is not just the absence of disease, but a state of complete physical, mental, and social well-being. This post outlines a 7-day wellness challenge participated in by over 500 of our volunteers.",
            hi: "तेजी से भागती आधुनिक जीवनशैली अक्सर मुख्य स्वास्थ्य की उपेक्षा का कारण बनती है। हमारा 'हेल्थ-फर्स्ट' अभियान आधुनिक चिकित्सा के साथ पारंपरिक कल्याण प्रथाओं के एकीकरण पर जोर देता है। सुबह के योग से लेकर सचेत खान-पान तक, छोटे बदलाव बड़े परिणाम ला सकते हैं। हमारा मानना है कि स्वास्थ्य केवल बीमारी की अनुपस्थिति नहीं है, बल्कि पूर्ण शारीरिक, मानसिक और सामाजिक कल्याण की स्थिति है। यह पोस्ट 7 दिवसीय वेलनेस चुनौती की रूपरेखा तैयार करती है जिसमें हमारे 500 से अधिक स्वयंसेवकों ने भाग लिया।",
          },
          image: Img,
        },
      ],
    },
  ];

  const [activeTab, setActiveTab] = useState(0);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const t = {
    title: { en: "Our Blogs", hi: "हमारे ब्लॉग" },
    readMore: { en: "Read More →", hi: "और पढ़ें →" },
    author: { en: "By", hi: "द्वारा" },
    postedOn: { en: "Posted on", hi: "प्रकाशित" },
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
              ? "Discover stories of change, health tips, and updates from our community initiatives."
              : "हमारे सामुदायिक पहलों से बदलाव की कहानियाँ, स्वास्थ्य युक्तियाँ और अपडेट खोजें।"}
          </p>
        </div>

        {/* Categories Tabs */}
        <div className="flex flex-wrap gap-3 mb-10">
          {blogCategories.map((cat, index) => (
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

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogCategories[activeTab].blogs.map((blog) => (
            <article
              key={blog.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col group"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title[lang]}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-lime-400 text-emerald-900 text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  {blogCategories[activeTab].name[lang]}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center text-xs text-gray-500 mb-3 gap-3">
                  <span>{blog.date}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span>{t.author[lang]} {blog.author[lang]}</span>
                </div>
                <h2 className="text-xl font-bold text-emerald-800 mb-3 line-clamp-2 min-h-[3.5rem]">
                  {blog.title[lang]}
                </h2>
                <p className="text-gray-600 text-sm mb-6 flex-grow">
                  {truncateText(blog.excerpt[lang])}
                </p>
                <button
                  onClick={() => setSelectedBlog(blog)}
                  className="inline-flex items-center text-emerald-700 font-bold text-sm hover:text-emerald-900 transition-colors group/btn"
                >
                  {t.readMore[lang]}
                </button>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Blog Detail Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            <button
              onClick={() => setSelectedBlog(null)}
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-emerald-900 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
            >
              <span className="text-xl font-bold">×</span>
            </button>
            <div className="overflow-y-auto overflow-x-hidden custom-scrollbar">
              <div className="h-64 sm:h-80 md:h-96 w-full relative">
                <img
                  src={selectedBlog.image}
                  alt={selectedBlog.title[lang]}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-lime-400 text-emerald-900 text-[10px] uppercase tracking-widest font-black px-2 py-0.5 rounded">
                      {blogCategories[activeTab].name[lang]}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">
                    {selectedBlog.title[lang]}
                  </h2>
                </div>
              </div>
              <div className="p-6 md:p-10">
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8 pb-6 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold">
                      {selectedBlog.author[lang][0]}
                    </div>
                    <span>{t.author[lang]} <span className="font-semibold text-emerald-900">{selectedBlog.author[lang]}</span></span>
                  </div>
                  <span className="hidden sm:block text-gray-300">|</span>
                  <span>{t.postedOn[lang]}: {selectedBlog.date}</span>
                </div>
                <div className="prose prose-emerald max-w-none text-gray-700 leading-relaxed space-y-4">
                  <p className="text-lg font-medium text-emerald-900/80 italic">
                    {selectedBlog.excerpt[lang]}
                  </p>
                  <div className="h-px w-20 bg-lime-400 my-6"></div>
                  <p>
                    {selectedBlog.content[lang]}
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

export default Blogs;