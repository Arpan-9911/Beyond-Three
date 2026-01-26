import React from "react";
import { useLanguage } from "../../context/LanguageContext";

const WhoWeAre = () => {
  const { lang } = useLanguage();
  const content = {
    en: `Beyond Three is a social and spiritual initiative dedicated to the 
    holistic development of individuals and communities. We work towards 
    empowering society through education, awareness, culture, and innovation. 
    Our goal is to create a balanced ecosystem where tradition and modernity 
    come together to inspire meaningful change.`,
    hi: `Beyond Three एक सामाजिक और आध्यात्मिक पहल है, जो व्यक्तियों और 
    समुदायों के समग्र विकास के लिए समर्पित है। हम शिक्षा, जागरूकता, संस्कृति 
    और नवाचार के माध्यम से समाज को सशक्त बनाने का कार्य करते हैं। हमारा लक्ष्य 
    परंपरा और आधुनिकता के समन्वय से एक ऐसा वातावरण बनाना है, जो समाज में 
    सकारात्मक परिवर्तन को प्रेरित करे।`,
  };

  return (
    <p className="text-gray-700 leading-relaxed text-lg md:text-xl">
      {content[lang]}
    </p>
  );
};

export default WhoWeAre;