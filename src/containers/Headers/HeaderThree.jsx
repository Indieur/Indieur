import React, { Fragment, useState } from 'react';
import { SidebarPopup } from '../';
import {
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

const HeaderThree = () => {

  const [sidebarShow, setSidebarShow] = useState(false);

  const handleSidebarClose = () => setSidebarShow(false);
  const handleSidebarShow = () => setSidebarShow(true);

  return (
    <Fragment>
      <SidebarPopup className="d-none d-lg-block" show={sidebarShow} onHide={handleSidebarClose} />
      <header className="vs-header header-layout2">
        <div className="header-shape"></div>
        <HeaderTop>
          <HeaderTop.Left>
            <List className="header-links">

              {/* Phone Numbers */}
              <List.Item>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    whiteSpace: 'nowrap',
                    fontSize: '11px',
                    lineHeight: '1',
                    gap: '7px'
                  }}
                >
                  <i
                    className="far fa-phone-alt"
                    style={{
                      fontSize: '13px',
                      lineHeight: '1',
                      margin: '0',
                      flexShrink: 0
                    }}
                  />

                  <a
                    href="tel:+4915562461769"
                    style={{
                      whiteSpace: 'nowrap'
                    }}
                  >
                    +49 15562 461769
                  </a>

                  <span>|</span>

                  <a
                    href="tel:+919965532994"
                    style={{
                      whiteSpace: 'nowrap'
                    }}
                  >
                    +91 99655 32994
                  </a>

                  <span>|</span>

                  <a
                    href="tel:+918667696097"
                    style={{
                      whiteSpace: 'nowrap'
                    }}
                  >
                    +91 866 769 6097
                  </a>
                </span>
              </List.Item>

              {/* Address */}
              <List.Item className="d-none d-xxl-inline-block">
                <i className="far fa-map-marker-alt" />
                1/478 A4, Lakshmi Nagar,
                Thotathupalayam, Tiruppur – 641602
              </List.Item>

              {/* Email */}
              <List.Item>
                <i className="far fa-envelope" />

                <a href="mailto:info@indieur.com">
                  info@indieur.com
                </a>
              </List.Item>

            </List>
          </HeaderTop.Left>

          <HeaderTop.Right>


            {/* <IconLink className="header-social" title="Follow Us On:">
              <IconLink.Item icon="fab fa-facebook-f" path="/" />
              <IconLink.Item icon="fab fa-twitter" path="/" />
              <IconLink.Item icon="fab fa-instagram" path="/" />
              <IconLink.Item icon="fab fa-behance" path="/" />
              <IconLink.Item icon="fab fa-youtube" path="/" />
            </IconLink> */}
          </HeaderTop.Right>
        </HeaderTop>
        <HeaderSticky>
          <div className="container">
            <div className="menu-area">
              <div className="row align-items-center justify-content-between">
                <div className="col-auto">
                  <Logo image="/images/indieur_logo.png" className="logo-style1" />
                </div>
                <div className="col-auto">
                  <MainMenu className="menu-style2 d-none d-lg-block" />
                  <MobileMenu />
                </div>
                <div className="col-auto d-none d-lg-block">
                  <div className="header-btns">
                    <Button
                      path="https://calendar.app.google/FHDxrBZecPB5XVfB6"
                      className="d-none d-xxl-inline-block"
                    >
                      Book a Growth Consultation
                      <i className="far fa-arrow-right" />
                    </Button>
                    <IconButton className="style3 sideMenuToggler" onclick={handleSidebarShow} ><i className="far fa-bars" /></IconButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </HeaderSticky>
      </header>
    </Fragment>
  );
}

export default HeaderThree;