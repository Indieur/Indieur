import React from 'react';
import {InfoMedia} from '../../components';

const CounterOne = ({className})=> (
  <div className={`position-relative ${className || ''}`}>    
    <div className="counter-shape1"></div>
    <div className="bg-black z-index-common space background-image" style={{backgroundImage: 'url(images/bg/counter-bg-1-1.jpg)'}}>
      <div className="container">
        <div className="row justify-content-between gy-4">
          <div className="col-6 col-lg-auto">
            <InfoMedia className="counter-media"
              image="images/icon/count-1-1.png"
              title="858"
              info="Successful Projects"
            />
          </div>
          <div className="col-6 col-lg-auto">
            <InfoMedia className="counter-media"
              image="images/icon/count-1-2.png"
              title="650"
              info="Media Activities"
            />
          </div>
          <div className="col-6 col-lg-auto">
            <InfoMedia className="counter-media"
              image="images/icon/count-1-3.png"
              title="567"
              info="Skilled Experts"
            />
          </div>
          <div className="col-6 col-lg-auto">
            <InfoMedia className="counter-media"
              image="images/icon/count-1-4.png"
              title="28k"
              info="Happy Clients"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);


export default CounterOne;