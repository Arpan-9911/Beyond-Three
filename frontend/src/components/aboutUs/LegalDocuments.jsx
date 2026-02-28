import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { FaFileAlt } from "react-icons/fa";
import { useSelector } from "react-redux";

const LegalDocuments = () => {
  const about = useSelector((state) => state.about);
  const { lang } = useLanguage();

  if (!about?.documents?.length) return null;

  const documents = about.documents;

  const getLocalized = (obj) =>
    obj?.[lang] || obj?.en || obj?.hi || "";

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {documents.map((doc, index) => (
        <div
          key={index}
          className="bg-white rounded-4xl shadow-xl p-5 flex flex-col items-center text-center hover:shadow-2xl transition"
        >
          <div className="bg-amber-100 text-amber-700 p-3 rounded-full mb-3">
            <FaFileAlt size={28} />
          </div>

          <h3 className="font-semibold text-gray-800 mb-2 text-sm md:text-base">
            {getLocalized(doc?.title)}
          </h3>

          <a
            href={import.meta.env.VITE_UPLOADS + doc?.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-700 text-sm font-medium hover:underline"
          >
            {lang === "hi" ? "डाउनलोड करें" : "Download"}
          </a>
        </div>
      ))}
    </div>
  );
};

export default LegalDocuments;