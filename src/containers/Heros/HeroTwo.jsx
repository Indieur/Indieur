import React from 'react';
import Slider from 'react-slick';
import {Button, PlayBtn} from '../../components';


const HeroTwo = ()=> {

const HEROCONTENT = [
  {
    subTitle: 'GROWTH MARKETING FOR YOUR BUSINESS',
    title: 'Growth Marketing Built Around Your Business',
    bgText: 'Solution',
    image: 'images/hero/hero3.jpg',
    alt: 'Growth marketing strategy and digital marketing services for business growth',
    shape1: 'images/hero/hero-shape-2-1.png',
    shape2: 'images/hero/hero-shape-2-2.png',
    playBtn: { text1: 'Watch Our Story', text2: 'Subscribe Now', path: '/'},
    btn1: { text: 'Book a Growth Consultation', path: 'https://calendar.app.google/FHDxrBZecPB5XVfB6'},
    btn2: { text: 'Explore Our Services', path: '/service'}
  },
  {
    subTitle: 'CONVEY YOUR BRAND ESSENCE',
    title: 'Take Service from Expert IT Professionals',
    bgText: 'Support',
    image: 'images/hero/hero2.jpg',
    alt: 'Digital marketing agency and IT professionals providing business growth solutions',
    shape1: 'images/hero/hero-shape-2-1.png',
    shape2: 'images/hero/hero-shape-2-2.png',
    playBtn: { text1: 'Watch Our Story', text2: 'Subscribe Now', path: '/'},
    btn1: { text: 'Book a Growth Consultation', path: 'https://calendar.app.google/FHDxrBZecPB5XVfB6'},
    btn2: { text: 'Explore Our Services', path: '/service'}
  },
  {
    subTitle: 'DEDICATED SUPPORT TEAM',
    title: 'Take Free Consultation For Your Brand',
    bgText: 'Motivate',
    image: 'images/hero/home-hero-1920x850.jpg',
    alt: 'Digital marketing agency team providing brand growth consultation and marketing support',
    shape1: 'images/hero/hero-shape-2-1.png',
    shape2: 'images/hero/hero-shape-2-2.png',
    playBtn: { text1: 'Watch Our Story', text2: 'Subscribe Now', path: '/'},
    btn1: { text: 'Book a Growth Consultation', path: 'https://calendar.app.google/FHDxrBZecPB5XVfB6'},
    btn2: { text: 'Explore Our Services', path: '/service'}
  }
]
  
  const settings = {
    autoplay: true,
    autoplaySpeed: 8000,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: false
  };

  return (
    <Slider className="hero-layout2" {...settings}>
      {HEROCONTENT.map((slide, index) => (
        <div key={index}>
          <div className="hero-inner">
            <div className="hero-bg background-image" style={{backgroundImage: `url(${slide.image})`}} alt={slide.alt}></div>
            <div className="hero-shape1"><img src={slide.shape1} alt={slide.alt}/></div>
            <div className="hero-shape2"><img src={slide.shape2} alt={slide.alt}/></div>
            <span className="hero-bg-text">{slide.bgText}</span>
            <div className="container">
              <div className="hero-content">
                <div className="hero-play">
                  {/* <PlayBtn path={slide.playBtn.path} className="style4"><i className="fas fa-play"/></PlayBtn> */}
                  {/* <div className="media-body">
                    <span className="hero-play__title">{slide.playBtn.text1}</span>
                    <p className="hero-play__label">{slide.playBtn.text2}</p>
                  </div> */}
                </div>
                <span className="hero-subtitle">{slide.subTitle}</span>
                <h1 className="hero-title">{slide.title}</h1>
                <div className="hero-btns">
                  <Button path={slide.btn1.path} className="ls-hero-btn">{slide.btn1.text}<i className="far fa-arrow-right"/></Button>
                  <Button path={slide.btn2.path} className="style2 ls-hero-btn">{slide.btn2.text}<i className="far fa-arrow-right"/></Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
}

export default HeroTwo;