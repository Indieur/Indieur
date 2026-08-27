import React from 'react';
import {
  HeaderTop,
  HeaderSticky,
  InfoMedia,
  Logo,
  MainMenu,
  FormFour,
  MobileMenu,
  IconLink
} from '../../components';

const HeaderTwo = () => (
  <header className="vs-header header-layout1">
    <HeaderTop>
      <HeaderTop.Left>
        <p className="note_style1"><span className="note_title">Now Hiring:</span>Are you a motivated IT Support Engineer?</p>
      </HeaderTop.Left>
      <HeaderTop.Right>
        <IconLink className="header-social style-white" title="Follow Us On:">
          <IconLink.Item icon="fab fa-facebook-f" path="/" />
          <IconLink.Item icon="fab fa-twitter" path="/" />
          <IconLink.Item icon="fab fa-instagram" path="/" />
          <IconLink.Item icon="fab fa-behance" path="/" />
          <IconLink.Item icon="fab fa-youtube" path="/" />
        </IconLink>
      </HeaderTop.Right>
    </HeaderTop>
    <div className="container">
      <div className="menu-top">
        <div className="row justify-content-between align-items-center gx-sm-0">
          <div className="col">
            <Logo image="images/logo.png" />
          </div>
          <InfoMedia className="header-media col-auto"
            icon="fas fa-phone-alt"
            title="Call Anytime 24/7"
            info={<a href="tel:+26921562148">+269 2156 2148</a>}
          />
          <InfoMedia className="header-media col-auto d-none d-lg-flex"
            icon="fas fa-envelope"
            title="Mail Us For Support"
            info={<a href="mailto:info@example.com">info@example.com</a>}
          />
          <InfoMedia className="header-media col-auto d-none d-xl-flex"
            icon="fas fa-map-marker-alt"
            title="Office Address"
            info="259 HGS, Hotland, USA"
          />
        </div>
      </div>
    </div>
    <HeaderSticky>
      <div className="container">
        <div className="row align-items-center justify-content-between">
          <div className="col-auto">
            <MainMenu className="menu-style1 d-none d-lg-block" />
            <MobileMenu />
          </div>
          <div className="col-auto">
            <FormFour />
          </div>
        </div>
      </div>
    </HeaderSticky>
  </header>
);


export default HeaderTwo;