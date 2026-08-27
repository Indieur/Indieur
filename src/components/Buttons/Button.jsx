import React from 'react';
import {Link} from 'react-router-dom';

const Button = ({className, path, children, onclick})=> {  
  let Btn = <Link to={path || '#'} onClick={onclick} className={`vs-btn ${className || ''}`}>{children}</Link>

  if (!path) {
    Btn = <button onClick={onclick} className={`vs-btn ${className || ''}`}>{children}</button>
  }  
    
  return Btn;
};


export default Button;