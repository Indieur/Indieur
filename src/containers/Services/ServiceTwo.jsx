import React from 'react'; 
import { TitleWrap, SecSubTitle, SecTitle, ServiceBoxTwo } from '../../components';

// Service Data
import serviceData from '../../data/service.json';

const ServiceTwo = ({className})=> (
  <div className={`background-image ${className || ''}`} style={{ backgroundImage: 'url(images/bg/sr-bg-2-1.jpg)'}}>
    <div className="container">
      <TitleWrap className="text-center">
        <SecSubTitle>START WITH THE SUPPORT YOU NEED</SecSubTitle>
        <SecTitle className="h1 text-capitalize">INDIVIDUAL SERVICE PLANS</SecTitle>
      </TitleWrap>
      <div className="row">
        {serviceData.slice(0, 9).map(item => (
          <div className="col-lg-6" key={item.id}>
            <ServiceBoxTwo path={item.path}
              number={'0' + item.id}
              bgImage={item.bgShape2}
              icon={item.icon}
              title={item.title}
              text={item.text}
              image={item.image}
            />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ServiceTwo;