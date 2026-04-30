import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { FaSpa } from "react-icons/fa";
import { createAppointment } from "../functions";
import { toast } from "react-toastify";

const Appointment = () => {
  const { lang } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    notes: "",
  });

  const t = {
    title: { en: "Book an Appointment", hi: "अपॉइंटमेंट बुक करें" },
    subtitle: {
      en: "Schedule a meeting with our spiritual guides",
      hi: "हमारे आध्यात्मिक मार्गदर्शकों के साथ मिलने का समय निर्धारित करें",
    },
    name: { en: "Full Name", hi: "पूरा नाम" },
    email: { en: "Email Address", hi: "ईमेल पता" },
    phone: { en: "Phone Number", hi: "फ़ोन नंबर" },
    date: { en: "Preferred Date", hi: "पसंदीदा तारीख़" },
    time: { en: "Preferred Time", hi: "पसंदीदा समय" },
    notes: { en: "Additional Notes (Optional)", hi: "अतिरिक्त नोट (वैकल्पिक)" },
    submit: { en: "Book Appointment", hi: "अपॉइंटमेंट बुक करें" },
    note: {
      en: "* You will receive a confirmation call within 24 hours",
      hi: "* आपको 24 घंटे के भीतर पुष्टिकरण कॉल प्राप्त होगी",
    },
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.name || !formData.email || !formData.phone || !formData.date || !formData.time) {
      alert(lang === "hi" ? "कृपया सभी आवश्यक फ़ील्ड भरें" : "Please fill in all required fields");
      return;
    }
    try {
      await createAppointment(formData);
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        notes: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.msg || lang === "hi" ? "अपॉइंटमेंट बुक करने में विफल" : "Failed to book appointment");
    }
  }
    

  return (
    <div className="bg-amber-100">
      <Header />
      <main className="max-w-7xl mx-auto px-4 md:py-10 py-4 min-h-dvh">
        <h1 className="border-l-4 border-yellow-400 pl-4 md:text-4xl text-3xl font-bold text-amber-700 md:mb-8 mb-4">
          {t.title[lang]}
        </h1>
        <div className="grid lg:grid-cols-2 lg:gap-8 gap-4 items-center">
          <div className="bg-white p-4 md:p-8 rounded-3xl shadow-xl h-fit">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-amber-700">
                  {t.name[lang]}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none"
                  placeholder="..."
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-amber-700">
                    {t.email[lang]}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-yellow-400 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none transition"
                    placeholder="..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-amber-700">
                    {t.phone[lang]}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none"
                    placeholder="..."
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-amber-700">
                    {t.date[lang]}
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-amber-700">
                    {t.time[lang]}
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-amber-700">
                  {t.notes[lang]}
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none resize-none"
                  placeholder="..."
                ></textarea>
              </div>
              <p className="text-xs text-orange-600 font-medium italic">
                {t.note[lang]}
              </p>
              <button
                type="submit"
                className="w-full cursor-pointer bg-amber-700 text-white py-3 rounded-2xl font-bold text-lg hover:bg-amber-800 transition-all shadow-lg active:scale-90"
              >
                {t.submit[lang]}
              </button>
            </form>
          </div>
          <div>
            <div className="p-4 flex flex-col items-center gap-3">
              <FaSpa className="text-amber-600 md:text-[200px] text-9xl" />
              <p className="md:text-4xl text-xl text-center font-bold text-amber-600 uppercase leading-snug">
                {lang === "hi"
                  ? "हमारी टीम आपके लिए सर्वोत्तम सेवा का चयन करेगी"
                  : "Our team will assign the best service for you"}
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Appointment;
