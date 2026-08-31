import React from 'react';
import { Button } from '..';

const PricePlanBoxOne = ({
  title,
  price,
  duration,
  bgImage,
  path,
  children,
}) => {
  return (
    <div className="price-style1">

      {/* Background Shape */}
      <div
        className="price-shape background-image"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      />

      {/* Package Title */}
      <h3 className="price-package h3" style={{textAlign:'center'}}>
        {title}
      </h3>

      {/* Price - Currently Hidden */}
      {/* {price && (
        <div className="price-amount h1">
          {price}

          {duration && (
            <span className="price-duration">
              /{duration}
            </span>
          )}
        </div>
      )} */}

      {/* Features */}
      <div className="price-features">
        <ul>
          {children}
        </ul>
      </div>

      {/* Button */}
      <div className="price-button-wrapper">
        <Button path={path}>
          Get Started
          <i className="far fa-arrow-right" />
        </Button>
      </div>

    </div>
  );
};


/* =========================================================
   FEATURE COMPONENT
========================================================= */

PricePlanBoxOne.Feature = ({
  icon,
  text,
  children,
  ...restProps
}) => {
  return (
    <li {...restProps}>
      <i className={icon || 'far fa-check-circle'} />

      <span>
        {text || children}
      </span>
    </li>
  );
};


export default PricePlanBoxOne;