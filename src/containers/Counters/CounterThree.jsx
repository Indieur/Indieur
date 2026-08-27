import React from 'react';
import {InfoMedia} from '../../components';

const CounterThree = ({className})=> (
  <div className={`counter-wrap1 ${className || ''}`}>    
    <div className="container">
      <div className="row justify-content-between gy-4">
        <div className="col-6 col-lg-auto">
          <InfoMedia className="counter-media style2"
            image="images/icon/count-1-1.png"
            title="858"
            info="Successful Projects"
          />
        </div>
        <div className="col-6 col-lg-auto">
          <InfoMedia className="counter-media style2"
            image="images/icon/count-1-2.png"
            title="650"
            info="Media Activities"
          />
        </div>
        <div className="col-6 col-lg-auto">
          <InfoMedia className="counter-media style2"
            image="images/icon/count-1-3.png"
            title="567"
            info="Skilled Experts"
          />
        </div>
        <div className="col-6 col-lg-auto">
          <InfoMedia className="counter-media style2"
            image="images/icon/count-1-4.png"
            title="28k"
            info="Happy Clients"
          />
        </div>
      </div>
    </div>
  </div>
);


export default CounterThree;