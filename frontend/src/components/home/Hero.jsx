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

  const img1 = getImageUrl(images[0]);
  const img2 = getImageUrl(images[1]);
  const img3 = getImageUrl(images[2]);
  const img4 = getImageUrl(images[3]);
  const img5 = getImageUrl(images[4]);

  return (
    <section className="relative overflow-hidden bg-amber-900">
      <div className="py-2 text-center bg-amber-900 text-white font-bold tracking-widest text-lg border-b">
        आओ लौट चलें प्रकृति की ओर
      </div>
      <div
        className="relative max-w-7xl mx-auto px-4 md:px-10 py-10 max-md:pt-4"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setTouched(true)}
        onTouchEnd={() => setTouched(false)}
        ref={heroRef}
      >
        <div className="grid lg:grid-cols-2 lg:gap-16 gap-6 items-center">
          <div>
            <h1
              className={`text-3xl md:text-5xl font-black leading-tight transition-all duration-500 ${
                animating
                  ? "opacity-0 translate-y-3"
                  : "opacity-100 translate-y-0"
              }`}
            >
              <span className="text-white">
                {heading[lang]}
              </span>
            </h1>
            <div
              className="mt-4 p-4 rounded-r-2xl bg-white/5
                        backdrop-blur-md shadow-xl transition-all duration-500
                        border-l-4 border-yellow-500"
            >
              <p className="text-white text-base md:text-lg italic leading-relaxed">
                “{slide.desc[lang]}”
              </p>
              <div className="mt-3">
                <p className="text-yellow-500 font-bold">
                  — {slide.title[lang]}
                </p>
              </div>
            </div>
            <button className="mt-6 bg-yellow-500 text-amber-900 font-bold px-8 py-3 rounded-full shadow-lg hover:shadow-orange-400/40 hover:scale-105 transition-all duration-300 active:scale-95">
              {lang === "hi" ? "दान करें" : "Make a Donation"}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 row-span-2 overflow-hidden rounded-2xl max-h-80">
              <img
                src={img1}
                alt="Image 1"
                className="w-full h-full object-cover hover:scale-110 transition duration-300 cursor-pointer"
                onClick={() => setActiveImage(img1)}
              />
            </div>
            <div className="overflow-hidden rounded-2xl max-h-80">
              <img
                src={img2}
                alt="Image 2"
                className="w-full h-full object-cover hover:scale-110 transition duration-300 cursor-pointer"
                onClick={() => setActiveImage(img2)}
              />
            </div>
            <div className="row-span-2 overflow-hidden rounded-2xl max-h-80">
              <img
                src={img3}
                alt="Image 3"
                className="w-full h-full object-cover hover:scale-110 transition duration-300 cursor-pointer"
                onClick={() => setActiveImage(img3)}
              />
            </div>
            <div className="overflow-hidden rounded-2xl max-h-80">
              <img
                src={img4}
                alt="Image 4"
                className="w-full h-full object-cover hover:scale-110 transition duration-300 cursor-pointer"
                onClick={() => setActiveImage(img4)}
              />
            </div>
            <div className="overflow-hidden rounded-2xl max-h-80">
              <img
                src={img5}
                alt="Image 5"
                className="w-full h-full object-cover hover:scale-110 transition duration-300 cursor-pointer"
                onClick={() => setActiveImage(img5)}
              />
            </div>
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
