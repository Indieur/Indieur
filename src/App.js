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

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import ReactGA from "react-ga4";


// =====================================================
// GOOGLE ANALYTICS TRACKER
// =====================================================

const GoogleAnalyticsTracker = () => {
  const location = useLocation();

  // Initialize Google Analytics
  useEffect(() => {
    const measurementId =
      process.env.REACT_APP_GA_MEASUREMENT_ID;

    if (!measurementId) {
      console.warn(
        "Google Analytics Measurement ID is missing."
      );
      return;
    }

    ReactGA.initialize(measurementId);
  }, []);


  // Track every React Router page change
  useEffect(() => {
    const measurementId =
      process.env.REACT_APP_GA_MEASUREMENT_ID;

    if (!measurementId) return;

    ReactGA.send({
      hitType: "pageview",
      page:
        location.pathname +
        location.search
    });

  }, [
    location.pathname,
    location.search
  ]);

  return null;
};


// =====================================================
// SCROLL TO TOP
// =====================================================

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }, [pathname]);

  return null;
};


// =====================================================
// APP
// =====================================================

function App() {
  return (
    <BrowserRouter>

      {/* Google Analytics */}
      <GoogleAnalyticsTracker />

      {/* Vercel Analytics */}
      <Analytics />

      {/* Vercel Speed Insights */}
      <SpeedInsights />

      {/* Scroll to top */}
      <ScrollToTop />

      {/* App Routes */}
      <AppRouters />

    </BrowserRouter>
  );
}

export default App;