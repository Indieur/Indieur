import React from 'react';
import {Link} from 'react-router-dom';

const ServiceBoxTwo = ({ image, number, bgImage, title, text, path})=> (
  <div className="service-style2">
    <div className="service-img">
      <span className="service-number">{number}</span>
      <img src={image} alt="service"/>
    </div>
    <div className="service-content">
      <div className="service-shape background-image" style={{ backgroundImage: `url(${bgImage})`}}></div>
      <h3 className="service-title h5"><Link to={path}>{title}</Link></h3>
      <p className="service-text">{text}</p>
      <Link to={path} className="link-btn">Read Details<i className="far fa-arrow-right"/></Link>
    </div>
  </div>
);

export default ServiceBoxTwo;