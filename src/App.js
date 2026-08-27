import React, { useEffect } from 'react';
import {
  BrowserRouter,
  useLocation
} from "react-router-dom";

import AppRouters from './routes/AppRouters';

import "./assets/fonts/exo/exo.css";
import "./assets/fonts/fira-sans/fira-sans.css";
import "slick-carousel/slick/slick.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/fontawesome.css";
import "./assets/scss/style.scss";


// Scroll to top whenever the page/route changes
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
};


function App() {
  return (
    <BrowserRouter>

      {/* Automatically scroll every new page to top */}
      <ScrollToTop />

      <AppRouters />

    </BrowserRouter>
  );
}

export default App;