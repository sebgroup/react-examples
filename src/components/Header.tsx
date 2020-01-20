import React from "react";

export interface HeaderProps {
  h1?: string;
  h2?: string;
  h3?: string;
}

const Header: React.FC<HeaderProps> = ({ h1, h2, h3 }) => {
  return (
    <section className="jumbotron">
      {h1 ? <h1>{h1}</h1> : null}
      {h2 ? <h2>{h2}</h2> : null}
      {h3 ? <h3>{h3}</h3> : null}
    </section>
  );
};

export default Header;
