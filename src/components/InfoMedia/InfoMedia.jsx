import React from 'react';

const InfoMedia = ({number, image, icon, title, info, className }) => (
  <div className={`info-media ${className || ''}`}>
    <div className="media-icon">
      {image && <img src={image} alt="infoIcon"/>}
      {icon && <i className={icon}/>}      
      {number && number}      
    </div>
    <div className="media-body">
      {title && <span className="media-label">{title}</span>}
      {info && <div className="media-link">{info}</div>}
    </div>
  </div>
);

export default InfoMedia;
