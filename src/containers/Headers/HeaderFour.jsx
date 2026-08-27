import React from 'react';
import {
  InfoMedia,
  HeaderTop,
  List,
  IconLink,
  HeaderSticky,
  Logo,
  Button,
  MobileMenu,
  MainMenu,
  IconButton
} from '../../components';

const HeaderFour = ()=> (
  <header className="vs-header header-layout3">
    <div className="header-box-wrap container position-relative d-none d-xl-block">
      <InfoMedia className="header-box"
        icon="fas fa-phone-alt"
        title="Call Us For Free"
        info={<a href="tel:+25821462156">+(258) 2146 2156</a>}
      />
    </div>
    <HeaderTop>
      <HeaderTop.Left>
        <List className="header-links style-white">
          <List.Item><i className="far fa-phone-alt"/><a href="tel:+25632542598">(+256) 3254 2598</a></List.Item>
          <List.Item className="d-none d-xxl-inline-block"><i className="far fa-map-marker-alt"/>121 King St. Melbourne VIC 3000, Australia</List.Item>
          <List.Item><i className="far fa-envelope"/><a href="mailto:info@example.com">info@example.com</a></List.Item>
        </List>
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
    <HeaderSticky>    
      <div className="container">
        <div className="menu-area">
          <div className="row align-items-center justify-content-between">
            <div className="col-auto">
              <Logo image="images/logo.png" className="header-logo"/>
            </div>
            <div className="col-auto">              
              <MainMenu className="menu-style3 d-none d-lg-block" />
              <MobileMenu />
            </div>
            <div className="col-auto d-none d-lg-block">
              <div className="header-btns">
                <Button path="/contact" className="d-none d-xxl-inline-block">Contact Us<i className="far fa-arrow-right"/></Button>
                <IconButton className="style3 sideMenuToggler"><i className="far fa-bars"/></IconButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HeaderSticky>
  </header>
);

export default HeaderFour;