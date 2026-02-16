import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useSelector } from "react-redux";

const WhoWeAre = () => {
  const about = useSelector((state) => state.about);
  const { lang } = useLanguage();

  if(!about) return null
  const content = about?.whoWeAre
  console.log(content);

  return (
    <p className="text-gray-700 leading-relaxed text-lg md:text-xl">
      {content.description[lang]}
    </p>
  );
};

export default WhoWeAre;