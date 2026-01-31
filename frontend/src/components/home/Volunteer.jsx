import React from "react";
import { FaClock, FaHandsHelping } from "react-icons/fa";
import { useLanguage } from "../../context/LanguageContext";

const Volunteer = () => {
  const { lang } = useLanguage();
  const volunteerData = {
    left: {
      title: { en: "Beyond Three Volunteering", hi: "बियॉन्ड थ्री स्वयंसेवा" },
      subtitle: {
        en: "Social Service • Skill Development • Stable Opportunities",
        hi: "समाज सेवा • कौशल विकास • स्थिर अवसर",
      },
      workingHours: {
        label: { en: "Working Hours", hi: "कार्य के घंटे" },
        text: {
          en: "2 Hours Daily (1 hr Morning, 1 hr Evening)",
          hi: "प्रतिदिन 2 घंटे (1 घंटा सुबह, 1 घंटा शाम)",
        },
      },
      stipend: {
        label: { en: "Stipend Structure", hi: "वजीफा संरचना" },
        rows: [
          {
            period: { en: "1st Month", hi: "पहला महीना" },
            value: { en: "Volunteering", hi: "स्वयंसेवा" },
          },
          {
            period: { en: "Intern", hi: "इंटर्न" },
            value: { en: "₹5k - ₹10k + Incentive", hi: "₹5k - ₹10k + प्रोत्साहन" },
          },
          {
            period: { en: "After 3 Months", hi: "3 महीने के बाद" },
            value: { en: "₹15k - ₹20k", hi: "₹15k - ₹20k" },
          },
        ],
      },
    },
    right: {
      title: { en: "Required Age Groups", hi: "आवश्यक आयु समूह" },
      ageGroups: [
        { id: 1, range: "18 - 25 Years", badge: "20 Male", hi_range: "18 - 25 वर्ष", hi_badge: "20 पुरुष" },
        { id: 2, range: "25 - 35 Years", badge: "20 Male", hi_range: "25 - 35 वर्ष", hi_badge: "20 पुरुष" },
        { id: 3, range: "35 - 50 Years", badge: "20 Male", hi_range: "35 - 50 वर्ष", hi_badge: "20 पुरुष" },
      ],
      button: { en: "Apply Now", hi: "अभी आवेदन करें" },
    },
  };

  return (
    <section className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="bg-amber-800 rounded-4xl shadow-xl overflow-hidden flex max-md:flex-col hover:shadow-2xl border border-amber-900">
          <div className="md:w-1/2 p-4 md:p-10 lg:p-16 text-white flex flex-col justify-center gap-8">
            <div className="space-y-3">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                {volunteerData.left.title[lang]}
              </h2>
              <p className="text-yellow-400 font-semibold tracking-wide text-xs md:text-sm lg:text-base">
                {volunteerData.left.subtitle[lang]}
              </p>
            </div>
            <div className="space-y-6 md:space-y-8">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="bg-amber-900 p-2 md:p-3 rounded-full mt-1 shrink-0">
                  <FaClock className="text-yellow-400 text-sm md:text-base" />
                </div>
                <div>
                  <h4 className="font-bold text-base md:text-lg mb-1">{volunteerData.left.workingHours.label[lang]}</h4>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">{volunteerData.left.workingHours.text[lang]}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 md:gap-4">
                <div className="bg-amber-900 p-2 md:p-3 rounded-full mt-1 shrink-0">
                  <FaHandsHelping className="text-yellow-400 text-sm md:text-base" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-base md:text-lg mb-3 md:mb-4">{volunteerData.left.stipend.label[lang]}</h4>
                  <div className="space-y-2 md:space-y-3">
                    {volunteerData.left.stipend.rows.map((row, i) => (
                      <div key={i} className="flex justify-between items-center text-xs md:text-sm lg:text-base gap-4">
                        <span className="text-gray-400 whitespace-nowrap">{row.period[lang]}</span>
                        <span className="font-bold text-right">{row.value[lang]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 bg-white p-4 md:p-10 lg:p-16 flex flex-col justify-center">
            <h3 className="text-xl md:text-2xl font-bold text-amber-700 mb-6 md:mb-8">
              {volunteerData.right.title[lang]}
            </h3>

            <div className="space-y-3 md:space-y-4 mb-8">
              {volunteerData.right.ageGroups.map((group) => (
                <div
                  key={group.id}
                  className="flex items-center justify-between p-3 md:p-4 px-4 md:px-6 border border-gray-100 rounded-xl md:rounded-2xl bg-gray-50/50 group hover:bg-amber-50 transition-colors gap-3"
                >
                  <div className="flex items-center gap-3 md:gap-6 min-w-0">
                    <span className="bg-amber-100 text-amber-700 w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-full font-bold text-xs md:text-sm shrink-0">
                      {group.id}
                    </span>
                    <span className="font-bold text-gray-700 text-sm md:text-base lg:text-lg truncate">
                      {lang === 'hi' ? group.hi_range : group.range}
                    </span>
                  </div>
                  <span className="bg-yellow-100 text-amber-800 px-3 py-1 rounded-full text-[10px] md:text-xs font-bold whitespace-nowrap shrink-0">
                    {lang === 'hi' ? group.hi_badge : group.badge}
                  </span>
                </div>
              ))}
            </div>
            <button className="bg-amber-800 text-white cursor-pointer py-3 md:py-4 rounded-xl md:rounded-2xl font-bold text-base md:text-lg hover:bg-amber-900 transition active:scale-95 shadow-lg">
              <span>{volunteerData.right.button[lang]}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Volunteer;