import React, { Suspense } from "react";
import Header from "../Header";
import { useLanguageContext } from "../../providers/LanguageProvider";
import { example } from "../../assets/mocks/dynamic-form-example";
import { useDynamicForm, DynamicFormSection } from "@sebgroup/react-components/hooks/useDynamicForm";

const Components: React.FC = () => {
  const [{ routeNames }] = useLanguageContext();

  const ComponentsHeader = () => <Header d3={routeNames.components} theme="secondary" />;

  const ComponentsLoading = () => (
    <>
      <ComponentsHeader />

      <div className="container-fluid">
        <div className="skeleton-loader"></div>
      </div>
    </>
  );

  const sections: DynamicFormSection[] = example;

  const [renderForm, state] = useDynamicForm(sections);

  // console.log(state);

  // RENDER =+=+=+=+=+=+=+=+=+=+=+=
  return (
    <Suspense fallback={<ComponentsLoading />}>
      <ComponentsHeader />

      <div className="container-fluid">{renderForm()}</div>
    </Suspense>
  );
};

export default Components;
