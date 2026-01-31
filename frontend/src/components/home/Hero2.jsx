import React, { useCallback, useEffect, useState } from "react";
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
      en: "Spiritual Awakening",
      hi: "आध्यात्मिक जागरण",
    },
    desc: {
      en: "True peace comes when the mind becomes silent and the soul speaks.",
      hi: "सच्ची शांति तब आती है जब मन शांत हो जाता है और आत्मा बोलती है।",
    },
  },
];

const Hero = () => {
  const { lang } = useLanguage();
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const handleSlideChange = useCallback((i) => {
    if (animating || i === index) return;
    setAnimating(true);
    setTimeout(() => {
      setIndex(i);
      setAnimating(false);
    }, 300);
  }, [animating, index]);

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (index + 1) % slides.length;
      handleSlideChange(nextIndex);
    }, 5000);
    return () => clearInterval(timer);
  }, [handleSlideChange, index]);
  
  const slide = slides[index];

  return (
    <section className="relative w-full py-10 px-4 bg-[#fff6ec] overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-[#FFE8D2] via-[#FFF6EC] to-[#E8F4FF]"></div>
      <div className="absolute top-10 left-10 w-120 h-120 bg-[#F5C86B] rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 -right-32 w-120 h-120 bg-[#AEE3C6] rounded-full blur-3xl"></div>
      <div className="relative z-10 text-center mb-8">
        <span className="inline-block text-xs font-semibold tracking-widest text-[#5C3B12] bg-[#F5C86B] px-6 py-1 rounded-full shadow">
          ॐ श्री श्री हरि
        </span>
        <h2 className="mt-2 text-4xl md:text-5xl font-extrabold text-[#2A1E12] leading-tight">
          आओ लौट चलें <span className="text-[#F28C28]">प्रकृति</span> की ओर
        </h2>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 md:gap-10 gap-4 items-center">
        <div className="relative">
          <div className="absolute -inset-4 bg-linear-to-br from-[#F5C86B]/80 via-[#F28C28]/60 to-[#7AD1A6]/60 rounded-4xl blur-xl"></div>
          <div className="relative rounded-4xl overflow-hidden border-10 border-[#F6F1EB] shadow-[0_30px_70px_rgba(242,140,40,0.35)]">
            <img
              src={slide.image}
              alt="hero"
              className={`w-full h-80 md:h-100 object-fill transition-all duration-500 ${
                animating ? "opacity-40 scale-105" : "opacity-100 scale-100"
              }`}
            />
          </div>
        </div>
        <div
          className={`relative bg-[#FFFCF7] backdrop-blur-xl rounded-4xl p-6 md:p-8 shadow-[0_25px_60px_rgba(245,200,107,0.35)] transition-all duration-300 ${
            animating ? "translate-x-4 opacity-70" : "translate-x-0 opacity-100"
          }`}
        >
          <div className="absolute left-0 top-12 h-28 w-1.5 bg-linear-to-b from-[#F5C86B] via-[#F28C28] to-[#2F7D64] rounded-full"></div>
          <FaQuoteLeft className="text-6xl text-[#F28C28] mb-6" style={{ filter: "drop-shadow(0 0 18px rgba(242,140,40,0.45))" }} />
          <p className="md:text-xl font-medium text-[#3A3A3A] mb-4">
            {slide.desc[lang]}
          </p>
          <h3 className="text-amber-800 font-semibold tracking-wide text-lg">
            — {slide.title[lang]}
          </h3>
          <div className="flex items-center gap-4 mt-8">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => handleSlideChange(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-14 bg-linear-to-r from-[#F5C86B] to-[#F28C28] shadow-lg"
                    : "w-3 bg-[#FFDDBA]"
                }`}
              ></button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;