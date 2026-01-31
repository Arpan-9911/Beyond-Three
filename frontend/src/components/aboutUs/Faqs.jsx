import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { FaChevronDown } from "react-icons/fa";

const Faqs = () => {
  const { lang } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(null);
  const faqs = [
    {
      question: {
        en: "What is Beyond Three?",
        hi: "Beyond Three क्या है?",
      },
      answer: {
        en: "Beyond Three is a social and spiritual initiative focused on community development, awareness, and empowerment.",
        hi: "Beyond Three एक सामाजिक और आध्यात्मिक पहल है जो समुदाय के विकास, जागरूकता और सशक्तिकरण पर केंद्रित है।",
      },
    },
    {
      question: {
        en: "How can I join Beyond Three?",
        hi: "मैं Beyond Three से कैसे जुड़ सकता हूँ?",
      },
      answer: {
        en: "You can join Beyond Three by participating in our programs, volunteering, or collaborating with us.",
        hi: "आप हमारे कार्यक्रमों में भाग लेकर, स्वयंसेवा करके या हमारे साथ सहयोग करके Beyond Three से जुड़ सकते हैं।",
      },
    },
    {
      question: {
        en: "Is Beyond Three a registered organization?",
        hi: "क्या Beyond Three एक पंजीकृत संस्था है?",
      },
      answer: {
        en: "Yes, Beyond Three is a registered trust with all legal documents available in the Legal Documents section.",
        hi: "हाँ, Beyond Three एक पंजीकृत ट्रस्ट है और इसके सभी कानूनी दस्तावेज़ Legal Documents सेक्शन में उपलब्ध हैं।",
      },
    },
  ];

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="bg-white rounded-4xl shadow-xl hover:shadow-2xl overflow-hidden"
        >
          <button
            onClick={() => toggleFaq(index)}
            className={`w-full flex justify-between items-center px-6 py-4 text-left font-semibold text-gray-800 ${activeIndex === index ? "bg-yellow-300" : "hover:bg-yellow-200"} transition`}
          >
            <span>
              {lang === "hi" ? faq.question.hi : faq.question.en}
            </span>
            <FaChevronDown
              className={`transition-transform ${
                activeIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* ✅ Answer */}
          <div
            className={`px-6 text-gray-700 text-lg leading-relaxed transition-all duration-300 ${
              activeIndex === index
                ? "max-h-40 py-4 opacity-100"
                : "max-h-0 py-0 opacity-0"
            } overflow-hidden`}
          >
            {lang === "hi" ? faq.answer.hi : faq.answer.en}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Faqs;
