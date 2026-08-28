import React from 'react';
import {
  SecSubTitle,
  SecTitle,
  Button
} from '../../components';

const CtaOne = ({className})=> (
  <div className={`z-index-common background-image ${className || ''}`} style={{ backgroundImage: 'url(images/bg/consulation.png'}}>
    <div className="container">
      <div className="row text-center text-lg-start align-items-center justify-content-between">
        <div className="col-lg-auto">
          <SecSubTitle className="text-white">We are here to answer your questions 24/7</SecSubTitle>
          <SecTitle className="cta-title1 h2">READY TO IDENTIFY YOUR BIGGEST MARKETING GAPS?</SecTitle>
        </div>
        <div className="col-lg-auto mt-4">
          <Button path="/contact">Contact Indieur<i className="far fa-arrow-right"/></Button>
        </div>
      </div>
    </div>
  </div>
);

export default CtaOne;