import React from 'react';
import {
  HeaderTop, 
  InfoMedia, 
  Logo, 
  MainMenu, 
  FormFour, 
  MobileMenu,
  HeaderSticky
} from '../../components';

const HeaderOne = () => (
  <header className="vs-header header-layout1">
    <HeaderTop>
      <HeaderTop.Left>
        <p className="note_style1"><span className="note_title">Now Hiring:</span>Are you a motivated IT Support Engineer?</p>
      </HeaderTop.Left>
      <HeaderTop.Right>
        <p className="note_style1"><i className="fal fa-clock"/><span className="note_title">Office Hours:</span> 08:00am-6:00pm</p>
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


export default HeaderOne;