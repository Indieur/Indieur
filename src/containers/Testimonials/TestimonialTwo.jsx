import React, {useState} from 'react';
import Slider from "react-slick";
import {
  IconButton,
  SecTitle,
  SecSubTitle,
  InfoMedia
} from '../../components';


// Testimonial Data
import testimonialData from '../../data/testimonial.json';


const TestimonialTwo = ({className})=> {

  // Select All Slider
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);
  const [slider3, setSlider3] = useState(null);

  // Next Slide Handler
  const nextSlideHandler = ()=> {
    slider1.slickNext();
  }
  
  // Prev Slide Handler
  const prevSlideHandler = ()=> {
    slider1.slickPrev();
  } 
  
  // Image & Text Slider Settings
  const settingOne = {
    autoplay: true,
    autoplaySpeed: 12000,
    infinite: true,
    arrows: false,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true
  }; 
  
  
  // Author Box Slider Settings
  const settingsTwo = {
    focusOnSelect: true,
    autoplay: true,
    autoplaySpeed: 12000,
    infinite: true,
    arrows: false,
    speed: 1500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 767,
        settings: {          
          slidesToShow: 1,
        }
      }
    ]
  };  
  
  return (
    <div className={`background-image ${className || ''}`} style={{backgroundImage: 'url(images/bg/testi-bg-2-1.jpg)'}} >
      <div className="container position-relative">
        <div className="testimonial-arrow d-none d-xxl-block">
          <IconButton className="style5" onclick={prevSlideHandler}><i className="far fa-arrow-left"/></IconButton>
          <IconButton className="style5" onclick={nextSlideHandler}><i className="far fa-arrow-right"/></IconButton>
        </div>
        <div className="row gx-60">
          <div className="col-lg-5 col-xl-6">
            <Slider className="img-box6" {...settingOne} asNavFor={slider2 && slider3} ref={(slider) => setSlider1(slider)}>
              {testimonialData.map(item => (
                <div key={item.id}>
                  <img src={item.image} alt="testmonial"/>
                </div>
              ))}
            </Slider>
          </div>
          <div className="col-lg-7 col-xl-6 align-self-end">
            <SecSubTitle><i className="fas fa-bring-forward"/>Customer Feedbacks</SecSubTitle>
            <SecTitle className="text-capitalize h1">What They’re Saying</SecTitle>            
            <Slider className="testi-text-slide gx-0" {...settingOne} asNavFor={slider3 && slider1} ref={(slider) => setSlider2(slider)}>
              {testimonialData.map(item => (
                <div key={item.id}>
                  <p className="testi-text">{`“${item.text}”`}</p>
                </div>
              ))}
            </Slider>    
            <Slider className="testi-author-slide row" {...settingsTwo} asNavFor={slider1 && slider2} ref={(slider) => setSlider3(slider)}>
              {testimonialData.map(item => (
                <div key={item.id}>
                  <InfoMedia className="author-style1"
                    image={item.avater}
                    title={item.name}
                    info={item.designation}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestimonialTwo;