import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useSelector } from "react-redux";

const Methodology = () => {
  const about = useSelector((state) => state.about);
  const { lang } = useLanguage();

  if (!about?.methodology) return null;
  const content = about.methodology;

  // Fallback helper
  const getLocalized = (obj) => obj?.[lang] || obj?.en || obj?.hi || "";

  return (
    <div className="grid md:grid-cols-2 md:gap-10 gap-6 items-start">
      <div className="w-full bg-black rounded-4xl overflow-hidden shadow-xl hover:shadow-2xl transition">
        <img
          src={import.meta.env.VITE_UPLOADS + content?.image}
          alt="Methodology"
          className="w-full md:h-100 object-cover hover:scale-105 transition duration-300"
        />
      </div>
      <div>
        <div
          className="prose max-w-none text-gray-700
                      prose-p:m-0
                      prose-ul:m-0
                      prose-ol:m-0
                      prose-li:m-0
                      prose-headings:m-0"
          dangerouslySetInnerHTML={{
            __html: getLocalized(content?.description) || "",
          }}
        />
      </div>
    </div>
  );
};

export default Methodology;
