import React from 'react';
import {Link} from 'react-router-dom';

const IconButton = ({className, path, children, onclick})=> {  
  let Btn = <Link to={path || '#'} onClick={onclick} className={`icon-btn ${className || ''}`}>{children}</Link>

  if (!path) {
    Btn = <button onClick={onclick} className={`icon-btn ${className || ''}`}>{children}</button>
  }  
    
  return Btn;
};

export default IconButton;