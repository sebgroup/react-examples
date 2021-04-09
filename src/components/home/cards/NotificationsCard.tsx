import React, { useState } from "react";
import { Button, Dropdown, Textbox, NotificationProps } from "@sebgroup/react-components";
import { capitalize } from "@sebgroup/frontend-tools";
import { useLanguageContext } from "../../../providers/LanguageProvider";
import { HashLink } from "react-router-hash-link";
import { useNotificationsContext } from "../../../providers/NotificationsProvider";

const NotificationsCard: React.FC = () => {
  const themes: NotificationProps["theme"][] = [
    "primary",
    "danger",
    "inverted",
    "warning",
    "success",
    "purple",
    "inverted"
  ];
  const [message, setMessage] = useState("Error");
  const [description, setDescription] = useState("This is a generic error");
  const [theme, setTheme] = useState<NotificationProps["theme"]>("danger");
  // LANGUAGE ==============================
  // context
  const [{ components }] = useLanguageContext();
  const [addNotification] = useNotificationsContext();
  const language = components.home.cards.notifications;

  const handleSendNotification = React.useCallback(() => {
    addNotification({
      message,
      description,
      theme
    });
  }, [message, theme, description]);

  const dropdownLabel = (e: any) => {
    return `Theme: ${capitalize(e)}`;
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
        <Textbox onChange={(e) => setMessage(e.target.value)} value={message} label="Message"></Textbox>
        <Textbox onChange={(e) => setDescription(e.target.value)} value={description} label="Description"></Textbox>
        <Dropdown
          onChange={(e) => setTheme(e.target.value as NotificationProps["theme"])}
          value={theme}
          wrapperProps={{ className: "mt-3" }}
          selectedLabel={dropdownLabel}
          placeholder="Notification theme"
        >
          {themes.map((e, i) => (
            <option key={i} value={e}>
              {capitalize(e as string)}
            </option>
          ))}
        </Dropdown>
        <hr />
        <Button className="card-link mb-3" onClick={handleSendNotification}>
          {language.buttonTexts ? language.buttonTexts[0] : ""}
        </Button>
      </div>
    </div>
  );
};

export default NotificationsCard;
