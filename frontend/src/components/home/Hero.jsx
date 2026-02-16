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
      { threshold: 0.4 }
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
    [animating, index]
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

  const slide = slides[index] || { title: { en: "", hi: "" }, desc: { en: "", hi: "" } };

  // Helper to get image URL (assumes VITE_UPLOADS prefix)
  const getImageUrl = (img) => img?.startsWith("http") ? img : import.meta.env.VITE_UPLOADS + img;

  return (
    <section className="bg-amber-100">
      <div className="py-1 text-center bg-amber-700 px-4 text-white font-bold text-lg leading-relaxed tracking-widest">
        <span>आओ लौट चलें प्रकृति की ओर</span>
      </div>
      <div
        className="max-w-7xl mx-auto px-4 md:px-10 lg:px-10 py-4 md:py-10"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setTouched(true)}
        onTouchEnd={() => setTouched(false)}
        ref={heroRef}
      >
        <div className="flex flex-col-reverse md:flex-row md:gap-10">
          <div className="md:w-[40%] shrink-0">
            <h1
              className={`text-3xl md:text-4xl lg:text-5xl font-black italic leading-[1.15] text-gray-900 transition-all duration-500 ${
                animating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
              }`}
            >
              {heading[lang]}
            </h1>

            <p
              className={`mt-5 text-gray-400 text-[13px] md:text-sm leading-relaxed max-w-sm transition-all duration-500 ${
                animating ? "opacity-0" : "opacity-100"
              }`}
            >
              {slide.desc[lang]}
            </p>

            <p
              className={`mt-1 text-amber-700 text-xs font-semibold transition-all duration-500 ${
                animating ? "opacity-0" : "opacity-100"
              }`}
            >
              — {slide.title[lang]}
            </p>

            <button className="mt-8 bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm px-7 py-3 rounded-full transition-all duration-300 cursor-pointer active:scale-95">
              {lang === "hi" ? "दान करें" : "Make a Donation"}
            </button>

            {/* Dots */}
            <div className="flex gap-2 mt-8">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleSlideChange(i)}
                  className={`rounded-full transition-all duration-300 cursor-pointer ${
                    i === index ? "w-8 h-2 bg-amber-600" : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="flex-1 w-full relative md:pb-[40%] pb-[100%]">
            {images[0] && (
              <div className="absolute md:rounded-2xl rounded overflow-hidden shadow-lg" style={{ top: "0%", left: "20%", width: "25%", height: "25%" }}>
                <img src={getImageUrl(images[0])} alt="" className="w-full h-full object-cover object-top" />
              </div>
            )}
            {images[1] && (
              <div className="absolute md:rounded-2xl rounded overflow-hidden shadow-2xl" style={{ top: "0%", left: "50%", width: "50%", height: "50%" }}>
                <img src={getImageUrl(images[1])} alt="" className="w-full h-full object-cover" />
              </div>
            )}
            {images[2] && (
              <div className="absolute md:rounded-2xl rounded overflow-hidden shadow-lg" style={{ top: "30%", left: "10%", width: "35%", height: "25%" }}>
                <img src={getImageUrl(images[2])} alt="" className="w-full h-full object-cover object-top" />
              </div>
            )}
            {images[3] && (
              <div className="absolute md:rounded-2xl rounded overflow-hidden shadow-lg" style={{ top: "60%", left: "0%", width: "40%", height: "25%" }}>
                <img src={getImageUrl(images[3])} alt="" className="w-full h-full object-cover object-right" />
              </div>
            )}
            {images[4] && (
              <div className="absolute md:rounded-2xl rounded overflow-hidden shadow-lg" style={{ top: "55%", left: "45%", width: "50%", height: "25%" }}>
                <img src={getImageUrl(images[4])} alt="" className="w-full h-full object-cover object-center" />
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
