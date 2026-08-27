import React from 'react';
import {Button} from '..';

const PricePlanBoxOne = ({ title, price, duration, bgImage, path, children}) => (
  <div className="price-style1">
    <div className="price-shape background-image" style={{backgroundImage: `url(${bgImage})`}}></div>
    <h3 className="price-package h5">{title}</h3><br/>
    {/* <div className="price-amount h1">{price} <span className="price-duration">/{duration}</span></div> */}
    <div  className="price-features">
      <ul>{children}</ul>
    </div>  
    <Button path={path}>Get Started<i className="far fa-arrow-right" /></Button>
  </div>
);

PricePlanBoxOne.Feature = ({icon, text, ...restProps})=> (
  <li {...restProps}><i className={icon}/>{text}</li>
);

export default PricePlanBoxOne;