import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import HeroBG from "../assets/HeroBG.jpg";

const mediaData = [
  {
    id: 1,
    type: "image",
    src: HeroBG,
  },
  {
    id: 2,
    type: "image",
    src: HeroBG,
  },
  {
    id: 3,
    type: "video",
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 4,
    type: "video",
    src: "https://www.youtube.com/embed/9bZkp7q19f0",
  },
];

const Media = () => {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState("images");
  const [activeMedia, setActiveMedia] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filteredMedia =
    activeTab === "images"
      ? mediaData.filter((item) => item.type === "image")
      : mediaData.filter((item) => item.type === "video");

  return (
    <div className="bg-gray-100">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-10 pt-20 min-h-dvh">
        <h1 className="border-l-4 border-lime-400 pl-4 md:text-4xl text-3xl font-bold text-emerald-700 mb-8">
          {lang === "hi" ? "मीडिया" : "Media"}
        </h1>
        <div className="flex flex-wrap gap-2 mb-8 text-sm font-medium">
          <button
            onClick={() => setActiveTab("images")}
            className={`px-4 py-1 rounded-full font-medium cursor-pointer ${
              activeTab === "images"
                ? "bg-emerald-700 text-white"
                : "bg-white hover:bg-lime-200"
            }`}
          >
            {lang === "hi" ? "चित्र" : "Images"}
          </button>
          <button
            onClick={() => setActiveTab("videos")}
            className={`px-4 py-1 rounded-full font-medium cursor-pointer ${
              activeTab === "videos"
                ? "bg-emerald-700 text-white"
                : "bg-white hover:bg-lime-200"
            }`}
          >
            {lang === "hi" ? "वीडियो" : "Videos"}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMedia.map((item, index) => {
            if (item.type === "image") {
              return (
                <div
                  key={index}
                  className="overflow-hidden rounded-xl shadow-md group bg-black relative cursor-pointer"
                >
                  <img
                    src={item.src}
                    alt="media"
                    className="w-full h-48 object-cover cursor-pointer group-hover:scale-110 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"></div>
                </div>
              );
            }
            return (
              <div
                key={index}
                className="relative cursor-pointer group rounded-xl overflow-hidden shadow-md bg-white"
                onClick={() => {
                  setActiveMedia(item);
                  setShowModal(true);
                }}
              >
                <iframe
                  src={item.src}
                  title={`video-${index}`}
                  className="w-full h-48 pointer-events-none"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"></div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />

      {activeMedia && showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setActiveMedia(null)}
              className="absolute top-4 right-4 bg-black text-white w-9 h-9 rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 hover:text-white transition z-20 cursor-pointer"
            >
              ✕
            </button>
            <div className="bg-black rounded-xl overflow-hidden max-h-[90vh]">
              {activeMedia.type === "image" ? (
                <img
                  src={activeMedia.src}
                  alt="media"
                  className="w-full max-h-[85vh] object-contain bg-black"
                />
              ) : (
                <iframe
                  src={activeMedia.src}
                  title="popup-video"
                  className="w-full h-[60vh]"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Media;