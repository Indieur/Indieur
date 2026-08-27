import React from 'react';
import {
  SecTitle,
  SecSubTitle,
  InfoMedia,
  FormOne
} from '../../components';

const ContactOne = ()=> (
  <div className="background-image" style={{backgroundImage: 'url(images/bg/appoin-bg-1-1.jpg)'}}>
    <div className="container z-index-common">
      <div className="row gx-60">
        <div className="col-xl-6 align-self-center space">
          <SecSubTitle className="text-white">READY TO FIND YOUR BIGGEST GROWTH GAPS?</SecSubTitle>
          <SecTitle className="text-capitalize h1 text-white">Let’s Identify Where Your Business May Be Losing Enquiries, Customers or Sales</SecTitle>
          <hr className="hr-style1"/>
          <p className="mb-4 mt-1 pb-3 text-white">Book a focused consultation to review your current advertising, website journey, tracking, WhatsApp follow-ups and retention opportunities</p>
          <div className="row gy-30">
            <div className="col-md-6">
              <InfoMedia className="contact-media"
                icon="fal fa-envelope"
                title="CALL US FOR ANY QUERIES"
                info={<a href="tel:+4915562461769">+4915562461769</a>}
              />
            </div>
            <div className="col-md-6">
              <InfoMedia className="contact-media"
                icon="fal fa-envelope"
                title="Write a Quick mail"
                info={<a href="mailto:info@indieur.com">info@indieur.com</a>}
              />
            </div>
            {/* <div className="col-md-6">
              <InfoMedia className="contact-media"
                icon="fal fa-envelope"
                title="VISITE AMERICA OFFICE"
                info="3401 Ladera Dr NW,  New York"
              />
            </div>
            <div className="col-md-6">
              <InfoMedia className="contact-media"
                icon="fal fa-envelope"
                title="VISITE GERMAN OFFICE"
                info="Kaiserbleek 4 Goslar, Lower Saxony "
              />
            </div> */}
          </div>
        </div>
        <div className="col-xl-6 form-wrap1">
          <FormOne 
            title="Tell Us About Your Growth Requirement"
            btnText="Request My Consultation"
          />
        </div>
      </div>
    </div>
  </div>
);


export default ContactOne;