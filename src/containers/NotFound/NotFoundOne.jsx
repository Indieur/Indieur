import React from 'react';
import {Button} from '../../components';

const NotFoundOne = ()=> (
  <div className="space">
    <div className="container">
      <div className="error-content text-center">
        <h2 className="error-number">4<span className="text-theme">0</span>4</h2>
        <h3 className="error-title">Ooops, Page Not Found</h3>
        <p className="error-text">We’re sorry but we can’t seem to find the page you requested. This might be because you have typed the web address incorrectly.</p>
        <Button path="/"><i className="fas fa-home ms-0 me-2"/>Back To Home</Button>
      </div>
    </div>
  </div>
);

export default NotFoundOne;