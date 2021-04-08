import React, { useEffect } from "react";
import Header from "../../Header";
import { example } from "../../../assets/mocks/wizard-page-4-example";
import { useDynamicForm, DynamicFormSection } from "@sebgroup/react-components/hooks/useDynamicForm";
import { useWizardContext } from "../../../providers/WizardProvider";
import { Link } from "react-router-dom";
// import "./WizardSectionD.scss";

const WizardSectionD: React.FC = () => {
  const ComponentsHeader = () => <Header d3="Wizard | Section D" theme="primary" />;
  const { setSectionD, sectionD } = useWizardContext();

  const sections: DynamicFormSection[] = example;

  const [renderForm, formState, setFormState] = useDynamicForm(sections);

  useEffect(() => {
    setSectionD({ ...(formState || formState) });
  }, [formState]);

  useEffect(() => {
    if (typeof sectionD === "object" && Object.keys(sectionD).length) {
      setFormState(sectionD as any);
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
              <Link to="c">Back</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WizardSectionD;
