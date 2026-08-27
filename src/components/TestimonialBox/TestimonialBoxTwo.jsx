import React from 'react';

const TestimonialBoxTwo = ({avater, text, name, designation})=> (
  <div className="testi-style2">
    <div className="testi-body">
      {/* <div className="author-img"><img src={avater} alt="author"/></div> */}
      <div className="media-body">
        <p className="testi-text">{text}</p>
      </div>
    </div>
    <h3 className="testi-name">{name}</h3>
    <div className="testi-degi">{designation}</div>
  </div>
);

export default TestimonialBoxTwo;