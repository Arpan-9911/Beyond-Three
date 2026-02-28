import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { FaChevronRight } from "react-icons/fa";
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

  // Latest 3 News
  const latestNews =
    useSelector((state) => state.news)
      ?.slice()
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3) || [];

  // Upcoming Events (future only)
  const upcomingEvents =
    useSelector((state) => state.events)
      ?.filter((event) => new Date(event.date) >= today)
      .slice()
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 3) || [];

  return (
    <section className="bg-linear-to-r from-amber-800 to-orange-700 py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* Compact Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-wide">
            {lang === "hi" ? "समाचार एवं कार्यक्रम" : "News & Events"}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* NEWS */}
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-amber-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-amber-800">
                {lang === "hi" ? "ताज़ा समाचार" : "Latest News"}
              </h3>
              <Link
                to="/news"
                className="text-xs font-semibold text-amber-600 hover:text-amber-800 transition"
              >
                {lang === "hi" ? "सभी देखें" : "View All"}
              </Link>
            </div>

            <div className="space-y-3">
              {latestNews.length > 0 ? (
                latestNews.map((news) => (
                  <Link
                    key={news._id}
                    to={`/news/${news._id}`}
                    className="group flex justify-between items-start px-3 py-2 rounded-lg hover:bg-amber-50 transition"
                  >
                    <div>
                      <p className="text-sm font-medium text-amber-900 group-hover:text-amber-700">
                        {getText(news.title)}
                      </p>
                      <p className="text-[11px] text-gray-500">
                        {formatDate(news.date)}
                      </p>
                    </div>
                    <FaChevronRight className="text-amber-400 group-hover:translate-x-1 transition text-xs mt-1" />
                  </Link>
                ))
              ) : (
                <p className="text-xs text-gray-500">
                  {lang === "hi"
                    ? "कोई समाचार उपलब्ध नहीं"
                    : "No news available"}
                </p>
              )}
            </div>
          </div>

          {/* EVENTS */}
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-amber-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-amber-800">
                {lang === "hi" ? "आगामी कार्यक्रम" : "Upcoming Events"}
              </h3>
              <Link
                to="/events"
                className="text-xs font-semibold text-amber-600 hover:text-amber-800 transition"
              >
                {lang === "hi" ? "सभी देखें" : "View All"}
              </Link>
            </div>

            <div className="space-y-3">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map((event) => {
                  const badge = getEventBadge(event.date);

                  return (
                    <Link
                      key={event._id}
                      to={`/events/${event._id}`}
                      className="group flex justify-between items-start px-3 py-2 rounded-lg hover:bg-amber-50 transition"
                    >
                      <div>
                        <p className="text-sm font-medium text-amber-900 group-hover:text-amber-700">
                          {getText(event.title)}
                        </p>

                        <div className="flex items-center gap-2">
                          <p className="text-[11px] text-gray-500">
                            {formatDate(event.date)}
                          </p>

                          {badge && (
                            <span className="text-[10px] bg-yellow-400 text-amber-900 px-2 py-0.5 rounded-full font-semibold">
                              {badge}
                            </span>
                          )}
                        </div>
                      </div>

                      <FaChevronRight className="text-amber-400 group-hover:translate-x-1 transition text-xs mt-1" />
                    </Link>
                  );
                })
              ) : (
                <p className="text-xs text-gray-500">
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
