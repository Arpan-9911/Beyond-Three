import { useState } from "react";
import { LanguageContext } from "./LanguageContext";

const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState("en");
  const toggleLang = () => {
    setLang(prev => (prev === "en" ? "hi" : "en"));
  };
  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;