import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useSelector } from "react-redux";

const WhoWeAre = () => {
  const about = useSelector((state) => state.about);
  const { lang } = useLanguage();

  if (!about?.whoWeAre) return null;

  const content = about.whoWeAre;

  const getLocalized = (obj) =>
    obj?.[lang] || obj?.en || obj?.hi || "";

  return (
    <div
      className="prose max-w-none text-gray-700
                prose-p:m-0
                prose-ul:m-0
                prose-ol:m-0
                prose-li:m-0
                prose-headings:m-0"
      dangerouslySetInnerHTML={{
        __html: getLocalized(content?.description),
      }}
    />
  );
};

export default WhoWeAre;