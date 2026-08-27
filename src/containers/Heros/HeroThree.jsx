import React from 'react';
import Slider from 'react-slick';
import {Button, PlayBtn} from '../../components';


const HeroThree = ()=> {

  const HEROCONTENT = [
    {
      subTitle: 'Solve Problems, Change Lives',
      title: 'Clear Thinking Makes',
      title2: 'Bright Future!',
      image: 'images/hero/hero-3-1.jpg',
      text:  'Professionally repurpose intuitive total linkage after timely mindshare. Credibly coordinate reliable collaboration and idea-sharing after...',
      playBtn: { icon: 'fas fa-play', path: 'https://www.dropbox.com/s/b4k0p5swok5l8t2/videoplayback.mp4?dl=1'},
      btn: { text: 'Book Appointment', path: '/contact'},
    },
    {
      subTitle: 'Collaborate together, build together',
      title: 'Make Planing Build',
      title2: 'Great Product!',
      image: 'images/hero/hero-3-2.jpg',
      text:  'Professionally repurpose intuitive total linkage after timely mindshare. Credibly coordinate reliable collaboration and idea-sharing after...',
      playBtn: { icon: 'fas fa-play', path: 'https://www.dropbox.com/s/b4k0p5swok5l8t2/videoplayback.mp4?dl=1'},
      btn: { text: 'Book Appointment', path: '/contact'},
    },
    {
      subTitle: 'Set Target, Reach Goal',
      title: 'Quality Product With',
      title2: 'Expert Team!',
      image: 'images/hero/hero-3-3.jpg',
      text:  'Professionally repurpose intuitive total linkage after timely mindshare. Credibly coordinate reliable collaboration and idea-sharing after...',
      playBtn: { icon: 'fas fa-play', path: 'https://www.dropbox.com/s/b4k0p5swok5l8t2/videoplayback.mp4?dl=1'},
      btn: { text: 'Book Appointment', path: '/contact'},
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
    arrows: false,
    dots: true
  };

  return (
    <div style={{backgroundImage: 'url(images/hero/hero-bg-3-1.jpg)'}}>
      <Slider className="hero-layout3" {...settings}>
        {HEROCONTENT.map((slide, index) => (
          <div key={index}>
            <div className="hero-inner">
              <div className="container">
                <div className="row gx-60 align-items-center">
                  <div className="col-lg-6 col-xxl-auto">
                    <div className="hero-img">
                      <img src={slide.image} alt="herothumb"/>
                    </div>
                  </div>
                  <div className="col-lg-6 col-xxl">
                    <div className="hero-content">
                      <span className="hero-subtitle">{slide.subTitle}</span>
                      <h2 className="hero-title">{slide.title} <span className="inner-text">{slide.title2}</span></h2>
                      <p className="hero-text">{slide.text}</p>
                      <div className="hero-btns">
                        <Button path={slide.btn.path}>{slide.btn.text}<i className="far fa-long-arrow-right"/></Button>
                        <PlayBtn path={slide.playBtn.path} className="style5"><i className={slide.playBtn.icon}/></PlayBtn>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default HeroThree;