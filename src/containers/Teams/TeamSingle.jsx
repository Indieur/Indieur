import React, {useRef} from 'react';
import {
  InfoMedia,
  Button,
  ProgressOne,
  TitleWrap,
  SecSubTitle,
  SecTitle,
  FormThree
} from '../../components';

const TeamSingle = ({...restProps})=> { 

  const contactArea = useRef(null);

  const scrollHandler = (event)=> {
    event.preventDefault();
    let targetOffset = contactArea.current.offsetTop - 200;
    window.scrollTo({
      top: targetOffset,
      behavior: "smooth"
    });
  }
  
  return (
    <div {...restProps}>
      <div className="container">
        <div className="row gx-60 gy-2">        
          <div className="col-lg-5 mb-30">
            <img src="images/team/d-d-1.jpg" alt="team-member"/>
          </div>        
          <div className="col-lg-7 col-xl-7 align-self-center mb-30">
            <div className="team-about">
              <h3 className="team-name h4">Oliver William</h3>
              <span className="team-degi">Founder & CEO</span>            
              <p className="team-text">Continually utilize 24/365 bandwidth before real-time interfaces. Credibly grow team driven core competencies with pandemic e-commerce. Objectively initiate pandemic users with inexpensive methodologies. Collaboratively deliver bricks-and-clicks meta-services for bricks-and-clicks innovation streamline front-end experiences.</p>
              <div className="row">
                <div className="col-sm-6">
                  <InfoMedia className="team-media"
                    icon="fas fa-user"
                    title="Experience"
                    info="More Than 10 Years"
                  />
                </div>
                <div className="col-sm-6">
                  <InfoMedia className="team-media"
                    icon="fas fa-phone-alt"
                    title="Phone"
                    info={<a href="tel:+2562145821456">+(256) 21458-21456</a>}
                  />
                </div>
                <div className="col-sm-6">
                  <InfoMedia className="team-media"
                    icon="fas fa-envelope"
                    title="Email"
                    info={<a href="mailto:info@example.com">info@example.com</a>}
                  />
                </div>
                <div className="col-sm-6">
                  <InfoMedia className="team-media"
                    icon="fas fa-fax"
                    title="Fax"
                    info={<a href="fax:+358.555.1234567">+358.555.1234567</a>}
                  />
                </div>
              </div>            
              <div className="onepage-nav">
                <Button onclick={scrollHandler} path="#team-contact">Get In Touch<i className="far fa-arrow-right"/></Button>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className="team-inner background-image" style={{backgroundImage: 'url(images/bg/team-details-bg-1-1.jpg)'}}>      
        <div className="container">
          <div className="row gx-60 gy-3">
            <div className="col-lg-6">            
              <h3 className="h4 mb-3 pb-1">Personal Biography</h3>
              <p className="pe-xxl-5">Dramatically reinvent worldwide process improvements rather than performance based e-business. Holisticly create competitive portals for compelling e-markets. Enthusiastically engage B2B channels through ethical processes initiate 2.0 applications.</p>
              <p>Intrinsicly morph bricks-and-clicks e-tailers whereas economically sound results disseminate innovative core competencies</p>
            </div>
            <div className="col-lg-6">              
              <h3 className="h4 mb-3 pb-1">Professional Skills</h3>
              <ProgressOne title="Business Security" now="65" />            
              <ProgressOne title="Career Development" now="70" />            
              <ProgressOne title="Business Inovation" now="90" />            
            </div>
          </div>
        </div>      
      </div>
      <TitleWrap className="text-center">
        <SecSubTitle>Send Us Email</SecSubTitle>
        <SecTitle className="text-capitalize h1">Feel Free To Write</SecTitle>
      </TitleWrap>
      <div className="container" ref={contactArea}>
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-8">
            <FormThree/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamSingle;