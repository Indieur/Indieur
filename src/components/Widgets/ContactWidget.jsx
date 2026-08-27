import React from 'react';

const ContactWidget = ({bgImage, title, text, children})=> (
  <div className="widget-contact background-image" style={{backgroundImage: `url(${bgImage})`}}>    
    <h3 className="widget-contact__title h5">{title}</h3>
    <p className="widget-contact__text">{text}</p>
    {children}
  </div>
) 

ContactWidget.Info = ({children, ...restProps})=> (
  <p className="widget-contact__info" {...restProps}>{children}</p>
);

export default ContactWidget;