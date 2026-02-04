import React from "react";
import { useLanguage } from "../../context/LanguageContext";

const Youth = () => {
  const { lang } = useLanguage();

  const content = {
    title: {
      en: "BEYOND THREE : PARTICIPATION FORM",
      hi: "BEYOND THREE : PARTICIPATION FORM",
    },
    subtitle: {
      en: "(Youth Transformation Campaign)",
      hi: "(युवा परिवर्तन अभियान)",
    },
    instruction: {
      en: "Instruction: Please fill this form in block letters. All information is mandatory.",
      hi: "निर्देश: कृपया यह फॉर्म साफ अक्षरों में भरें। सभी जानकारी अनिवार्य है।",
    },
    sections: {
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
      education: {
        title: { en: "3. Educational Information", hi: "3. शैक्षणिक जानकारी" },
        class: { en: "Last Passed Class:", hi: "अंतिम उत्तीर्ण कक्षा:" },
        school: { en: "School / College Name:", hi: "विद्यालय / कॉलेज का नाम:" },
        status: { en: "Current Status:", hi: "वर्तमान स्थिति:" },
        statusOptions: {
          student: { en: "Student", hi: "छात्र" },
          job: { en: "Job", hi: "नौकरी" },
          other: { en: "Other", hi: "अन्य" },
        },
      },
      consent: {
        title: { en: "4. Consent for Program", hi: "4. कार्यक्रम के लिए सहमति" },
        q1: {
          en: "Are you ready to give 3 hours daily for 15 days of training?",
          hi: "क्या आप 15 दिन की ट्रेनिंग में प्रतिदिन 3 घंटे देने के लिए तैयार हैं?",
        },
        q2: {
          en: "Are you ready for 3 hours of daily community participation for 6 months?",
          hi: "क्या आप 6 महीने तक प्रतिदिन 3 घंटे सामुदायिक सहभागिता के लिए तैयार हैं?",
        },
        options: {
          yes: { en: "Yes", hi: "हाँ" },
          no: { en: "No", hi: "नहीं" },
        },
      },
      shortAnswer: {
        title: { en: "5. Short Answer", hi: "5. संक्षिप्त उत्तर" },
        question: {
          en: "Why do you want to join Beyond Three Youth Transformation Campaign?",
          hi: "आप Beyond Three युवा परिवर्तन अभियान से क्यों जुड़ना चाहते हैं?",
        },
      },
      declaration: {
        title: { en: "6. Declaration", hi: "6. घोषणा (Declaration)" },
        text: {
          en: "I declare that all the information given above is correct to the best of my knowledge and I will follow the rules and discipline of Beyond Three Youth Transformation Campaign.",
          hi: "मैं यह घोषणा करता/करती हूँ कि उपरोक्त दी गई सभी जानकारी मेरी जानकारी के अनुसार सही है और मैं Beyond Three युवा परिवर्तन अभियान के नियमों एवं अनुशासन का पालन करूँगा/करूँगी।",
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

      {/* 1. Personal Information */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-amber-800 border-b border-gray-300 mb-4 pb-1">
          {content.sections.personal.title[lang]}
        </h3>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-2 items-baseline">
            <label className="font-semibold min-w-32">{content.sections.personal.name[lang]}</label>
            <input type="text" className="grow border-b border-gray-400 focus:border-amber-600 outline-none px-2 py-1 bg-transparent" />
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
            <input type="text" className="grow border-b border-gray-400 focus:border-amber-600 outline-none px-2 py-1 bg-transparent" />
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
            <input type="tel" className="grow border-b border-gray-400 focus:border-amber-600 outline-none px-2 py-1 bg-transparent" />
          </div>
          <div className="flex flex-col sm:flex-row gap-2 items-baseline">
            <label className="font-semibold min-w-32">{content.sections.contact.email[lang]}</label>
            <input type="email" className="grow border-b border-gray-400 focus:border-amber-600 outline-none px-2 py-1 bg-transparent" />
          </div>
          <div className="flex flex-col sm:flex-row gap-2 items-baseline">
            <label className="font-semibold min-w-32">{content.sections.contact.address[lang]}</label>
            <textarea className="grow border border-gray-300 focus:border-amber-600 outline-none px-2 py-1 rounded h-20 resize-none"></textarea>
          </div>
        </div>
      </div>

      <hr className="border-t-2 border-gray-200 my-6" />

      {/* 3. Educational Information */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-amber-800 border-b border-gray-300 mb-4 pb-1">
          {content.sections.education.title[lang]}
        </h3>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-2 items-baseline">
            <label className="font-semibold min-w-48">{content.sections.education.class[lang]}</label>
            <input type="text" className="grow border-b border-gray-400 focus:border-amber-600 outline-none px-2 py-1 bg-transparent" />
          </div>
          <div className="flex flex-col sm:flex-row gap-2 items-baseline">
            <label className="font-semibold min-w-48">{content.sections.education.school[lang]}</label>
            <input type="text" className="grow border-b border-gray-400 focus:border-amber-600 outline-none px-2 py-1 bg-transparent" />
          </div>
          <div className="flex flex-col sm:flex-row gap-2 items-center">
            <label className="font-semibold min-w-48">{content.sections.education.status[lang]}</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-1 cursor-pointer">
                <input type="radio" name="status" className="accent-amber-600" /> {content.sections.education.statusOptions.student[lang]}
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <input type="radio" name="status" className="accent-amber-600" /> {content.sections.education.statusOptions.job[lang]}
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <input type="radio" name="status" className="accent-amber-600" /> {content.sections.education.statusOptions.other[lang]}
              </label>
            </div>
            <input type="text" className="grow border-b border-gray-400 focus:border-amber-600 outline-none px-2 py-1 bg-transparent ml-2" />
          </div>
        </div>
      </div>

      <hr className="border-t-2 border-gray-200 my-6" />

      {/* 4. Consent */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-amber-800 border-b border-gray-300 mb-4 pb-1">
          {content.sections.consent.title[lang]}
        </h3>
        <div className="space-y-4">
          <div>
            <p className="font-medium mb-1">{content.sections.consent.q1[lang]}</p>
            <div className="flex gap-6">
              <label className="flex items-center gap-1 cursor-pointer">
                <input type="radio" name="consent1" className="accent-amber-600" /> {content.sections.consent.options.yes[lang]}
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <input type="radio" name="consent1" className="accent-amber-600" /> {content.sections.consent.options.no[lang]}
              </label>
            </div>
          </div>
          <div>
            <p className="font-medium mb-1">{content.sections.consent.q2[lang]}</p>
            <div className="flex gap-6">
              <label className="flex items-center gap-1 cursor-pointer">
                <input type="radio" name="consent2" className="accent-amber-600" /> {content.sections.consent.options.yes[lang]}
              </label>
              <label className="flex items-center gap-1 cursor-pointer">
                <input type="radio" name="consent2" className="accent-amber-600" /> {content.sections.consent.options.no[lang]}
              </label>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-t-2 border-gray-200 my-6" />

      {/* 5. Short Answer */}
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

      {/* 6. Declaration */}
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
            <div className="grow border-b border-black"></div>
          </div>
          <div className="flex gap-2 items-baseline max-w-xs w-full">
            <label className="font-semibold whitespace-nowrap">{content.sections.declaration.date[lang]}</label>
            <input type="date" className="grow border-b border-black outline-none bg-transparent" />
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
            <span className="grow border-b border-black h-6"></span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 items-baseline">
            <label className="font-semibold min-w-40">{content.sections.footer.email[lang]}</label>
            <span className="grow border-b border-black h-6"></span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Youth;