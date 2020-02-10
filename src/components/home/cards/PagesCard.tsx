import React from "react";
import { NavLink } from "react-router-dom";
import { useLanguageContext } from "../../../providers/LanguageProvider";
import { HashLink } from "react-router-hash-link";

const PagesCard: React.FC = () => {
  // LANGUAGE ==============================
  // context
  const [{ components }] = useLanguageContext();
  const language = components.home.cards.pages;

  // RENDER =+=+=+=+=+=+=+=+=+=+=+=
  return (
    <div id="errorpages" className="card mb-3">
      <div className="card-body">
        <HashLink smooth to="#errorpages">
          <h3 className="card-title">{language.title}</h3>
        </HashLink>
        <h6 className="card-subtitle mb-2 text-muted">{language.subtitle}</h6>
        <p className="card-text">{language.description}</p>
        <p className="text-muted">{language.note}</p>
        <NavLink to={"/fake/path"}>{language.buttonTexts ? language.buttonTexts[0] : ""}</NavLink>
      </div>
    </div>
  );
};

export default PagesCard;
