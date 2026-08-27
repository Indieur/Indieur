import React from 'react';
import {Button} from '../';

const FormThree = ()=> {

  const formHandle = (event)=> {
    event.preventDefault();
  }

  return (
    <form action="#" className="row gx-20 form-style2">
      <div className="col-md-6 form-group">
        <input type="text" placeholder="Full Name"/>
      </div>
      <div className="col-md-6 form-group">
        <input type="email" placeholder="Email Address"/>
      </div>
      <div className="col-md-6 form-group">
        <input type="number" placeholder="Phone Number"/>
      </div>
      <div className="col-md-6 form-group">
        <select>
          <option defaultValue="nothing">Select subject</option>
          <option defaultValue="Web Development">Web Development</option>
          <option defaultValue="UI Design">UI Design</option>
          <option defaultValue="CMS Development">CMS Development</option>
          <option defaultValue="Theme Development">Theme Development</option>
          <option defaultValue="Wordpress Development">Wordpress Development</option>
        </select>
      </div>
      <div className="col-12 form-group">
        <textarea name="message" id="message" placeholder="Type Your Message"/>
      </div>
      <div className="col-12 text-center">
        <Button onclick={formHandle}>Send A Message<i className="far fa-arrow-right"/></Button>
      </div>
    </form>
  );
}

export default FormThree;