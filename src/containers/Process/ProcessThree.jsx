import React from 'react';
import {
  TitleWrap,
  SecSubTitle,
  SecTitle,
  ProcessBoxOne
} from '../../components';

// Process Data
import processData from '../../data/process.json';

const ProcessThree = ({className})=> (
  <div className={`process-wrap1 background-image ${className || ''}`} style={{backgroundImage: 'url(images/bg/process-bg-3-1.jpg)'}}>    
    <div className="container">
      <div className="row justify-content-center text-center">
        <div className="col-xl-6">
          <TitleWrap>
            <SecSubTitle>Our Work Process</SecSubTitle>
            <SecTitle className="h1">Work With Planing</SecTitle>
          </TitleWrap>
        </div>
      </div>
      <div className="row justify-content-between">
        {processData.slice(0, 3).map(item => (
          <ProcessBoxOne key={item.number} className="col-md-4 col-xl-auto process-style2"
            arrow={item.arrow2} 
            title={item.title} 
            text={item.text} 
            icon={item.icon} 
            number={item.number}             
          />
        ))}
      </div>
    </div>
  </div>
);

export default ProcessThree;