import React, { lazy, Suspense, useCallback } from "react";
import "./App.scss";
import { useCommonMedia, DeviceType } from "./utils/customHooks";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { HeaderProps } from "./components/Header";

const Sidebar = lazy(() => import("./components/Sidebar"));
const Header = lazy(() => import("./components/Header"));
const Home = lazy(() => import("./components/Home"));

export interface AppRouteConfig {
  path: string;
  title: string;
  component: React.ReactNode;
  theme?: HeaderProps["theme"];
}

const App: React.FC = () => {
  const mediaSize: DeviceType = useCommonMedia();
  const routes: Array<AppRouteConfig> = [
    { path: "/home", title: "Home", component: <Home />, theme: "secondary" },
    {
      path: "/components",
      title: "Components",
      component: <div>COMPONENTS</div>
    },
    { path: "/about", title: "About", component: <div>ABOUT</div> }
  ];
  const sidebarHeaderHeight: number = 56;

  const gridAreas: () => string = useCallback(() => {
    switch (mediaSize) {
      case "mobile":
      case "landscape-mobile":
        return `
          'aside aside aside'
          'main main main'
        `;
      case "tablet":
      case "desktop":
      case "wide-desktop":
      default:
        return `
          'aside main main'
          'aside main main'
        `;
    }
  }, [mediaSize]);

  const gridTemplate: () => {
    rows: string;
    columns: string;
  } = useCallback(() => {
    switch (mediaSize) {
      case "mobile":
      case "landscape-mobile":
        return {
          rows: `${sidebarHeaderHeight}px calc(100vh - ${sidebarHeaderHeight}px)`,
          columns: "auto auto auto"
        };
      case "tablet":
        return {
          rows: `${sidebarHeaderHeight}px calc(100vh - ${sidebarHeaderHeight}px)`,
          columns: "200px auto auto"
        };
      case "desktop":
        return {
          rows: `${sidebarHeaderHeight}px calc(100vh - ${sidebarHeaderHeight}px)`,
          columns: "250px auto auto"
        };
      case "wide-desktop":
        return {
          rows: `${sidebarHeaderHeight}px calc(100vh - ${sidebarHeaderHeight}px)`,
          columns: "300px auto auto"
        };
      default:
        return {
          rows: "auto",
          columns: "auto"
        };
    }
  }, [mediaSize]);

  const { rows, columns } = gridTemplate();

  return (
    // TODO: add global loader as Context
    // TODO: add global notifications as Context
    <BrowserRouter>
      <Suspense fallback={<div className="skeleton-loader"></div>}>
        {/* TODO: Add proper fallback UI*/}
        <div
          className={"root-container "}
          style={{
            display: "grid",
            gridTemplateRows: rows,
            gridTemplateColumns: columns,
            gridTemplateAreas: gridAreas()
          }}
        >
          <Sidebar
            mobile={mediaSize === "mobile" || mediaSize === "landscape-mobile"}
            routes={routes}
          />
          <main style={{ gridArea: "main", overflowY: "auto" }}>
            <Switch>
              {routes.map((route: AppRouteConfig) => {
                return (
                  <Route key={route.path} path={route.path}>
                    <Header d3={route.title} theme={route.theme} />

                    <div className="container-fluid">{route.component}</div>
                  </Route>
                );
              })}
              <Redirect from="/" exact to={routes[0].path} />
            </Switch>
          </main>
        </div>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
