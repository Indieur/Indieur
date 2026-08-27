import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

const ProgressOne = ({title, now})=> (
  <div className="progress-box">
    <h3 className="progress-box__title">{title}</h3>
    <span className="progress-box__number">{now+ '%'}</span>
    <ProgressBar now={now} />
  </div>
);

export default ProgressOne;