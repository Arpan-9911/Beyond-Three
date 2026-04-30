import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaShareAlt } from "react-icons/fa";

const FeaturedMedia = () => {
  const mediaData = useSelector((state) => state.media) || [];

  const featured = mediaData.filter((item) => item.featured === true);

  const [activeMedia, setActiveMedia] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const convertToEmbed = (url) => {
    try {
      if (url.includes("youtu.be")) {
        const id = url.split("/").pop().split("?")[0];
        return `https://www.youtube.com/embed/${id}`;
      }
      if (url.includes("watch?v=")) {
        const id = new URL(url).searchParams.get("v");
        return `https://www.youtube.com/embed/${id}`;
      }
      if (url.includes("/shorts/")) {
        const id = url.split("/shorts/")[1].split("?")[0];
        return `https://www.youtube.com/embed/${id}`;
      }
      return url;
    } catch {
      return url;
    }
  };

  const isFacebookShare = (url) => {
    return url.includes("facebook.com/share/");
  };

  return (
    <section className="bg py-8">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-2">
          Featured Media
        </h2>
        <p className="text-gray-600 mb-6">
          Highlights from our latest media
        </p>

        {/* ✅ GRID */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

          {featured.map((item) => (
            <div
              key={item._id}
              className="min-h-60 rounded-3xl overflow-hidden shadow-md bg-white group"
            >

              {/* IMAGE */}
              {item.type === "image" && (
                <div
                  onClick={() => {
                    setActiveMedia(item);
                    setShowModal(true);
                  }}
                  className="cursor-pointer w-full h-full overflow-hidden"
                >
                  <img
                    src={import.meta.env.VITE_UPLOADS + item.file}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                </div>
              )}

              {/* VIDEO */}
              {item.type === "video" && (
                <div className="cursor-pointer w-full h-full">
                  <video
                    src={import.meta.env.VITE_UPLOADS + item.file}
                    className="w-full h-full object-cover"
                    controls
                  />
                </div>
              )}

              {/* SOCIAL */}
              {item.type === "social" && (
                <div className="w-full h-full bg-black overflow-hidden">

                  {/* YOUTUBE */}
                  {item.platform?.toLowerCase() === "youtube" && (
                    <iframe
                      src={convertToEmbed(item.url)}
                      className="w-full h-full"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                    />
                  )}

                  {/* FACEBOOK */}
                  {item.platform?.toLowerCase() === "facebook" && (
                    <div className="w-full h-full relative bg-blue-600">

                      {!isFacebookShare(item.url) && (
                        <iframe
                          src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(item.url)}`}
                          className="w-full h-full"
                          allowFullScreen
                        />
                      )}

                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-white text-center p-3">
                        <p className="text-sm font-semibold">
                          Facebook Video
                        </p>

                        {item.title && (
                          <p className="text-xs opacity-90">
                            {item.title}
                          </p>
                        )}

                        {isFacebookShare(item.url) && (
                          <p className="text-[10px] opacity-80 mt-1">
                            Preview not available
                          </p>
                        )}

                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 text-xs underline bg-white/20 px-2 py-1 rounded"
                        >
                          Open on Facebook
                        </a>
                      </div>
                    </div>
                  )}

                  {/* INSTAGRAM */}
                  {item.platform?.toLowerCase() === "instagram" && (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-linear-to-br from-pink-500 to-purple-600 text-white p-3 text-center">
                      <FaShareAlt className="text-xl" />
                      <p className="text-sm font-semibold mt-1">
                        Instagram Reel
                      </p>

                      {item.title && (
                        <p className="text-xs opacity-90">
                          {item.title}
                        </p>
                      )}

                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 text-xs underline"
                      >
                        Watch on Instagram
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

        </div>

        {/* EMPTY */}
        {featured.length === 0 && (
          <div className="text-center mt-10 text-gray-500">
            No featured media available.
          </div>
        )}
      </div>

      {/* MODAL */}
      {activeMedia && showModal && activeMedia.type !== "social" && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => {
                setActiveMedia(null);
                setShowModal(false);
              }}
              className="absolute top-4 right-4 bg-black text-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-red-600 transition z-20"
            >
              ✕
            </button>

            <div className="bg-black rounded-3xl overflow-hidden max-h-[90vh]">
              {activeMedia.type === "image" ? (
                <img
                  src={import.meta.env.VITE_UPLOADS + activeMedia.file}
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
    </section>
  );
};

export default FeaturedMedia;