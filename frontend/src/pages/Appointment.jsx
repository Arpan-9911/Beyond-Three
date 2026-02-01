import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import {
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaCheckCircle,
  FaLeaf,
  FaHeart,
  FaUsers,
  FaSpa,
} from "react-icons/fa";

const Appointment = () => {
  const { lang } = useLanguage();
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    message: "",
  });

  const t = {
    title: { en: "Book an Appointment", hi: "अपॉइंटमेंट बुक करें" },
    subtitle: {
      en: "Schedule a meeting with our spiritual guides",
      hi: "हमारे आध्यात्मिक मार्गदर्शकों के साथ मिलने का समय निर्धारित करें",
    },
    selectService: { en: "Select a Service", hi: "सेवा चुनें" },
    yourDetails: { en: "Your Details", hi: "आपका विवरण" },
    name: { en: "Full Name", hi: "पूरा नाम" },
    email: { en: "Email Address", hi: "ईमेल पता" },
    phone: { en: "Phone Number", hi: "फ़ोन नंबर" },
    date: { en: "Preferred Date", hi: "पसंदीदा तारीख़" },
    time: { en: "Preferred Time", hi: "पसंदीदा समय" },
    message: { en: "Additional Notes (Optional)", hi: "अतिरिक्त नोट (वैकल्पिक)" },
    submit: { en: "Book Appointment", hi: "अपॉइंटमेंट बुक करें" },
    services: [
      {
        id: 1,
        icon: <FaLeaf />,
        name: { en: "Natural Healing Consultation", hi: "प्राकृतिक चिकित्सा परामर्श" },
        duration: { en: "60 mins", hi: "60 मिनट" },
        desc: {
          en: "Personal consultation for natural remedies and lifestyle guidance",
          hi: "प्राकृतिक उपचार और जीवनशैली मार्गदर्शन के लिए व्यक्तिगत परामर्श",
        },
      },
      {
        id: 2,
        icon: <FaSpa />,
        name: { en: "Yoga & Meditation Session", hi: "योग एवं ध्यान सत्र" },
        duration: { en: "90 mins", hi: "90 मिनट" },
        desc: {
          en: "Guided yoga and meditation practice with certified instructors",
          hi: "प्रमाणित प्रशिक्षकों के साथ निर्देशित योग और ध्यान अभ्यास",
        },
      },
      {
        id: 3,
        icon: <FaHeart />,
        name: { en: "Spiritual Counseling", hi: "आध्यात्मिक परामर्श" },
        duration: { en: "45 mins", hi: "45 मिनट" },
        desc: {
          en: "One-on-one session with Swami Ji for spiritual guidance",
          hi: "आध्यात्मिक मार्गदर्शन के लिए स्वामी जी के साथ एक-से-एक सत्र",
        },
      },
      {
        id: 4,
        icon: <FaUsers />,
        name: { en: "Group Workshop", hi: "समूह कार्यशाला" },
        duration: { en: "3 hours", hi: "3 घंटे" },
        desc: {
          en: "Join group sessions for community learning and practice",
          hi: "सामुदायिक शिक्षण और अभ्यास के लिए समूह सत्रों में शामिल हों",
        },
      },
    ],
    timeSlots: [
      { value: "06:00", label: { en: "6:00 AM", hi: "सुबह 6:00" } },
      { value: "08:00", label: { en: "8:00 AM", hi: "सुबह 8:00" } },
      { value: "10:00", label: { en: "10:00 AM", hi: "सुबह 10:00" } },
      { value: "14:00", label: { en: "2:00 PM", hi: "दोपहर 2:00" } },
      { value: "16:00", label: { en: "4:00 PM", hi: "शाम 4:00" } },
      { value: "18:00", label: { en: "6:00 PM", hi: "शाम 6:00" } },
    ],
    note: {
      en: "* You will receive a confirmation call within 24 hours",
      hi: "* आपको 24 घंटे के भीतर पुष्टिकरण कॉल प्राप्त होगी",
    },
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedService) {
      alert(lang === "hi" ? "कृपया एक सेवा चुनें" : "Please select a service");
      return;
    }
    console.log("Appointment booked:", { service: selectedService, ...formData });
    alert(lang === "hi" ? "अपॉइंटमेंट बुक हो गई!" : "Appointment booked successfully!");
    setFormData({ name: "", email: "", phone: "", date: "", time: "", message: "" });
    setSelectedService(null);
  };

  return (
    <div className="bg-amber-100">
      <Header />
      <main className="max-w-7xl mx-auto px-4 md:py-10 py-4 min-h-dvh">
        <h1 className="border-l-4 border-yellow-400 pl-4 md:text-4xl text-3xl font-bold text-amber-700 md:mb-8 mb-4">
          {t.title[lang]}
        </h1>
        <div className="grid lg:grid-cols-2 lg:gap-8 gap-4">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-amber-800 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-yellow-400 rounded-full"></span>
              {t.selectService[lang]}
            </h2>
            <div className="grid gap-4">
              {t.services.map((service) => (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  className={`bg-white p-4 rounded-2xl shadow-lg cursor-pointer transition-all duration-300 border-2 ${selectedService === service.id
                      ? "border-amber-500 bg-amber-50 scale-[1.02]"
                      : "border-transparent hover:border-yellow-300 hover:shadow-xl"
                    }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-3 rounded-xl text-2xl transition-colors ${selectedService === service.id
                          ? "bg-amber-700 text-white"
                          : "bg-amber-100 text-amber-700"
                        }`}
                    >
                      {service.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-gray-800">
                          {service.name[lang]}
                        </h3>
                        {selectedService === service.id && (
                          <FaCheckCircle className="text-amber-600 text-xl" />
                        )}
                      </div>
                      <p className="text-gray-500 text-sm mb-1">
                        {service.desc[lang]}
                      </p>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-1 rounded-full">
                        <FaClock className="text-xs" />
                        {service.duration[lang]}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-4 md:p-8 rounded-3xl shadow-xl h-fit">
            <h2 className="text-xl font-bold text-amber-800 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-yellow-400 rounded-full"></span>
              {t.yourDetails[lang]}
            </h2>
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
                    className="w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none"
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
                    className="w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-amber-700">
                    {t.time[lang]}
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    <option value="">--</option>
                    {t.timeSlots.map((slot) => (
                      <option key={slot.value} value={slot.value}>
                        {slot.label[lang]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-amber-700">
                  {t.message[lang]}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Appointment;