import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import About1 from "../../assets/HeroBG.jpg";
import About2 from "../../assets/HeroBG.jpg";
import About3 from "../../assets/HeroBG.jpg";

const truncateText = (text, limit = 120) => {
  return text.length > limit ? text.substring(0, limit) + "..." : text;
};

const About = () => {
  const { lang } = useLanguage();
  const aboutData = [
    {
      id: 1,
      title: { en: "Beyond Three", hi: "बियॉन्ड थ्री" },
      desc: {
        en: "Beyond Three is an initiative focused on social development, awareness, and empowerment of communities through education, culture, and innovation.",
        hi: "बियॉन्ड थ्री एक पहल है जो शिक्षा, संस्कृति और नवाचार के माध्यम से समाज के विकास, जागरूकता और सशक्तिकरण पर केंद्रित है।",
      },
      img: About1,
    },
    {
      id: 2,
      title: { en: "Founded by Swami Ji", hi: "स्वामी जी द्वारा स्थापित" },
      desc: {
        en: "The organization was founded by Swami Ji with a vision to uplift society through spiritual wisdom, social responsibility, and sustainable development.",
        hi: "इस संगठन की स्थापना स्वामी जी ने समाज को आध्यात्मिक ज्ञान, सामाजिक जिम्मेदारी और सतत विकास के माध्यम से उठाने के दृष्टिकोण के साथ की।",
      },
      img: About2,
    },
    {
      id: 3,
      title: { en: "Our Padhdhati", hi: "हमारी पद्धति" },
      desc: {
        en: "Our padhdhati is based on discipline, values, and practical learning. We combine tradition with modern approaches to create meaningful impact.",
        hi: "हमारी पद्धति अनुशासन, मूल्यों और व्यावहारिक शिक्षा पर आधारित है। हम परंपरा और आधुनिक दृष्टिकोण को मिलाकर सार्थक प्रभाव पैदा करते हैं।",
      },
      img: About3,
    },
  ];

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {lang === "hi" ? "हमारे बारे में" : "About Us"}
        </h2>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {aboutData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
            >
              {/* Image */}
              <img
                src={item.img}
                alt={item.title[lang]}
                className="w-full h-52 object-cover"
              />

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">
                  {item.title[lang]}
                </h3>
                <p className="text-gray-600 mb-4">
                  {truncateText(item.desc[lang])}
                </p>

                {/* Button using Link */}
                <Link
                  to="/about"
                  className="inline-block px-4 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition"
                >
                  {lang === "hi" ? "और पढ़ें →" : "Read More →"}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
