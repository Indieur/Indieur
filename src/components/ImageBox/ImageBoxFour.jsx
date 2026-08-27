import React from 'react';

const ImageBoxFour = ({imageOne, imageTwo})=> (
  <div className="img-box4">
    <div className="img-1"><img src={imageOne} alt="about"/></div>
    <div className="img-2"><img src={imageTwo} alt="about"/></div>
  </div>
);

export default ImageBoxFour;