import React from 'react';
import Slider from 'react-slick';
import {
  TitleWrap,
  SecSubTitle,
  SecTitle,
  TeamBoxOne
} from '../../components';

const TeamThree = ({className})=> {

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
    <div className={`background-image ${className || ''}`} style={{ backgroundImage: 'url(images/bg/team-bg-3-1.jpg)'}}  >
      <div className="container">
        <TitleWrap className="text-center">
          <SecSubTitle>Great Team Members</SecSubTitle>
          <SecTitle className="h1 text-capitalize">We Have Expert Team</SecTitle>
        </TitleWrap>
        <Slider className="row" {...settings}>
          <TeamBoxOne path="/team-details"
            name="Daniel Matthew"
            desgination="Cheif Expert"
            image="images/team/t-1-1.jpg"
            className="layout2"
          />
          <TeamBoxOne path="/team-details"
            name="Grayson Gabriel"
            desgination="Head Manager"
            image="images/team/t-1-2.jpg"
            className="layout2"
          />
          <TeamBoxOne path="/team-details"
            name="Alexander Mason"
            desgination="Founder & CEO"
            image="images/team/t-1-3.jpg"
            className="layout2"
          />
          <TeamBoxOne path="/team-details"
            name="Maverick Cameron"
            desgination="Pro Developer"
            image="images/team/t-1-4.jpg"
            className="layout2"
          />
          <TeamBoxOne path="/team-details"
            name="Marian Widjya"
            desgination="Lead Developer"
            image="images/team/t-1-5.jpg"
            className="layout2"
          />
        </Slider>
      </div>
    </div>
  )
};

export default TeamThree;