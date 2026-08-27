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

const { pageList, exploreLinks } = widgetsdata;

const FooterTwo = () => (
  <footer
    className="footer-wrapper footer-layout2 background-image"
    style={{
      backgroundImage: 'url(images//bg/footer-bg-2-1.jpg)'
    }}
  >

    <div className="footer-top">
      <div className="container">
        <div className="row align-items-center justify-content-between gy-30">

          <div className="col-sm-auto">
            <div
              style={{
                display: 'inline-block',
                padding: '10px 15px',
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                borderRadius: '6px'
              }}
            >
              <Logo image="/images/indieur_logo.png" />
            </div>
          </div>

          <div className="col-sm-auto">
            <IconLink
              className="footer-social"
              title="Follow Us On:"
            >
              <IconLink.Item icon="fab fa-linkedin-in" path="https://www.linkedin.com/company/indieur" />
               <IconLink.Item icon="fab fa-instagram" path="https://www.instagram.com/indieur_/" />
              <IconLink.Item icon="fab fa-facebook-f" path="https://www.facebook.com/people/Indieur/61582584459630/" />
              <IconLink.Item icon="fab fa-youtube" path="https://www.youtube.com/@Indieur" />
             
            </IconLink>
          </div>

        </div>
      </div>
    </div>

    <div className="widget-area">
      <div className="container">
        <div className="row justify-content-between gx-80">

          {/* Quick Links + Core Services */}
          <div className="col-md-6 col-lg-4 col-xl-auto col-xxl order-2 order-lg-1">

            {/* Quick Links */}
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

            {/* Core Services */}
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

          {/* About Company */}
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

                <FormTwo />

              </AboutWidget>
            </Widget>

          </div>

          {/* Working Hours */}
          <div className="col-md-6 col-lg-4 col-xl-auto order-3">

            <Widget
              widgetTitle="Working Hours"
              className="footer-widget"
            >

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

    {/* Copyright */}
    <div className="copyright-wrap">
      <div className="container">
        <p className="copyright-text">
          Copyright <i className="fal fa-copyright" />{' '}
          {new Date().getFullYear()}{' '}

          <Link className="text-white" to="/">
            Indieur
          </Link>

          . All rights reserved by{' '}

          <a className="text-white" href="/">
            Indieur
          </a>
          .
        </p>
      </div>
    </div>

  </footer>
);

export default FooterTwo;