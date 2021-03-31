import React, { lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

const WizardSectionA = lazy(() => import("./sections/WizardSectionA"));

export interface WazardRouteConfig {
  path: string;
  title: string;
  component: React.ReactNode;
}

const Wizard: React.FC = () => {
  const routes: Array<WazardRouteConfig> = [{ path: "/wizard/a", title: "Section A", component: <WizardSectionA /> }];

  return (
    <>
      <Switch>
        {routes.map((route: WazardRouteConfig, i: number) => {
          return (
            <Route key={i} path={route.path}>
              {route.component}
            </Route>
          );
        })}
        <Redirect from="*" to={"/nomatch"} />
      </Switch>
    </>
  );
};

export default Wizard;
