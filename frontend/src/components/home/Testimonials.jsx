import React, { useState } from "react";
import { FaStar, FaQuoteRight } from "react-icons/fa";
import { useLanguage } from "../../context/LanguageContext";

const Testimonials = () => {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);

  const testimonialData = {
    title: {
      en: "User Experiences",
      hi: "उपयोगकर्ता अनुभव",
    },
    subtitle: {
      en: "Thousands have transformed their lifestyles",
      hi: "हज़ारों ने अपनी जीवनशैली बदली है",
    },
    testimonials: [
      {
        id: 1,
        stars: 5,
        text: {
          en: '"With Swami ji\'s guidance, my 10-year-old back pain vanished."',
          hi: '"स्वामी जी के मार्गदर्शन से मेरा 10 साल पुराना पीठ दर्द गायब हो गया।"',
        },
        name: {
          en: "Rahul Sharma",
          hi: "राहुल शर्मा",
        },
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      {
        id: 2,
        stars: 5,
        text: {
          en: '"Natural diet has completely transformed my energy levels."',
          hi: '"प्राकृतिक आहार ने मेरे ऊर्जा स्तर को पूरी तरह से बदल दिया है।"',
        },
        name: {
          en: "Priya Singh",
          hi: "प्रिया सिंह",
        },
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      },
      {
        id: 3,
        stars: 5,
        text: {
          en: '"Beyond Three is the true path to living a stress-free life."',
          hi: '"बियॉन्ड थ्री तनावमुक्त जीवन जीने का असली रास्ता है।"',
        },
        name: {
          en: "Amit Verma",
          hi: "अमित वर्मा",
        },
        avatar: "https://randomuser.me/api/portraits/men/46.jpg",
      },
    ],
  };

  return (
    <>
      <section className="bg-amber-100">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-700">
              {testimonialData.title[lang]}
            </h2>
            <button
              onClick={() => setOpen(true)}
              className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2 rounded-full shadow transition"
            >
              + Add
            </button>
          </div>
          <p className="text-gray-600 mb-8">
            {testimonialData.subtitle[lang]}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8 gap-4">
            {testimonialData.testimonials.map((item) => (
              <div
                key={item.id}
                className="relative bg-white md:p-8 p-4 rounded-4xl shadow-xl hover:shadow-2xl transition duration-300 text-left flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start md:mb-6">
                    <div className="flex gap-1">
                      {[...Array(item.stars)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-500 text-lg" />
                      ))}
                    </div>
                    <FaQuoteRight className="text-yellow-100 text-4xl" />
                  </div>
                  <p className="text-gray-700 italic md:mb-8 mb-4 leading-relaxed">
                    {item.text[lang]}
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-auto">
                  <img
                    src={item.avatar}
                    alt={item.name[lang]}
                    className="w-12 h-12 rounded-full object-cover border-2 border-yellow-100"
                  />
                  <h4 className="font-bold text-amber-800">
                    {item.name[lang]}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-amber-700 mb-4">
              Add Testimonial
            </h3>
            <input
              placeholder="Name (English)"
              className="w-full mb-2 px-4 py-2 border rounded-full"
            />
            <input
              placeholder="नाम (हिंदी)"
              className="w-full mb-3 px-4 py-2 border rounded-full"
            />
            <textarea
              placeholder="Testimonial (English)"
              className="w-full mb-2 px-4 py-2 border rounded-xl"
              rows="3"
            />
            <textarea
              placeholder="प्रशंसापत्र (हिंदी)"
              className="w-full mb-3 px-4 py-2 border rounded-xl"
              rows="3"
            />
            <select className="w-full mb-4 px-4 py-2 border rounded-full">
              <option value="5">★★★★★ (5)</option>
              <option value="4">★★★★☆ (4)</option>
              <option value="3">★★★☆☆ (3)</option>
              <option value="2">★★☆☆☆ (2)</option>
              <option value="1">★☆☆☆☆ (1)</option>
            </select>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-full border"
              >
                Cancel
              </button>
              <button className="bg-amber-600 text-white px-5 py-2 rounded-full">
                Save
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default Testimonials;
