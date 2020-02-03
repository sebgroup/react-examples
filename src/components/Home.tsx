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
  const [{ routeNames }] = useLanguageContext();
  const deviceSize: DeviceType = useCommonMedia();
  const isLargeScreenSize: boolean = deviceSize === "wide-desktop";
  const [stepperValue, setStepperValue] = useState<number>(1);
  const [notificationType, setNotificationType] = useState<NotificationRadio>({
    label: "Warning",
    value: "warning"
  });
  const [notificationTypeList] = useState<NotificationRadio[]>([
    { label: "Warning", value: "warning" },
    { label: "Error", value: "danger" }
  ]);
  const [notificationMessage, setNotificationMessage] = useState<string>("This is a test");
  const [, toggleLoading]: UseLoaderContext = useLoaderContext();
  const [addNotification]: UseNotificationsContext = useNotificationsContext();

  const testLoader = (seconds: number) => {
    toggleLoading();
    setTimeout(toggleLoading, seconds * 1000);
  };

  const increaseStepper = useCallback(() => setStepperValue((value) => ++value), []);

  const decreaseStepper = useCallback(() => setStepperValue((value) => --value), []);

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

  return (
    <>
      <Header d3={routeNames.home} theme="primary" />

      <div className="container-fluid">
        <div className={isLargeScreenSize ? "card-columns" : ""}>
          <div className="card mb-3">
            <div className="card-body">
              <h3 className="card-title">Loader</h3>
              <h6 className="card-subtitle mb-2 text-muted">Global application loader</h6>
              <p className="card-text">
                The app includes a global fullscreen opaque overlay application loader which will block the user from
                accessing the UI beneath it. You can use this loader when the application state is transitioning, for
                exapmle, during authentication. Test it using the button below.
              </p>
              <Button
                className="card-link mb-3"
                label="Test global loader"
                onClick={() => testLoader(stepperValue)}
              ></Button>
              <hr />
              <p className="card-text">Adjust how many seconds the global loader should spin for:</p>
              <Stepper
                className="card-link"
                label="Seconds"
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
              <h3 className="card-title">Notifications</h3>
              <h6 className="card-subtitle mb-2 text-muted">Global application notifications</h6>
              <p className="card-text">
                The app includes a global notification system. Any react component can trigger a notification from
                enywhere withing the tree.
              </p>
              <Button className="card-link mb-3" label="Test notification" onClick={handleSendNotification}></Button>
              <hr />
              <p className="card-text">Adjust the notification message and type:</p>
              <TextBox
                name="notificationMessage"
                className="card-link"
                label="Notification message:"
                value={notificationMessage}
                onChange={onChangeNotificationMessage}
              />
              <RadioGroup
                inline
                name="notificationType"
                label="Notification type:"
                list={notificationTypeList}
                onChange={handleChangeNotificationType}
                value={notificationType.value}
              />
            </div>
          </div>

          <div className="card mb-3">
            <div className="card-body">
              <h3 className="card-title">Error Pages</h3>
              <h6 className="card-subtitle mb-2 text-muted">Global error Pages</h6>
              <p className="card-text">The app includes global error pages to handle 404 and other errors.</p>
              <p className="text-muted">
                The below link will navigate you to a fake url which will trigger the router to redirect you to the 404
                page
              </p>
              <NavLink to={"/fake/path"}>Test 404</NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
