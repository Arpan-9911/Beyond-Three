import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

const Contact = () => {
  const { lang } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const t = {
    title: { en: "Contact Us", hi: "संपर्क करें" },
    subtitle: {
      en: "We'd love to hear from you. Get in touch with us!",
      hi: "हमें आपकी बात सुनना अच्छा लगेगा। हमसे संपर्क करें!",
    },
    formTitle: { en: "Send us a Message", hi: "हमें संदेश भेजें" },
    name: { en: "Full Name", hi: "पूरा नाम" },
    email: { en: "Email Address", hi: "ईमेल पता" },
    phone: { en: "Phone Number", hi: "फ़ोन नंबर" },
    subject: { en: "Subject", hi: "विषय" },
    message: { en: "Your Message", hi: "आपका संदेश" },
    submit: { en: "Send Message", hi: "संदेश भेजें" },
    contactInfo: { en: "Contact Information", hi: "संपर्क जानकारी" },
    address: {
      label: { en: "Address", hi: "पता" },
      value: {
        en: "Beyond Three Ashram, Near River Ganga, Rishikesh, Uttarakhand - 249201",
        hi: "बियॉन्ड थ्री आश्रम, गंगा नदी के निकट, ऋषिकेश, उत्तराखंड - 249201",
      },
    },
    phoneNumber: {
      label: { en: "Phone", hi: "फ़ोन" },
      value: "+91 98765 43210",
    },
    emailAddress: {
      label: { en: "Email", hi: "ईमेल" },
      value: "contact@beyondthree.org",
    },
    timing: {
      label: { en: "Working Hours", hi: "कार्य समय" },
      value: {
        en: "Mon - Sat: 6:00 AM - 8:00 PM",
        hi: "सोम - शनि: सुबह 6:00 - रात 8:00",
      },
    },
    followUs: { en: "Follow Us", hi: "हमें फ़ॉलो करें" },
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert(lang === "hi" ? "संदेश भेजा गया!" : "Message sent!");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="bg-amber-100">
      <Header />
      <main className="max-w-7xl mx-auto px-4 md:py-10 py-4 min-h-dvh">
        <h1 className="border-l-4 border-yellow-400 pl-4 md:text-4xl text-3xl font-bold text-amber-700 md:mb-8 mb-4">
          {t.title[lang]}
        </h1>
        <div className="grid lg:grid-cols-5 lg:gap-8 gap-4">
          <div className="bg-amber-800 text-white lg:col-span-2 p-4 md:p-8 rounded-4xl shadow-xl">
            <h2 className="text-2xl font-bold mb-4">
              {t.contactInfo[lang]}
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-4">
                <div className="bg-amber-900 p-3 rounded-full shrink-0">
                  <FaMapMarkerAlt className="text-yellow-400" />
                </div>
                <div>
                  <h4 className="font-bold">{t.address.label[lang]}</h4>
                  <p className="text-gray-300 text-sm">
                    {t.address.value[lang]}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-amber-900 p-3 rounded-full shrink-0">
                  <FaPhoneAlt className="text-yellow-400" />
                </div>
                <div>
                  <h4 className="font-bold">{t.phoneNumber.label[lang]}</h4>
                  <p className="text-gray-300 text-sm">{t.phoneNumber.value}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-amber-900 p-3 rounded-full shrink-0">
                  <FaEnvelope className="text-yellow-400" />
                </div>
                <div>
                  <h4 className="font-bold">{t.emailAddress.label[lang]}</h4>
                  <p className="text-gray-300 text-sm">{t.emailAddress.value}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-amber-900 p-3 rounded-full shrink-0">
                  <FaClock className="text-yellow-400" />
                </div>
                <div>
                  <h4 className="font-bold">{t.timing.label[lang]}</h4>
                  <p className="text-gray-300 text-sm">{t.timing.value[lang]}</p>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-yellow-400">
              <h4 className="font-bold mb-4">{t.followUs[lang]}</h4>
              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/groups/669434656870727"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-amber-900 p-3 rounded-full hover:bg-yellow-400 hover:text-amber-900 transition duration-300"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="#"
                  className="bg-amber-900 p-3 rounded-full hover:bg-yellow-400 hover:text-amber-900 transition duration-300"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.youtube.com/@beyondthreeofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-amber-900 p-3 rounded-full hover:bg-yellow-400 hover:text-amber-900 transition duration-300"
                >
                  <FaYoutube />
                </a>
                <a
                  href="#"
                  className="bg-amber-900 p-3 rounded-full hover:bg-yellow-400 hover:text-amber-900 transition duration-300"
                >
                  <FaWhatsapp />
                </a>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3 bg-white p-4 sm:p-8 rounded-4xl shadow-xl">
            <h2 className="text-2xl font-bold text-amber-800 mb-4">
              {t.formTitle[lang]}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
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
                    className="w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none"
                    placeholder="..."
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-amber-700">
                    {t.phone[lang]}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none"
                    placeholder="..."
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-amber-700">
                    {t.subject[lang]}
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none"
                    placeholder="..."
                  />
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
                  required
                  rows="5"
                  className="w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none resize-none"
                  placeholder="..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full cursor-pointer bg-amber-700 text-white py-3 rounded-2xl font-bold text-lg hover:bg-amber-800 transition-all shadow-lg active:scale-90"
              >
                {t.submit[lang]}
              </button>
            </form>
          </div>
        </div>
        <div className="bg-white rounded-4xl shadow-xl md:mt-8 mt-4 overflow-hidden h-64">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.789!2d78.267!3d30.086!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDA1JzA5LjYiTiA3OMKwMTYnMDEuMiJF!5e0!3m2!1sen!2sin!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Location Map"
          ></iframe>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;