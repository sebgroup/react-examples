import React, { useCallback } from "react";

export interface HeaderProps {
  d1?: string;
  d2?: string;
  d3?: string;
  h1?: string;
  h2?: string;
  h3?: string;
  lead?: string;
  theme?: "primary" | "secondary" | "success" | "info" | "warning" | "danger";
}

const Header: React.FC<HeaderProps> = ({ d1, d2, d3, h1, h2, h3, lead, theme }) => {
  const getClassNameForTheme: () => {
    container: string;
    text: string;
  } = useCallback(() => {
    if (theme) {
      return {
        container: `jumbotron bg-${theme}-element`,
        text: theme === "secondary" || theme === "warning" ? "text-dark" : "text-light"
      };
    }

    return {
      container: `jumbotron`,
      text: "text-cark"
    };
  }, [theme]);

  const themeClassName = getClassNameForTheme();

  return (
    <section className={themeClassName.container}>
      {[d1, d2, d3].map((val: string | undefined, i: number) =>
        val ? (
          <h1 key={i} className={`display-${i + 1} ${themeClassName.text}`}>
            {val}
          </h1>
        ) : null
      )}
      {h1 ? <h1 className={themeClassName.text}>{h1}</h1> : null}
      {h2 ? <h2 className={themeClassName.text}>{h2}</h2> : null}
      {h3 ? <h3 className={themeClassName.text}>{h3}</h3> : null}
      {lead ? (
        <>
          <hr className="my-4" />
          <p className="lead">{lead}</p>
        </>
      ) : null}
    </section>
  );
};

export default Header;
