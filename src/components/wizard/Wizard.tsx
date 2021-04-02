import React, { lazy } from "react";
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";
import Header from "../Header";

const WizardSectionA = lazy(() => import("./sections/WizardSectionA"));
const WizardSectionB = lazy(() => import("./sections/WizardSectionB"));
const WizardSectionC = lazy(() => import("./sections/WizardSectionC"));

export interface WazardRouteConfig {
  path: string;
  component: React.ReactNode;
}

const Wizard: React.FC = () => {
  let { path, url } = useRouteMatch();

  const ComponentsHeader = () => <Header d3="Wizard" theme="warning" />;

  const routes: Array<WazardRouteConfig> = [
    { path: "a", component: <WizardSectionA /> },
    { path: "b", component: <WizardSectionB /> },
    { path: "c", component: <WizardSectionC /> }
  ];

  return (
    <>
      <Switch>
        <Route exact path={path}>
          <ComponentsHeader />

          <div className="container-fluid">
            <div className="card mb-3">
              <div className="card-body">
                <Link to={`${url}/a`}>Start</Link>
              </div>
            </div>
          </div>
        </Route>
        {routes.map((route: WazardRouteConfig, i: number) => {
          return (
            <Route key={i} path={`${path}/${route.path}`}>
              {route.component}
            </Route>
          );
        })}
      </Switch>
    </>
  );
};

export default Wizard;