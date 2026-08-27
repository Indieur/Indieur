import React from 'react';

const Widget = ({widgetTitle,className, children})=> (
  <div className={`widget ${className || ''}`}>
    {widgetTitle ? <h3 className="widget_title">{widgetTitle}</h3> : ''}
    {children}
  </div>
);

export default Widget;