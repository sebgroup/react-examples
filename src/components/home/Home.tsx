import React, { Suspense, lazy } from "react";
import { useCommonMedia, DeviceType } from "../../utils/customHooks";
import Header from "../Header";
import { useLanguageContext } from "../../providers/LanguageProvider";

const LoaderCard = lazy(() => import("./cards/LoaderCard"));
const NotificationsCard = lazy(() => import("./cards/NotificationsCard"));
const PagesCard = lazy(() => import("./cards/PagesCard"));

const Home: React.FC = () => {
  // DEVICE SIZE ===========================
  // context
  const deviceSize: DeviceType = useCommonMedia();
  const isLargeScreenSize: boolean = deviceSize === "wide-desktop";

  // LANGUAGE ==============================
  // context
  const [{ routeNames }] = useLanguageContext();

  const HomeLoading = () => (
    <>
      <Header d3={routeNames.home} theme="primary" />

      <div className="container-fluid">
        <div className={isLargeScreenSize ? "card-columns" : ""}>
          {[1, 2, 3].map((i: number) => (
            <div key={i} className="card mb-3">
              <div className="card-body">
                <div className="skeleton-loader" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  // RENDER =+=+=+=+=+=+=+=+=+=+=+=
  return (
    <Suspense fallback={<HomeLoading />}>
      <Header d3={routeNames.home} theme="primary" />

      <div className="container-fluid">
        <div className={isLargeScreenSize ? "card-columns" : ""}>
          <LoaderCard />
          <NotificationsCard />
          <PagesCard />
        </div>
      </div>
    </Suspense>
  );
};

export default Home;
