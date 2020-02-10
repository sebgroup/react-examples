import React, { useState, useCallback } from "react";
import { Button } from "@sebgroup/react-components/dist/Button";
import { Stepper } from "@sebgroup/react-components/dist/Stepper";
import { useLoaderContext, UseLoaderContext } from "../../../providers/LoaderProvider";
import { useLanguageContext } from "../../../providers/LanguageProvider";

const LoaderCard: React.FC = () => {
  // LANGUAGE ==============================
  // context
  const [{ components }] = useLanguageContext();
  const language = components.home.cards.loader;

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
          onClick={() => triggerLoader(stepperValue)}
        ></Button>
        <hr />
        <p className="card-text">{language.footerMessage}</p>
        <Stepper
          className="card-link"
          label={language.seconds}
          min={1}
          max={10}
          value={stepperValue}
          onIncrease={increaseStepper}
          onDecrease={decreaseStepper}
        />
      </div>
    </div>
  );
};

export default LoaderCard;
