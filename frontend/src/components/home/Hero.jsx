import React, { useCallback, useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useLanguage } from "../../context/LanguageContext";

const Hero = () => {
  const { lang } = useLanguage();
  const heroRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [paused, setPaused] = useState(false);
  const [touched, setTouched] = useState(false);
  const [inView, setInView] = useState(true);
  const [activeImage, setActiveImage] = useState(null);

  const hero = useSelector((state) => state.hero);
  const slides = hero?.quotes || [];
  const heading = hero?.heading || { en: "", hi: "" };
  const images = hero?.images || [];

  // Intersection observer to detect if hero is in viewport
  useEffect(() => {
    const element = heroRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.4 },
    );
    observer.observe(element);
    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, []);

  // Handle slide change
  const handleSlideChange = useCallback(
    (i) => {
      if (animating || i === index) return;
      setAnimating(true);
      setTimeout(() => {
        setIndex(i);
        setAnimating(false);
      }, 300);
    },
    [animating, index],
  );

  // Auto slide
  useEffect(() => {
    if (paused || touched || !inView || !slides.length) return;
    const timer = setInterval(() => {
      const nextIndex = (index + 1) % slides.length;
      handleSlideChange(nextIndex);
    }, 5000);
    return () => clearInterval(timer);
  }, [handleSlideChange, index, paused, touched, inView, slides.length]);

  const slide = slides[index] || {
    title: { en: "", hi: "" },
    desc: { en: "", hi: "" },
  };

  // Helper to get image URL (assumes VITE_UPLOADS prefix)
  const getImageUrl = (img) =>
    img?.startsWith("http") ? img : import.meta.env.VITE_UPLOADS + img;

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-amber-50 via-white to-orange-100">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-300/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-120 h-120 bg-orange-400/20 blur-3xl rounded-full"></div>
      <div className="py-2 text-center bg-linear-to-r from-amber-700 to-orange-600 text-white font-bold tracking-widest text-lg shadow-md">
        आओ लौट चलें प्रकृति की ओर
      </div>
      <div
        className="relative max-w-7xl mx-auto px-4 md:px-10 py-10"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setTouched(true)}
        onTouchEnd={() => setTouched(false)}
        ref={heroRef}
      >
        <div className="flex flex-col-reverse md:flex-row md:gap-16 items-center">
          <div className="md:w-[45%]">
            <h1
              className={`text-3xl md:text-4xl lg:text-5xl font-black leading-tight transition-all duration-500 ${
                animating
                  ? "opacity-0 translate-y-3"
                  : "opacity-100 translate-y-0"
              }`}
            >
              <span className="bg-linear-to-r from-amber-700 to-orange-600 bg-clip-text text-transparent">
                {heading[lang]}
              </span>
            </h1>
            <div
              className={`mt-4 p-4 rounded-2xl bg-white/70 backdrop-blur-md shadow-xl border border-amber-200 transition-all duration-500 ${
                animating ? "opacity-0" : "opacity-100"
              }`}
            >
              <p className="text-gray-700 text-base md:text-lg italic leading-relaxed">
                “{slide.desc[lang]}”
              </p>
              <div className="flex justify-between items-center gap-3 mt-3">
                <div className="flex gap-3">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handleSlideChange(i)}
                      className={`transition-all duration-300 rounded-full ${
                        i === index
                          ? "w-8 h-2 bg-linear-to-r from-amber-600 to-orange-600"
                          : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-amber-700 font-semibold text-right">
                  — {slide.title[lang]}
                </p>
              </div>
            </div>
            <button className="mt-6 bg-linear-to-r from-amber-600 to-orange-600 text-white font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-orange-400/40 hover:scale-105 transition-all duration-300 active:scale-95">
              {lang === "hi" ? "दान करें" : "Make a Donation"}
            </button>
          </div>

          <div className="flex-1 w-full relative md:pb-[40%] pb-[100%]">
            {images.map((img, i) => (
              <div
                key={i}
                onClick={() => setActiveImage(getImageUrl(img))}
                className="absolute cursor-pointer rounded-xl overflow-hidden shadow-2xl bg-white/30 backdrop-blur-md border border-white/40 transition-transform duration-500 hover:scale-105"
                style={{
                  top: `${[0, 0, 30, 60, 55][i] || 0}%`,
                  left: `${[20, 50, 10, 0, 45][i] || 0}%`,
                  width: `${[25, 50, 35, 40, 50][i] || 40}%`,
                  height: `${[25, 50, 25, 25, 25][i] || 25}%`,
                }}
              >
                <img
                  src={getImageUrl(img)}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FULL SCREEN IMAGE MODAL */}
      {activeImage && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <button
            onClick={() => setActiveImage(null)}
            className="absolute top-6 right-6 text-white text-3xl font-bold cursor-pointer"
          >
            ✕
          </button>

          <img
            src={activeImage}
            alt=""
            className="max-w-[90%] max-h-[85%] rounded-xl shadow-2xl animate-fadeIn"
          />
        </div>
      )}
    </section>
  );
};

export default Hero;
