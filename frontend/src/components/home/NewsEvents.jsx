import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { FaChevronRight } from "react-icons/fa";

const newsData = [
  {
    id: 1,
    title: {
      en: "Beyond Three Annual Peace Summit 2024 Scheduled",
      hi: "बियॉन्ड थ्री वार्षिक शांति सम्मेलन 2024 निर्धारित",
    },
  },
  {
    id: 2,
    title: {
      en: "New Meditation Center Opens in Northern Region",
      hi: "उत्तरी क्षेत्र में नया ध्यान केंद्र खुला",
    },
  },
  {
    id: 3,
    title: {
      en: "Community Outreach: 5000 Meals Distributed",
      hi: "सामुदायिक सेवा: 5000 भोजन वितरित",
    },
  },
];

const eventsData = [
  {
    id: 1,
    title: {
      en: "Vedic Wisdom Online Workshop",
      hi: "वैदिक ज्ञान ऑनलाइन कार्यशाला",
    },
  },
  {
    id: 2,
    title: {
      en: "Monthly Global Satsang - Live Stream",
      hi: "मासिक वैश्विक सत्संग - लाइव प्रसारण",
    },
  },
  {
    id: 3,
    title: {
      en: "Holistic Healing & Detox Retreat",
      hi: "समग्र उपचार और डिटॉक्स रिट्रीट",
    },
  },
];

const NewsEvents = () => {
  const { lang } = useLanguage();

  return (
    <section className="bg-gray-100">
      <div className="max-w-7xl mx-auto py-10 px-4 grid md:grid-cols-2 md:gap-8 gap-4">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-amber-700 border-l-4 border-yellow-400 pl-3">
              {lang === "hi" ? "ताज़ा समाचार" : "Latest News"}
            </h2>
            <Link
              to="/news"
              className="text-sm font-semibold text-gray-500 hover:text-amber-700 transition"
            >
              {lang === "hi" ? "सभी देखें" : "View All"}
            </Link>
          </div>
          <div className="space-y-2">
            {newsData.map((news) => (
              <Link
                key={news.id}
                to={`/news/${news.id}`}
                className="flex items-center justify-between group px-2 py-1 rounded-2xl hover:bg-white transition duration-300"
              >
                <h3 className="text-base font-medium text-gray-800 group-hover:text-amber-700 transition duration-300">
                  {news.title[lang]}
                </h3>
                <FaChevronRight className="text-gray-400 group-hover:text-amber-700 group-hover:translate-x-1 transition duration-300" />
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-amber-700 border-l-4 border-yellow-400 pl-3">
              {lang === "hi" ? "आगामी कार्यक्रम" : "Upcoming Events"}
            </h2>
            <Link
              to="/events"
              className="text-sm font-semibold text-gray-500 hover:text-amber-700 transition"
            >
              {lang === "hi" ? "सभी देखें" : "View All"}
            </Link>
          </div>

          <div className="space-y-2">
            {eventsData.map((event) => (
              <Link
                key={event.id}
                to={`/events/upcoming/${event.id}`}
                className="flex items-center justify-between group px-2 py-1 rounded-2xl hover:bg-white transition duration-300"
              >
                <h3 className="text-base font-medium text-gray-800 group-hover:text-amber-700 transition duration-300">
                  {event.title[lang]}
                </h3>
                <FaChevronRight className="text-gray-400 group-hover:text-amber-700 group-hover:translate-x-1 transition duration-300" />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="p-0.5 w-1/2 bg-yellow-400 rounded-full"></div>
      </div>
    </section>
  );
};

export default NewsEvents;
