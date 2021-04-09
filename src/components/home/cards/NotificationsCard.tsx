import React from "react";
import { Button } from "@sebgroup/react-components";
import { useLanguageContext } from "../../../providers/LanguageProvider";
import { HashLink } from "react-router-hash-link";

const NotificationsCard: React.FC = () => {
  // LANGUAGE ==============================
  // context
  const [{ components }] = useLanguageContext();
  const language = components.home.cards.notifications;

  const handleSendNotification = () => {
    // do something
  };

  // RENDER =+=+=+=+=+=+=+=+=+=+=+=
  return (
    <div id="notifications" className="card mb-3">
      <div className="card-body">
        <HashLink smooth to="#notifications">
          <h3 className="card-title">{language.title}</h3>
        </HashLink>
        <h6 className="card-subtitle mb-2 text-muted">{language.subtitle}</h6>
        <p className="card-text">{language.description}</p>
        <Button className="card-link mb-3" onClick={handleSendNotification}>
          {language.buttonTexts ? language.buttonTexts[0] : ""}
        </Button>
      </div>
    </div>
  );
};

export default NotificationsCard;
