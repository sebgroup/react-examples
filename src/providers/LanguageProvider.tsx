import React, { createContext, useState, useContext, useMemo } from "react";
import { AppLanguage } from "../models/language";
import english from "../assets/language/lang-en";
import swedish from "../assets/language/lang-sw";

export interface LanguageContextInterface {
  code: "EN" | "SW";
  toggleCode: () => void;
  resource: AppLanguage;
}

export const getLanguageResource: (code: LanguageContextInterface["code"]) => AppLanguage = (code): AppLanguage => {
  switch (code) {
    case "EN":
      return english;
    case "SW":
      return swedish;
    default:
      return english;
  }
};

export type UseLanguageContext = [
  LanguageContextInterface["resource"],
  LanguageContextInterface["code"],
  LanguageContextInterface["toggleCode"]
];

export const LanguageContext: React.Context<LanguageContextInterface> = createContext<LanguageContextInterface>({
  code: "EN",
  toggleCode: () => {},
  resource: getLanguageResource("EN")
});

const LanguageProvider: React.FC = (props) => {
  const [code, setCode] = useState<LanguageContextInterface["code"]>("EN");
  const toggleCode: LanguageContextInterface["toggleCode"] = () => {
    setCode((state: LanguageContextInterface["code"]) => (state === "EN" ? "SW" : "EN"));
  };

  const resource: AppLanguage = useMemo(() => getLanguageResource(code), [code]);

  return (
    <LanguageContext.Provider
      value={{
        code,
        toggleCode,
        resource
      }}
    >
      {props.children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext: () => UseLanguageContext = () => {
  const loaderContext = useContext(LanguageContext);
  return [loaderContext.resource, loaderContext.code, loaderContext.toggleCode];
};

export default LanguageProvider;
