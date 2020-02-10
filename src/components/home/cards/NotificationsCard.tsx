import React, { useState, useCallback } from "react";
import { Button } from "@sebgroup/react-components/dist/Button";
import { RadioGroup } from "@sebgroup/react-components/dist/RadioGroup";
import { TextBox } from "@sebgroup/react-components/dist/TextBox";
import { RadioListModel } from "@sebgroup/react-components/dist/RadioGroup/RadioGroup";
import {
  useNotificationsContext,
  UseNotificationsContext,
  Notification
} from "../../../providers/NotificationsProvider";
import { useLanguageContext } from "../../../providers/LanguageProvider";

type NotificationRadio = RadioListModel<Notification["theme"]>;

const NotificationsCard: React.FC = () => {
  // LANGUAGE ==============================
  // context
  const [{ components }] = useLanguageContext();
  const language = components.home.cards.notifications;

  // NOTIFICATIONS ==========================
  // context
  const [addNotification]: UseNotificationsContext = useNotificationsContext();

  // get state helpers
  const getNotificationTypeList: (lang: typeof language) => NotificationRadio[] = React.useCallback(
    (lang: typeof language) => {
      return [
        { label: lang.typeWarning, value: "warning" },
        { label: lang.typeError, value: "danger" }
      ];
    },
    [language]
  );
  const getNotificationMessage: (lang: typeof language) => string = React.useCallback(
    (lang: typeof language) => {
      return lang.messageText;
    },
    [language]
  );

  // state
  const newList: NotificationRadio[] = getNotificationTypeList(language);
  const newMessage: string = getNotificationMessage(language);
  const [notificationType, setNotificationType] = useState<NotificationRadio>(newList[0]);
  const [notificationTypeList, setNotificationTypeList] = useState<NotificationRadio[]>(newList);
  const [notificationMessage, setNotificationMessage] = useState<string>(newMessage);

  // effects
  React.useEffect(() => {
    const newList: NotificationRadio[] = getNotificationTypeList(language);
    const newMessage: string = getNotificationMessage(language);

    setNotificationType(newList[0]);
    setNotificationTypeList(newList);
    setNotificationMessage(newMessage);
  }, [language, getNotificationTypeList, getNotificationMessage]);

  // handler callbacks
  const onChangeNotificationMessage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => setNotificationMessage(event.target.value),
    []
  );

  const handleSendNotification = useCallback(
    () =>
      addNotification({
        message: notificationType.label,
        description: notificationMessage,
        theme: notificationType.value
      }),
    [addNotification, notificationMessage, notificationType]
  );

  const handleChangeNotificationType = useCallback(
    (change: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = change.target;
      if (value) {
        const selectedItem: NotificationRadio | undefined = notificationTypeList.find((item) => item.value === value);
        if (selectedItem) {
          setNotificationType(selectedItem);
        }
      }
    },
    [setNotificationType, notificationTypeList]
  );

  // RENDER =+=+=+=+=+=+=+=+=+=+=+=
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h3 className="card-title">{language.title}</h3>
        <h6 className="card-subtitle mb-2 text-muted">{language.subtitle}</h6>
        <p className="card-text">{language.description}</p>
        <Button
          className="card-link mb-3"
          label={language.buttonTexts ? language.buttonTexts[0] : ""}
          onClick={handleSendNotification}
        ></Button>
        <hr />
        <p className="card-text">{language.footerMessage}</p>
        <TextBox
          name="notificationMessage"
          className="card-link"
          label={language.message}
          value={notificationMessage}
          onChange={onChangeNotificationMessage}
        />
        <RadioGroup
          inline
          name="notificationType"
          label={language.type}
          list={notificationTypeList}
          onChange={handleChangeNotificationType}
          value={notificationType.value}
        />
      </div>
    </div>
  );
};

export default NotificationsCard;
