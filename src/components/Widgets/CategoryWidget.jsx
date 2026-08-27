import React from 'react';
import { Link } from 'react-router-dom';

const CategoryWidget = ({children, className})=> (  
  <ul className={`widget-cat-list ${className || ''}`}>{children}</ul>
);

CategoryWidget.Item = ({children, path})=> (
  <li>
    <Link to={path}>{children}</Link>
  </li>
);

export default CategoryWidget;