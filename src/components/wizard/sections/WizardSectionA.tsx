import React, { Suspense, useCallback, useEffect } from "react";
import Header from "../../Header";
import { example } from "../../../assets/mocks/wizard-page-1-example";
import { useDynamicForm, DynamicFormSection } from "@sebgroup/react-components/hooks/useDynamicForm";
import { Button } from "@sebgroup/react-components";
import { useWizardContext } from "../../../providers/WizardProvider";

const WizardSectionA: React.FC = () => {
  const ComponentsHeader = () => <Header d3="Wizard | Section A" theme="warning" />;
  const { setSectionA, sectionA } = useWizardContext();

  const ComponentsLoading = () => (
    <>
      <ComponentsHeader />

      <div className="container-fluid">
        <div className="skeleton-loader"></div>
      </div>
    </>
  );

  const sections: DynamicFormSection[] = example;

  const [renderForm, formState, setFormState] = useDynamicForm(sections);

  const handleClickNext = useCallback(() => {
    setSectionA({ ...(formState || formState) });
  }, [formState]);

  useEffect(() => {
    if (typeof sectionA === "object" && Object.keys(sectionA).length) {
      setFormState(sectionA as any);
    }
  }, []);

  // RENDER =+=+=+=+=+=+=+=+=+=+=+=
  return (
    <Suspense fallback={<ComponentsLoading />}>
      <ComponentsHeader />

      <div className="container-fluid">
        <section className="container">{renderForm()}</section>

        <div className="d-flex align-items-between my-3 w-100">
          <Button onClick={handleClickNext}>Next</Button>
        </div>
      </div>
    </Suspense>
  );
};

export default WizardSectionA;
