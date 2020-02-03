import React from "react";
import { useLanguageContext } from "../providers/LanguageProvider";
import { Button } from "@sebgroup/react-components/dist/Button";

const LanguageSwitcher: React.FC = () => {
  const [, code, toggleCode] = useLanguageContext();
  return (
    <div className="m-3" style={{ position: "fixed", right: 0, top: 0, zIndex: 1 }}>
      <Button size="sm" id="lang-switcher" onClick={() => toggleCode()} label={code} theme="ghost-dark" />
    </div>
  );
};

export default LanguageSwitcher;
