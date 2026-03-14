import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { FaCheckCircle, FaUserFriends } from "react-icons/fa";
import { createJoinRequest } from "../functions";
import { toast } from "react-toastify";

/* Reusable Field Component */
const Field = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  textarea,
  options,
}) => {
  return (
    <div className="space-y-1">
      <label className="text-sm font-semibold text-amber-700">{label}</label>

      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows="2"
          className="w-full px-3 py-1 bg-gray-50 border border-yellow-400 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
        />
      ) : options ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full px-3 py-1 bg-gray-50 border border-yellow-400 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
        >
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full px-3 py-1 bg-gray-50 border border-yellow-400 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none"
        />
      )}
    </div>
  );
};

const JoinUs = () => {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState("volunteer");

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    bloodGroup: "",
    gotra: "",
    fatherName: "",
    motherName: "",
    mobile: "",
    email: "",
    address: "",
    education: "",
    occupation: "",
    disease: "",
    medications: "",
    reason: "",
    password: "",
  });

  const t = {
    title: { en: "Join Us", hi: "हमसे जुड़ें" },
    volunteerTab: { en: "Become a Volunteer", hi: "स्वयंसेवक बनें" },
    memberTab: { en: "Become a Member", hi: "सदस्य बनें" },
    submit: { en: "Join Now", hi: "अभी जुड़ें" },
    note: {
      en: "Note: You can login only after your account is verified by us.",
      hi: "नोट: आप अपना खाता हमारे द्वारा सत्यापित होने के बाद ही लॉगिन कर सकते हैं।",
    },
    fields: {
      name: { en: "Full Name", hi: "पूरा नाम" },
      age: { en: "Age", hi: "आयु" },
      gender: { en: "Gender", hi: "लिंग" },
      bloodGroup: { en: "Blood Group", hi: "रक्त समूह" },
      gotra: { en: "Gotra", hi: "गोत्र" },
      fatherName: { en: "Father's Name", hi: "पिता का नाम" },
      motherName: { en: "Mother's Name", hi: "माता का नाम" },
      mobile: { en: "Mobile", hi: "मोबाइल" },
      email: { en: "Email", hi: "ईमेल" },
      address: { en: "Address", hi: "पूरा पता" },
      education: { en: "Education", hi: "शिक्षा" },
      occupation: { en: "Occupation", hi: "व्यवसाय" },
      disease: { en: "Disease (if any)", hi: "बीमारी (यदि कोई हो)" },
      medications: { en: "Medications Taking (if any)", hi: "ली जा रही दवाइयाँ (यदि कोई हो)" },
      reason: { en: "Reason for volunteering", hi: "स्वयंसेवा का कारण" },
      password: { en: "Password", hi: "पासवर्ड" },
    },
  };

  const fieldList = [
    "name",
    "age",
    "gender",
    "bloodGroup",
    "gotra",
    "fatherName",
    "motherName",
    "mobile",
    "email",
    "education",
    "occupation",
  ];

  const textareaFields = ["address", "disease", "medications"];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.name) return toast.error("Please enter name");
    if(!formData.age) return toast.error("Please enter age");
    if(!formData.gender || formData.gender === "Select") return toast.error("Please enter gender");
    if(!formData.bloodGroup) return toast.error("Please enter blood group");
    if(!formData.gotra) return toast.error("Please enter gotra");
    if(!formData.fatherName) return toast.error("Please enter father's name");
    if(!formData.motherName) return toast.error("Please enter mother's name");
    if(!formData.mobile) return toast.error("Please enter mobile");
    if(!formData.email) return toast.error("Please enter email");
    if(!formData.address) return toast.error("Please enter address");
    if(!formData.education) return toast.error("Please enter education");
    if(!formData.occupation) return toast.error("Please enter occupation");

    const payload = {
      ...formData,
      type: activeTab,
    };
    
    try {
      await createJoinRequest(payload);
    } catch(error) {
      toast.error(error.response?.data?.msg || "Failed to submit request");
    } finally {
      setFormData({
        name: "",
        age: "",
        gender: "",
        bloodGroup: "",
        gotra: "",
        fatherName: "",
        motherName: "",
        mobile: "",
        email: "",
        address: "",
        education: "",
        occupation: "",
        disease: "",
        medications: "",
        reason: "",
        password: "",
      });
    }
  };

  return (
    <div className="bg-amber-100">
      <Header />
      <main className="max-w-7xl mx-auto px-4 md:py-10 py-4 min-h-dvh">
        <h1 className="border-l-4 border-yellow-400 pl-4 md:text-4xl text-3xl font-bold text-amber-700 md:mb-8 mb-4">
          {t.title[lang]}
        </h1>
        <div className="flex flex-wrap max-md:text-xs gap-2 md:mb-8 mb-4">
          <button
            onClick={() => setActiveTab("volunteer")}
            className={`px-4 py-1 rounded-full cursor-pointer font-medium ${
              activeTab === "volunteer"
                ? "bg-amber-700 text-white"
                : "bg-white hover:bg-yellow-200"
            }`}
          >
            {t.volunteerTab[lang]}
          </button>
          <button
            onClick={() => setActiveTab("member")}
            className={`px-4 py-1 rounded-full cursor-pointer font-medium ${
              activeTab === "member"
                ? "bg-amber-700 text-white"
                : "bg-white hover:bg-yellow-200"
            }`}
          >
            {t.memberTab[lang]}
          </button>
        </div>

        <div className="flex flex-col-reverse lg:flex-row gap-6">
          {/* FORM */}
          <div className="lg:w-3/5 bg-white p-6 rounded-4xl shadow">
            <form onSubmit={handleSubmit} className="space-y-1 space-x-2">
              <div className="grid md:grid-cols-2 gap-y-1 gap-x-2">
                {fieldList.map((field) => (
                  <Field
                    key={field}
                    label={t.fields[field][lang]}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    options={
                      field === "gender" ? ["Select", "Male", "Female", "Other"] : null
                    }
                  />
                ))}
              </div>

              {textareaFields.map((field) => (
                <Field
                  key={field}
                  label={t.fields[field][lang]}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  textarea
                />
              ))}

              {activeTab === "volunteer" && (
                <Field
                  label={t.fields.reason[lang]}
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  textarea
                />
              )}

              {activeTab === "member" && (
                <>
                  <Field
                    label={t.fields.password[lang]}
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                  />

                  <p className="text-xs text-orange-600 italic">
                    {t.note[lang]}
                  </p>
                </>
              )}

              <button
                type="submit"
                className="w-full bg-amber-700 text-white py-3 rounded-xl font-semibold hover:bg-amber-800 transition"
              >
                {t.submit[lang]}
              </button>
            </form>
          </div>

          {/* RIGHT SIDE */}

          <div className="lg:w-2/5 space-y-6">
            <div className="flex gap-4">
              <div className="bg-white p-4 rounded-xl shadow text-amber-700 text-3xl">
                <FaUserFriends />
              </div>

              <p className="text-gray-700 font-medium">
                {activeTab === "volunteer"
                  ? "Work with us to promote social service and natural lifestyle."
                  : "Be part of Beyond Three family and enjoy exclusive benefits."}
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow">
              <h4 className="font-bold mb-4">
                {activeTab === "volunteer" ? "Benefits" : "Exclusive Perks"}
              </h4>

              <ul className="space-y-2">
                {(activeTab === "volunteer"
                  ? [
                      "Participation in grand events",
                      "Direct guidance from Swami Anand",
                      "Certificate and stipend opportunities",
                    ]
                  : [
                      "Access to detailed health blogs",
                      "Priority in camp bookings",
                      "Personal health record dashboard",
                    ]
                ).map((b, i) => (
                  <li key={i} className="flex gap-2 items-center">
                    <FaCheckCircle className="text-yellow-500" />
                    {b}
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
