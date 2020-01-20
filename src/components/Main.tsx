import React from "react";

const Main: React.FC = () => {
  return (
    <main style={{ gridArea: "main", overflowY: "auto" }}>
      <section className="jumbotron">
        <h1>Header 1</h1>
        <h2>Header 2</h2>
        <h3>Header 3</h3>
      </section>
      <div className="container-fluid">
        <p>
          {`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. `.repeat(
            7
          )}
        </p>
      </div>
    </main>
  );
};

export default Main;
