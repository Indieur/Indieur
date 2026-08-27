import React from 'react';
import Slider from 'react-slick';
import {
  TitleWrap,
  SecSubTitle,
  SecTitle,
  ProjectBoxTwo
} from '../../components';

const ProjectTwo = ({className})=> {
  
  const settings = {
    autoplay: true,
    autoplaySpeed: 8000,
    infinite: true,
    arrows: false,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
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
    <div className={`background-image ${className || ''}`} style={{ backgroundImage: 'url(images/bg/project-bg-1-1.jpg)'}}  >
      <div className="container">
        <TitleWrap className="text-center">
          <SecSubTitle>Some Top Projects</SecSubTitle>
          <SecTitle className="h1 text-capitalize">Our Recent Projects</SecTitle>
        </TitleWrap>
        <Slider className="row" {...settings}>
          <ProjectBoxTwo path="/project-details"
            title="IT Software Solution"
            image="images/project/p-1-1.jpg"
          />
          <ProjectBoxTwo path="/project-details"
            title="Website Management"
            image="images/project/p-1-2.jpg"
          />
          <ProjectBoxTwo path="/project-details"
            title="Business Consultancy"
            image="images/project/p-1-3.jpg"
          />
          <ProjectBoxTwo path="/project-details"
            title="Digital Marketing"
            image="images/project/p-1-4.jpg"
          />
          <ProjectBoxTwo path="/project-details"
            title="UI Development"
            image="images/project/p-1-5.jpg"
          />
        </Slider>        
        <div className="text-center">
          <h4 className="fs-md fw-semibold mb-n1 mt-4">We Have Done More Than 1K Projects in Last 3 Years, With 100% Satisfaction.</h4>
        </div>
      </div>
    </div>
  );
}

export default ProjectTwo;