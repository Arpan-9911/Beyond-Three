import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { FaChevronRight, FaCalendarAlt } from "react-icons/fa";
import { useSelector } from "react-redux";

const NewsEvents = () => {
  const { lang } = useLanguage();
  const today = new Date();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const getEventBadge = (dateString) => {
    const eventDate = new Date(dateString);
    const diff = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));

    if (diff === 0) return lang === "hi" ? "आज" : "Today";
    if (diff === 1) return lang === "hi" ? "कल" : "Tomorrow";
    return null;
  };

  const getText = (field) => field?.[lang] || field?.en || field?.hi || "";

  const latestNews =
    useSelector((state) => state.news)
      ?.slice()
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3) || [];

  const upcomingEvents =
    useSelector((state) => state.events)
      ?.filter((event) => new Date(event.date) >= today)
      .slice()
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 3) || [];

  return (
    <section className="bg-amber-100 py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="uppercase text-sm tracking-widest text-amber-700 font-semibold">
            {lang === "hi" ? "अपडेट रहें" : "Stay Updated"}
          </p>

          <h2 className="text-3xl md:text-4xl font-extrabold text-amber-900 mt-2">
            {lang === "hi" ? "समाचार एवं कार्यक्रम" : "News & Events"}
          </h2>

          <div className="w-20 h-1 bg-amber-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* NEWS */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-amber-800">
                {lang === "hi" ? "ताज़ा समाचार" : "Latest News"}
              </h3>

              <Link
                to="/news"
                className="text-sm font-semibold text-amber-600 hover:text-amber-800"
              >
                {lang === "hi" ? "सभी देखें" : "View All"}
              </Link>
            </div>

            <div className="space-y-4">
              {latestNews.length > 0 ? (
                latestNews.map((news) => (
                  <Link
                    key={news._id}
                    to={`/news/${news._id}`}
                    className="block bg-white p-5 rounded-xl border border-amber-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition"
                  >
                    <p className="font-semibold text-amber-900 mb-1">
                      {getText(news.title)}
                    </p>

                    <p className="text-xs text-gray-500">
                      {formatDate(news.date)}
                    </p>
                  </Link>
                ))
              ) : (
                <p className="text-gray-500 text-sm">
                  {lang === "hi"
                    ? "कोई समाचार उपलब्ध नहीं"
                    : "No news available"}
                </p>
              )}
            </div>
          </div>

          {/* EVENTS */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-amber-800">
                {lang === "hi" ? "आगामी कार्यक्रम" : "Upcoming Events"}
              </h3>

              <Link
                to="/events"
                className="text-sm font-semibold text-amber-600 hover:text-amber-800"
              >
                {lang === "hi" ? "सभी देखें" : "View All"}
              </Link>
            </div>

            <div className="space-y-4">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event) => {
                  const badge = getEventBadge(event.date);

                  return (
                    <Link
                      key={event._id}
                      to={`/events/${event._id}`}
                      className="flex items-center gap-4 bg-white p-4 rounded-xl border border-amber-100 shadow-sm hover:shadow-lg transition"
                    >
                      {/* Date Box */}
                      <div className="flex flex-col items-center justify-center bg-amber-100 text-amber-800 font-bold rounded-lg w-14 h-14 text-sm">
                        {new Date(event.date).getDate()}
                        <span className="text-[10px] uppercase">
                          {new Date(event.date).toLocaleString("en-IN", {
                            month: "short",
                          })}
                        </span>
                      </div>

                      {/* Event Info */}
                      <div className="flex-1">
                        <p className="font-semibold text-amber-900">
                          {getText(event.title)}
                        </p>

                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <FaCalendarAlt />
                          {formatDate(event.date)}

                          {badge && (
                            <span className="bg-yellow-400 text-amber-900 px-2 py-0.5 rounded-full font-semibold text-[10px]">
                              {badge}
                            </span>
                          )}
                        </div>
                      </div>

                      <FaChevronRight className="text-amber-400 text-sm" />
                    </Link>
                  );
                })
              ) : (
                <p className="text-gray-500 text-sm">
                  {lang === "hi"
                    ? "कोई आगामी कार्यक्रम नहीं"
                    : "No upcoming events"}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsEvents;
