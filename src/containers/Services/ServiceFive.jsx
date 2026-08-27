import React from 'react';
import { ServiceBoxOne } from '../../components';

import serviceData from '../../data/service.json';

const ServiceFive = ({ ...restProps }) => (
  <div {...restProps}>
    <div className="container">
      <div className="row">
        {serviceData.map((item) => (
          <div key={item.id} className="col-md-6 col-lg-4">
            <ServiceBoxOne
              className="layout2"
              path={item.path}
              bgImage={item.bgShape}
              icon={item.icon}
              title={item.title}
              text={item.text}
              buttonText={item.buttonText}
            />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ServiceFive;