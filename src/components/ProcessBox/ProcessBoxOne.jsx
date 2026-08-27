import React from 'react';

const ProcessBoxOne = ({className, arrow, icon, number, title, text})=> (  
  <div className={`vs-process ${className || ''}`}>
    <div className="process-arrow"><img src={arrow} alt="arrow"/></div>
    <div className="process-icon">
      <img src={icon} alt="icon"/>
      <span className="process-number">{number}</span>
    </div>
    <h3 className="process-title h5">{title}</h3>
    <p className="process-text">{text}</p>
  </div>
);

export default ProcessBoxOne;