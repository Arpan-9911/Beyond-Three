import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import About1 from "../../assets/about_bt.jpeg";
import About2 from "../../assets/swamiji_about.jpeg";
import About3 from "../../assets/about_approach.jpeg";

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
        en: "Beyond Three is a holistic wellness and spiritual awareness movement dedicated to balancing body, mind, and life energy. It works to awaken inner consciousness and promote natural healing, healthy living, and social harmony for a better society.",
        hi: "बियॉन्ड थ्री एक समग्र स्वास्थ्य और आध्यात्मिक जागरूकता का अभियान है, जो शरीर, मन और जीवन ऊर्जा के संतुलन पर आधारित है। यह आत्म-जागरण, प्राकृतिक उपचार, स्वस्थ जीवनशैली और सामाजिक समरसता को बढ़ावा देता है।",
      },
      img: About1,
      cta: { en: "Join Our Mission", hi: "हमारे मिशन में शामिल हों", link: "/join" },
    },
    {
      id: 2,
      title: { en: "Founder", hi: "संस्थापक" },
      desc: {
        en: "Founded under the guidance of Swami Anandeshwaranand Giri Ji Maharaj, Beyond Three is inspired by his vision of spiritual growth, natural healing, and cultural awakening. His mission is to guide individuals toward a balanced, conscious, and meaningful life rooted in Indian spiritual wisdom.",
        hi: "स्वामी आनंदेश्वरानंद गिरी जी महाराज के मार्गदर्शन में स्थापित, बियॉन्ड थ्री उनके आध्यात्मिक उत्थान, प्राकृतिक चिकित्सा और सांस्कृतिक जागरण के दृष्टिकोण से प्रेरित है। उनका उद्देश्य भारतीय आध्यात्मिक ज्ञान के माध्यम से लोगों को संतुलित, जागरूक और सार्थक जीवन की दिशा देना है।",
      },
      img: About2,
    },
    {
      id: 3,
      title: { en: "Our Approach", hi: "हमारी पद्धति" },
      desc: {
        en: "Our approach focuses on holistic healing through natural therapies, meditation, breathwork, and lifestyle balance. Beyond Three empowers individuals to reconnect with nature, restore inner harmony, and achieve complete physical, mental, and spiritual well-being.",
        hi: "हमारा दृष्टिकोण प्राकृतिक चिकित्सा, ध्यान, प्राण ऊर्जा संतुलन और संतुलित जीवनशैली के माध्यम से समग्र उपचार पर आधारित है। बियॉन्ड थ्री लोगों को प्रकृति से जुड़कर आंतरिक संतुलन और सम्पूर्ण शारीरिक, मानसिक व आध्यात्मिक स्वास्थ्य प्राप्त करने के लिए प्रेरित करता है।",
      },
      img: About3,
      cta: { en: "Learn Our Methods", hi: "हमारी विधियाँ जानें", link: "/about" },
    },
  ];

  return (
    <section className="bg-amber-100">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-3xl md:text-4xl font-bold text-amber-700 text-center mb-8">
          {lang === "hi" ? "हमारे बारे में" : "About Us"}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {aboutData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-4xl shadow-xl hover:shadow-2xl transition duration-300 overflow-hidden"
            >
              <img
                src={item.img}
                alt={item.title[lang]}
                className="w-full h-52 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">
                  {item.title[lang]}
                </h3>
                <p className="text-gray-600 mb-4">
                  {truncateText(item.desc[lang])}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <Link
                    to="/about"
                    className="inline-block px-4 py-2 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition"
                  >
                    {lang === "hi" ? "और पढ़ें" : "Read More"}
                  </Link>
                  {item.cta && (
                    <Link
                      to={item.cta.link}
                      className="inline-block px-4 py-2 bg-amber-800 text-white font-semibold rounded-lg hover:bg-amber-900 transition"
                    >
                      {item.cta[lang]}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
