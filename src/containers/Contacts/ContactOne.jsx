import React from 'react';
import {
  SecTitle,
  SecSubTitle,
  InfoMedia,
  FormFive,
  Button
} from '../../components';

const ContactOne = () => (
  <>
    <style>{`
      /* =========================================================
         CONTACT FORM + BOOKING
         ========================================================= */

      /* Send Enquiry button */
      .contact-box .vs-btn,
      .contact-box button[type="submit"],
      .contact-box input[type="submit"] {
        position: relative;
        overflow: hidden;
        z-index: 1;
      }

      /* Remove unwanted theme overlay/line */
      .contact-box .vs-btn::before,
      .contact-box .vs-btn::after,
      .contact-box button[type="submit"]::before,
      .contact-box button[type="submit"]::after,
      .contact-box input[type="submit"]::before,
      .contact-box input[type="submit"]::after {
        display: none !important;
        content: none !important;
      }

      /* =========================================================
         OR DIVIDER
         ========================================================= */

      .contact-booking-divider {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 15px;
        margin: 28px 0 18px;
      }

      .contact-booking-divider::before,
      .contact-booking-divider::after {
        content: "";
        display: block;
        height: 1px;
        background: #d8d8d8;
        flex: 1;
      }

      .contact-booking-divider span {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        font-weight: 600;
        color: #777;
        padding: 0 5px;
        letter-spacing: 1px;
      }

      /* =========================================================
         BOOKING SECTION
         ========================================================= */

      .contact-booking {
        width: 100%;
        text-align: center;
        padding-top: 0;
      }

      .contact-booking__text {
        max-width: 480px;
        margin: 0 auto 18px;
        font-size: 15px;
        line-height: 1.65;
        color: #777;
      }

      /* =========================================================
         BOOKING BUTTON
         ========================================================= */

      .contact-booking .contact-booking__button {
        position: relative;
        display: inline-flex !important;
        align-items: center;
        justify-content: center;
        width: auto;
        min-height: 54px;
        padding: 13px 28px;
        border: 0;
        border-radius: 5px;
        overflow: hidden;
        z-index: 1;
      }

      /* Remove theme pseudo effects */
      .contact-booking .contact-booking__button::before,
      .contact-booking .contact-booking__button::after {
        display: none !important;
        content: none !important;
      }

      .contact-booking .contact-booking__button i {
        position: relative;
        z-index: 2;
        margin-left: 8px;
        transition: transform 0.3s ease;
      }

      .contact-booking .contact-booking__button:hover i {
        transform: translateX(5px);
      }

      /* =========================================================
         MOBILE
         ========================================================= */

      @media (max-width: 575px) {
        .contact-booking-divider {
          margin: 24px 0 16px;
          gap: 10px;
        }

        .contact-booking__text {
          font-size: 14px;
          padding: 0 5px;
        }

        .contact-booking .contact-booking__button {
          width: 100% !important;
          padding-left: 18px;
          padding-right: 18px;
        }
      }
    `}</style>

    <div
      className="background-image"
      style={{
        backgroundImage: 'url(images/bg/appoin-bg-1-1.jpg)'
      }}
    >
      <div className="container z-index-common">
        <div className="row gx-60">

          {/* LEFT CONTENT */}
          <div className="col-xl-6 align-self-center space">

            <SecSubTitle className="text-white">
              READY TO FIND YOUR BIGGEST GROWTH GAPS?
            </SecSubTitle>

            <SecTitle className="text-capitalize h1 text-white">
              Let’s Identify Where Your Business May Be Losing
              Enquiries, Customers or Sales
            </SecTitle>

            <hr className="hr-style1" />

            <p className="mb-4 mt-1 pb-3 text-white">
              Book a focused consultation to review your current
              advertising, website journey, tracking, WhatsApp
              follow-ups and retention opportunities
            </p>

            <div className="row gy-30">

              <div className="col-md-6">
                <InfoMedia
                  className="contact-media"
                  icon="fal fa-phone"
                  title="CALL US FOR ANY QUERIES"
                  info={
                    <a href="tel:+4915562461769">
                      +4915562461769
                    </a>
                  }
                />
              </div>

              <div className="col-md-6">
                <InfoMedia
                  className="contact-media"
                  icon="fal fa-envelope"
                  title="WRITE A QUICK MAIL"
                  info={
                    <a href="mailto:info@indieur.com">
                      info@indieur.com
                    </a>
                  }
                />
              </div>

            </div>
          </div>


          {/* RIGHT FORM */}
          <div className="col-lg-6 mb-30">

            <div className="contact-box">

              <h3 className="contact-box__title h4">
                Leave Us a Message
              </h3>

              <p className="contact-box__text">
                We’re Ready To Help You
              </p>

              {/* FORM */}
              <FormFive />

              {/* OR DIVIDER */}
              <div className="contact-booking-divider">
                <span>OR</span>
              </div>

              {/* BOOKING */}
              <div className="contact-booking">

                <p className="contact-booking__text">
                  Prefer to talk directly? Schedule a convenient
                  time for a focused growth consultation.
                </p>

                <Button
                  path="https://calendar.app.google/FHDxrBZecPB5XVfB6"
                  className="contact-booking__button"
                >
                  Book a FREE Consultation
                  <i className="far fa-arrow-right" />
                </Button>

              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  </>
);

export default ContactOne;