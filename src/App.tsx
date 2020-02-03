import React, { lazy, Suspense, useCallback, useMemo } from "react";
import "./App.scss";
import { useCommonMedia, DeviceType } from "./utils/customHooks";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { HeaderProps } from "./components/Header";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import NoMatch from "./components/NoMatch";
import LoaderProvider from "./providers/LoaderProvider";
import NotificationsProvider from "./providers/NotificationsProvider";
import LanguageProvider from "./providers/LanguageProvider";
import LanguageSwitcher from "./components/LanguageSwitcher";
import { AppLanguage } from "./models/language";

const Home = lazy(() => import("./components/Home"));

export interface AppRouteConfig {
  path: string;
  title: keyof AppLanguage["routeNames"];
  component: React.ReactNode;
  theme?: HeaderProps["theme"];
}

const App: React.FC = () => {
  const deviceSize: DeviceType = useCommonMedia();

  const routes: Array<AppRouteConfig> = [
    { path: "/home", title: "home", component: <Home />, theme: "success" },
    {
      path: "/components",
      title: "components",
      component: <div>COMPONENTS</div>
    },
    { path: "/about", title: "about", component: <div>ABOUT</div> }
  ];
  const sidebarHeaderHeight: number = 56;

  const gridAreas: () => string = useCallback(() => {
    switch (deviceSize) {
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
  }, [deviceSize]);

  const gridTemplateColumns: () => string = useCallback(() => {
    switch (deviceSize) {
      case "tablet":
        return "200px auto auto";
      case "desktop":
        return "250px auto auto";
      case "wide-desktop":
        return "300px auto auto";
      default:
        return "auto auto auto";
    }
  }, [deviceSize]);

  const mobile: boolean = useMemo(() => deviceSize === "mobile" || deviceSize === "landscape-mobile", [deviceSize]);

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
    <LanguageProvider>
      <LanguageSwitcher />
      <BrowserRouter>
        <Switch>
          <Route path="/nomatch">
            <NoMatch />
          </Route>

          <Route path="*">
            <LoaderProvider>
              <NotificationsProvider>
                <Suspense fallback={<AppLoading />}>
                  <div className={"root-container bg-light"} style={rootContainerStyle}>
                    <Sidebar mobile={mobile} routes={routes} searchable />
                    <main style={{ gridArea: "main", overflowY: "auto" }}>
                      <Switch>
                        {routes.map((route: AppRouteConfig) => {
                          return (
                            <Route key={route.path} path={route.path}>
                              {route.component}
                            </Route>
                          );
                        })}
                        <Redirect from="/" exact to={routes[0].path} />
                        <Redirect from="*" to={"/nomatch"} />
                      </Switch>
                    </main>
                  </div>
                </Suspense>
              </NotificationsProvider>
            </LoaderProvider>
          </Route>
        </Switch>
      </BrowserRouter>
    </LanguageProvider>
  );
};

export default App;
