import React, { useEffect, useState } from "react";
import Header from "../../Header";
import { example } from "../../../assets/mocks/wizard-page-2-example";
import { useDynamicForm, DynamicFormSection } from "@sebgroup/react-components/hooks/useDynamicForm";
import { useWizardContext } from "../../../providers/WizardProvider";
import { Link } from "react-router-dom";
import { Loader } from "@sebgroup/react-components";

const WizardSectionBLoading: React.FC = () => {
  const [sections, setSections] = useState<DynamicFormSection[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setSections(example);
    }, 2000);
  }, []);

  return (
    <>
      {sections?.length ? (
        <WizardSectionB sections={sections} />
      ) : (
        <>
          <Header d3="Wizard" theme="danger" />
          <div className="container-fluid">
            <div className="card mb-3">
              <div className="card-body">
                <Loader toggle />
              </div>
              <div className="card-footer">
                <p>Please wait ... Mocking fetching the sections from an api :) ....</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

const WizardSectionB: React.FC<{ sections: DynamicFormSection[] }> = ({ sections }) => {
  const ComponentsHeader = () => <Header d3="Wizard | Section B" theme="danger" />;
  const { setSectionB, sectionB } = useWizardContext();

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

export default WizardSectionBLoading;
