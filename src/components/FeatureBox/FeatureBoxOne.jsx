import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from '../';

const FeatureBoxOne = ({image, title, text, path})=> (
  <div className="feature-style1">
    <div className="feature-icon"><img src={image} alt="featureicon"/></div>
    <h3 className="feature-title h5"><Link className="text-inherit" to={path}>{title}</Link></h3>
    <p className="feature-text">{text}</p>
    <Button path={path} className="style3">Read More<i className="far fa-long-arrow-right"/></Button>
  </div>
);

export default FeatureBoxOne;