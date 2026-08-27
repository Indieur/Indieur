import React from 'react';

const TestimonialBoxOne = ({icon, text, name, designation})=> (
  <div className="testi-style1">
    <div className="testi-icon"><i className={icon}/></div>
    <p className="testi-text">{text}</p>
    <h3 className="testi-name h6">{name}</h3>
    <div className="testi-degi">{designation}</div>
  </div>
);

export default TestimonialBoxOne;