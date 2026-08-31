import posthog from "posthog-js";

/*
=========================================================
CONFIGURATION
=========================================================
*/

const GA_MEASUREMENT_ID =
  process.env.REACT_APP_GA_MEASUREMENT_ID;

const POSTHOG_KEY =
  process.env.REACT_APP_POSTHOG_KEY;

const POSTHOG_HOST =
  process.env.REACT_APP_POSTHOG_HOST ||
  "https://us.i.posthog.com";


/*
=========================================================
GOOGLE ANALYTICS
=========================================================
*/

let googleAnalyticsInitialized = false;

export const initGoogleAnalytics = () => {
  if (
    !GA_MEASUREMENT_ID ||
    googleAnalyticsInitialized
  ) {
    return;
  }

  try {
    // Prevent duplicate Google Analytics script
    const existingScript = document.querySelector(
      `script[src*="googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}"]`
    );

    if (!existingScript) {
      const script = document.createElement("script");

      script.async = true;

      script.src =
        `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;

      document.head.appendChild(script);
    }

    // Create dataLayer
    window.dataLayer = window.dataLayer || [];

    window.gtag = function () {
      window.dataLayer.push(arguments);
    };

    window.gtag(
      "js",
      new Date()
    );

    /*
      IMPORTANT:

      We manually send page_view events
      whenever React Router changes route.

      Therefore automatic pageview on initial
      config is disabled.
    */
    window.gtag(
      "config",
      GA_MEASUREMENT_ID,
      {
        send_page_view: false
      }
    );

    googleAnalyticsInitialized = true;

  } catch (error) {
    console.error(
      "Google Analytics initialization failed:",
      error
    );
  }
};


/*
=========================================================
GOOGLE ANALYTICS PAGE VIEW
=========================================================
*/

export const trackGooglePageView = (
  pathname,
  search = ""
) => {

  if (
    !googleAnalyticsInitialized ||
    !window.gtag
  ) {
    return;
  }

  try {

    const pagePath =
      pathname + search;

    window.gtag(
      "event",
      "page_view",
      {
        page_title:
          document.title,

        page_location:
          window.location.origin +
          pagePath,

        page_path:
          pagePath
      }
    );

  } catch (error) {

    console.error(
      "Google Analytics pageview failed:",
      error
    );

  }
};


/*
=========================================================
GOOGLE ANALYTICS CUSTOM EVENT
=========================================================
*/

export const trackGoogleEvent = (
  eventName,
  parameters = {}
) => {

  if (
    !googleAnalyticsInitialized ||
    !window.gtag
  ) {
    return;
  }

  try {

    window.gtag(
      "event",
      eventName,
      parameters
    );

  } catch (error) {

    console.error(
      `Google Analytics event "${eventName}" failed:`,
      error
    );

  }
};


/*
=========================================================
POSTHOG INITIALIZATION
=========================================================
*/

let posthogInitialized = false;

export const initPostHog = () => {

  if (
    !POSTHOG_KEY ||
    posthogInitialized
  ) {
    return;
  }

  try {

    posthog.init(
      POSTHOG_KEY,
      {
        api_host: POSTHOG_HOST,

        /*
        Automatically capture clicks,
        form interactions, etc.
        */
        autocapture: true,

        /*
        We manually track route pageviews.
        */
        capture_pageview: false,

        /*
        Session recordings.
        Inputs are masked for privacy.
        */
        session_recording: {
          maskAllInputs: true,
          blockAllMedia: false
        },

        /*
        Store analytics locally.
        */
        persistence:
          "localStorage+cookie"
      }
    );

    posthogInitialized = true;

  } catch (error) {

    console.error(
      "PostHog initialization failed:",
      error
    );

  }
};


/*
=========================================================
POSTHOG PAGE VIEW
=========================================================
*/

export const trackPostHogPageView = (
  pathname
) => {

  if (!posthogInitialized) {
    return;
  }

  try {

    posthog.capture(
      "$pageview",
      {
        pathname,
        $current_url:
          window.location.href
      }
    );

  } catch (error) {

    console.error(
      "PostHog pageview failed:",
      error
    );

  }
};


/*
=========================================================
POSTHOG CUSTOM EVENT
=========================================================
*/

export const trackPostHogEvent = (
  eventName,
  properties = {}
) => {

  if (!posthogInitialized) {
    return;
  }

  try {

    posthog.capture(
      eventName,
      properties
    );

  } catch (error) {

    console.error(
      `PostHog event "${eventName}" failed:`,
      error
    );

  }
};


/*
=========================================================
TRACK EVENT IN BOTH GA + POSTHOG
=========================================================
*/

export const trackEvent = (
  eventName,
  properties = {}
) => {

  // Google Analytics
  trackGoogleEvent(
    eventName,
    properties
  );


  // PostHog
  trackPostHogEvent(
    eventName,
    properties
  );

};


/*
=========================================================
IDENTIFY USER IN POSTHOG
=========================================================
*/

export const identifyUser = (
  userId,
  properties = {}
) => {

  if (
    !posthogInitialized ||
    !userId
  ) {
    return;
  }

  try {

    posthog.identify(
      userId,
      properties
    );

  } catch (error) {

    console.error(
      "PostHog identify failed:",
      error
    );

  }

};


/*
=========================================================
RESET POSTHOG USER
=========================================================
*/

export const resetAnalyticsUser = () => {

  if (!posthogInitialized) {
    return;
  }

  try {

    posthog.reset();

  } catch (error) {

    console.error(
      "PostHog reset failed:",
      error
    );

  }

};