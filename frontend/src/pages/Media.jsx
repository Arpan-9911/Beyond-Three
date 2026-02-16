import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { FaShareAlt } from "react-icons/fa";
import { useSelector } from "react-redux";

const Media = () => {
  const { lang } = useLanguage();
  const mediaData = useSelector((state) => state.media);

  const [activeTab, setActiveTab] = useState("image");
  const [activeMedia, setActiveMedia] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const tabs = [
    { id: "image", name: lang === "hi" ? "चित्र" : "Photos" },
    { id: "video", name: lang === "hi" ? "वीडियो" : "Videos" },
    { id: "social", name: lang === "hi" ? "सोशल" : "Social" },
  ];

  const filteredMedia = mediaData?.filter(
    (item) => item.type === activeTab
  );

  return (
    <div className="bg-amber-100">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-6 min-h-dvh">
        <h1 className="border-l-4 border-yellow-400 pl-4 text-3xl md:text-4xl font-bold text-amber-700 mb-6">
          {lang === "hi" ? "मीडिया" : "Media"}
        </h1>
        <div className="flex flex-wrap max-md:text-xs gap-2 md:mb-8 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-1 rounded-full cursor-pointer font-medium ${
              activeTab === tab.id
                ? "bg-amber-700 text-white"
                : "bg-white hover:bg-yellow-200"
            }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMedia?.map((item) => (
            <div
              key={item._id}
              className="rounded-3xl overflow-hidden shadow-md bg-white group"
            >
              {item.type === "image" && (
                <div
                  onClick={() => {
                    setActiveMedia(item);
                    setShowModal(true);
                  }}
                  className="cursor-pointer overflow-hidden"
                >
                  <img
                    src={import.meta.env.VITE_UPLOADS + item.file}
                    alt="media"
                    className="w-full h-52 object-cover group-hover:scale-110 transition duration-300"
                  />
                </div>
              )}
              {item.type === "video" && (
                <div
                  onClick={() => {
                    setActiveMedia(item);
                    setShowModal(true);
                  }}
                  className="cursor-pointer"
                >
                  <video
                    src={import.meta.env.VITE_UPLOADS + item.file}
                    className="w-full h-52 object-cover"
                  />
                </div>
              )}
              {item.type === "social" && (
                <div className="h-52 flex flex-col items-center justify-center bg-amber-50 text-center p-4 gap-2">
                  <FaShareAlt className="text-2xl text-amber-600" />
                  <p className="text-sm font-semibold">
                    {item.platform}
                  </p>
                  {item.title && (
                    <p className="text-xs text-gray-600">
                      {item.title}
                    </p>
                  )}
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 break-all"
                    >
                      Visit Link
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        {filteredMedia?.length === 0 && (
          <div className="text-center mt-12 text-gray-500">
            <p className="text-lg">
              {lang === "hi"
                ? "कोई मीडिया उपलब्ध नहीं है।"
                : "No media available."}
            </p>
          </div>
        )}
      </div>
      <Footer />

      {/* MODAL (Image & Video Only) */}
      {activeMedia && showModal && activeMedia.type !== "social" && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => {
                setActiveMedia(null);
                setShowModal(false);
              }}
              className="absolute cursor-pointer top-4 right-4 bg-black text-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-red-600 transition z-20"
            >
              ✕
            </button>
            <div className="bg-black rounded-3xl overflow-hidden max-h-[90vh]">
              {activeMedia.type === "image" ? (
                <img
                  src={import.meta.env.VITE_UPLOADS + activeMedia.file}
                  alt="media"
                  className="w-full max-h-[85vh] object-contain"
                />
              ) : (
                <video
                  src={import.meta.env.VITE_UPLOADS + activeMedia.file}
                  controls
                  autoPlay
                  className="w-full max-h-[85vh]"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Media;
