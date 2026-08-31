import React, { useEffect } from "react";

import {
  BrowserRouter,
  useLocation
} from "react-router-dom";

import AppRouters from "./routes/AppRouters";

import "./assets/fonts/exo/exo.css";
import "./assets/fonts/fira-sans/fira-sans.css";

import "slick-carousel/slick/slick.css";
import "bootstrap/dist/css/bootstrap.min.css";

import "./assets/css/fontawesome.css";
import "./assets/scss/style.scss";


// Vercel
import {
  Analytics
} from "@vercel/analytics/react";

import {
  SpeedInsights
} from "@vercel/speed-insights/react";


// Analytics
import {
  initGoogleAnalytics,
  trackGooglePageView,
  initPostHog,
  trackPostHogPageView
} from "./analytics";



/*
=========================================================
ANALYTICS TRACKER
=========================================================
*/

const AnalyticsTracker = () => {

  const location = useLocation();


  /*
  -------------------------------------------------------
  INITIALIZE ANALYTICS
  -------------------------------------------------------
  */

  useEffect(() => {

    initGoogleAnalytics();

    initPostHog();

  }, []);


  /*
  -------------------------------------------------------
  TRACK ROUTE CHANGES
  -------------------------------------------------------
  */

  useEffect(() => {

    const pathname =
      location.pathname;

    const search =
      location.search;


    // Google Analytics
    trackGooglePageView(
      pathname,
      search
    );


    // PostHog
    trackPostHogPageView(
      pathname
    );

  }, [
    location.pathname,
    location.search
  ]);


  return null;
};



/*
=========================================================
SCROLL TO TOP
=========================================================
*/

const ScrollToTop = () => {

  const {
    pathname
  } = useLocation();


  useEffect(() => {

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });

  }, [pathname]);


  return null;
};



/*
=========================================================
MAIN APP
=========================================================
*/

function App() {

  return (

    <BrowserRouter>

      {/* =========================================
          GOOGLE ANALYTICS + POSTHOG
      ========================================= */}

      <AnalyticsTracker />


      {/* =========================================
          VERCEL ANALYTICS
      ========================================= */}

      <Analytics />


      {/* =========================================
          VERCEL SPEED INSIGHTS
      ========================================= */}

      <SpeedInsights />


      {/* =========================================
          SCROLL TO TOP
      ========================================= */}

      <ScrollToTop />


      {/* =========================================
          APPLICATION ROUTES
      ========================================= */}

      <AppRouters />

    </BrowserRouter>

  );
}


export default App;