import React from 'react';
import {
  SecSubTitle,
  SecTitle,
  InfoMedia,
  Button
} from '../../components';

const AboutSeven = () => (
  <div
    className="background-image"
    style={{
      backgroundImage: 'url(images/bg/about-bg-5-1.jpg)'
    }}
  >
    <div
      className="container container-style1"
      style={{
        paddingLeft: '120px',
        paddingRight: '120px'
      }}
    >
      <div className="row flex-row-reverse align-items-center gx-70">

        {/* Image */}
        <div className="col-lg-6 col-xl">
          <img
            src="images/about/ab-7-1.jpg"
            alt="aboutthumb"
          />
        </div>

        {/* Content */}
        <div className="col-lg-6 col-xl-auto">
          <div className="about-box2">

            <SecSubTitle>
              <i className="fas fa-bring-forward" />
              ABOUT INDIEUR
            </SecSubTitle>

            <SecTitle className="text-capitalize h1">
              Turning Disconnected Marketing Into a Connected Growth System
            </SecTitle>

            <p>
              Indieur is a digital marketing and growth company helping
              businesses identify where they may be losing visibility,
              enquiries, customers or repeat sales.
              We connect strategy, performance advertising, search visibility,
              social media, WhatsApp, analytics and customer retention around
              one clear business objective.
              Instead of recommending every possible marketing service, we
              first understand the business, identify the highest-priority
              gaps and implement the activities that are most relevant to its
              current growth stage.
              <br />

              <b>Our Focus</b>
              <br />

              - Reach the right audience through relevant channels
              <br />

              - Improve lead and customer-conversion journeys
              <br />

              - Build reliable marketing and conversion tracking
              <br />

              - Strengthen WhatsApp and customer follow-ups
              <br />

              - Improve retention and repeat-purchase opportunities
              <br />
            </p>

            <big>
              <b>
                Need help identifying your biggest marketing gaps?
              </b>
            </big>

            <div
              className="row gx-0 align-items-center flex-row-reverse justify-content-end mt-sm-3 pt-sm-3 mb-30 pb-10"
            >
              {/* Founder */}
              <div className="col-sm-auto">
                <p className="author-degi">
                  Founder & CEO
                </p>

                <p className="p author-name">
                  VIJAYAKUMAR GOVINDARAJAN
                </p>
              </div>

              {/* Phone */}
              <div className="col-sm-auto">
                <InfoMedia
                  className="about-call"
                  icon="fas fa-phone-alt"
                  title="Call To Ask Any Queary"
                  info={
                    <a href="tel:+4915562461769">
                      +49 15562 461769
                    </a>
                  }
                />
              </div>
            </div>

            {/* CTA Button */}
            <Button
              path="https://calendar.app.google/FHDxrBZecPB5XVfB6"
              className="d-none d-xxl-inline-block"
            >
              Book a Growth Consultation
              <i className="far fa-long-arrow-right" />
            </Button>

          </div>
        </div>

      </div>
    </div>
  </div>
);

export default AboutSeven;