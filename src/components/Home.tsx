import React, { useState, useCallback } from "react";
import { Button } from "@sebgroup/react-components/dist/Button";
import { RadioGroup } from "@sebgroup/react-components/dist/RadioGroup";
import { TextBox } from "@sebgroup/react-components/dist/TextBox";
import { Stepper } from "@sebgroup/react-components/dist/Stepper";
import { useLoaderContext, UseLoaderContext } from "../providers/LoaderProvider";
import { useCommonMedia, DeviceType } from "../utils/customHooks";
import { useNotificationsContext, UseNotificationsContext, Notification } from "../providers/NotificationsProvider";
import { RadioListModel } from "@sebgroup/react-components/dist/RadioGroup/RadioGroup";
import { NavLink } from "react-router-dom";
import Header from "./Header";
import { useLanguageContext } from "../providers/LanguageProvider";

type NotificationRadio = RadioListModel<Notification["theme"]>;

const Home: React.FC = () => {
  // DEVICE SIZE ===========================
  // context
  const deviceSize: DeviceType = useCommonMedia();
  const isLargeScreenSize: boolean = deviceSize === "wide-desktop";

  // LANGUAGE ==============================
  // context
  const [{ routeNames, components }] = useLanguageContext();
  const cardsLanguage = components.home.cards;

  // LOADER ================================
  // context
  const [, toggleLoading]: UseLoaderContext = useLoaderContext();
  // state
  const [stepperValue, setStepperValue] = useState<number>(1);

  // handler callbacks
  const triggerLoader = (seconds: number) => {
    toggleLoading();
    setTimeout(toggleLoading, seconds * 1000);
  };
  const increaseStepper = useCallback(() => setStepperValue((value) => ++value), []);
  const decreaseStepper = useCallback(() => setStepperValue((value) => --value), []);

  // NOTIFICATIONS ==========================
  // context
  const [addNotification]: UseNotificationsContext = useNotificationsContext();

  // get state helpers
  const getNotificationTypeList: (lang: typeof cardsLanguage) => NotificationRadio[] = React.useCallback(
    (lang: typeof cardsLanguage) => {
      return [
        { label: lang.notifications.typeWarning, value: "warning" },
        { label: lang.notifications.typeError, value: "danger" }
      ];
    },
    [cardsLanguage]
  );
  const getNotificationMessage: (lang: typeof cardsLanguage) => string = React.useCallback(
    (lang: typeof cardsLanguage) => {
      return lang.notifications.messageText;
    },
    [cardsLanguage]
  );

  // state
  const newList: NotificationRadio[] = getNotificationTypeList(cardsLanguage);
  const newMessage: string = getNotificationMessage(cardsLanguage);
  const [notificationType, setNotificationType] = useState<NotificationRadio>(newList[0]);
  const [notificationTypeList, setNotificationTypeList] = useState<NotificationRadio[]>(newList);
  const [notificationMessage, setNotificationMessage] = useState<string>(newMessage);

  // effects
  React.useEffect(() => {
    const newList: NotificationRadio[] = getNotificationTypeList(cardsLanguage);
    const newMessage: string = getNotificationMessage(cardsLanguage);

    setNotificationType(newList[0]);
    setNotificationTypeList(newList);
    setNotificationMessage(newMessage);
  }, [cardsLanguage, getNotificationTypeList, getNotificationMessage]);

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
    <>
      <Header d3={routeNames.home} theme="primary" />

      <div className="container-fluid">
        <div className={isLargeScreenSize ? "card-columns" : ""}>
          <div className="card mb-3">
            <div className="card-body">
              <h3 className="card-title">{cardsLanguage.loader.title}</h3>
              <h6 className="card-subtitle mb-2 text-muted">{cardsLanguage.loader.subtitle}</h6>
              <p className="card-text">{cardsLanguage.loader.description}</p>
              <Button
                className="card-link mb-3"
                label={cardsLanguage.loader.buttonTexts ? cardsLanguage.loader.buttonTexts[0] : ""}
                onClick={() => triggerLoader(stepperValue)}
              ></Button>
              <hr />
              <p className="card-text">{cardsLanguage.loader.footerMessage}</p>
              <Stepper
                className="card-link"
                label={cardsLanguage.loader.seconds}
                min={1}
                max={10}
                value={stepperValue}
                onIncrease={increaseStepper}
                onDecrease={decreaseStepper}
              />
            </div>
          </div>

          <div className="card mb-3">
            <div className="card-body">
              <h3 className="card-title">{cardsLanguage.notifications.title}</h3>
              <h6 className="card-subtitle mb-2 text-muted">{cardsLanguage.notifications.subtitle}</h6>
              <p className="card-text">{cardsLanguage.notifications.description}</p>
              <Button
                className="card-link mb-3"
                label={cardsLanguage.notifications.buttonTexts ? cardsLanguage.notifications.buttonTexts[0] : ""}
                onClick={handleSendNotification}
              ></Button>
              <hr />
              <p className="card-text">{cardsLanguage.notifications.footerMessage}</p>
              <TextBox
                name="notificationMessage"
                className="card-link"
                label={cardsLanguage.notifications.message}
                value={notificationMessage}
                onChange={onChangeNotificationMessage}
              />
              <RadioGroup
                inline
                name="notificationType"
                label={cardsLanguage.notifications.type}
                list={notificationTypeList}
                onChange={handleChangeNotificationType}
                value={notificationType.value}
              />
            </div>
          </div>

          <div className="card mb-3">
            <div className="card-body">
              <h3 className="card-title">{cardsLanguage.pages.title}</h3>
              <h6 className="card-subtitle mb-2 text-muted">{cardsLanguage.pages.subtitle}</h6>
              <p className="card-text">{cardsLanguage.pages.description}</p>
              <p className="text-muted">{cardsLanguage.pages.note}</p>
              <NavLink to={"/fake/path"}>
                {cardsLanguage.pages.buttonTexts ? cardsLanguage.pages.buttonTexts[0] : ""}
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
