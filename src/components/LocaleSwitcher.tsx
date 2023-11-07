import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const LocaleSwitcher = () => {
  // A button that changes the language using i18n
  // It should switch the rendered flag between the two languages
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState("en");

  const handleLanguageSwitch = () => {
    const nextLanguage = i18n.language === "es" ? "en" : "es";
    setCurrentLanguage(nextLanguage);
    i18n.changeLanguage(nextLanguage);
  };

  useEffect(() => {
    setCurrentLanguage(i18n.language);
  }, [i18n.language]);

  return (
    <button
      className={`${currentLanguage}-flag neobrutal`}
      onClick={handleLanguageSwitch}
    ></button>
  );
};

export default LocaleSwitcher;
