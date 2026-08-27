import React from 'react';
import Slider from "react-slick";
import {
  TitleWrap,
  SecTitle,
  SecSubTitle,
  Button,
  TestimonialBoxTwo
} from '../../components';


// Testimonial Data
import testimonialData from '../../data/testimonial.json';


const TestimonialThree = ({ className }) => {

  const settings = {
    autoplay: true,
    autoplaySpeed: 8000,
    infinite: true,
    arrows: false,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className={`background-image ${className || ''}`} style={{ backgroundImage: 'url(images/bg/testi-bg-4-1.jpg)' }}>
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-lg-5 text-center text-lg-start">
            <TitleWrap>
              <SecSubTitle><i className="fas fa-bring-forward" />WHAT GUIDES OUR WORK</SecSubTitle>
              <SecTitle className="text-capitalize h3">A Practical and Transparent Approach to Digital Growth
              </SecTitle>
            </TitleWrap>
          </div>
          <div className="col-auto d-none d-lg-block">
            <div className="sec-btns2">
              <Button path="/service">Our Services<i className="far fa-long-arrow-right" /></Button>
            </div>
          </div>
        </div>
        <Slider className="row testi-style2-slide" {...settings}>
          {testimonialData.map((item, index) => (
            <div key={index}>
              <TestimonialBoxTwo
                avater={item.avater}
                title={item.title}
               text={`“${item.text}”`}
                name={item.name}
                designation={item.designation}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default TestimonialThree;