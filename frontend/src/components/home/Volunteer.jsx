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
    <section className="py-20 bg-gray-50 px-4 md:px-16">
      <div className="max-w-7xl mx-auto bg-[#0b4d3c] rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-2xl border border-emerald-900/50">

        {/* Left Column */}
        <div className="md:w-1/2 p-8 md:p-16 text-white space-y-10">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold leading-tight">
              {volunteerData.left.title[lang]}
            </h2>
            <p className="text-lime-400 font-semibold tracking-wide text-sm md:text-base">
              {volunteerData.left.subtitle[lang]}
            </p>
          </div>

          <div className="space-y-8">
            {/* Working Hours */}
            <div className="flex items-start gap-4">
              <div className="bg-[#1a5d4c] p-3 rounded-full mt-1">
                <FaClock className="text-lime-400" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">{volunteerData.left.workingHours.label[lang]}</h4>
                <p className="text-gray-300">{volunteerData.left.workingHours.text[lang]}</p>
              </div>
            </div>

            {/* Stipend Structure */}
            <div className="flex items-start gap-4">
              <div className="bg-[#1a5d4c] p-3 rounded-full mt-1">
                <FaHandsHelping className="text-lime-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-lg mb-4">{volunteerData.left.stipend.label[lang]}</h4>
                <div className="space-y-3">
                  {volunteerData.left.stipend.rows.map((row, i) => (
                    <div key={i} className="flex justify-between items-center text-sm md:text-base">
                      <span className="text-gray-400">{row.period[lang]}</span>
                      <span className="font-bold">{row.value[lang]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:w-1/2 bg-white p-8 md:p-16 flex flex-col justify-center">
          <h3 className="text-2xl font-bold text-emerald-900 mb-8">
            {volunteerData.right.title[lang]}
          </h3>

          <div className="space-y-4 mb-10">
            {volunteerData.right.ageGroups.map((group) => (
              <div
                key={group.id}
                className="flex items-center justify-between p-4 px-6 border border-gray-100 rounded-2xl bg-gray-50/50 group hover:bg-emerald-50 transition-colors"
              >
                <div className="flex items-center gap-6">
                  <span className="bg-emerald-100 text-emerald-700 w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm">
                    {group.id}
                  </span>
                  <span className="font-bold text-gray-700 md:text-lg">
                    {lang === 'hi' ? group.hi_range : group.range}
                  </span>
                </div>
                <span className="bg-lime-100 text-emerald-800 px-4 py-1 rounded-full text-xs font-bold">
                  {lang === 'hi' ? group.hi_badge : group.badge}
                </span>
              </div>
            ))}
          </div>

          <button className="bg-[#0b4d3c] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#073529] transition-all transform active:scale-95 shadow-lg shadow-emerald-900/20">
            {volunteerData.right.button[lang]}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Volunteer;