import React, { useState } from "react";
interface SidebarProps {
  navItems: number[];
  mobile: boolean;
  // style?: React.CSSProperties | undefined;
}

const Sidebar: React.FC<SidebarProps> = ({
  navItems,
  mobile
}: // style = {}
SidebarProps) => {
  const [open, setOpen] = useState(false);
  return (
    <aside style={{ gridArea: "aside" }} className="bg-dark">
      <nav className="navbar navbar-dark bg-dark sidebar-header">
        <span className="navbar-brand">React starter</span>
        {mobile ? (
          <span
            className="navbar-test"
            onClick={() => setOpen(state => !state)}
          >
            TEST OPEN
          </span>
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
            {navItems.map((val: number) => (
              <li key={val} className="nav-item text-center w-100">
                <a className="nav-link text-light" href={`test/${val}`}>
                  {val}
                </a>
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
