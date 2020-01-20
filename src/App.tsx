import React, { lazy, Suspense, useCallback } from "react";
import "./App.scss";
import { useCommonMedia, DeviceType } from "./utils/customHooks";

const Sidebar = lazy(() => import("./components/Sidebar"));
const Main = lazy(() => import("./components/Main"));

const App: React.FC = () => {
  const mediaSize: DeviceType = useCommonMedia();

  const gridAreas: () => string = useCallback(() => {
    switch (mediaSize) {
      case "mobile":
        return `
          'aside aside aside'
          'main main main'
        `;
      case "landscape-mobile":
        return `
          'aside aside aside'
          'main main main'
        `;
      case "tablet":
        return `
          'aside main main'
          'aside main main'
        `;
      case "desktop":
        return `
          'aside main main'
          'aside main main'
        `;
      case "wide-desktop":
        return `
          'aside main main'
          'aside main main'
        `;
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
        return {
          rows: "56px calc(100vh - 56px)",
          columns: "auto auto auto"
        };
      case "landscape-mobile":
        return {
          rows: "56px calc(100vh - 56px)",
          columns: "auto auto auto"
        };
      case "tablet":
        return {
          rows: "56px calc(100vh - 56px)",
          columns: "200px auto auto"
        };
      case "desktop":
        return {
          rows: "56px calc(100vh - 56px)",
          columns: "250px auto auto"
        };
      case "wide-desktop":
        return {
          rows: "56px calc(100vh - 56px)",
          columns: "300px auto auto"
        };
      default:
        return {
          rows: "auto",
          columns: "auto"
        };
    }
  }, [mediaSize]);

  return (
    // TODO: add global loader as Context
    // TODO: add global notifications as Context
    <Suspense fallback={<div className="skeleton-loader"></div>}>
      {/* TODO: Add proper fallback UI*/}
      <div
        className={"root-container "}
        style={{
          display: "grid",
          gridTemplateRows: gridTemplate().rows,
          gridTemplateColumns: gridTemplate().columns,
          gridTemplateAreas: gridAreas()
        }}
      >
        <Sidebar
          mobile={mediaSize === "mobile" || mediaSize === "landscape-mobile"}
          navItems={[1, 2, 3]}
        />
        <Main />
      </div>
    </Suspense>
  );
};

export default App;
