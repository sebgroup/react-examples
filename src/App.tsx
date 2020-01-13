import React, { lazy, Suspense } from "react";
import "./App.scss";

const Main = lazy(() => import("./components/Main"));

const App: React.FC = () => {
  return (
    <Suspense fallback={<div>loading ...</div>}>
      <div className="container-fluid app-root">
        <Main />
      </div>
    </Suspense>
  );
};

export default App;
