import React from "react";
import {
  SecSubTitle,
  SecTitle,
  InfoMedia,
  Button,
} from "../../components";

const AboutSeven = () => (
  <>
    <section
      className="about-seven"
      style={{
        backgroundImage: "url(images/bg/about-bg-5-1.jpg)",
      }}
    >
      <div className="container about-seven-container">
        <div className="row about-seven-row align-items-center">

          {/* =====================================================
              IMAGE
          ====================================================== */}
          <div className="col-lg-6 about-seven-image-col">
            <div className="about-seven-image-wrap">
              <img
                src="images/about/about-content-945x706.jpg"
                alt="Indieur digital marketing team"
                className="about-seven-image"
              />
            </div>
          </div>


          {/* =====================================================
              CONTENT
          ====================================================== */}
          <div className="col-lg-6 about-seven-content-col">
            <div className="about-box2 about-seven-content">

              {/* =================================================
                  SUB TITLE
              ================================================== */}
              <SecSubTitle>
                <i className="fas fa-bring-forward" />
                ABOUT INDIEUR
              </SecSubTitle>


              {/* =================================================
                  TITLE
              ================================================== */}
              <SecTitle className="text-capitalize h1 about-seven-title">
                Turning Disconnected Marketing Into a Connected Growth
                System
              </SecTitle>


              {/* =================================================
                  DESCRIPTION
              ================================================== */}
              <div className="about-seven-description">

                <p>
                  Indieur is a digital marketing and growth company helping
                  businesses identify where they may be losing visibility,
                  enquiries, customers or repeat sales.
                </p>

                <p>
                  We connect strategy, performance advertising, search
                  visibility, social media, WhatsApp, analytics and customer
                  retention around one clear business objective.
                </p>

                <p>
                  Instead of recommending every possible marketing service,
                  we first understand the business, identify the
                  highest-priority gaps and implement the activities that are
                  most relevant to its current growth stage.
                </p>

              </div>


              {/* =================================================
                  OUR FOCUS
              ================================================== */}
              <div className="about-seven-focus">

                <h4>Our Focus</h4>

                <ul>

                  <li>
                    <span className="about-seven-check">
                      <i className="fas fa-check" />
                    </span>

                    <span>
                      Reach the right audience through relevant channels
                    </span>
                  </li>

                  <li>
                    <span className="about-seven-check">
                      <i className="fas fa-check" />
                    </span>

                    <span>
                      Improve lead and customer-conversion journeys
                    </span>
                  </li>

                  <li>
                    <span className="about-seven-check">
                      <i className="fas fa-check" />
                    </span>

                    <span>
                      Build reliable marketing and conversion tracking
                    </span>
                  </li>

                  <li>
                    <span className="about-seven-check">
                      <i className="fas fa-check" />
                    </span>

                    <span>
                      Strengthen WhatsApp and customer follow-ups
                    </span>
                  </li>

                  <li>
                    <span className="about-seven-check">
                      <i className="fas fa-check" />
                    </span>

                    <span>
                      Improve retention and repeat-purchase opportunities
                    </span>
                  </li>

                </ul>

              </div>


              {/* =================================================
                  QUESTION
              ================================================== */}
              <div className="about-seven-question">
                Need help identifying your biggest marketing gaps?
              </div>


              {/* =================================================
                  FOUNDER + PHONE
              ================================================== */}
              <div className="about-seven-contact">

                {/* Founder */}
                <div className="about-seven-founder">

                  <span className="about-seven-founder-label">
                    Founder &amp; CEO
                  </span>

                  <strong className="about-seven-founder-name">
                    VIJAYAKUMAR GOVINDARAJAN
                  </strong>

                </div>


                {/* Phone */}
                <div className="about-seven-phone">

                  <InfoMedia
                    className="about-call"
                    icon="fas fa-phone-alt"
                    title="Call To Ask Any Query"
                    info={
                      <a href="tel:+4915562461769">
                        +49 15562 461769
                      </a>
                    }
                  />

                </div>

              </div>


              {/* =================================================
                  CTA
              ================================================== */}
              <div className="about-seven-button-wrap">

                <Button
                  path="https://calendar.app.google/FHDxrBZecPB5XVfB6"
                  className="about-seven-button"
                >
                  Book a Growth Consultation
                  <i className="far fa-long-arrow-right" />
                </Button>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>


    {/* =========================================================
        SAME FILE CSS
    ========================================================== */}

    <style>{`

      /* ========================================================
         ABOUT SECTION
      ======================================================== */

      .about-seven {
        position: relative;
        width: 100%;
        padding: 50px 0;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        overflow: hidden;
      }


      .about-seven-container {
        width: 100%;
        max-width: 1320px;
        padding-left: 25px;
        padding-right: 25px;
        margin: 0 auto;
      }


      .about-seven-row {
        margin-left: 0;
        margin-right: 0;
        row-gap: 25px;
      }


      /* ========================================================
         IMAGE
      ======================================================== */

      .about-seven-image-col {
        display: flex;
        align-items: center;
        justify-content: center;
      }


      .about-seven-image-wrap {
        position: relative;
        width: 100%;
        max-width: 560px;
        margin: 0 auto;
      }


      .about-seven-image {
        width: 100%;
        height: auto;
        display: block;
        object-fit: cover;
      }


      /* ========================================================
         CONTENT
      ======================================================== */

      .about-seven-content-col {
        display: flex;
        align-items: center;
      }


      .about-seven-content {
        width: 100%;
        max-width: 620px;
      }


      /* ========================================================
         SUBTITLE
      ======================================================== */

      .about-seven-content .sec-subtitle,
      .about-seven-content .sub-title {
        margin-bottom: 8px;
      }


      /* ========================================================
         TITLE
      ======================================================== */

      .about-seven-title {
        margin-bottom: 15px;
        line-height: 1.08;
      }


      /* ========================================================
         DESCRIPTION
      ======================================================== */

      .about-seven-description {
        margin-bottom: 15px;
      }


      .about-seven-description p {
        margin: 0 0 9px;
        color: #555f70;
        font-size: 14px;
        line-height: 1.6;
      }


      .about-seven-description p:last-child {
        margin-bottom: 0;
      }


      /* ========================================================
         FOCUS
      ======================================================== */

      .about-seven-focus {
        margin-top: 15px;
      }


      .about-seven-focus h4 {
        margin: 0 0 9px;
        color: #111827;
        font-size: 17px;
        line-height: 1.3;
        font-weight: 700;
      }


      .about-seven-focus ul {
        margin: 0;
        padding: 0;
        list-style: none;
      }


      .about-seven-focus li {
        display: flex;
        align-items: flex-start;
        gap: 8px;
        margin-bottom: 6px;
        color: #4b5563;
        font-size: 13px;
        line-height: 1.4;
      }


      .about-seven-focus li:last-child {
        margin-bottom: 0;
      }


      .about-seven-check {
        width: 19px;
        height: 19px;
        min-width: 19px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-top: 0;
        border-radius: 50%;
        color: #ffffff;
        background: #155eef;
        font-size: 8px;
      }


      /* ========================================================
         QUESTION
      ======================================================== */

      .about-seven-question {
        margin-top: 17px;
        color: #111827;
        font-size: 15px;
        line-height: 1.4;
        font-weight: 700;
      }


      /* ========================================================
         CONTACT
      ======================================================== */

      .about-seven-contact {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 30px;
        margin-top: 15px;
        padding-top: 13px;
        border-top: 1px solid rgba(21, 94, 239, 0.12);
      }


      .about-seven-founder {
        display: flex;
        flex-direction: column;
      }


      .about-seven-founder-label {
        margin-bottom: 3px;
        color: #667085;
        font-size: 10px;
        font-weight: 600;
      }


      .about-seven-founder-name {
        color: #111827;
        font-size: 11px;
        line-height: 1.3;
        font-weight: 800;
        letter-spacing: 0.2px;
      }


      /* ========================================================
         PHONE
      ======================================================== */

      .about-seven-phone {
        display: flex;
        align-items: center;
      }


      .about-seven-phone .about-call {
        margin: 0 !important;
      }


      .about-seven-phone a {
        color: #155eef;
        text-decoration: none;
        font-weight: 700;
      }


      /* ========================================================
         BUTTON
      ======================================================== */

      .about-seven-button-wrap {
        margin-top: 17px;
      }


      .about-seven-button {
        display: inline-flex !important;
        align-items: center;
        justify-content: center;
        gap: 8px;
        min-height: 44px;
        padding: 0 21px;
        color: #ffffff !important;
        background: #155eef;
        border-radius: 7px;
        text-decoration: none !important;
        font-size: 11px;
        font-weight: 700;
        box-shadow: 0 7px 18px rgba(21, 94, 239, 0.18);
        transition: all 0.25s ease;
      }


      .about-seven-button:hover {
        color: #ffffff !important;
        background: #084ed6;
        transform: translateY(-2px);
        box-shadow: 0 11px 24px rgba(21, 94, 239, 0.25);
      }


      /* ========================================================
         LARGE DESKTOP
      ======================================================== */

      @media (min-width: 1200px) {

        .about-seven {
          padding: 45px 0;
        }


        .about-seven-container {
          padding-left: 45px;
          padding-right: 45px;
        }


        .about-seven-row {
          --bs-gutter-x: 65px;
        }

      }


      /* ========================================================
         TABLET
      ======================================================== */

      @media (max-width: 991px) {

        .about-seven {
          padding: 40px 0;
        }


        .about-seven-container {
          padding-left: 25px;
          padding-right: 25px;
        }


        .about-seven-row {
          row-gap: 30px;
        }


        .about-seven-image-col {
          order: 1;
        }


        .about-seven-content-col {
          order: 2;
        }


        .about-seven-image-wrap {
          max-width: 600px;
        }


        .about-seven-content {
          max-width: 700px;
          margin: 0 auto;
        }


        .about-seven-title {
          font-size: 40px;
        }

      }


      /* ========================================================
         MOBILE
      ======================================================== */

      @media (max-width: 767px) {

        .about-seven {
          padding: 25px 0 30px;
        }


        .about-seven-container {
          width: 100%;
          max-width: 100%;
          padding-left: 15px;
          padding-right: 15px;
        }


        .about-seven-row {
          display: flex;
          flex-direction: column;
          gap: 0;
          margin: 0;
        }


        /* ----------------------------------------------------
           IMAGE
        ----------------------------------------------------- */

        .about-seven-image-col {
          width: 100%;
          padding: 0;
          order: 1;
        }


        .about-seven-image-wrap {
          width: 100%;
          max-width: 430px;
          margin: 0 auto 23px;
        }


        .about-seven-image {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 5px;
        }


        /* ----------------------------------------------------
           CONTENT
        ----------------------------------------------------- */

        .about-seven-content-col {
          width: 100%;
          padding: 0;
          order: 2;
        }


        .about-seven-content {
          width: 100%;
          max-width: 100%;
          margin: 0;
        }


        /* ----------------------------------------------------
           SUBTITLE
        ----------------------------------------------------- */

        .about-seven-content .sec-subtitle,
        .about-seven-content .sub-title {
          margin-bottom: 7px;
        }


        /* ----------------------------------------------------
           TITLE
        ----------------------------------------------------- */

        .about-seven-title {
          margin-bottom: 13px;
          font-size: 29px !important;
          line-height: 1.15 !important;
          letter-spacing: -0.3px;
        }


        /* ----------------------------------------------------
           DESCRIPTION
        ----------------------------------------------------- */

        .about-seven-description {
          margin-bottom: 15px;
        }


        .about-seven-description p {
          margin-bottom: 8px;
          font-size: 12.5px;
          line-height: 1.58;
        }


        /* ----------------------------------------------------
           FOCUS
        ----------------------------------------------------- */

        .about-seven-focus {
          margin-top: 15px;
        }


        .about-seven-focus h4 {
          margin-bottom: 8px;
          font-size: 16px;
        }


        .about-seven-focus li {
          gap: 7px;
          margin-bottom: 6px;
          font-size: 12px;
          line-height: 1.42;
        }


        .about-seven-check {
          width: 18px;
          height: 18px;
          min-width: 18px;
          font-size: 7px;
        }


        /* ----------------------------------------------------
           QUESTION
        ----------------------------------------------------- */

        .about-seven-question {
          margin-top: 17px;
          font-size: 14px;
          line-height: 1.4;
        }


        /* ----------------------------------------------------
           CONTACT
        ----------------------------------------------------- */

        .about-seven-contact {
          flex-direction: column;
          align-items: flex-start;
          gap: 13px;
          margin-top: 14px;
          padding-top: 13px;
        }


        .about-seven-founder-label {
          font-size: 10px;
        }


        .about-seven-founder-name {
          font-size: 10.5px;
        }


        /* ----------------------------------------------------
           PHONE
        ----------------------------------------------------- */

        .about-seven-phone {
          width: 100%;
        }


        /* ----------------------------------------------------
           BUTTON
        ----------------------------------------------------- */

        .about-seven-button-wrap {
          margin-top: 17px;
        }


        .about-seven-button {
          width: 100%;
          min-height: 45px;
          padding: 0 15px;
          font-size: 11px;
        }

      }


      /* ========================================================
         SMALL MOBILE
      ======================================================== */

      @media (max-width: 480px) {

        .about-seven {
          padding: 22px 0 28px;
        }


        .about-seven-container {
          padding-left: 14px;
          padding-right: 14px;
        }


        .about-seven-image-wrap {
          margin-bottom: 21px;
        }


        .about-seven-title {
          font-size: 27px !important;
          line-height: 1.16 !important;
        }


        .about-seven-description p {
          font-size: 12px;
          line-height: 1.58;
        }


        .about-seven-focus li {
          font-size: 11.5px;
        }


        .about-seven-question {
          font-size: 13.5px;
        }


        .about-seven-founder-name {
          font-size: 10px;
        }

      }


      /* ========================================================
         VERY SMALL MOBILE
      ======================================================== */

      @media (max-width: 360px) {

        .about-seven {
          padding-top: 20px;
          padding-bottom: 25px;
        }


        .about-seven-title {
          font-size: 24px !important;
          line-height: 1.16 !important;
        }


        .about-seven-description p {
          font-size: 11.5px;
        }


        .about-seven-focus li {
          font-size: 11px;
        }


        .about-seven-button {
          font-size: 10.5px;
        }

      }

    `}</style>
  </>
);

export default AboutSeven;