import React from 'react';
import {TitleWrap, SecSubTitle, SecTitle, ServiceBoxOne} from '../../components';


// Service Data
import serviceData from '../../data/service.json';

const ServiceOne = ({className})=>  (
  <div className={`background-image ${className || ''}`} style={{backgroundImage: 'url(images/bg/sr-bg-1-1.png)'}}>
    <div className="container">
      <div className="row justify-content-center text-center">
        <div className="col-lg-8 col-xl-6">
          <TitleWrap>
            <SecSubTitle>Our Latest Services</SecSubTitle>
            <SecTitle className="h1">What Kind of Services We are Offering</SecTitle>
          </TitleWrap>
        </div>
      </div>
      <div className="row">
        {serviceData.map(item => (
          <div className="col-md-6 col-lg-4" key={item.id}>
            <ServiceBoxOne path={item.path}
              bgImage={item.bgShape}
              icon={item.icon}
              title={item.title}
              text={item.text}
            />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ServiceOne;