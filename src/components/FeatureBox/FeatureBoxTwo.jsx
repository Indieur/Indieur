import React from 'react';
import { Link } from 'react-router-dom';

const FeatureBoxTwo = ({
  image,
  title,
  text,
  path
}) => (
  <div className="feature-style2">

    {/* Icon */}
    <div className="feature-icon">
      <img src={image} alt="Features" />
    </div>

    {/* Title */}
    <h3 className="feature-title h5">
      <Link
        className="text-inherit"
        to={path}
      >
        {title}
      </Link>
    </h3>

    {/* Description */}
    <p className="feature-text">
      {text}
    </p>

    {/* Read More */}
    <Link
      to={path}
      className="link-btn"
    >
      Read Details
      <i className="far fa-arrow-right" />
    </Link>

  </div>
);

export default FeatureBoxTwo;