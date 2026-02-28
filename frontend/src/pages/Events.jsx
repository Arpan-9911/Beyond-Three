import React, { useEffect, useMemo } from "react";
import { useLanguage } from "../context/LanguageContext";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

const Events = () => {
  const { lang } = useLanguage();
  const { tab = "upcoming", id } = useParams();
  const eventsData = useSelector((state) => state.events);

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  const activeEvent = useMemo(
    () =>
      id ? eventsData.find((e) => String(e._id) === String(id)) || null : null,
    [id, eventsData],
  );

  // ✅ language fallback
  const getLangText = (obj) => {
    if (!obj) return "";
    return lang === "hi" ? obj?.hi || obj?.en || "" : obj?.en || obj?.hi || "";
  };

  // ✅ truncate safe
  const truncateText = (text = "", limit = 90) =>
    text.length > limit ? text.slice(0, limit) + "..." : text;

  // ✅ normalize today date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEvents = eventsData.filter(
    (event) => new Date(event.date) >= today,
  );

  const pastEvents = eventsData.filter((event) => new Date(event.date) < today);

  const eventsToShow = tab === "past" ? pastEvents : upcomingEvents;
  const totalPages = Math.ceil(eventsToShow.length / ITEMS_PER_PAGE);
  const paginatedEvents = eventsToShow.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  // ✅ body scroll lock
  useEffect(() => {
    document.body.style.overflow = activeEvent ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [activeEvent]);

  return (
    <div className="bg-amber-100">
      <Header />
      <div className="max-w-7xl mx-auto px-4 md:py-10 py-4 min-h-dvh">
        <h1 className="border-l-4 border-yellow-400 pl-4 md:text-4xl text-3xl font-bold text-amber-700 md:mb-8 mb-4">
          {lang === "hi" ? "कार्यक्रम" : "Events"}
        </h1>
        <div className="flex flex-wrap max-md:text-xs gap-2 md:mb-8 mb-4">
          <Link
            to="/events/upcoming"
            className={`px-4 py-1 rounded-full cursor-pointer font-medium ${
              tab === "upcoming"
                ? "bg-amber-700 text-white"
                : "bg-white hover:bg-yellow-200"
            }`}
          >
            {lang === "hi" ? "आगामी" : "Upcoming"}
          </Link>
          <Link
            to="/events/past"
            className={`px-4 py-1 rounded-full cursor-pointer font-medium ${
              tab === "past"
                ? "bg-amber-700 text-white"
                : "bg-white hover:bg-yellow-200"
            }`}
          >
            {lang === "hi" ? "पिछले" : "Past"}
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-8 gap-4">
          {paginatedEvents.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-4xl group shadow-xl hover:shadow-2xl transition overflow-hidden flex flex-col sm:flex-row"
            >
              <div className="sm:w-1/2 w-full h-48 sm:h-auto overflow-hidden">
                <img
                  src={import.meta.env.VITE_UPLOADS + event.image}
                  alt={getLangText(event.title)}
                  className="w-full h-full object-cover group-hover:scale-110 duration-300"
                />
              </div>
              <div className="p-5 flex flex-col gap-2 sm:w-1/2">
                <h2 className="text-lg sm:text-xl font-semibold text-amber-700">
                  {getLangText(event.title)}
                </h2>
                <div className="text-sm text-gray-600 flex flex-wrap gap-4">
                  <span>
                    📅 {new Date(event.date).toLocaleDateString("en-GB")}
                  </span>
                  <span>📍 {getLangText(event.location)}</span>
                </div>
                <div
                  className="prose prose-sm mb-2 leading-snug max-w-none text-gray-700
                            prose-p:m-0
                            prose-ul:m-0
                            prose-ol:m-0
                            prose-li:m-0
                            prose-headings:m-0"
                  dangerouslySetInnerHTML={{
                    __html: truncateText(getLangText(event.description), 100)
                  }}
                />
                <Link
                  to={`/events/${tab}/${event._id}`}
                  className="text-amber-700 font-medium hover:underline text-sm self-start"
                >
                  {lang === "hi" ? "और पढ़ें" : "Read More"}
                </Link>
              </div>
            </div>
          ))}
        </div>
        {eventsToShow.length === 0 && (
          <p className="text-center text-gray-500 py-10">
            {lang === "hi"
              ? "कोई कार्यक्रम उपलब्ध नहीं है"
              : "No events available"}
          </p>
        )}
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
                  currentPage === i + 1 ? "bg-amber-700 text-white" : "bg-white"
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

      {/* Modal */}
      {activeEvent && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-3xl">
            <Link
              to={`/events/${tab}`}
              className="absolute top-4 right-4 bg-white w-9 h-9 rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 hover:text-white transition z-20"
            >
              ✕
            </Link>

            <div className="bg-white rounded-4xl overflow-y-auto max-h-[90vh] hide-scrollbar">
              <img
                src={import.meta.env.VITE_UPLOADS + activeEvent.image}
                alt={getLangText(activeEvent.title)}
                className="w-full max-h-[60vh] object-contain bg-black"
              />

              <div className="p-6">
                <h2 className="sm:text-2xl text-xl font-bold text-amber-700 mb-2">
                  {getLangText(activeEvent.title)}
                </h2>

                <div className="text-sm text-gray-600 mb-4 flex gap-4 flex-wrap">
                  <span>
                    📅 {new Date(activeEvent.date).toLocaleDateString("en-GB")}
                  </span>
                  <span>📍 {getLangText(activeEvent.location)}</span>
                </div>
                <div
                  className="prose prose-md leading-snug max-w-none text-gray-700
                            prose-p:m-0
                            prose-ul:m-0
                            prose-ol:m-0
                            prose-li:m-0
                            prose-headings:m-0"
                  dangerouslySetInnerHTML={{
                    __html: getLangText(activeEvent.description),
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
