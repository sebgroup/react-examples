import React, { useState, useCallback } from "react";
import { Button } from "@sebgroup/react-components/dist/Button";
import { Stepper } from "@sebgroup/react-components/dist/Stepper";
import {
  useLoaderContext,
  UseLoaderContext
} from "../providers/LoaderProvider";

const Home: React.FC = () => {
  const [stepperValue, setStepperValue] = useState<number>(1);
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
    () => setStepperValue(value => ++value),
    []
  );

  return (
    <>
      <div className="card mb-3 col-xl-8">
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
          <div className="card-footer">
            <p className="card-text">
              Adjust how many seconds should the global loader spin for.
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
      </div>
    </>
  );
};

export default Home;
