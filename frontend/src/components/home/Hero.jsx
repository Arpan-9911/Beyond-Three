import React from "react";
import HeroBG from "../../assets/HeroBG.jpg";
// import { useLanguage } from "../../context/LanguageContext";

const Hero = () => {
  // const { lang } = useLanguage();
  // const tagline = {
  //   en: "Welcome to Beyond Three",
  //   hi: "बियॉन्ड थ्री में आपका स्वागत है",
  // }
  // const subtitle = {
  //   en: "A new beginning beyond medicine and pain. Live with Beyond Three under Swami Anand's guidance.",
  //   hi: "चिकित्सा और दर्द के बाहर एक नया शुरू है। स्वामी अनंद की सहायता से Beyond Three में रहें।",
  // }
  return (
    <div className="relative max-h-dvh w-full overflow-hidden">
      <img
        src={HeroBG}
        alt="Banner"
        className="w-full h-full object-fill min-h-100 sm:min-h-150"
      />
      {/* <div className="absolute left-8 bottom-8 rounded-lg p-4 w-full">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          {lang === "hi" ? tagline.hi : tagline.en}
        </h1>
        <p className="text-lg md:text-2xl font-bold">
          {lang === "hi" ? subtitle.hi : subtitle.en}
        </p>
      </div> */}
    </div>
  );
};

export default Hero;