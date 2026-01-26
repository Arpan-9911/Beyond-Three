import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { FaFileAlt } from "react-icons/fa";

const LegalDocuments = () => {
  const { lang } = useLanguage();
  const documents = [
    {
      title: {
        en: "Trust Registration Certificate",
        hi: "ट्रस्ट पंजीकरण प्रमाण पत्र",
      },
      file: "/docs/trust-registration.pdf",
    },
    {
      title: {
        en: "PAN Card",
        hi: "पैन कार्ड",
      },
      file: "/docs/pan-card.pdf",
    },
    {
      title: {
        en: "12A Certificate",
        hi: "12A प्रमाण पत्र",
      },
      file: "/docs/12a-certificate.pdf",
    },
    {
      title: {
        en: "80G Certificate",
        hi: "80G प्रमाण पत्र",
      },
      file: "/docs/80g-certificate.pdf",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {documents.map((doc, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-md p-5 flex flex-col items-center text-center hover:shadow-lg transition"
        >
          <div className="bg-emerald-100 text-emerald-700 p-3 rounded-full mb-3">
            <FaFileAlt size={28} />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2 text-sm md:text-base">
            {lang === "hi" ? doc.title.hi : doc.title.en}
          </h3>
          <a
            href={doc.file}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-700 text-sm font-medium hover:underline"
          >
            {lang === "hi" ? "डाउनलोड करें" : "Download"}
          </a>
        </div>
      ))}
    </div>
  );
};

export default LegalDocuments;
