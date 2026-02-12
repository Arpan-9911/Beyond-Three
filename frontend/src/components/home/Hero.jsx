import React, { useCallback, useEffect, useState, useRef } from "react";
import { useLanguage } from "../../context/LanguageContext";
import SwamiJi from "../../assets/swamiji.jpeg";
import GuruJi from "../../assets/guruji.jpeg";
import HeroBG from "../../assets/HeroBG.jpg";

const slides = [
  {
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

const heading = {
  en: "Making A Difference Together For The Future",
  hi: "भविष्य के लिए मिलकर बदलाव लाना",
};

const subtitle = {
  en: "Join us in our mission to bring hope, support, and resources to those in need.",
  hi: "जरूरतमंदों तक आशा, सहायता और संसाधन पहुँचाने के हमारे मिशन में शामिल हों।",
};

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
      ([entry]) => { setInView(entry.isIntersecting) },
      { threshold: 0.4, }
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
        className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-8 md:py-10 lg:py-12"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setTouched(true)}
        onTouchEnd={() => setTouched(false)}
        ref={heroRef}
      >
        <div className="flex flex-col md:flex-row gap-10 lg:gap-20 items-center">

          {/* ── Left: Text ── */}
          <div className="md:w-[38%] shrink-0">
            <h1
              className={`text-3xl md:text-4xl lg:text-5xl font-black italic leading-[1.15] text-gray-900 transition-all duration-500 ${animating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
                }`}
            >
              {heading[lang]}
            </h1>


            <p
              className={`mt-5 text-gray-400 text-[13px] md:text-sm leading-relaxed max-w-sm transition-all duration-500 ${animating ? "opacity-0" : "opacity-100"
                }`}
            >
              {slide.desc[lang]}
            </p>

            <p
              className={`mt-1 text-amber-700 text-xs font-semibold transition-all duration-500 ${animating ? "opacity-0" : "opacity-100"
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
                  className={`rounded-full transition-all duration-300 cursor-pointer ${i === index
                    ? "w-8 h-2 bg-amber-600"
                    : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                />
              ))}
            </div>
          </div>

          {/* ── Right: Photo Collage (exact reference layout) ── */}
          <div className="flex-1 w-full">
            {/*
              Reference layout (approximate grid):
              ┌──────┐ ┌──────────────────┐
              │  A   │ │                  │
              └──────┘ │                  │
              ┌────┐   │        B         │
              │ C  │   │   (main large)   │
              └────┘   │                  │
              ┌─────────┐└──────────────────┘
              │   D     │ ┌──────┐
              └─────────┘ │  E   │
                          └──────┘
            */}
            <div className="relative w-full" style={{ paddingBottom: "50%" }}>

              {/* A — top-left small square */}
              <div className="absolute rounded-2xl overflow-hidden shadow-lg"
                style={{ top: "0%", left: "18%", width: "28%", height: "36%" }}
              >
                <img src={GuruJi} alt="" className="w-full h-full object-cover object-top" />
              </div>

              {/* B — main large image (right, tall) */}
              <div className="absolute rounded-2xl overflow-hidden shadow-2xl"
                style={{ top: "0%", left: "50%", width: "50%", height: "78%" }}
              >
                <img src={HeroBG} alt="" className="w-full h-full object-cover" />
              </div>

              {/* C — middle-left small */}
              <div className="absolute rounded-2xl overflow-hidden shadow-lg"
                style={{ top: "40%", left: "8%", width: "24%", height: "28%" }}
              >
                <img src={SwamiJi} alt="" className="w-full h-full object-cover object-top" />
              </div>

              {/* D — bottom-left wide */}
              <div className="absolute rounded-2xl overflow-hidden shadow-lg"
                style={{ top: "72%", left: "0%", width: "38%", height: "28%" }}
              >
                <img src={HeroBG} alt="" className="w-full h-full object-cover object-right" />
              </div>

              {/* E — bottom-center */}
              <div className="absolute rounded-2xl overflow-hidden shadow-lg"
                style={{ top: "82%", left: "42%", width: "28%", height: "18%" }}
              >
                <img src={GuruJi} alt="" className="w-full h-full object-cover object-center" />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;