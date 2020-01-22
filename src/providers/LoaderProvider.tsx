import React, { createContext, useState, useContext } from "react";
import { Loader } from "@sebgroup/react-components/dist/Loader";

export interface LoaderContextInterface {
  loading: boolean;
  toggleLoading: () => void;
}

export type UseLoaderContext = [
  LoaderContextInterface["loading"],
  LoaderContextInterface["toggleLoading"]
];

export const LoaderContext: React.Context<LoaderContextInterface> = createContext<
  LoaderContextInterface
>({ loading: false, toggleLoading: () => {} });

const LoaderProvider: React.FC = props => {
  const [loading, setLoading] = useState<LoaderContextInterface["loading"]>(
    false
  );
  const toggleLoading: LoaderContextInterface["toggleLoading"] = () => {
    setLoading(state => !state);
  };

  return (
    <LoaderContext.Provider
      value={{
        loading,
        toggleLoading
      }}
    >
      <Loader toggle={loading} fullscreen />
      {props.children}
    </LoaderContext.Provider>
  );
};

export const useLoaderContext: () => UseLoaderContext = () => {
  const loaderContext = useContext(LoaderContext);
  return [loaderContext.loading, loaderContext.toggleLoading];
};

export default LoaderProvider;
