import React from 'react';
import {Link} from 'react-router-dom';

const TagWidget = ({children, className})=> (
  <div className={`tagcloud ${className || ''}`}>{children}</div>
);

TagWidget.Item = ({children, path})=> (  
  <Link to={path}>{children}</Link>
);

export default TagWidget;