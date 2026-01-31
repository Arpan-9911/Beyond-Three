import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import founderImg from "../../assets/HeroBG.jpg";

const Founder = () => {
  const { lang } = useLanguage();

  const content = {
    name: {
      en: "Swami Ji",
      hi: "स्वामी जी",
    },
    title: {
      en: "Founder of Beyond Three",
      hi: "Beyond Three के संस्थापक",
    },
    description: {
      en: `Swami Ji founded Beyond Three with a vision to uplift society through 
      spiritual wisdom, social responsibility, and sustainable development. 
      His philosophy emphasizes discipline, values, and practical learning 
      to create meaningful change in communities.`,
      hi: `स्वामी जी ने Beyond Three की स्थापना समाज को आध्यात्मिक ज्ञान, 
      सामाजिक जिम्मेदारी और सतत विकास के माध्यम से सशक्त बनाने के उद्देश्य से की। 
      उनकी विचारधारा अनुशासन, मूल्यों और व्यावहारिक शिक्षा पर आधारित है, 
      जिससे समाज में सकारात्मक परिवर्तन लाया जा सके।`,
    },
  };

  return (
    <div className="grid md:grid-cols-2 md:gap-10 gap-4 items-center">
      <div className="w-full bg-black rounded-4xl overflow-hidden  shadow-xl hover:shadow-2xl">
        <img
          src={founderImg}
          alt={content.name[lang]}
          className="w-full md:h-100 object-fill rounded-4xl hover:scale-110 transition duration-300"
        />
      </div>
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-amber-700 mb-2">
          {content.name[lang]}
        </h2>
        <p className="text-yellow-400 font-semibold mb-4">
          {content.title[lang]}
        </p>
        <p className="text-gray-700 leading-relaxed md:text-lg">
          {content.description[lang]}
        </p>
      </div>
    </div>
  );
};

export default Founder;