import React, { createContext, useContext, useEffect, useState } from "react";

type WizardContextSectionType = { [k: string]: any };
export type WizardContextType = {
  sectionA?: WizardContextSectionType;
  setSectionA: (value: any) => void;
  sectionB?: WizardContextSectionType;
  sectionC?: WizardContextSectionType;
};

export const WizardContext = createContext<WizardContextType>({
  sectionA: {},
  setSectionA: () => {}
});

export const WizardProvider: React.FC = ({ children }) => {
  const [sectionA, setSectionA] = useState<WizardContextSectionType>({});
  useEffect(() => {
    console.log("changed");
    console.log(sectionA);
  }, [sectionA]);

  return (
    <WizardContext.Provider
      value={{
        sectionA: { ...sectionA },
        setSectionA: (value: any) => setSectionA(value)
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};

export const useWizardContext = () => {
  const ctx = useContext(WizardContext);
  return ctx;
};
