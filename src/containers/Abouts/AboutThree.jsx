import React from 'react';
import {
  SecSubTitle,
  SecTitle,
  Button,
  InfoMedia,
  ImageBoxThree
} from '../../components';

const AboutThree = () => (
  <div className="about-wrap1 background-image" style={{ backgroundImage: 'url(images/bg/ab-bg-2-1.jpg)' }} alt="about">
    <div className="container">
      <div className="row gx-60">
        <div className="col-xl-6 mb-50 mb-xl-0">
          <ImageBoxThree
            imageOne="images/about/approach-480x480.jpg"
            imageTwo="images/about/approach-mobile-320x420.jpg"
            number="360°"
            title="GROWTH MARKETING"
            icon="fal fa-award"
          />
        </div>
        <div className=" col-xl-6 align-self-center text-center text-xl-start">
          <SecSubTitle><i className="fas fa-bring-forward" />ABOUT OUR APPROACH</SecSubTitle>
          <SecTitle>Connecting Marketing Activities With Real Business Growth</SecTitle>
          <p className="mb-4 pb-2 pe-xl-5">Digital marketing often fails when advertising, websites, content, WhatsApp and analytics operate separately.
            An advertisement may generate traffic, but the landing page may not convert. A lead may enquire, but follow-up may be delayed. Customers may purchase once, but no retention system brings them back.We examine the complete journey to identify these gaps and prioritise the improvements that can create the strongest commercial impact.</p>
          <div className="row gx-60 mb-4 pb-1 gy-2 text-start justify-content-center justify-content-xl-start">
            <div className="col-auto">
              <InfoMedia className="about-media"
                image="images/icon/ab-ic-2-1.png"
                info="Reaching relevant audiences"
              />
            </div>
            <div className="col-auto">
              <InfoMedia className="about-media"
                image="images/icon/ab-ic-2-2.png"
                info="Improving customer retention and repeat purchases"
              />
            </div>
          </div>
          <Button path="/contact">Request a Growth Leakage Scan<i className="far fa-arrow-right" /></Button>
        </div>
      </div>
    </div>
  </div>
);

export default AboutThree;