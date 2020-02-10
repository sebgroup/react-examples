import React from "react";
import { NavLink } from "react-router-dom";
import { useLanguageContext } from "../../../providers/LanguageProvider";

const PagesCard: React.FC = () => {
  // LANGUAGE ==============================
  // context
  const [{ components }] = useLanguageContext();
  const cardsLanguage = components.home.cards;

  // RENDER =+=+=+=+=+=+=+=+=+=+=+=
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h3 className="card-title">{cardsLanguage.pages.title}</h3>
        <h6 className="card-subtitle mb-2 text-muted">{cardsLanguage.pages.subtitle}</h6>
        <p className="card-text">{cardsLanguage.pages.description}</p>
        <p className="text-muted">{cardsLanguage.pages.note}</p>
        <NavLink to={"/fake/path"}>{cardsLanguage.pages.buttonTexts ? cardsLanguage.pages.buttonTexts[0] : ""}</NavLink>
      </div>
    </div>
  );
};

export default PagesCard;
