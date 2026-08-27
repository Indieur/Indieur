import React from 'react';
import {IconButton} from '../';
import { Link } from 'react-router-dom';

const ProjectBoxOne = ({image, title, tag, path})=> (
  <div className="project-style2">
    <div className="project-img">
      <img src={image} alt="project"/>
      <div className="project-shape"></div>
      <IconButton path={path} className="icon-btn style3"><i className="far fa-arrow-right"/></IconButton>
    </div>
    <div className="project-content">
      <span className="project-label">{tag}</span>
      <h3 className="project-title h5"><Link className="text-reset" to={path}>{title}</Link></h3>
    </div>
  </div>
);

export default ProjectBoxOne;