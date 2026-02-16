import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { FaMapMarkerAlt, FaChevronRight } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Tours = () => {
  const { lang } = useLanguage();
  const { id } = useParams();

  const tours = useSelector((state) => state.tours) || [];

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const toursPerPage = 8;

  const indexOfLast = currentPage * toursPerPage;
  const indexOfFirst = indexOfLast - toursPerPage;
  const currentTours = tours.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(tours.length / toursPerPage);

  const getText = (field) => {
    if (!field) return "";
    return field[lang] || field[lang === "en" ? "hi" : "en"] || "";
  };

  const selectedTour = id
    ? tours.find((t) => t._id === id)
    : null;

  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    if (selectedTour) {
      const image = selectedTour.image;
      setTimeout(() => setActiveImage(image), 0);
    }
  }, [selectedTour]);

  useEffect(() => {
    if (selectedTour) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => (document.body.style.overflow = "");
  }, [selectedTour]);

  const t = {
    title: { en: "Our Tours", hi: "हमारी यात्राएँ" },
    empty: { en: "No tours available", hi: "कोई यात्रा उपलब्ध नहीं है" },
    duration: { en: "Duration:", hi: "अवधि:" },
    price: { en: "Price:", hi: "मूल्य:" },
  };

  return (
    <div className="bg-amber-100">
      <Header />

      <main className="max-w-7xl mx-auto px-4 md:py-10 py-4 min-h-dvh">
        <h1 className="border-l-4 border-yellow-400 pl-4 md:text-4xl text-3xl font-bold text-amber-700 md:mb-8 mb-4">
          {t.title[lang]}
        </h1>

        {tours.length === 0 && (
          <p className="text-center text-gray-600 text-lg py-20">
            {t.empty[lang]}
          </p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:gap-8 gap-4">
          {currentTours.map((tour) => (
            <div
              key={tour._id}
              className="bg-white rounded-4xl shadow-xl hover:shadow-2xl overflow-hidden flex flex-col group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={import.meta.env.VITE_UPLOADS + tour.image}
                  alt={getText(tour.title)}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-bold leading-tight drop-shadow-md">
                    {getText(tour.title)}
                  </h3>
                </div>
              </div>

              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <FaMapMarkerAlt className="text-amber-600" />
                  <span>{getText(tour.location)}</span>
                </div>

                <Link
                  to={`/tours/${tour._id}`}
                  className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition"
                >
                  <FaChevronRight />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-10 flex-wrap">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === i + 1
                    ? "bg-amber-600 text-white"
                    : "bg-white text-amber-600"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </main>

      {selectedTour && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-3xl">
            <Link
              to="/tours"
              className="absolute cursor-pointer top-4 right-4 bg-white text-black w-9 h-9 rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 hover:text-white transition z-20"
            >
              ✕
            </Link>
            <div className="bg-white rounded-4xl overflow-y-auto max-h-[90vh]">
              <img
                src={import.meta.env.VITE_UPLOADS + activeImage}
                alt={getText(selectedTour.title)}
                className="w-full max-h-[60vh] object-contain bg-black"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-amber-700 mb-3">
                  {getText(selectedTour.title)}
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  <FaMapMarkerAlt className="inline mr-1" />
                  {getText(selectedTour.location)}
                </p>
                <p className="text-gray-700 mb-3">
                  {getText(selectedTour.description)}
                </p>
                <p className="text-gray-700 italic mb-3">
                  {getText(selectedTour.highlights)}
                </p>
                <p className="text-sm text-gray-600">
                  {t.duration[lang]} {selectedTour.duration}
                </p>
                <p className="text-sm text-gray-600">
                  {t.price[lang]} {selectedTour.price}
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

export default Tours;
