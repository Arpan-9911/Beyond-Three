import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const eventsData = [
  {
    id: 1,
    title: {
      en: "Community Awareness Program",
      hi: "सामुदायिक जागरूकता कार्यक्रम",
    },
    date: "2026-02-15",
    place: {
      en: "Delhi",
      hi: "दिल्ली",
    },
    desc: {
      en: "A program organized to spread awareness about social responsibilities and community development among youth.",
      hi: "युवाओं में सामाजिक जिम्मेदारी और सामुदायिक विकास के प्रति जागरूकता फैलाने के लिए आयोजित कार्यक्रम।",
    },
    image:
      "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1200",
  },
  {
    id: 2,
    title: {
      en: "Health Checkup Camp",
      hi: "स्वास्थ्य जांच शिविर",
    },
    date: "2025-11-20",
    place: {
      en: "Noida",
      hi: "नोएडा",
    },
    desc: {
      en: "Free health checkup camp for local residents with experienced doctors and medical facilities.",
      hi: "स्थानीय निवासियों के लिए अनुभवी डॉक्टरों और चिकित्सा सुविधाओं के साथ मुफ्त स्वास्थ्य जांच शिविर।",
    },
    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1200",
  },
];

const Events = () => {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState("upcoming");
  const [activeEvent, setActiveEvent] = useState(null);

  const today = new Date();
  const upcomingEvents = eventsData.filter(
    (event) => new Date(event.date) >= today
  );
  const pastEvents = eventsData.filter(
    (event) => new Date(event.date) < today
  );
  const eventsToShow = activeTab === "upcoming" ? upcomingEvents : pastEvents;

  const truncateText = (text, limit = 90) =>
    text.length > limit ? text.slice(0, limit) + "..." : text;

  return (
    <div className="bg-gray-100">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-10 pt-20 min-h-dvh">
        <h1 className="border-l-4 border-lime-400 pl-4 md:text-4xl text-3xl font-bold text-emerald-700 mb-8">
          {lang === "hi" ? "कार्यक्रम" : "Events"}
        </h1>
        <div className="flex flex-wrap gap-2 mb-8 text-sm font-medium">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`px-4 py-1 rounded-full cursor-pointer ${
              activeTab === 'upcoming'
                ? "bg-emerald-700 text-white"
                : "bg-white hover:bg-lime-200"
            }`}
          >
            {lang === "hi" ? "आगामी" : "Upcoming"}
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`px-4 py-1 rounded-full cursor-pointer ${
              activeTab === 'past'
                ? "bg-emerald-700 text-white"
                : "bg-white hover:bg-lime-200"
            }`}
          >
            {lang === "hi" ? "पिछले" : "Past"}
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {eventsToShow.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-4xl group shadow-xl hover:shadow-2xl transition overflow-hidden flex flex-col sm:flex-row"
            >
              <div className="sm:w-1/2 w-full h-48 sm:h-auto overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title[lang]}
                  className="w-full h-full object-cover group-hover:scale-110 duration-300"
                />
              </div>
              <div className="p-5 flex flex-col gap-2 sm:w-1/2">
                <h2 className="text-lg sm:text-xl font-semibold text-emerald-700">
                  {event.title[lang]}
                </h2>
                <div className="text-sm text-gray-600 flex flex-wrap gap-4">
                  <span>📅 {new Date(event.date).toLocaleDateString("en-GB")}</span>
                  <span>📍 {event.place[lang]}</span>
                </div>
                <p className="text-gray-700 mt-2">{truncateText(event.desc[lang], 100)}</p>
                <button
                  onClick={() => setActiveEvent(event)}
                  className="text-emerald-700 font-medium hover:underline text-sm self-start cursor-pointer"
                >
                  {lang === "hi" ? "और पढ़ें →" : "Read More →"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />

      {activeEvent && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-3xl">
            <button
              onClick={() => setActiveEvent(null)}
              className="absolute top-4 right-4 bg-white text-black w-9 h-9 rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 hover:text-white transition z-20 cursor-pointer"
            >
              ✕
            </button>
            <div className="bg-white rounded-xl overflow-y-auto max-h-[90vh] hide-scrollbar">
              <img
                src={activeEvent.image}
                alt={activeEvent.title[lang]}
                className="w-full max-h-[60vh] object-contain bg-black"
              />
              <div className="p-6">
                <h2 className="sm:text-2xl text-xl font-bold text-emerald-700 mb-2">{activeEvent.title[lang]}</h2>
                <div className="text-sm text-gray-600 mb-4 flex gap-4 flex-wrap">
                  <span>📅 {new Date(activeEvent.date).toLocaleDateString("en-GB")}</span>
                  <span>📍 {activeEvent.place[lang]}</span>
                </div>
                <p className="text-gray-700 leading-relaxed">{activeEvent.desc[lang]}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
