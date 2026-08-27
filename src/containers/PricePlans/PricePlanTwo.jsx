import React from 'react';
import Slider from 'react-slick';
import {
  PricePlanBoxOne
} from '../../components';

// Package Data
import pricePlanData from '../../data/pricePlan.json';

const PricePlanTwo = ({...restProps})=> {

  const settings = {
    infinite: true,
    arrows: false,
    centerMode: true,
    centerPadding: '0',
    autoplay: true,
    autoplaySpeed: 8000,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [{
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
          centerMode: false,
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div {...restProps}>
      <div className="container">
        <Slider className="row" {...settings}>
          {pricePlanData.map((plan, index) => (
            <PricePlanBoxOne key={index} id={index}
              bgImage={plan.bgImage}
              title={plan.title}
              price={plan.price}
              duration={plan.duration}
              path={plan.path}
            >
              {plan.features.map((planFeature, index)=> (
                <PricePlanBoxOne.Feature key={index} text={planFeature} icon="far fa-check-circle" />
              ))}
            </PricePlanBoxOne>
          ))}          
        </Slider>
      </div>
    </div>
  );
}

export default PricePlanTwo;