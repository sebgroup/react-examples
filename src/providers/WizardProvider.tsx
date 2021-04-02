import React, { createContext, useContext, useState } from "react";

type WizardContextSectionType = { [k: string]: any };
export type WizardContextType = {
  sectionA?: WizardContextSectionType;
  setSectionA: (value: any) => void;
  sectionB?: WizardContextSectionType;
  setSectionB: (value: any) => void;
  sectionC?: WizardContextSectionType;
  setSectionC: (value: any) => void;
};

export const WizardContext = createContext<WizardContextType>({
  sectionA: {},
  setSectionA: () => {},
  sectionB: {},
  setSectionB: () => {},
  sectionC: {},
  setSectionC: () => {}
});

export const WizardProvider: React.FC = ({ children }) => {
  const [sectionA, setSectionA] = useState<WizardContextSectionType>({});
  const [sectionB, setSectionB] = useState<WizardContextSectionType>({});
  const [sectionC, setSectionC] = useState<WizardContextSectionType>({});

  return (
    <WizardContext.Provider
      value={{
        sectionA: { ...sectionA },
        setSectionA: (value: any) => setSectionA(value),
        sectionB: { ...sectionB },
        setSectionB: (value: any) => setSectionB(value),
        sectionC: { ...sectionC },
        setSectionC: (value: any) => setSectionC(value)
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
