import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from '../';

const ProjectBoxTwo = ({image, title, path})=> (
  <div className="project-style1">
    <div className="project-img">
      <img src={image} alt="projectimage"/>
    </div>
    <div className="project-content">
      <h3 className="project-title h6"><Link className="text-inherit" to={path}>{title}</Link></h3>
      <Button path={path} className="style3">View Details<i className="far fa-arrow-right"/></Button>
    </div>
  </div>
);

export default ProjectBoxTwo;