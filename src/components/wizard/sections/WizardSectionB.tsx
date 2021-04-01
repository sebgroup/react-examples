import React, { Suspense, useCallback, useEffect } from "react";
import Header from "../../Header";
import { example } from "../../../assets/mocks/wizard-page-2-example";
import { useDynamicForm, DynamicFormSection } from "@sebgroup/react-components/hooks/useDynamicForm";
import { useWizardContext } from "../../../providers/WizardProvider";
import { Link } from "react-router-dom";

const WizardSectionB: React.FC = () => {
  const ComponentsHeader = () => <Header d3="Wizard | Section B" theme="danger" />;
  const { setSectionB, sectionB } = useWizardContext();

  const sections: DynamicFormSection[] = example;

  const [renderForm, formState, setFormState] = useDynamicForm(sections);

  useEffect(() => {
    setSectionB({ ...(formState || formState) });
  }, [formState]);

  useEffect(() => {
    if (typeof sectionB === "object" && Object.keys(sectionB).length) {
      setFormState(sectionB as any);
    }
  }, []);

  // RENDER =+=+=+=+=+=+=+=+=+=+=+=
  return (
    <>
      <ComponentsHeader />

      <div className="container-fluid">
        <div className="card mb-3">
          <div className="card-body">{renderForm()}</div>
        </div>

        <div className="card mb-3">
          <div className="card-footer">
            <div className="d-flex my-3 w-100">
              <Link to="a">Back</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WizardSectionB;
