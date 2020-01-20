import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AppRouteConfig } from "../App";

interface SidebarProps {
  routes: Array<AppRouteConfig>;
  mobile: boolean;
  // style?: React.CSSProperties | undefined;
}

const Sidebar: React.FC<SidebarProps> = ({
  routes,
  mobile
}: // style = {}
SidebarProps) => {
  const [open, setOpen] = useState(false);

  return (
    <aside style={{ gridArea: "aside" }} className="bg-dark">
      <nav className="navbar navbar-dark bg-dark sidebar-header">
        <span className="navbar-brand">React starter</span>
        {mobile ? (
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setOpen(state => !state)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        ) : null}
      </nav>

      <div
        className={`bg-dark ${mobile ? "w-100" : ""}`}
        style={{
          position: mobile ? "fixed" : "relative",
          overflowY: "hidden",
          height: mobile && !open ? 0 : "auto"
        }}
      >
        <hr className="m-0 mb-3" />

        <section className="sidebar-nav px-3">
          <div>TODO: add search</div>
        </section>

        <hr className="m-0 my-3" />

        <section className="sidebar-nav overflow-auto">
          <ul className="nav nav-pills my-0">
            {routes.map((item: AppRouteConfig) => (
              <li key={item.path} className="nav-item text-center w-100">
                <NavLink
                  className="nav-link text-light"
                  to={item.path}
                  activeClassName="active"
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </section>

        <hr className="m-0 my-3" />
      </div>
    </aside>
  );
};

export default Sidebar;
