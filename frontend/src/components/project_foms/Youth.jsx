import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { submitParticipation } from "../../functions";
import { toast } from "react-toastify";

const Youth = ({ project, setShowFormFor }) => {
  const { lang } = useLanguage();
  const [formData, setFormData] = useState({
    name: "", age: "", gender: "", gotra: "", bloodGroup: "",
    fatherName: "", motherName: "",
    mobile: "", email: "", address: "",
    education: "", occupation: "",
    approval: "", reason: "", declaration: false,
  });

  const labels = {
    name: { en: "Full Name", hi: "पूरा नाम" },
    age: { en: "Age", hi: "आयु" },
    gender: { en: "Gender", hi: "लिंग" },
    gotra: { en: "Gotra", hi: "गौत्र" },
    bloodGroup: { en: "Blood Group", hi: "रक्त समूह" },
    fatherName: { en: "Father's Name", hi: "पिता का नाम" },
    motherName: { en: "Mother's Name", hi: "माता का नाम" },
    mobile: { en: "Mobile Number", hi: "मोबाइल नंबर" },
    email: { en: "Email", hi: "ईमेल" },
    address: { en: "Address", hi: "पूरा पता" },
    education: { en: "Education", hi: "शिक्षा" },
    occupation: { en: "Occupation", hi: "व्यवसाय" },
    approval: { en: "Do you approve to participate?", hi: "क्या आप भाग लेने के लिए सहमति देते हैं?" },
    reason: { en: "Reason for joining", hi: "जुड़ने का कारण" },
    declaration: { en: "I declare that all information is correct", hi: "मैं घोषणा करता/करती हूँ कि सभी जानकारी सही है" },
    submit: { en: "Submit Form", hi: "फॉर्म जमा करें" },
    yes: { en: "Yes", hi: "हाँ" },
    no: { en: "No", hi: "नहीं" },
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const isFormValid = Object.values(formData).every((val) => val !== "" && val !== false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return toast.error("Please fill all the fields!");
    try {
      await submitParticipation({
        ...formData,
        projectId: project?._id,
      });
      setFormData({
        name: "", age: "", gender: "", gotra: "", bloodGroup: "",
        fatherName: "", motherName: "",
        mobile: "", email: "", address: "",
        education: "", occupation: "",
        approval: "", reason: "", declaration: false,
      });
      setShowFormFor(null);
    } catch (error) {
      toast.error(error.response.data.msg || "Form submission failed!");
    }
  };
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl border border-gray-200 my-8 font-sans">
      <h1 className="text-2xl font-bold text-amber-900 text-center">
        BEYOND THREE : PARTICIPATION FORM
      </h1>
      {project && (
        <div className="mb-4 text-center border-b pb-1">
          <h2 className="text-xl font-bold text-amber-700">
            {project.title?.[lang] || project.title?.en || "Project Title"}
          </h2>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input name="name" value={formData.name} onChange={handleChange} placeholder={labels.name[lang]} className="p-2 border rounded-md" />
          <input name="age" type="number" value={formData.age} onChange={handleChange} placeholder={labels.age[lang]} className="p-2 border rounded-md" />
          <input name="fatherName" value={formData.fatherName} onChange={handleChange} placeholder={labels.fatherName[lang]} className="p-2 border rounded-md" />
          <input name="motherName" value={formData.motherName} onChange={handleChange} placeholder={labels.motherName[lang]} className="p-2 border rounded-md" />
          <select name="gender" value={formData.gender} onChange={handleChange} className="p-2 border rounded-md">
            <option value="">{labels.gender[lang]}</option>
            <option value="Male">{lang === "hi" ? "पुरुष" : "Male"}</option>
            <option value="Female">{lang === "hi" ? "महिला" : "Female"}</option>
            <option value="Other">{lang === "hi" ? "अन्य" : "Other"}</option>
          </select>
          <input name="gotra" value={formData.gotra} onChange={handleChange} placeholder={labels.gotra[lang]} className="p-2 border rounded-md" />
          <input name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} placeholder={labels.bloodGroup[lang]} className="p-2 border rounded-md" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input name="mobile" value={formData.mobile} onChange={handleChange} placeholder={labels.mobile[lang]} className="p-2 border rounded-md" />
          <input name="email" value={formData.email} onChange={handleChange} placeholder={labels.email[lang]} className="p-2 border rounded-md" />
          <textarea name="address" value={formData.address} onChange={handleChange} placeholder={labels.address[lang]} className="p-2 border rounded-md col-span-2" rows={3} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input name="education" value={formData.education} onChange={handleChange} placeholder={labels.education[lang]} className="p-2 border rounded-md" />
          <input name="occupation" value={formData.occupation} onChange={handleChange} placeholder={labels.occupation[lang]} className="p-2 border rounded-md" />
        </div>
        <div className="flex items-center gap-4">
          <span>{labels.approval[lang]}</span>
          <label>
            <input type="radio" name="approval" value="true" onChange={() => setFormData({ ...formData, approval: true })} /> {labels.yes[lang]}
          </label>
          <label>
            <input type="radio" name="approval" value="false" onChange={() => setFormData({ ...formData, approval: false })} /> {labels.no[lang]}
          </label>
        </div>
        <textarea name="reason" value={formData.reason} onChange={handleChange} placeholder={labels.reason[lang]} className="p-2 border rounded-md w-full" rows={3} />
        <div className="flex items-center gap-2">
          <input type="checkbox" name="declaration" checked={formData.declaration} onChange={handleChange} />
          <span>{labels.declaration[lang]}</span>
        </div>
        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full py-3 rounded-lg font-semibold transition ${
            isFormValid
              ? "bg-amber-700 hover:bg-amber-800 text-white"
              : "bg-gray-400 cursor-not-allowed text-white"
          }`}
        >
          {labels.submit[lang]}
        </button>
      </form>
    </div>
  );
};

export default Youth;