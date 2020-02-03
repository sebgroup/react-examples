import React, { useState, useCallback, memo } from "react";
import { NavLink } from "react-router-dom";
import { AppRouteConfig } from "../App";
import { useLanguageContext } from "../providers/LanguageProvider";

interface SidebarProps {
  routes: Array<AppRouteConfig>;
  mobile: boolean;
  searchable: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ routes, mobile, searchable }: SidebarProps) => {
  const [{ appName, routeNames }] = useLanguageContext();
  const [open, setOpen] = useState(false);
  const toggleClickMenu = useCallback(() => setOpen((state) => !state), []);

  const Separator: React.FC<{ type: "mb" | "mt" | "my" }> = memo(({ type }) => <hr className={`m-0 ${type}-3`} />);

  return (
    <aside style={{ gridArea: "aside", zIndex: 1 }} className="bg-dark overflow-auto">
      <nav className="navbar navbar-dark bg-dark sidebar-header">
        <span className="navbar-brand">{appName}</span>
        {mobile ? (
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={toggleClickMenu}
          >
            <span className="navbar-toggler-icon"></span>
            {/* TODO: automatically close when anything else is clicked */}
          </button>
        ) : null}
      </nav>

      <div
        className={`bg-dark ${mobile ? "w-100" : ""}`}
        style={{
          position: mobile ? "absolute" : "relative",
          overflowY: "auto",
          height: mobile && !open ? 0 : "inherit"
        }}
      >
        <Separator type="mb" />

        {searchable && (
          <section className="sidebar-nav px-3">
            <div>TODO: add search</div>
          </section>
        )}

        <Separator type="my" />

        <section className="sidebar-nav">
          <ul className="nav my-0">
            {routes.map((item: AppRouteConfig) => (
              <li key={item.path} className="nav-item text-center w-100">
                <NavLink
                  className="nav-link text-light"
                  to={item.path}
                  activeClassName="text-dark bg-secondary"
                  onClick={toggleClickMenu}
                >
                  {routeNames[item.title]}
                </NavLink>
              </li>
            ))}
          </ul>
        </section>

        <Separator type="my" />
      </div>
    </aside>
  );
};

export default Sidebar;
