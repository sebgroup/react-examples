import React, { lazy, Suspense, useCallback, useMemo } from "react";
import "./App.scss";
import { useCommonMedia, DeviceType } from "./utils/customHooks";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { HeaderProps } from "./components/Header";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import LoaderProvider from "./providers/LoaderProvider";

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
    { path: "/home", title: "Home", component: <Home />, theme: "success" },
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
      default:
        return `
          'aside main main'
          'aside main main'
        `;
    }
  }, [mediaSize]);

  const gridTemplateColumns: () => string = useCallback(() => {
    switch (mediaSize) {
      case "tablet":
        return "200px auto auto";
      case "desktop":
        return "250px auto auto";
      case "wide-desktop":
        return "300px auto auto";
      default:
        return "auto auto auto";
    }
  }, [mediaSize]);

  const mobile: boolean = useMemo(
    () => mediaSize === "mobile" || mediaSize === "landscape-mobile",
    [mediaSize]
  );

  const rootContainerStyle = {
    display: "grid",
    gridTemplateRows: `${sidebarHeaderHeight}px calc(100vh - ${sidebarHeaderHeight}px)`,
    gridTemplateColumns: gridTemplateColumns(),
    gridTemplateAreas: gridAreas()
  };

  const AppLoading: React.FC = () => (
    <div className={"root-container"} style={rootContainerStyle}>
      <Sidebar mobile={mobile} routes={[]} searchable={false} />
      <main style={{ gridArea: "main", overflowY: "auto" }}>
        <Header theme="secondary" />
        <div className="skeleton-loader"></div>
      </main>
    </div>
  );

  return (
    // TODO: add global notifications as Context
    <BrowserRouter>
      <LoaderProvider>
        <Suspense fallback={<AppLoading />}>
          <div className={"root-container bg-light"} style={rootContainerStyle}>
            <Sidebar mobile={mobile} routes={routes} searchable />
            <main style={{ gridArea: "main", overflowY: "auto" }}>
              <Switch>
                {routes.map((route: AppRouteConfig) => {
                  return (
                    <Route key={route.path} path={route.path}>
                      <Header d3={route.title} theme={route.theme} />
                      {/* TODO: Add breadcrumbs */}

                      <div className="container-fluid">{route.component}</div>
                    </Route>
                  );
                })}
                <Redirect from="/" exact to={routes[0].path} />
              </Switch>
            </main>
          </div>
        </Suspense>
      </LoaderProvider>
    </BrowserRouter>
  );
};

export default App;
