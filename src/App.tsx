import React, { lazy, Suspense } from "react";
import "./App.scss";

const Main = lazy(() => import("./components/Main"));
const Sidebar = lazy(() => import("./components/Sidebar"));

const App: React.FC = () => {
  return (
    // TODO: add global loader as Context
    // TODO: add global notifications as Context
    <Suspense fallback={<div>loading ...</div>}>
      <div className="container-fluid app-root">
        <Sidebar />
        <Main />
      </div>
    </Suspense>
  );
};

export default App;
