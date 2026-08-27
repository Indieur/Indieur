import React from 'react';
import Slider from 'react-slick';
import {TitleWrap, SecSubTitle, SecTitle, TeamBoxTwo} from '../../components';


const TeamTwo = ({...restProps})=> {     

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
    <div {...restProps}>
      <div className="container">
        <TitleWrap className="text-center">
          <SecSubTitle>GREAT TEAM MEMBERS</SecSubTitle>
          <SecTitle className="h1 text-capitalize">We Have Expert Team</SecTitle>
        </TitleWrap>
        <Slider {...settings}>
          <TeamBoxTwo
            image="images/team/t-2-1.jpg"
            name="Grayson Gabriel"
            desgination="Cheif Expert"
            path="/team-details"
          />
          <TeamBoxTwo
            image="images/team/t-2-2.jpg"
            name="Samuel Thomas"
            desgination="Cheif Expert"
            path="/team-details"
          />
          <TeamBoxTwo
            image="images/team/t-2-3.jpg"
            name="William Lucas"
            desgination="Design Expert"
            path="/team-details"
          />
          <TeamBoxTwo
            image="images/team/t-2-4.jpg"
            name="Daniel Matthew"
            desgination="Developer"
            path="/team-details"
          />
        </Slider>
      </div>
    </div>
  );
}

export default TeamTwo;