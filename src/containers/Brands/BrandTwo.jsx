import React from 'react';
import Slider from 'react-slick';

const BrandTwo = ({className})=> {

  const settings = {
    autoplay: true,
    autoplaySpeed: 8000,
    infinite: true,
    arrows: false,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {          
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 767,
        settings: {          
          slidesToShow: 2,
        }
      }
    ]
  }; 
  
  return (
    <div className={`background-image ${className || ''}`} style={{backgroundImage: 'url(images/bg/brand-bg-2-1.jpg)'}}>    
      <div className="container">
        <Slider className="row text-center" {...settings}>
          <div><img src="images/brand/br-1-1.png" alt="brands"/></div>
          <div><img src="images/brand/br-1-2.png" alt="brands"/></div>
          <div><img src="images/brand/br-1-3.png" alt="brands"/></div>
          <div><img src="images/brand/br-1-4.png" alt="brands"/></div>
          <div><img src="images/brand/br-1-5.png" alt="brands"/></div>
          <div><img src="images/brand/br-1-6.png" alt="brands"/></div>
        </Slider>
      </div>
    </div>
  );
}

export default BrandTwo;