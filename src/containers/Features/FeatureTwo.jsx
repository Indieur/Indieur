import React from 'react';
import {
  TitleWrap,
  SecTitle,
  SecSubTitle,
  FeatureBoxTwo
} from '../../components/';
import Slider from 'react-slick';

const FeatureTwo = ({className})=> {
  
  const settings = {
    autoplay: true,
    autoplaySpeed: 8000,
    infinite: true,
    arrows: false,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className={`feature-wrap2 ${className || ''}`}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xxl-3 text-center text-xxl-start">
            <TitleWrap>
              <SecSubTitle><i className="fas fa-bring-forward"/>Why Choose Us</SecSubTitle>
              <SecTitle className="h1 text-capitalize">Why People Choose Our Services</SecTitle>
            </TitleWrap>
          </div>
          <div className="col-xxl-9">
            <Slider className="row feature-slide2" {...settings}>
              <FeatureBoxTwo 
                title="Performance Marketing"
                image="images/icon/fe-2-1.png"
                text="Reach high-intent customers through Meta Ads and Google Ads campaigns built around your actual business goals."
                path="/service"
              />
              <FeatureBoxTwo 
                title="WhatsApp Marketing"
                image="images/icon/fe-2-2.png"
                text="Turn enquiries and customer data into structured campaigns, automated responses, follow-ups and retention journeysss"
                path="/service"
              />
              <FeatureBoxTwo 
                title="Analytics & Growth Tracking"
                image="images/icon/fe-2-3.png"
                text="Understand which channels generate meaningful actions with properly configured tracking, dashboards and reporting"
                path="/service"
              />
              {/* <FeatureBoxTwo 
                title="App Development"
                image="images/icon/fe-2-4.png"
                text="Seize magnetic before visa alignment network wireless whereas frictionless"
                path="/service-details"
              /> */}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureTwo;