import React, { Suspense, lazy } from "react";
import { useCommonMedia, DeviceType } from "../../utils/customHooks";
import { NavLink } from "react-router-dom";
import Header from "../Header";
import { useLanguageContext } from "../../providers/LanguageProvider";

const LoaderCard = lazy(() => import("./cards/LoaderCard"));
const NotificationsCard = lazy(() => import("./cards/NotificationsCard"));

const Home: React.FC = () => {
  // DEVICE SIZE ===========================
  // context
  const deviceSize: DeviceType = useCommonMedia();
  const isLargeScreenSize: boolean = deviceSize === "wide-desktop";

  // LANGUAGE ==============================
  // context
  const [{ routeNames, components }] = useLanguageContext();
  const cardsLanguage = components.home.cards;

  const HomeLoading = () => (
    <div className="container-fluid">
      <div className={isLargeScreenSize ? "card-columns" : ""}>
        {[1, 2, 3].map((i: number) => (
          <div key={i} className="card mb-3">
            <div className="card-body">
              <h3 className="card-title">{"   "}</h3>
              <h6 className="card-subtitle mb-2 text-muted">{"   "}</h6>
              <p className="card-text">{"   "}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // RENDER =+=+=+=+=+=+=+=+=+=+=+=
  return (
    <Suspense fallback={<HomeLoading />}>
      <Header d3={routeNames.home} theme="primary" />

      <div className="container-fluid">
        <div className={isLargeScreenSize ? "card-columns" : ""}>
          <LoaderCard />
          <NotificationsCard />

          <div className="card mb-3">
            <div className="card-body">
              <h3 className="card-title">{cardsLanguage.pages.title}</h3>
              <h6 className="card-subtitle mb-2 text-muted">{cardsLanguage.pages.subtitle}</h6>
              <p className="card-text">{cardsLanguage.pages.description}</p>
              <p className="text-muted">{cardsLanguage.pages.note}</p>
              <NavLink to={"/fake/path"}>
                {cardsLanguage.pages.buttonTexts ? cardsLanguage.pages.buttonTexts[0] : ""}
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Home;
