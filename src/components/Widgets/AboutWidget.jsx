import React from 'react';

const AboutWidget = ({children, className})=> (
  <div className={`vs-widget-about ${className || ''}`}>{children}</div>
);

AboutWidget.Text = ({children})=> (
  <p className="footer-text">{children}</p>
);


export default AboutWidget;