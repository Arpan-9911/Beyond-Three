import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useSelector } from "react-redux";

const Founder = () => {
  const about = useSelector((state) => state.about);
  const { lang } = useLanguage();

  if(!about) return null
  const content = about?.founder

  return (
    <div className="grid md:grid-cols-2 md:gap-10 gap-4 items-center">
      <div className="w-full bg-black rounded-4xl overflow-hidden  shadow-xl hover:shadow-2xl">
        <img
          src={import.meta.env.VITE_UPLOADS + content?.image}
          alt={content?.name[lang]}
          className="w-full md:h-100 object-fill rounded-4xl hover:scale-110 transition duration-300"
        />
      </div>
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-amber-700 mb-2">
          {content?.name[lang]}
        </h2>
        <p className="text-yellow-400 font-semibold mb-4">
          {content?.title[lang]}
        </p>
        <p className="text-gray-700 leading-relaxed md:text-lg">
          {content?.description[lang]}
        </p>
      </div>
    </div>
  );
};

export default Founder;