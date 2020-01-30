import React from "react";
import { NavLink } from "react-router-dom";

const NoMatch: React.FC = () => {
  const sidebarHeaderHeight: number = 56;

  const rootContainerStyle: React.HTMLAttributes<HTMLDivElement>["style"] = {
    position: "relative",
    display: "grid",
    gridTemplateRows: `${sidebarHeaderHeight}px calc(100vh - ${sidebarHeaderHeight * 2}px) ${sidebarHeaderHeight}px`,
    gridTemplateColumns: `auto`,
    gridTemplateAreas: `
        'header'
        'main'
        'footer'
    `
  };

  const backgroundElementStyle: React.HTMLAttributes<HTMLSpanElement>["style"] = {
    position: "fixed",
    width: 600,
    top: 0,
    right: 0,
    height: 600,
    backgroundPositionY: -180,
    clipPath: "polygon(0 0, 100% 0, 100% 90%, 20% 50%)"
  };

  return (
    <>
      <span style={backgroundElementStyle} className="bg-warning-element"></span>

      <div style={rootContainerStyle}>
        <nav style={{ gridArea: "header" }} className="navbar">
          <span className="navbar-brand"></span>
        </nav>
        <main style={{ gridArea: "main", overflowY: "auto" }} className="d-flex align-items-center">
          <div className="container py-3" style={{ maxHeight: "100%" }}>
            <div className="row">
              <div className="col col-lg-8">
                <svg id="PIKTO_LIGHT" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 170" width="6rem">
                  <path d="M85,101.5h-.6a1.5,1.5,0,0,1-.9-1.4V81.7H72.3a1.5,1.5,0,0,1-1.5-1.5V8a1.5,1.5,0,0,1,1.5-1.5H162A1.5,1.5,0,0,1,163.5,8V80.2a1.5,1.5,0,0,1-1.5,1.5H105.5L86.1,101.1A1.5,1.5,0,0,1,85,101.5ZM73.8,78.7H85a1.5,1.5,0,0,1,1.5,1.5V96.4l17.3-17.3a1.5,1.5,0,0,1,1.1-.4h55.7V9.5H73.8Z" />
                  <path d="M43.2,105.9a16,16,0,1,1,16-16A16,16,0,0,1,43.2,105.9Zm0-29a13,13,0,1,0,13,13A13,13,0,0,0,43.2,76.9Z" />
                  <path d="M50.7,118a16,16,0,0,1,16,16V165h-3V133.9a13,13,0,0,0-13-13h-15a13,13,0,0,0-13,13V165h-3V133.9a16,16,0,0,1,16-16Z" />
                </svg>
                <h1>Seems Like the page you were looking for is not available.</h1>
              </div>
            </div>
            <div className="row align-items-end">
              <div className="col-sm">
                <p className="text-muted">Error code 404</p>
                <hr />
                <p>
                  Something like this usually happens when you accidentally typed in a wrong url or we encountered
                  something very unexpected
                </p>
                <hr />
                <NavLink to={"/"}>Go back home</NavLink>
              </div>
              <div className="col-sm">
                <hr />
                <button className="btn btn-link">Option 2</button>
              </div>
              <div className="col-sm">
                <hr />
                <button className="btn btn-link">Option 3</button>
              </div>
            </div>
          </div>
        </main>
        <nav style={{ gridArea: "footer" }} className="navbar">
          <p>© Skandinaviska Enskilda Banken AB</p>
          <p>2019 01 30</p>
        </nav>
      </div>
    </>
  );
};

export default NoMatch;
