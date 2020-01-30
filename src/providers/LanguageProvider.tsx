import React, { createContext, useState, useContext } from "react";

export interface LanguageContextInterface {
  code: "EN" | "SW";
  toggleCode: () => void;
}

export type UseLanguageContext = [LanguageContextInterface["code"], LanguageContextInterface["toggleCode"]];

export const LanguageContext: React.Context<LanguageContextInterface> = createContext<LanguageContextInterface>({
  code: "EN",
  toggleCode: () => {}
});

const LanguageProvider: React.FC = (props) => {
  const [code, setCode] = useState<LanguageContextInterface["code"]>("EN");
  const toggleCode: LanguageContextInterface["toggleCode"] = () => {
    setCode((state: LanguageContextInterface["code"]) => (state !== "EN" ? "SW" : "EN"));
  };

  return (
    <LanguageContext.Provider
      value={{
        code,
        toggleCode
      }}
    >
      {props.children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext: () => UseLanguageContext = () => {
  const loaderContext = useContext(LanguageContext);
  return [loaderContext.code, loaderContext.toggleCode];
};

export default LanguageProvider;
