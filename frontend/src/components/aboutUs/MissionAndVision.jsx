import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useSelector } from "react-redux";

const MissionAndVision = () => {
  const about = useSelector((state) => state.about);
  const { lang } = useLanguage();

  if(!about) return null
  const content = about?.missionVision
  console.log(content);

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-amber-200 rounded-4xl shadow-xl p-4 md:p-8 hover:shadow-2xl transition">
        <h2 className="md:text-3xl text-2xl font-bold text-amber-700 mb-4">
          {lang === 'en' ? 'Mission' : 'मिशन'}
        </h2>
        <p className="text-gray-600 leading-relaxed font-semibold">
          {content.mission[lang]}
        </p>
      </div>
      <div className="bg-yellow-200 rounded-4xl shadow-xl p-4 md:p-8 hover:shadow-2xl transition">
        <h2 className="md:text-3xl text-2xl font-bold text-amber-700 mb-4">
          {lang === 'en' ? 'Vision' : 'दृष्टिकोण'}
        </h2>
        <p className="text-gray-600 leading-relaxed font-semibold">
          {content.vision[lang]}
        </p>
      </div>

    </div>
  );
};

export default MissionAndVision;
