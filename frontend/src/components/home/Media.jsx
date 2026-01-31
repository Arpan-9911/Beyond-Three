import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import HeroBG from "../../assets/HeroBG.jpg";

const Media = () => {
  const { lang } = useLanguage();
  const [activeVideo, setActiveVideo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const mediaData = [
    {
      type: "image",
      src: HeroBG,
    },
    {
      type: "image",
      src: HeroBG,
    },
    {
      type: "video",
      src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      type: "video",
      src: "https://www.youtube.com/embed/9bZkp7q19f0",
    },
  ];

  return (
    <section className="bg-amber-100">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-amber-700 text-center mb-8">
          {lang === "hi" ? "विशेष मीडिया" : "Featured Media"}
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {mediaData.map((item, index) => {
            if (item.type === "image") {
              return (
                <div
                  key={index}
                  className="overflow-hidden rounded-4xl shadow-xl group bg-black relative hover:shadow-2xl"
                >
                  <img
                    src={item.src}
                    alt="media"
                    className="w-full h-48 object-cover cursor-pointer"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"></div>
                </div>
              );
            }
            return (
              <div
                key={index}
                className="relative cursor-pointer group rounded-4xl overflow-hidden shadow-xl bg-white hover:shadow-2xl"
                onClick={() => {
                  setActiveVideo(item.src);
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

        {activeVideo && showModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => {
                setActiveVideo(null);
                setShowModal(false);
              }}
              className="absolute top-4 right-4 bg-black text-white w-9 h-9 rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 hover:text-white transition z-20 cursor-pointer"
            >
              ✕
            </button>
            <div className="bg-black rounded-4xl overflow-hidden">
              <iframe
                src={activeVideo}
                title="popup-video"
                className="w-full h-[60vh]"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
        )}
      </div>
    </section>
  );
};

export default Media;
