const { useState, useEffect } = require("react");
const { useSelector } = require("react-redux");
const { i18n } = require("../../config");

const Label = ({ i18nKey }) => {
  const currentLanguage = useSelector((state) => state.language);
  const [translation, setTranslation] = useState(
    i18nKey || "Translation not found"
  );

  const getTranslation = () => {
    switch (currentLanguage) {
      case "en":
        return i18n["en"][i18nKey] || i18nKey;
      case "hi":
        return i18n["hi"][i18nKey] || i18nKey;

      default:
        return i18n["en"][i18nKey] || i18nKey;
    }
  };

  useEffect(() => {
    setTranslation(getTranslation());
  }, [currentLanguage]); // eslint-disable-line react-hooks/exhaustive-deps

  return <>{translation}</>;
};

export { Label };
