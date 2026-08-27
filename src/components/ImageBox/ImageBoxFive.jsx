import React from 'react';

const ImageBoxFour = ({imageOne, imageTwo, imageThree})=> (
  <div className="img-box5">
    <div className="img-1"><img src={imageOne} alt="about"/></div>
    <div className="img-bottom">
      <div className="img-2"><img src={imageTwo} alt="aboutthumb"/></div>
      <div className="img-3"><img src={imageThree} alt="aboutthumb"/></div>
    </div>
    <div className="shape1"></div>
  </div>
);

export default ImageBoxFour;