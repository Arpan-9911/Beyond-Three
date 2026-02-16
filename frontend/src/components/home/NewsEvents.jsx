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
    const diff =
      Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));

    if (diff === 0)
      return lang === "hi" ? "आज" : "Today";
    if (diff === 1)
      return lang === "hi" ? "कल" : "Tomorrow";
    return null;
  };

  const getText = (field) =>
    field?.[lang] || field?.en || field?.hi || "";

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
    <section className="bg-amber-700">
      <div className="max-w-7xl mx-auto pt-10 pb-6 px-4 grid md:grid-cols-2 md:gap-8 gap-4">
        <div className="bg-amber-50/95 rounded-2xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold text-amber-900 border-l-4 border-yellow-400 pl-3">
              {lang === "hi" ? "ताज़ा समाचार" : "Latest News"}
            </h2>
            <Link
              to="/news"
              className="text-sm font-semibold text-amber-600 hover:text-amber-800 transition"
            >
              {lang === "hi" ? "सभी देखें" : "View All"}
            </Link>
          </div>

          <div className="space-y-2">
            {latestNews.length > 0 ? (
              latestNews.map((news) => (
                <Link
                  key={news._id}
                  to={`/news/${news._id}`}
                  className="flex items-center justify-between group px-4 py-2 rounded-xl hover:bg-amber-100 transition duration-300"
                >
                  <div>
                    <h3 className="text-base font-medium text-amber-900 group-hover:text-amber-700 transition">
                      {getText(news.title)}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {formatDate(news.date)}
                    </p>
                  </div>
                  <FaChevronRight className="text-amber-400 group-hover:text-amber-700 group-hover:translate-x-1 transition duration-300" />
                </Link>
              ))
            ) : (
              <p className="text-sm text-gray-500">
                {lang === "hi"
                  ? "कोई समाचार उपलब्ध नहीं"
                  : "No news available"}
              </p>
            )}
          </div>
        </div>

        {/* EVENTS */}
        <div className="bg-amber-50/95 rounded-2xl p-6 shadow-lg">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold text-amber-900 border-l-4 border-yellow-400 pl-3">
              {lang === "hi" ? "आगामी कार्यक्रम" : "Upcoming Events"}
            </h2>
            <Link
              to="/events"
              className="text-sm font-semibold text-amber-600 hover:text-amber-800 transition"
            >
              {lang === "hi" ? "सभी देखें" : "View All"}
            </Link>
          </div>

          <div className="space-y-2">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => {
                const badge = getEventBadge(event.date);

                return (
                  <Link
                    key={event._id}
                    to={`/events/${event._id}`}
                    className="flex items-center justify-between group px-4 py-2 rounded-xl hover:bg-amber-100 transition duration-300"
                  >
                    <div>
                      <h3 className="text-base font-medium text-amber-900 group-hover:text-amber-700 transition">
                        {getText(event.title)}
                      </h3>

                      <div className="flex items-center gap-2">
                        <p className="text-xs text-gray-500">
                          {formatDate(event.date)}
                        </p>

                        {badge && (
                          <span className="text-xs bg-yellow-400 text-amber-900 px-2 py-0.5 rounded-full font-semibold">
                            {badge}
                          </span>
                        )}
                      </div>
                    </div>

                    <FaChevronRight className="text-amber-400 group-hover:text-amber-700 group-hover:translate-x-1 transition duration-300" />
                  </Link>
                );
              })
            ) : (
              <p className="text-sm text-gray-500">
                {lang === "hi"
                  ? "कोई आगामी कार्यक्रम नहीं"
                  : "No upcoming events"}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center justify-center pb-8">
        <div className="h-1 w-1/3 bg-yellow-400 rounded-full"></div>
      </div>
    </section>
  );
};

export default NewsEvents;
