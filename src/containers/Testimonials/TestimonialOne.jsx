import React, {useRef}from 'react';
import Slider from "react-slick";
import {
  TitleWrap,
  SecTitle,
  SecSubTitle,
  SlideNavBtn,
  TestimonialBoxOne
} from '../../components';


// Testimonial Data
import testimonialData from '../../data/testimonial.json';


const TestimonialOne = ({...restProps})=> {

  const sliderWrap = useRef();   
  
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
        breakpoint: 1200,
        settings: {          
          slidesToShow: 2,
        }
      },
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
    <div {...restProps}>
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-lg-auto text-center text-lg-start">
            <TitleWrap>
              <SecSubTitle><i className="fas fa-bring-forward"/>Our Best Review’s</SecSubTitle>
              <SecTitle className="h1">Customer’s Feedback</SecTitle>
            </TitleWrap>
          </div>
          <div className="col-auto d-none d-lg-block">
            <SlideNavBtn slideParent={sliderWrap} />
          </div>
        </div>
        <Slider ref={sliderWrap} className="row" {...settings}>
          {testimonialData.map((item, index) => (
            <div key={index}>
              <TestimonialBoxOne
                icon={item.icon}
                title={item.title}
                text={`“${item.text.slice(0, 100)}”`}
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

export default TestimonialOne;