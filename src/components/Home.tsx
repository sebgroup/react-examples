import React, { useState, useCallback } from "react";
import { Button } from "@sebgroup/react-components/dist/Button";
import { TextBox } from "@sebgroup/react-components/dist/TextBox";
import { Stepper } from "@sebgroup/react-components/dist/Stepper";
import {
  useLoaderContext,
  UseLoaderContext
} from "../providers/LoaderProvider";
import { useCommonMedia, DeviceType } from "../utils/customHooks";

const Home: React.FC = () => {
  const deviceSize: DeviceType = useCommonMedia();
  const isLargeScreenSize: boolean = deviceSize === "wide-desktop";
  const [stepperValue, setStepperValue] = useState<number>(1);
  const [notificationMessageValue, setNotificationMessageValue] = useState<
    string
  >("This is a test");
  const [, toggleLoading]: UseLoaderContext = useLoaderContext();

  const testLoader = (seconds: number) => {
    toggleLoading();
    setTimeout(toggleLoading, seconds * 1000);
  };

  const increaseStepper = useCallback(
    () => setStepperValue(value => ++value),
    []
  );

  const decreaseStepper = useCallback(
    () => setStepperValue(value => --value),
    []
  );

  const onChangeNotificationMessage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setNotificationMessageValue(event.target.value),
    []
  );

  return (
    <div className={isLargeScreenSize ? "card-columns" : ""}>
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">Loader</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            Global application loader
          </h6>
          <p className="card-text">
            The app includes a global fullscreen opaque overlay application
            loader which will block the user from accessing the UI beneath it.
            You can use this loader when the application state is transitioning,
            for exapmle, during authentication. Test it using the button below.
          </p>
          <Button
            className="card-link mb-3"
            label="Test global loader"
            onClick={() => testLoader(stepperValue)}
          ></Button>
          <hr />
          <p className="card-text">
            Adjust how many seconds the global loader should spin for:
          </p>
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
          <h5 className="card-title">Notifications</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            Global application notifications
          </h6>
          <p className="card-text">
            The app includes a global notification system. Any react component
            can trigger a notification from enywhere withing the tree.
          </p>
          <Button
            className="card-link mb-3"
            label="Test notification"
            onClick={() => console.log("// TODO: add notifications")}
          ></Button>
          <hr />
          <p className="card-text">Adjust the notification message:</p>
          <TextBox
            name="notificationMessage"
            className="card-link"
            label="Notification message:"
            value={notificationMessageValue}
            onChange={onChangeNotificationMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
