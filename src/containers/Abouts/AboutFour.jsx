import React from 'react';
import {
  ImageBoxFour,
  SecTitle,
  SecSubTitle,
  InfoMedia
} from '../../components';

const AboutFour = ({...restProps})=> (
  <div {...restProps}>
    <div className="container">
      <div className="row flex-row-reverse">
        <div className="col-lg-6 mb-30">
          <ImageBoxFour 
            imageOne="images/about/process-521x529.jpg"
            imageTwo="images/about/delivery-process.jpg"
          />
        </div>
        <div className="col-lg-6 mb-30 pt-10 pt-lg-0 text-center text-md-start">
          <SecSubTitle><i className="fas fa-bring-forward"/> A CLEAR DELIVERY PROCESS</SecSubTitle>
          <SecTitle className="h1 mb-3 pb-3 text-capitalize">From Business Problem to Measurable Action</SecTitle>
          <InfoMedia className="media-order"
            number="01"
            title="Understand"
            info="We study your business, customers, offer, current marketing, available data, budget and operational readiness."
          />
          <InfoMedia className="media-order"
            number="02"
            title="Diagnose"
            info="We identify the most important acquisition, conversion, tracking and retention gaps."
          />
          <InfoMedia className="media-order"
            number="03"
            title="Prioritise"
            info="We recommend what should be addressed now, what should be tested next and what can wait."
          />
          
        </div>
      </div>
    </div>
  </div>
);

export default AboutFour;