import React, { useCallback, useEffect, useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { useLanguage } from "../../context/LanguageContext";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    title: {
      en: "Gurudev Sri Ravinder",
      hi: "गुरुदेव श्री रविंदर",
    },
    desc: {
      en: "Beyond the limits of the physical mind lies a vast ocean of consciousness. Tap into it through regular meditation.",
      hi: "भौतिक मन की सीमाओं से परे चेतना का एक विशाल सागर है। नियमित ध्यान से इसमें प्रवेश करें।",
    },
  },
  {
    image: "https://images.unsplash.com/photo-1503264116251-35a269479413",
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
    <section className="w-full py-10 px-4 bg-emerald-800">
      <h6 className="text-center text-sm text-lime-400 font-bold uppercase">This is a subtitle</h6>
      <h2 className="text-center text-3xl md:text-4xl italic text-white">This is a Slogan</h2>
      <div className="flex items-center justify-center mb-8 mt-4">
        <div className="p-0.5 w-40 bg-lime-400 rounded-full"></div>
      </div>
      <div className="grid md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
        <div className="w-full h-70 md:h-100 rounded-4xl overflow-hidden shadow-xl">
          <img
            src={slide.image}
            alt="hero"
            className={`w-full h-full object-cover transition-all duration-300 ${
              animating ? "opacity-30" : "opacity-100"
            }`}
          />
        </div>
        <div
          className={`transition-all duration-300 ${
            animating ? "translate-x-2" : "translate-x-0"
          }`}
        >
          <p className="text-6xl text-lime-200 font-bold mb-4"><FaQuoteLeft /></p>
          <p className="text-lg md:text-xl text-lime-400 leading-relaxed mb-6">{slide.desc[lang]}</p>
          <h3 className="text-white font-semibold tracking-wide text-lg">— {slide.title[lang]}</h3>
          <div className="flex gap-2 mt-6">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => handleSlideChange(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? "bg-green-500 w-10" : "bg-gray-300 w-2"
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