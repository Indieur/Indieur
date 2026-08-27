import React from 'react';
import {InfoMedia} from '../../components';

const CounterTwo = ({className})=> (
  <div className={`background-image ${className || ''}`} style={{backgroundImage: 'url(images/bg/counter-bg-2-1.jpg)'}}>    
    <div className="container">
      <div className="row justify-content-between gy-4">
        <div className="col-6 col-lg-auto">
          <InfoMedia className="counter-media"
            image="images/icon/count-1-1.png"
            title=""
            info="Understand the Business"
          />
        </div>
        <div className="col-6 col-lg-auto">
          <InfoMedia className="counter-media"
            image="images/icon/count-1-2.png"
            title=""
            info="Identify Growth Gaps"
          />
        </div>
        {/* <div className="col-6 col-lg-auto">
          <InfoMedia className="counter-media"
            image="images/icon/count-1-3.png"
            title=""
            info="Implement Priorities"
          />
        </div> */}
        <div className="col-6 col-lg-auto">
          <InfoMedia className="counter-media"
            image="images/icon/count-1-4.png"
            title=""
            info="Measure and Optimise"
          />
        </div>
      </div>
    </div>
  </div>
);


export default CounterTwo;