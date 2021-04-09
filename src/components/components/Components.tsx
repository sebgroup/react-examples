import React, { Suspense } from "react";
import Header from "../Header";
import { useLanguageContext } from "../../providers/LanguageProvider";

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

  // RENDER =+=+=+=+=+=+=+=+=+=+=+=
  return (
    <Suspense fallback={<ComponentsLoading />}>
      <ComponentsHeader />

      <div className="container-fluid">COMPONENTS</div>
    </Suspense>
  );
};

export default Components;
