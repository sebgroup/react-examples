import React, { useEffect, useState } from "react";
import Header from "../../../Header";
import { example } from "../../../../assets/mocks/wizard-page-5-example";
import { useDynamicForm, DynamicFormSection, DynamicFormItem } from "@sebgroup/react-components/hooks/useDynamicForm";
import { useWizardContext } from "../../../../providers/WizardProvider";
import { Link } from "react-router-dom";
import "./WizardSectionE.scss";
import { Button } from "@sebgroup/react-components";

const WizardSectionE: React.FC = () => {
  const [numberOfSections, setNumberOfSections] = useState<number>(1);
  const ComponentsHeader = () => <Header d3="Wizard | Section E" theme="success" />;

  // RENDER =+=+=+=+=+=+=+=+=+=+=+=
  return (
    <>
      <ComponentsHeader />

      <div className="container-fluid">
        <div className="card mb-3">
          {numberOfSections > 0 &&
            [...new Array(numberOfSections)].map((_: undefined, i) => (
              <SectionWhichCanBeMultiplied key={i} index={i + 1} />
            ))}
        </div>

        <div className="d-flex justify-content-between my-3 w-100">
          <Button theme="link" onClick={() => setNumberOfSections((x) => x + 1)}>
            Add
          </Button>
          <Button theme="link" onClick={() => setNumberOfSections((x) => x - 1)}>
            Remove
          </Button>
        </div>

        <div className="card mb-3">
          <div className="card-footer">
            <div className="d-flex my-3 w-100">
              <Link to="d">Back</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const SectionWhichCanBeMultiplied: React.FC<{ index: number }> = ({ index }) => {
  const { setSectionE, sectionE } = useWizardContext();

  const SECTION_KEY: string = `${example[0].key}-${index}`;
  const ITEM_KEY: string = `${(example[0].items as DynamicFormItem[])[0].key}-${index}`;

  const section: DynamicFormSection = {
    ...example[0],
    key: SECTION_KEY,
    items: [
      {
        ...(example[0].items as DynamicFormItem[])[0],
        key: ITEM_KEY,
        label: `${(example[0].items as DynamicFormItem[])[0].label}-${index}`
      }
    ]
  };

  const [renderForm, formState, setFormState] = useDynamicForm([section]);

  useEffect(() => {
    setSectionE((existing) => {
      return {
        ...existing,
        [SECTION_KEY]: formState[SECTION_KEY] ? formState[SECTION_KEY][ITEM_KEY] || "" : ""
      };
    });
  }, [formState]);

  useEffect(() => {
    if (typeof sectionE === "object" && Object.keys(sectionE).length) {
      if (typeof sectionE[SECTION_KEY] === "string" && (sectionE[SECTION_KEY] as string).length) {
        setFormState({ [SECTION_KEY]: { [ITEM_KEY]: sectionE[SECTION_KEY] } });
      }
    }

    // NOTE: Uncomment this is you wish to reset the state when the item is removed
    // return () => {
    //   setSectionE((existing) => {
    //     return {
    //       ...existing,
    //       [SECTION_KEY]: formState[SECTION_KEY] ? formState[SECTION_KEY][ITEM_KEY] || "" : ""
    //     };
    //   });
    // };
  }, []);

  return <div className="card-body">{renderForm()}</div>;
};

export default WizardSectionE;
