import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

const Other = () => {
  const { lang } = useLanguage();

  const content = {
    title: {
      en: "BEYOND THREE : PARTICIPATION FORM",
      hi: "BEYOND THREE : PARTICIPATION FORM",
    },
    subtitle: {
      en: "(General Participation)",
      hi: "(सामान्य भागीदारी)",
    },
    instruction: {
      en: "Instruction: Please fill this form in block letters. All information is mandatory.",
      hi: "निर्देश: कृपया यह फॉर्म साफ अक्षरों में भरें। सभी जानकारी अनिवार्य है।",
    },
    sections: {
      projectSelection: {
        title: { en: "Select Project", hi: "प्रोजेक्ट चुनें" },
        label: { en: "Project Name:", hi: "प्रोजेक्ट का नाम:" },
        options: {
          default: { en: "Select a project", hi: "एक प्रोजेक्ट चुनें" },
          skill: { en: "Skill Development Initiative", hi: "कौशल विकास पहल" },
          health: { en: "Health Awareness Drive", hi: "स्वास्थ्य जागरूकता अभियान" },
        },
      },
      personal: {
        title: { en: "1. Personal Information", hi: "1. व्यक्तिगत जानकारी" },
        name: { en: "Full Name:", hi: "पूरा नाम:" },
        age: { en: "Age:", hi: "आयु:" },
        year: { en: "Years", hi: "वर्ष" },
        gender: { en: "Gender:", hi: "लिंग:" },
        genderOptions: {
          male: { en: "Male", hi: "पुरुष" },
          female: { en: "Female", hi: "महिला" },
          other: { en: "Other", hi: "अन्य" },
        },
        parentName: { en: "Father's / Mother's Name:", hi: "पिता / माता का नाम:" },
      },
      contact: {
        title: { en: "2. Contact Details", hi: "2. संपर्क विवरण" },
        mobile: { en: "Mobile Number (WhatsApp):", hi: "मोबाइल नंबर (WhatsApp):" },
        email: { en: "Email ID:", hi: "ईमेल आईडी:" },
        address: { en: "Full Address:", hi: "पूरा पता:" },
      },
      shortAnswer: {
        title: { en: "3. Short Answer", hi: "3. संक्षिप्त उत्तर" },
        question: {
          en: "Why do you want to join this project?",
          hi: "आप इस प्रोजेक्ट से क्यों जुड़ना चाहते हैं?",
        },
      },
      declaration: {
        title: { en: "4. Declaration", hi: "4. घोषणा (Declaration)" },
        text: {
          en: "I declare that all the information given above is correct to the best of my knowledge and I will follow the rules and discipline of Beyond Three.",
          hi: "मैं यह घोषणा करता/करती हूँ कि उपरोक्त दी गई सभी जानकारी मेरी जानकारी के अनुसार सही है और मैं Beyond Three के नियमों एवं अनुशासन का पालन करूँगा/करूँगी।",
        },
        signature: { en: "Applicant's Signature:", hi: "आवेदक के हस्ताक्षर:" },
        date: { en: "Date:", hi: "तिथि:" },
      },
      footer: {
        contact: { en: "Contact to submit form:", hi: "फॉर्म जमा करने हेतु संपर्क करें:" },
        mobile: { en: "Mobile / WhatsApp:", hi: "मोबाइल / WhatsApp:" },
        email: { en: "Email:", hi: "ईमेल:" },
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-2xl border border-gray-200 my-8 font-sans">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-amber-900 border-b-2 border-amber-500 inline-block pb-1 mb-2">
          {content.title[lang]}
        </h1>
        <h2 className="text-xl font-semibold text-amber-700">
          {content.subtitle[lang]}
        </h2>
        <p className="mt-4 text-gray-700 italic border-t border-b border-gray-300 py-2">
          {content.instruction[lang]}
        </p>
      </div>

      {/* Project Selection */}
      <div className="mb-6 bg-amber-50 p-4 rounded-lg border border-amber-100">
        <h3 className="text-lg font-bold text-amber-800 border-b border-gray-300 mb-4 pb-1">
          {content.sections.projectSelection.title[lang]}
        </h3>
        <div className="flex flex-col sm:flex-row gap-4 items-baseline">
          <label className="font-semibold text-amber-900 min-w-32">{content.sections.projectSelection.label[lang]}</label>
          <select className="flex-grow p-2 border border-gray-400 rounded focus:border-amber-600 outline-none bg-white">
            <option value="">{content.sections.projectSelection.options.default[lang]}</option>
            <option value="skill">{content.sections.projectSelection.options.skill[lang]}</option>
            <option value="health">{content.sections.projectSelection.options.health[lang]}</option>
          </select>
        </div>
      </div>

      <hr className="border-t-2 border-gray-200 my-6" />

      {/* 1. Personal Information */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-amber-800 border-b border-gray-300 mb-4 pb-1">
          {content.sections.personal.title[lang]}
        </h3>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-2 items-baseline">
            <label className="font-semibold min-w-32">{content.sections.personal.name[lang]}</label>
            <input type="text" className="flex-grow border-b border-gray-400 focus:border-amber-600 outline-none px-2 py-1 bg-transparent" />
          </div>

          <div className="flex flex-col sm:flex-row gap-6 items-baseline">
            <div className="flex gap-2 items-baseline">
              <label className="font-semibold">{content.sections.personal.age[lang]}</label>
              <input type="number" className="w-16 border-b border-gray-400 focus:border-amber-600 outline-none px-2 py-1 text-center" />
              <span>{content.sections.personal.year[lang]}</span>
            </div>

            <div className="flex gap-4 items-center">
              <label className="font-semibold">{content.sections.personal.gender[lang]}</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-1 cursor-pointer">
                  <input type="radio" name="gender" className="accent-amber-600" /> {content.sections.personal.genderOptions.male[lang]}
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input type="radio" name="gender" className="accent-amber-600" /> {content.sections.personal.genderOptions.female[lang]}
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input type="radio" name="gender" className="accent-amber-600" /> {content.sections.personal.genderOptions.other[lang]}
                </label>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 items-baseline">
            <label className="font-semibold min-w-48">{content.sections.personal.parentName[lang]}</label>
            <input type="text" className="flex-grow border-b border-gray-400 focus:border-amber-600 outline-none px-2 py-1 bg-transparent" />
          </div>
        </div>
      </div>

      <hr className="border-t-2 border-gray-200 my-6" />

      {/* 2. Contact Details */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-amber-800 border-b border-gray-300 mb-4 pb-1">
          {content.sections.contact.title[lang]}
        </h3>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-2 items-baseline">
            <label className="font-semibold min-w-48">{content.sections.contact.mobile[lang]}</label>
            <input type="tel" className="flex-grow border-b border-gray-400 focus:border-amber-600 outline-none px-2 py-1 bg-transparent" />
          </div>
          <div className="flex flex-col sm:flex-row gap-2 items-baseline">
            <label className="font-semibold min-w-32">{content.sections.contact.email[lang]}</label>
            <input type="email" className="flex-grow border-b border-gray-400 focus:border-amber-600 outline-none px-2 py-1 bg-transparent" />
          </div>
          <div className="flex flex-col sm:flex-row gap-2 items-baseline">
            <label className="font-semibold min-w-32">{content.sections.contact.address[lang]}</label>
            <textarea className="flex-grow border border-gray-300 focus:border-amber-600 outline-none px-2 py-1 rounded h-20 resize-none"></textarea>
          </div>
        </div>
      </div>

      <hr className="border-t-2 border-gray-200 my-6" />

      {/* 3. Short Answer */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-amber-800 border-b border-gray-300 mb-4 pb-1">
          {content.sections.shortAnswer.title[lang]}
        </h3>
        <div>
          <label className="block font-medium mb-2">{content.sections.shortAnswer.question[lang]}</label>
          <div className="space-y-2">
            <input type="text" className="w-full border-b border-gray-400 focus:border-amber-600 outline-none py-1 bg-transparent" />
            <input type="text" className="w-full border-b border-gray-400 focus:border-amber-600 outline-none py-1 bg-transparent" />
            <input type="text" className="w-full border-b border-gray-400 focus:border-amber-600 outline-none py-1 bg-transparent" />
          </div>
        </div>
      </div>

      <hr className="border-t-2 border-gray-200 my-6" />

      {/* 4. Declaration */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-amber-800 border-b border-gray-300 mb-4 pb-1">
          {content.sections.declaration.title[lang]}
        </h3>
        <p className="text-gray-700 italic mb-8">
          {content.sections.declaration.text[lang]}
        </p>
        <div className="flex flex-col sm:flex-row justify-between gap-8">
          <div className="flex gap-2 items-baseline max-w-xs w-full">
            <label className="font-semibold whitespace-nowrap">{content.sections.declaration.signature[lang]}</label>
            <div className="flex-grow border-b border-black"></div>
          </div>
          <div className="flex gap-2 items-baseline max-w-xs w-full">
            <label className="font-semibold whitespace-nowrap">{content.sections.declaration.date[lang]}</label>
            <input type="date" className="flex-grow border-b border-black outline-none bg-transparent" />
          </div>
        </div>
      </div>

      <hr className="border-t-4 border-gray-300 my-8" />

      {/* Footer Contact */}
      <div className="bg-amber-50 p-4 rounded-lg">
        <h4 className="flex items-center gap-2 text-xl font-bold text-amber-800 mb-4">
          <span className="text-2xl">📞</span> {content.sections.footer.contact[lang]}
        </h4>
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row gap-2 items-baseline">
            <label className="font-semibold min-w-40">{content.sections.footer.mobile[lang]}</label>
            <span className="flex-grow border-b border-black h-6"></span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 items-baseline">
            <label className="font-semibold min-w-40">{content.sections.footer.email[lang]}</label>
            <span className="flex-grow border-b border-black h-6"></span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Other;