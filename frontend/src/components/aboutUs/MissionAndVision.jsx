import React from "react";
import { useLanguage } from "../../context/LanguageContext";

const MissionAndVision = () => {
  const { lang } = useLanguage();

  const content = {
    mission: {
      title: {
        en: "Our Mission",
        hi: "हमारा मिशन",
      },
      text: {
        en: `Our mission is to empower individuals and communities through 
        education, awareness, and ethical values. We strive to create a society 
        that is socially responsible, spiritually aware, and capable of sustainable growth.`,
        hi: `हमारा मिशन शिक्षा, जागरूकता और नैतिक मूल्यों के माध्यम से व्यक्तियों 
        और समुदायों को सशक्त बनाना है। हम एक ऐसे समाज का निर्माण करना चाहते हैं 
        जो सामाजिक रूप से जिम्मेदार, आध्यात्मिक रूप से जागरूक और सतत विकास में सक्षम हो।`,
      },
    },
    vision: {
      title: {
        en: "Our Vision",
        hi: "हमारी दृष्टिकोण",
      },
      text: {
        en: `Our vision is to build a harmonious society where tradition and 
        modern innovation coexist. We aim to inspire future generations to lead 
        meaningful lives with purpose, discipline, and compassion.`,
        hi: `हमारी दृष्टि एक ऐसे सामंजस्यपूर्ण समाज का निर्माण करना है जहाँ परंपरा 
        और आधुनिक नवाचार साथ-साथ आगे बढ़ें। हम आने वाली पीढ़ियों को उद्देश्य, 
        अनुशासन और करुणा के साथ सार्थक जीवन जीने के लिए प्रेरित करना चाहते हैं।`,
      },
    },
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-emerald-200 rounded-4xl shadow-xl p-4 md:p-8 hover:shadow-2xl transition">
        <h2 className="md:text-3xl text-2xl font-bold text-emerald-700 mb-4">
          {content.mission.title[lang]}
        </h2>
        <p className="text-gray-600 leading-relaxed font-semibold">
          {content.mission.text[lang]}
        </p>
      </div>
      <div className="bg-lime-200 rounded-4xl shadow-xl p-4 md:p-8 hover:shadow-2xl transition">
        <h2 className="md:text-3xl text-2xl font-bold text-emerald-700 mb-4">
          {content.vision.title[lang]}
        </h2>
        <p className="text-gray-600 leading-relaxed font-semibold">
          {content.vision.text[lang]}
        </p>
      </div>

    </div>
  );
};

export default MissionAndVision;
