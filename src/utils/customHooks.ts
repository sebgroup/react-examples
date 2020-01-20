import * as React from "react";

export type GridBreakpoint = {
  breakpoint: string;
  label: DeviceType;
};

export type DeviceType =
  | "mobile"
  | "landscape-mobile"
  | "tablet"
  | "desktop"
  | "wide-desktop";

/**
 * Custom Common Media Query hook
 * @returns information on the current size of the device
 */
export function useCommonMedia(): DeviceType {
  const gridBreakPoints: Array<GridBreakpoint> = [
    {
      breakpoint: "0px",
      label: "mobile"
    },
    {
      breakpoint: "576px",
      label: "landscape-mobile"
    },
    {
      breakpoint: "768px",
      label: "tablet"
    },
    {
      breakpoint: "992px",
      label: "desktop"
    },
    {
      breakpoint: "1200px",
      label: "wide-desktop"
    }
  ];

  const breakpointToQuery: (gbp: GridBreakpoint) => string = (
    gbp: GridBreakpoint
  ) => `(min-width: ${gbp.breakpoint})`;
  const queries: Array<string> = gridBreakPoints
    .reverse()
    .map(breakpointToQuery);
  const labels: Array<DeviceType> = gridBreakPoints.map(
    (gbp: GridBreakpoint) => gbp.label
  );

  return useMedia(queries, labels, gridBreakPoints[0].label);
}

/**
 * Custom Hook to utilize media queries in your component logic
 * @param mediaQueries Array of queries
 * @param sizeNames Array of expected responses based on the queries array
 * @param defaultSizeName default value to return if any of the queries are true and the values array is not defined
 * @returns response from values array based on which query matches or defaultValue
 */
export function useMedia<T>(
  mediaQueries: Array<string>,
  sizeNames: Array<T>,
  defaultSizeName: T
): T {
  /** Array containing a media query list for each query */
  const mediaQueryLists: Array<MediaQueryList> = mediaQueries.map(
    (query: string) => window.matchMedia(query)
  );

  /** Function that gets value based on matching media query */
  const getValue: () => T = React.useCallback((): T => {
    // Get index of first media query that matches
    const index: number = mediaQueryLists.findIndex(mql => mql.matches);
    // Return related value or defaultValue if none
    return typeof sizeNames[index] !== "undefined"
      ? sizeNames[index]
      : defaultSizeName;
  }, [mediaQueryLists, sizeNames, defaultSizeName]);

  /** State and setter for matched value */
  const [value, setValue] = React.useState(getValue);

  React.useEffect(
    () => {
      /**
       * Event listener callback
       * Note: By defining getValue outside of useEffect we ensure that it has
       * current values of hook args (as this hook callback is created once on mount).
       */
      const handler: () => void = (): void => setValue(getValue);
      // Set a listener for each media query with above handler as callback.
      mediaQueryLists.forEach((mql: MediaQueryList) =>
        mql.addListener(handler)
      );
      // Remove listeners on cleanup
      return () => mediaQueryLists.forEach(mql => mql.removeListener(handler));
    },
    [mediaQueryLists, getValue] // Empty array ensures effect is only run on mount and unmount
  );

  return value;
}
