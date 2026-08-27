import React from 'react';
import {FeatureBoxOne} from '../../components/';
import Slider from 'react-slick';

const FeatureOne = ({className})=> {

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
    <div className={`feature-wrap1 ${className || ''}`}>
      <div className="container">   
        <Slider className="row" {...settings}>
          <FeatureBoxOne 
            title="Development Services"
            text="Completely implement via highly efficient process improvements. engage high value before progressive data."
            image="images/icon/fe-1-1.png"
            path="/service-details"
          />
          <FeatureBoxOne 
            title="Marketing Services"
            text="Completely implement via highly efficient process improvements. engage high value before progressive data."
            image="images/icon/fe-1-2.png"
            path="/service-details"
          />
          <FeatureBoxOne 
            title="Consulting Services"
            text="Completely implement via highly efficient process improvements. engage high value before progressive data."
            image="images/icon/fe-1-3.png"
            path="/service-details"
          />
        </Slider>
      </div>
    </div>
  );
}

export default FeatureOne;