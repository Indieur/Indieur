import React from 'react';
import { Link } from 'react-router-dom';

import {
  Logo,
  IconLink,
  Widget,
  AboutWidget,
  CategoryWidget,
  FormTwo,
  TableOne
} from '../../components';

// Widget Datas
import widgetsdata from '../../data/widgets.json';

const { pageList } = widgetsdata;

const FooterTwo = () => (
  <>
<style>
  {`
    /* =========================================================
       INDEUR FOOTER - FINAL RESPONSIVE CSS
    ========================================================= */

    .footer-layout2 {
      width: 100%;
      max-width: 100%;
      overflow-x: hidden;
    }


    /* =========================================================
       FOOTER TOP
    ========================================================= */

    .footer-layout2 .footer-top {
      width: 100%;
      padding: 48px 0 48px;
      overflow: hidden;
    }


    /* =========================================================
       TOP ROW
    ========================================================= */

    .footer-layout2 .footer-top .row {
      display: flex;
      align-items: center;
      justify-content: space-between;

      margin-left: 0;
      margin-right: 0;
    }


    /* =========================================================
       DESKTOP LOGO COLUMN
    ========================================================= */

    .footer-layout2 .footer-logo-column {
      width: auto;
      max-width: 100%;

      display: flex;
      align-items: center;
    }


    /* =========================================================
       DESKTOP WHITE LOGO BOX

       Screenshot:
       approximately 265px wide
       approximately 88px high
    ========================================================= */

    .footer-layout2 .footer-logo-box {
      width: 265px;
      height: 88px;

      max-width: 100%;

      padding: 8px 14px;

      background-color: #ffffff;

      border: 1px solid #dddddd;

      border-radius: 7px;

      box-sizing: border-box;

      display: flex;
      align-items: center;
      justify-content: center;

      overflow: hidden;

      margin: 0;
    }


    /* =========================================================
       LOGO LINK
    ========================================================= */

    .footer-layout2 .footer-logo-box a {
      display: flex;

      align-items: center;
      justify-content: center;

      width: 100%;
      height: 100%;

      max-width: 100%;

      min-width: 0;

      overflow: hidden;
    }


    /* =========================================================
       LOGO IMAGE
    ========================================================= */

    .footer-layout2 .footer-logo-box img {
      display: block;

      width: auto !important;
      height: auto !important;

      max-width: 100% !important;
      max-height: 70px !important;

      object-fit: contain;

      margin: 0 auto;

      flex-shrink: 1;
    }


    /* =========================================================
       SOCIAL COLUMN
    ========================================================= */

    .footer-layout2 .footer-social-column {
      width: auto;
      max-width: 100%;

      display: flex;

      align-items: center;
      justify-content: flex-end;
    }


    /* =========================================================
       SOCIAL LINKS
    ========================================================= */

    .footer-layout2 .footer-social {
      display: flex;

      align-items: center;

      justify-content: flex-end;

      flex-wrap: nowrap;

      gap: 10px;
    }


    /* =========================================================
       FOOTER WIDGET AREA
    ========================================================= */

    .footer-layout2 .widget-area {
      width: 100%;
    }


    .footer-layout2 .widget-area .row {
      align-items: flex-start;
    }


    /* =========================================================
       FOOTER WIDGET
    ========================================================= */

    .footer-layout2 .footer-widget {
      margin-bottom: 0;
    }


    /* =========================================================
       QUICK LINKS
    ========================================================= */

    .footer-layout2 .footer-links-section {
      margin-bottom: 30px !important;

      min-height: auto !important;

      height: auto !important;

      padding: 0 !important;
    }


    /* =========================================================
       CORE SERVICES
    ========================================================= */

    .footer-layout2 .footer-services-section {
      margin-top: 0 !important;

      min-height: auto !important;

      height: auto !important;

      padding: 0 !important;
    }


    /* =========================================================
       CONTACT
    ========================================================= */

    .footer-layout2 .footer-number {
      height: auto !important;

      margin-top: 25px !important;

      padding-bottom: 10px !important;
    }


    .footer-layout2 .footer-number .info {
      margin-bottom: 8px !important;

      display: flex;

      align-items: flex-start;

      gap: 8px;

      line-height: 1.5;
    }


    .footer-layout2 .footer-number .info i {
      flex-shrink: 0;

      margin-top: 4px;
    }


    /* =========================================================
       COPYRIGHT
    ========================================================= */

    .footer-layout2 .copyright-text {
      margin-bottom: 0;
    }


    /* =========================================================
       LARGE DESKTOP
       1400px+
    ========================================================= */

    @media (min-width: 1400px) {

      .footer-layout2 .footer-top {
        padding: 48px 0 48px;
      }


      .footer-layout2 .footer-logo-box {
        width: 265px;
        height: 88px;
      }


      .footer-layout2 .footer-logo-box img {
        max-height: 70px !important;
      }


      .footer-layout2 .footer-social {
        gap: 10px;
      }

    }


    /* =========================================================
       NORMAL DESKTOP
       1200px - 1399px
    ========================================================= */

    @media (min-width: 1200px) and (max-width: 1399px) {

      .footer-layout2 .footer-top {
        padding: 45px 0;
      }


      .footer-layout2 .footer-logo-box {
        width: 265px;
        height: 88px;
      }


      .footer-layout2 .footer-logo-box img {
        max-height: 68px !important;
      }

    }


    /* =========================================================
       SMALL DESKTOP
       992px - 1199px
    ========================================================= */

    @media (min-width: 992px) and (max-width: 1199px) {

      .footer-layout2 .footer-top {
        padding: 40px 0;
      }


      .footer-layout2 .footer-logo-box {
        width: 250px;
        height: 82px;

        padding: 8px 12px;
      }


      .footer-layout2 .footer-logo-box img {
        max-height: 64px !important;
      }


      .footer-layout2 .footer-social {
        gap: 8px;
      }

    }


    /* =========================================================
       TABLET
       768px - 991px
    ========================================================= */

    @media (min-width: 768px) and (max-width: 991px) {

      .footer-layout2 .footer-top {
        padding: 35px 0;
      }


      .footer-layout2 .footer-logo-box {
        width: 235px;
        height: 78px;

        padding: 7px 12px;
      }


      .footer-layout2 .footer-logo-box img {
        max-height: 58px !important;
      }


      .footer-layout2 .footer-social {
        gap: 8px;
      }

    }


    /* =========================================================
       MOBILE
       767px AND BELOW
    ========================================================= */

    @media (max-width: 767px) {

      /* -------------------------------------------------------
         FOOTER
      ------------------------------------------------------- */

      .footer-layout2 {
        width: 100%;
        max-width: 100%;

        overflow-x: hidden;
      }


      /* -------------------------------------------------------
         FOOTER TOP
      ------------------------------------------------------- */

      .footer-layout2 .footer-top {
        padding: 28px 0 30px;

        overflow: hidden;
      }


      /* -------------------------------------------------------
         TOP ROW
      ------------------------------------------------------- */

      .footer-layout2 .footer-top .row {
        display: flex;

        flex-direction: column;

        align-items: center;

        justify-content: center;

        gap: 22px;

        margin-left: 0;
        margin-right: 0;
      }


      /* -------------------------------------------------------
         LOGO COLUMN
      ------------------------------------------------------- */

      .footer-layout2 .footer-logo-column {
        width: 100% !important;

        max-width: 100% !important;

        flex: 0 0 100%;

        display: flex;

        align-items: center;

        justify-content: center;
      }


      /* -------------------------------------------------------
         MOBILE WHITE LOGO BOX
      ------------------------------------------------------- */

      .footer-layout2 .footer-logo-box {
        width: 200px;

        height: 66px;

        min-height: 66px;

        max-width: 80%;

        padding: 7px 12px;

        margin: 0 auto;

        background-color: #ffffff;

        border: 1px solid #dddddd;

        border-radius: 7px;

        box-sizing: border-box;

        display: flex;

        align-items: center;

        justify-content: center;

        overflow: hidden;
      }


      /* -------------------------------------------------------
         MOBILE LOGO LINK
      ------------------------------------------------------- */

      .footer-layout2 .footer-logo-box a {
        display: flex;

        align-items: center;

        justify-content: center;

        width: 100%;

        height: 100%;

        max-width: 100%;

        min-width: 0;

        overflow: hidden;
      }


      /* -------------------------------------------------------
         MOBILE LOGO IMAGE
      ------------------------------------------------------- */

      .footer-layout2 .footer-logo-box img {
        display: block;

        width: auto !important;

        height: auto !important;

        max-width: 100% !important;

        max-height: 48px !important;

        object-fit: contain;

        margin: 0 auto;

        flex-shrink: 1;
      }


      /* -------------------------------------------------------
         SOCIAL COLUMN
      ------------------------------------------------------- */

      .footer-layout2 .footer-social-column {
        width: 100% !important;

        max-width: 100% !important;

        flex: 0 0 100%;

        display: flex;

        align-items: center;

        justify-content: center;
      }


      /* -------------------------------------------------------
         SOCIAL LINKS
      ------------------------------------------------------- */

      .footer-layout2 .footer-social {
        width: 100%;

        display: flex;

        align-items: center;

        justify-content: center;

        flex-wrap: wrap;

        gap: 10px;
      }


      /* -------------------------------------------------------
         WIDGET AREA
      ------------------------------------------------------- */

      .footer-layout2 .widget-area {
        padding-top: 40px;

        padding-bottom: 30px;
      }


      .footer-layout2 .widget-area .row {
        margin-left: 0;
        margin-right: 0;
      }


      .footer-layout2 .widget-area [class*="col-"] {
        min-width: 0;
      }


      .footer-layout2 .footer-widget {
        margin-bottom: 30px;
      }

    }


    /* =========================================================
       SMALL MOBILE
       575px AND BELOW
    ========================================================= */

    @media (max-width: 575px) {

      .footer-layout2 .footer-top {
        padding: 25px 0 28px;
      }


      /* -------------------------------------------------------
         CENTER LOGO
      ------------------------------------------------------- */

      .footer-layout2 .footer-logo-column {
        width: 100% !important;

        display: flex;

        justify-content: center;

        align-items: center;
      }


      /* -------------------------------------------------------
         WHITE BOX
      ------------------------------------------------------- */

      .footer-layout2 .footer-logo-box {
        width: 200px;

        height: 66px;

        min-height: 66px;

        max-width: 80%;

        padding: 7px 12px;

        margin-left: auto;

        margin-right: auto;

        background-color: #ffffff;

        border: 1px solid #dddddd;

        border-radius: 7px;
      }


      .footer-layout2 .footer-logo-box img {
        max-width: 100% !important;

        max-height: 48px !important;
      }


      /* -------------------------------------------------------
         SOCIAL
      ------------------------------------------------------- */

      .footer-layout2 .footer-social {
        gap: 9px;

        justify-content: center;
      }


      .footer-layout2 .widget-area {
        padding-top: 35px;

        padding-bottom: 25px;
      }

    }


    /* =========================================================
       400px AND BELOW
    ========================================================= */

    @media (max-width: 400px) {

      .footer-layout2 .footer-logo-column {
        width: 100% !important;

        max-width: 100% !important;

        display: flex;

        align-items: center;

        justify-content: center;
      }


      .footer-layout2 .footer-logo-box {
        width: 200px;

        height: 66px;

        min-height: 66px;

        max-width: 80%;

        padding: 7px 12px;

        margin: 0 auto;

        background-color: #ffffff;

        border: 1px solid #dddddd;

        border-radius: 7px;

        box-sizing: border-box;

        display: flex;

        align-items: center;

        justify-content: center;

        overflow: hidden;
      }


      .footer-layout2 .footer-logo-box img {
        width: auto !important;

        height: auto !important;

        max-width: 100% !important;

        max-height: 47px !important;

        object-fit: contain;

        margin: 0 auto;
      }


      .footer-layout2 .footer-social {
        gap: 8px;

        justify-content: center;
      }

    }


    /* =========================================================
       VERY SMALL MOBILE
       350px AND BELOW
    ========================================================= */

    @media (max-width: 350px) {

      .footer-layout2 .footer-logo-box {
        width: 190px;

        height: 62px;

        min-height: 62px;

        max-width: 80%;

        padding: 6px 10px;

        background-color: #ffffff;
      }


      .footer-layout2 .footer-logo-box img {
        max-width: 100% !important;

        max-height: 43px !important;
      }

    }


    /* =========================================================
       FINAL OVERFLOW PROTECTION
    ========================================================= */

    @media (max-width: 767px) {

      .footer-layout2,
      .footer-layout2 .footer-top,
      .footer-layout2 .widget-area,
      .footer-layout2 .copyright-wrap {
        max-width: 100%;

        overflow-x: hidden;
      }


      .footer-layout2 .container {
        width: 100%;

        max-width: 100%;

        box-sizing: border-box;
      }


      .footer-layout2 .footer-logo-column,
      .footer-layout2 .footer-social-column {
        min-width: 0;
      }

    }
  `}
</style>


    <footer
      className="footer-wrapper footer-layout2 background-image"
      style={{
        backgroundImage: 'url(images//bg/footer-bg-2-1.jpg)'
      }}
    >

      {/* =====================================================
          FOOTER TOP
      ===================================================== */}

      <div className="footer-top">

        <div className="container">

          <div className="row align-items-center justify-content-between gy-30">


            {/* =================================================
                LOGO
            ================================================= */}

            <div className="col-sm-auto footer-logo-column">

              <div className="footer-logo-box">

                <Logo image="/images/indieur_logo.png" />

              </div>

            </div>


            {/* =================================================
                SOCIAL LINKS
            ================================================= */}

            <div className="col-sm-auto footer-social-column">

              <IconLink
                className="footer-social"
                title="Follow Us On:"
              >

                <IconLink.Item
                  icon="fab fa-linkedin-in"
                  path="https://www.linkedin.com/company/indieur"
                />

                <IconLink.Item
                  icon="fab fa-instagram"
                  path="https://www.instagram.com/indieur_/"
                />

                <IconLink.Item
                  icon="fab fa-facebook-f"
                  path="https://www.facebook.com/people/Indieur/61582584459630/"
                />

                <IconLink.Item
                  icon="fab fa-youtube"
                  path="https://www.youtube.com/@Indieur"
                />

              </IconLink>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          WIDGET AREA
      ===================================================== */}

      <div className="widget-area">

        <div className="container">

          <div className="row justify-content-between gx-80">


            {/* =================================================
                QUICK LINKS + CORE SERVICES
            ================================================= */}

            <div className="col-md-6 col-lg-4 col-xl-auto col-xxl order-2 order-lg-1">


              {/* =================================================
                  QUICK LINKS
              ================================================= */}

              <div
                style={{
                  marginBottom: '35px',
                  minHeight: 'auto',
                  height: 'auto',
                  paddingBottom: '0'
                }}
              >

                <Widget
                  widgetTitle="Quick Links"
                  className="footer-widget widget_nav_menu"
                >

                  <CategoryWidget className="footer-links">

                    {pageList.map(cat => (

                      <CategoryWidget.Item
                        key={cat.name}
                        path={cat.path}
                      >
                        {cat.name}
                      </CategoryWidget.Item>

                    ))}

                  </CategoryWidget>

                </Widget>

              </div>


              {/* =================================================
                  CORE SERVICES
              ================================================= */}

              <div
                style={{
                  marginTop: '0',
                  minHeight: 'auto',
                  height: 'auto',
                  paddingTop: '0',
                  paddingBottom: '0'
                }}
              >

                <Widget
                  widgetTitle="Core Services"
                  className="footer-widget widget_nav_menu"
                >

                  <CategoryWidget className="footer-links">

                    <CategoryWidget.Item path="/service-details/growth-strategy-consulting">
                      Growth Strategy
                    </CategoryWidget.Item>

                    <CategoryWidget.Item path="/service-details/meta-ads-management">
                      Meta Ads
                    </CategoryWidget.Item>

                    <CategoryWidget.Item path="/service-details/google-ads-management">
                      Google Ads
                    </CategoryWidget.Item>

                    <CategoryWidget.Item path="/service-details/search-engine-optimisation">
                      SEO
                    </CategoryWidget.Item>

                    <CategoryWidget.Item path="/service-details/whatsapp-marketing-automation">
                      WhatsApp Marketing
                    </CategoryWidget.Item>

                    <CategoryWidget.Item path="/service-details/analytics-tracking-reporting">
                      Analytics and Tracking
                    </CategoryWidget.Item>

                  </CategoryWidget>

                </Widget>

              </div>

            </div>


            {/* =================================================
                ABOUT COMPANY
            ================================================= */}

            <div className="col-lg-4 col-xl-auto order-1 order-lg-2">

              <Widget
                widgetTitle="About Company"
                className="footer-widget"
              >

                <AboutWidget>

                  <AboutWidget.Text>
                    Growth strategy, performance marketing, WhatsApp
                    automation, customer retention and analytics for
                    Indian businesses.
                  </AboutWidget.Text>

                  {/* <FormTwo /> */}

                </AboutWidget>

              </Widget>

            </div>


            {/* =================================================
                WORKING HOURS
            ================================================= */}

            <div className="col-md-6 col-lg-4 col-xl-auto order-3">

              <Widget
                widgetTitle="Working Hours"
                className="footer-widget"
              >


                {/* =================================================
                    WORKING HOURS TABLE
                ================================================= */}

                <TableOne className="footer-schedule">

                  <TableOne.Item
                    title="Mon - Fri:"
                    text="09:00 - 06:00"
                  />

                  <TableOne.Item
                    title="Saturday:"
                    text="09:00 - 12:00"
                  />

                  <TableOne.Item
                    title="Sunday"
                    text="Closed"
                  />

                </TableOne>


                {/* =================================================
                    CONTACT
                ================================================= */}

                <div
                  className="footer-number"
                  style={{
                    height: 'auto',
                    marginTop: '25px',
                    paddingBottom: '10px'
                  }}
                >

                  <h4 className="title h6">
                    Contact Indieur
                  </h4>


                  {/* PHONE 1 */}

                  <p
                    className="info"
                    style={{
                      marginBottom: '8px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                      lineHeight: '1.5'
                    }}
                  >

                    <i
                      className="fal fa-phone-alt"
                      style={{
                        flexShrink: 0,
                        marginTop: '4px'
                      }}
                    />

                    <span>

                      <a href="tel:+4915562461769">
                        +49 15562 461769
                      </a>

                    </span>

                  </p>


                  {/* PHONE 2 */}

                  <p
                    className="info"
                    style={{
                      marginBottom: '8px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                      lineHeight: '1.5'
                    }}
                  >

                    <i
                      className="fal fa-phone-alt"
                      style={{
                        flexShrink: 0,
                        marginTop: '4px'
                      }}
                    />

                    <span>

                      <a href="tel:+919965532994">
                        +91 99655 32994
                      </a>

                    </span>

                  </p>


                  {/* PHONE 3 */}

                  <p
                    className="info"
                    style={{
                      marginBottom: '8px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                      lineHeight: '1.5'
                    }}
                  >

                    <i
                      className="fal fa-phone-alt"
                      style={{
                        flexShrink: 0,
                        marginTop: '4px'
                      }}
                    />

                    <span>

                      <a href="tel:+918667696097">
                        +91 866 769 6097
                      </a>

                    </span>

                  </p>


                  {/* EMAIL */}

                  <p
                    className="info"
                    style={{
                      marginBottom: '0',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                      lineHeight: '1.5'
                    }}
                  >

                    <i
                      className="fal fa-envelope"
                      style={{
                        flexShrink: 0,
                        marginTop: '4px'
                      }}
                    />

                    <span>

                      <a href="mailto:info@indieur.com">
                        info@indieur.com
                      </a>

                    </span>

                  </p>

                </div>

              </Widget>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          COPYRIGHT
      ===================================================== */}

      <div className="copyright-wrap">

        <div className="container">

          <p className="copyright-text">

            Copyright{' '}

            <i className="fal fa-copyright" />{' '}

            {new Date().getFullYear()}{' '}

            <Link
              className="text-white"
              to="/"
            >
              Indieur
            </Link>

            . All rights reserved by{' '}

            <Link
              className="text-white"
              to="/"
            >
              Indieur
            </Link>

            .

          </p>

        </div>

      </div>

    </footer>
  </>
);

export default FooterTwo;