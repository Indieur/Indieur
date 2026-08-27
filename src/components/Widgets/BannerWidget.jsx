import React from 'react';
import {Button} from '../';

const BannerWidget = ({image, title, btnText, path})=> (  
  <div className="banner-box" style={{backgroundImage: `url(${image})`}}>
    <h3 className="banner-box__title">{title}</h3>
    <Button path={path || '#'}>{btnText}<i className="far fa-arrow-right"/></Button>
  </div>
);

export default BannerWidget;