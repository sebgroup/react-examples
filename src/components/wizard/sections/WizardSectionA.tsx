import React, { useEffect } from "react";
import Header from "../../Header";
import { example } from "../../../assets/mocks/wizard-page-1-example";
import { useDynamicForm, DynamicFormSection } from "@sebgroup/react-components/hooks/useDynamicForm";
import { useWizardContext } from "../../../providers/WizardProvider";
import { Link } from "react-router-dom";

const WizardSectionA: React.FC = () => {
  const ComponentsHeader = () => <Header d3="Wizard | Section A" theme="warning" />;
  const { setSectionA, sectionA } = useWizardContext();

  const sections: DynamicFormSection[] = example;

  const [renderForm, formState, setFormState] = useDynamicForm(sections);

  useEffect(() => {
    setSectionA({ ...(formState || formState) });
  }, [formState]);

  useEffect(() => {
    if (typeof sectionA === "object" && Object.keys(sectionA).length) {
      setFormState(sectionA as any);
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
            <div className="d-flex justify-content-end my-3 w-100">
              <Link to="b">Next</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WizardSectionA;
