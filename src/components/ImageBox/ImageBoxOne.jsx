import React from 'react';
import {PlayBtn} from '../';

const ImageBoxOne = ({imageOne, imageTwo, video})=> (
  <div className="img-box1">
    <div className="img-1">
      <img src={imageOne} alt="imgOne"/>
    </div>
    <div className="img-2">
      <img src={imageTwo} alt="imgTwo"/>
      <PlayBtn path={video} className="style2 position-center"><i className="fas fa-play"/></PlayBtn>
    </div>
  </div>
);

export default ImageBoxOne;