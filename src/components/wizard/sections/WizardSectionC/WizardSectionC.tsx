import React, { useEffect } from "react";
import Header from "../../../Header";
import { example } from "../../../../assets/mocks/wizard-page-3-example";
import { useDynamicForm, DynamicFormSection } from "@sebgroup/react-components/hooks/useDynamicForm";
import { useWizardContext } from "../../../../providers/WizardProvider";
import { Link } from "react-router-dom";
import "./WizardSectionC.scss";

const WizardSectionC: React.FC = () => {
  const ComponentsHeader = () => <Header d3="Wizard | Section C" theme="success" />;
  const { setSectionC, sectionC } = useWizardContext();

  const sections: DynamicFormSection[] = example;

  const [renderForm, formState, setFormState] = useDynamicForm(sections);

  useEffect(() => {
    setSectionC({ ...(formState || formState) });
  }, [formState]);

  useEffect(() => {
    if (typeof sectionC === "object" && Object.keys(sectionC).length) {
      setFormState(sectionC as any);
    }
  }, []);

  // RENDER =+=+=+=+=+=+=+=+=+=+=+=
  return (
    <>
      <ComponentsHeader />

      <div className="container-fluid my-special-custom-styles">
        <div className="card mb-3">
          <div className="card-body">{renderForm()}</div>
        </div>

        <div className="card mb-3">
          <div className="card-footer">
            <div className="d-flex justify-content-between my-3 w-100">
              <Link to="b">Back</Link>
              <Link to="d">Next</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WizardSectionC;
