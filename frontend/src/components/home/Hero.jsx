import React, { useCallback, useEffect, useState, useRef } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { useLanguage } from "../../context/LanguageContext";
import SwamiJi from "../../assets/swamiji.jpeg";
import GuruJi from "../../assets/guruji.jpeg";

const slides = [
  {
    image: GuruJi,
    title: {
      en: "Pujya Harigiri Ji Maharaj",
      hi: "पूज्य हरिगिरि जी महाराज",
    },
    desc: {
      en: "Spiritual practice and service are the greatest powers in life. Only when a seeker awakens balance and spiritual practice within himself can he give a new direction to society and the nation.",
      hi: "साधना और सेवा ही जीवन की सबसे बड़ी शक्ति है। जब साधक अपने भीतर संतुलन और साधना जगाता है, तभी वह समाज और राष्ट्र को नई दिशा दे सकता है।",
    },
  },
  {
    image: SwamiJi,
    title: {
      en: "Swami Anandramanand Giri Ji Maharaj",
      hi: "स्वामी आनंदरामानंद गिरि जी महाराज",
    },
    desc: {
      en: "The purpose of life is not merely to live for oneself, but to awaken for the collective upliftment of society. One who connects with the soul alone ignites the consciousness of the nation.",
      hi: "जीवन का उद्देश्य केवल स्वयं के लिए जीना नहीं, बल्कि सामूहिक उत्थान के लिए जागृत होना है। जो आत्मा से जुड़ता है, वही राष्ट्र की चेतना को प्रज्वलित करता है।",
    },
  },
];

const Hero = () => {
  const { lang } = useLanguage();
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [paused, setPaused] = useState(false);
  const [touched, setTouched] = useState(false);
  const heroRef = useRef(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const element = heroRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {setInView(entry.isIntersecting)},
      {threshold: 0.4,}
    );
    observer.observe(element);
    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, []);

  const handleSlideChange = useCallback((i) => {
    if (animating || i === index) return;
    setAnimating(true);
    setTimeout(() => {
      setIndex(i);
      setAnimating(false);
    }, 300);
  }, [animating, index]);

  useEffect(() => {
    if (paused || touched || !inView) return;
    const timer = setInterval(() => {
      const nextIndex = (index + 1) % slides.length;
      handleSlideChange(nextIndex);
    }, 5000);
    return () => clearInterval(timer);
  }, [handleSlideChange, index, paused, touched, inView]);
  
  const slide = slides[index];

  return (
    <section className="bg-amber-100">
      <div className="py-1 text-center bg-amber-700 px-4 text-white font-bold text-lg leading-relaxed tracking-widest">
        <span>आओ लौट चलें प्रकृति की ओर</span>
      </div>
      <div
        className="grid md:grid-cols-2 border-4 border-amber-700"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setTouched(true)}
        onTouchEnd={() => setTouched(false)}
        ref={heroRef}
      >
        <div className="h-80 md:h-120 overflow-hidden md:border-r-4 max-md:border-b-4 border-amber-700">
          <img
            src={slide.image}
            alt="Swami Ji"
            className={`w-full h-full object-cover transition-all duration-500 ${
                animating ? "opacity-40 scale-105" : "opacity-100 scale-100"
              }`}
          />
        </div>
        <div className="relative h-full md:p-10 p-6 flex flex-col justify-center bg-[#ead1b7]">
          <div className="absolute md:top-6 top-0 md:left-6 left-2 text-[120px] font-serif text-amber-700/40 leading-none select-none">
            <FaQuoteLeft />
          </div>
          <p className="relative text-lg md:text-2xl text-gray-900 max-w-2xl z-10 font-semibold">
            {slide.desc[lang]}
          </p>
          <div className="mt-10 mb-4 w-24 h-1 bg-amber-700"></div>
          <h3 className="text-xl font-bold tracking-wide text-amber-800">
            {slide.title[lang]}
          </h3>
          <div className="flex gap-3 mt-12">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => handleSlideChange(i)}
                className={`h-1 transition-all duration-300 ${
                  i === index
                    ? "w-16 bg-amber-700"
                    : "w-6 bg-amber-700/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;