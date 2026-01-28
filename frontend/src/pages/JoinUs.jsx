import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { FaCheckCircle, FaUserFriends, FaRegUserCircle } from "react-icons/fa";

const JoinUs = () => {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState("volunteer");

  const t = {
    title: { en: "Join Us", hi: "हमसे जुड़ें" },
    volunteerTab: { en: "Become a Volunteer", hi: "स्वयंसेवक बनें" },
    memberTab: { en: "Become a Member", hi: "सदस्य बनें" },
    formTitle: {
      volunteer: { en: "Registration Form (Become a Volunteer)", hi: "पंजीकरण फॉर्म (स्वयंसेवक बनें)" },
      member: { en: "Registration Form (Become a Member)", hi: "पंजीकरण फॉर्म (सदस्य बनें)" },
    },
    fields: {
      name: { en: "Full Name", hi: "पूरा नाम" },
      email: { en: "Email", hi: "ईमेल" },
      mobile: { en: "Mobile", hi: "मोबाइल" },
      password: { en: "Password", hi: "पासवर्ड" },
      reason: { en: "Reason for volunteering", hi: "स्वयंसेवा का कारण" },
    },
    submit: { en: "Join Now", hi: "अभी जुड़ें" },
    note: {
      en: "Note: You can login only after your account is verified by us.",
      hi: "नोट: आप अपना खाता हमारे द्वारा सत्यापित होने के बाद ही लॉगिन कर सकते हैं।"
    },
    benefitsTitle: {
      volunteer: { en: "Benefits:", hi: "लाभ:" },
      member: { en: "Exclusive Perks:", hi: "विशेष लाभ:" },
    },
    volunteerDesc: {
      en: "Work with us to promote social service and natural lifestyle.",
      hi: "सामाजिक सेवा और प्राकृतिक जीवन शैली को बढ़ावा देने के लिए हमारे साथ काम करें।"
    },
    memberDesc: {
      en: "Be part of Beyond Three family and enjoy exclusive benefits.",
      hi: "बियॉन्ड थ्री परिवार का हिस्सा बनें और विशेष लाभों का आनंद लें।"
    },
    volunteerList: [
      { en: "Participation in grand events", hi: "भव्य आयोजनों में भागीदारी" },
      { en: "Direct guidance from Swami Anand", hi: "स्वामी आनंद से सीधा मार्गदर्शन" },
      { en: "Certificate and stipend opportunities", hi: "प्रमाण पत्र और वजीफा के अवसर" },
    ],
    memberList: [
      { en: "Access to detailed health blogs", hi: "विस्तृत स्वास्थ्य ब्लॉगों तक पहुंच" },
      { en: "Priority in camp bookings", hi: "शिविर बुकिंग में प्राथमिकता" },
      { en: "Personal health record dashboard", hi: "व्यक्तिगत स्वास्थ्य रिकॉर्ड डैशबोर्ड" },
    ],
  };

  const activeContent = activeTab === "volunteer" ? {
    title: t.volunteerTab[lang],
    desc: t.volunteerDesc[lang],
    benefits: t.volunteerList,
    formTitle: t.formTitle.volunteer[lang]
  } : {
    title: t.memberTab[lang],
    desc: t.memberDesc[lang],
    benefits: t.memberList,
    formTitle: t.formTitle.member[lang]
  };

  return (
    <div className="bg-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-10 pt-20 min-h-dvh">
        <h1 className="border-l-4 border-lime-400 pl-4 md:text-4xl text-3xl font-bold text-emerald-700 mb-8">
          {t.title[lang]}
        </h1>
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveTab("volunteer")}
            className={`px-4 py-1 rounded-full text-sm font-medium cursor-pointer ${
              activeTab === 'volunteer'
                ? "bg-emerald-700 text-white"
                : "bg-white hover:bg-lime-200"
            }`}
          >
            {t.volunteerTab[lang]}
          </button>
          <button
            onClick={() => setActiveTab("member")}
            className={`px-4 py-1 rounded-full text-sm font-medium cursor-pointer ${
              activeTab === 'member'
                ? "bg-emerald-700 text-white"
                : "bg-white hover:bg-lime-200"
            }`}
          >
            {t.memberTab[lang]}
          </button>
        </div>
        <div className="flex flex-col-reverse lg:flex-row gap-6 items-start">
          <div className="w-full lg:w-3/5 bg-white sm:p-8 p-4 rounded-2xl shadow-xl border border-emerald-100">
            <h2 className="text-2xl font-bold text-emerald-800 mb-8">
              {activeContent.formTitle}
            </h2>
            <section className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-emerald-700 px-1">{t.fields.name[lang]}</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-gray-50 border border-lime-400 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-emerald-700 px-1">{t.fields.email[lang]}</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 bg-gray-50 border border-lime-400 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-emerald-700 px-1">{t.fields.mobile[lang]}</label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 bg-gray-50 border border-lime-400 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="..."
                />
              </div>
              {activeTab === "volunteer" ? (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-emerald-900 px-1">{t.fields.reason[lang]}</label>
                  <textarea
                    rows="4"
                    className="w-full px-3 py-2 bg-gray-50 border border-lime-400 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="..."
                  ></textarea>
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-emerald-900 px-1">{t.fields.password[lang]}</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 bg-gray-50 border border-lime-400 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="..."
                  />
                </div>
              )}
              <p className="text-xs text-orange-600 font-medium italic mt-2">
                {t.note[lang]}
              </p>
              <button className="w-full cursor-pointer bg-emerald-700 text-white py-3 rounded-2xl font-bold text-lg hover:bg-emerald-800 transition-all shadow-lg active:scale-90 mt-2">
                {t.submit[lang]}
              </button>
            </section>
          </div>

          <div className="w-full lg:w-2/5 space-y-6">
            <div className="flex items-start gap-6">
              <div className="bg-white p-4 rounded-2xl shadow-md text-emerald-700 text-4xl mt-1 border border-emerald-50">
                <FaUserFriends />
              </div>
              <div className="space-y-2 pt-1">
                <h3 className="text-xl font-bold text-emerald-900">{activeContent.title}</h3>
                <p className="text-gray-600 leading-relaxed font-medium">
                  {activeContent.desc}
                </p>
              </div>
            </div>
            <div className="bg-white sm:p-8 p-4 rounded-2xl shadow-lg border border-emerald-50">
              <h4 className="text-emerald-800 font-bold mb-4 text-lg border-b border-emerald-50 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-lime-400 rounded-full"></span>
                {t.benefitsTitle[activeTab][lang]}
              </h4>
              <ul className="space-y-2">
                {activeContent.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-700 group">
                    <FaCheckCircle className="text-lime-500 text-xl shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">{benefit[lang]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default JoinUs;
