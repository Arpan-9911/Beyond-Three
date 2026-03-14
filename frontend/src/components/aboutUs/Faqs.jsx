import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { FaChevronDown } from "react-icons/fa";
import { useSelector } from "react-redux";

const Faqs = () => {
  const about = useSelector((state) => state.about);
  const { lang } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(null);

  if (!about?.faqs?.length) return null;

  const faqs = about.faqs;

  const getLocalized = (obj) =>
    obj?.[lang] || obj?.en || obj?.hi || "";

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="bg-white rounded-4xl shadow-xl hover:shadow-2xl overflow-hidden transition duration-300"
        >
          <button
            onClick={() => toggleFaq(index)}
            className={`w-full flex justify-between items-center px-6 py-4 text-left font-semibold text-gray-800 transition duration-300 ${
              activeIndex === index
                ? "bg-yellow-300"
                : "hover:bg-yellow-200"
            } transition`}
          >
            <span>
              {getLocalized(faq?.question)}
            </span>

            <FaChevronDown
              className={`transition-transform ${
                activeIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>

          <div
            className={`px-6 text-gray-700 text-lg leading-relaxed transition-all duration-300 ${
              activeIndex === index
                ? "py-4 opacity-100"
                : "max-h-0 py-0 opacity-0"
            } overflow-hidden`}
          >
            {getLocalized(faq?.answer)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Faqs;