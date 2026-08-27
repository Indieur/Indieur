import React, {useRef} from 'react';
import Slider from "react-slick";
import {
  TitleWrap,
  SecTitle,
  SecSubTitle,
  SlideNavBtn,
  ProjectBoxOne
} from '../../components';

const ProjectOne = ({...restProps})=> {
  const sliderWrap = useRef();

  const settings = {
    autoplay: true,
    autoplaySpeed: 8000,
    infinite: true,
    arrows: false,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [{
      breakpoint: 1400,
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
    <div {...restProps}>
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-lg-auto text-center text-lg-start">
            <TitleWrap>
              <SecSubTitle><i className="fas fa-bring-forward" />OUR LATEST PROJECTS</SecSubTitle>
              <SecTitle className="h1 text-capitalize">Our Successful Projects</SecTitle>
            </TitleWrap>
          </div>
          <div className="col-auto d-none d-lg-block">
            <SlideNavBtn slideParent={sliderWrap} />
          </div>
        </div>
      </div>
      <div className="container-fluid overflow-hidden px-xxl-0">
        <Slider ref={sliderWrap} className="row" {...settings}>
          <ProjectBoxOne 
            image="images/gallery/gal-1-1.jpg"
            title="Digital Marketing"
            tag="IT Solution"
            path="/project-details"
          />
          <ProjectBoxOne 
            image="images/gallery/gal-1-2.jpg"
            title="App Development"
            tag="App Solution"
            path="/project-details"
          />
          <ProjectBoxOne 
            image="images/gallery/gal-1-3.jpg"
            title="Portfolio Design"
            tag="UI Design"
            path="/project-details"
          />
          <ProjectBoxOne 
            image="images/gallery/gal-1-4.jpg"
            title="Database checkup"
            tag="Cyber Security"
            path="/project-details"
          />
          <ProjectBoxOne 
            image="images/gallery/gal-1-5.jpg"
            title="Content Writing"
            tag="Affiliate"
            path="/project-details"
          />
        </Slider>
      </div>
    </div>
  );
}

export default ProjectOne;