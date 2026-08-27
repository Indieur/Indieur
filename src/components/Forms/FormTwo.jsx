import React from 'react';
import {Button} from '../';

const FormTwo = ()=> {
  
  const formHandle = (event)=> {
    event.preventDefault();
  }
  
  return (
    <form className="footer-newsletter">
      <input type="email" placeholder="Enter Email Address"/>
      <Button className="style2" onclick={formHandle}>Subscribe</Button>
    </form>
  );
}

export default FormTwo;