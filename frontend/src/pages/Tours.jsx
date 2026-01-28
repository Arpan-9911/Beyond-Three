import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import Img from "../assets/HeroBG.jpg";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { FaMap, FaMapMarkerAlt, FaChevronRight } from "react-icons/fa";

const truncateText = (text, limit = 90) => {
  return text.length > limit ? text.substring(0, limit) + "..." : text;
};

const Tours = () => {
  const { lang } = useLanguage();

  const tours = [
    {
      id: 1,
      title: {
        en: "Manali Yoga Tour 2023",
        hi: "मनाली योग यात्रा 2023",
      },
      date: "OCT 2023",
      location: {
        en: "Manali, Himachal Pradesh",
        hi: "मनाली, हिमाचल प्रदेश",
      },
      excerpt: {
        en: "Experience the serene beauty of the Himalayas while practicing yoga and meditation in the heart of Manali.",
        hi: "मनाली के केंद्र में योग और ध्यान का अभ्यास करते हुए हिमालय की शांत सुंदरता का अनुभव करें।",
      },
      content: {
        en: "Our Manali Yoga Tour 2023 was a transformative journey. Participants enjoyed daily yoga sessions, guided meditation, and treks through the lush valleys of Himachal Pradesh. This tour was designed for those seeking peace and spiritual rejuvenation amid nature's grandeur.",
        hi: "मनाली योग यात्रा 2023 हमारी एक परिवर्तनकारी यात्रा थी। प्रतिभागियों ने दैनिक योग सत्रों, निर्देशित ध्यान और हिमाचल प्रदेश की हरी-भरी घाटियों के माध्यम से ट्रेक का आनंद लिया। यह यात्रा प्रकृति की भव्यता के बीच शांति और आध्यात्मिक कायाकल्प चाहने वालों के लिए डिजाइन की गई थी।",
      },
      image: Img,
    },
    {
      id: 2,
      title: {
        en: "Rajasthan Heritage Walk",
        hi: "राजस्थान विरासत यात्रा",
      },
      date: "DEC 2023",
      location: {
        en: "Jaipur, Rajasthan",
        hi: "जयपुर, राजस्थान",
      },
      excerpt: {
        en: "Explore the rich history and vibrant culture of the Pink City with our exclusive heritage walk.",
        hi: "हमारी अनूठी विरासत यात्रा के साथ गुलाबी शहर के समृद्ध इतिहास और जीवंत संस्कृति का अन्वेषण करें।",
      },
      content: {
        en: "Discover the architectural wonders and historical tales of Jaipur. From the grand Amer Fort to the intricate Hawa Mahal, this tour takes you through the heart of Rajasthan's royal heritage. Experience local crafts, traditional cuisine, and the legendary hospitality of the desert state.",
        hi: "जयपुर के वास्तुशिल्प चमत्कारों और ऐतिहासिक कहानियों की खोज करें। भव्य आमेर किले से लेकर जटिल हवा महल तक, यह यात्रा आपको राजस्थान की शाही विरासत के केंद्र में ले जाती है। स्थानीय शिल्प, पारंपरिक व्यंजनों और रेगिस्तानी राज्य के पौराणिक आतिथ्य का अनुभव करें।",
      },
      image: Img,
    },
  ];

  const [selectedTour, setSelectedTour] = useState(null);

  const t = {
    title: { en: "Our Tours", hi: "हमारी यात्राएँ" },
    readMore: { en: "Read More →", hi: "और पढ़ें →" },
    location: { en: "Location:", hi: "स्थान:" },
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-10 pt-24 min-h-dvh">
        <div className="flex items-center gap-3 mb-8">
          <FaMap className="text-emerald-700 text-3xl" />
          <h1 className="md:text-4xl text-3xl font-bold text-emerald-800">
            {t.title[lang]}
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <div
              key={tour.id}
              className="bg-white rounded-[2rem] shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer"
              onClick={() => setSelectedTour(tour)}
            >
              {/* Image Section with Overlays */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={tour.image}
                  alt={tour.title[lang]}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                <div className="absolute bottom-6 left-6 text-white">
                  <span className="text-[10px] font-bold text-lime-400 tracking-widest uppercase mb-1 block">
                    {tour.date}
                  </span>
                  <h3 className="text-xl font-bold leading-tight drop-shadow-md">
                    {tour.title[lang]}
                  </h3>
                </div>
              </div>

              {/* Footer Section */}
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <FaMapMarkerAlt className="text-emerald-600" />
                  <span>{tour.location[lang]}</span>
                </div>

                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                  <FaChevronRight />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal */}
      {selectedTour && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-3xl animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => setSelectedTour(null)}
              className="absolute -top-12 right-0 md:-right-12 text-white text-4xl hover:text-lime-400 transition-colors z-20"
            >
              ✕
            </button>

            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl overflow-y-auto max-h-[85vh] hide-scrollbar">
              <div className="relative h-[40vh]">
                <img
                  src={selectedTour.image}
                  alt={selectedTour.title[lang]}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-lime-400 font-bold uppercase tracking-widest text-xs mb-2">{selectedTour.date}</p>
                  <h2 className="text-3xl font-bold">{selectedTour.title[lang]}</h2>
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center gap-2 text-emerald-700 font-medium mb-6">
                  <FaMapMarkerAlt />
                  <span>{selectedTour.location[lang]}</span>
                </div>

                <div className="prose prose-emerald max-w-none">
                  <p className="text-gray-600 text-lg leading-relaxed italic mb-6">
                    {selectedTour.excerpt[lang]}
                  </p>
                  <div className="h-px bg-gray-100 w-full mb-6"></div>
                  <p className="text-gray-800 leading-relaxed text-base">
                    {selectedTour.content[lang]}
                  </p>
                </div>

                <button
                  className="mt-8 bg-emerald-700 text-white px-8 py-3 rounded-full font-bold hover:bg-emerald-800 transition shadow-lg active:scale-95"
                  onClick={() => setSelectedTour(null)}
                >
                  {lang === 'hi' ? 'वापस जाएं' : 'Back to Tours'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Tours;
