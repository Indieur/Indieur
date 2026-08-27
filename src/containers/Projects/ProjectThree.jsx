import React from 'react';
import {
  ProjectBoxOne
} from '../../components';

const ProjectThree = ({...restProps})=> {

  return (
    <div {...restProps}>
      <div className="container">        
        <div className="row">
          <div className="col-md-6 col-xxl-auto">
            <ProjectBoxOne
              image="images/project/p-2-1.jpg"
              title="Digital Marketing"
              tag="IT Solution"
              path="/project-details"
            />
          </div>
          <div className="col-md-6 col-xxl-auto">
            <ProjectBoxOne
              image="images/project/p-2-2.jpg"
              title="UI Development"
              tag="Startup IT"
              path="/project-details"
            />
          </div>
          <div className="col-md-6 col-xxl-auto">
            <ProjectBoxOne
              image="images/project/p-2-3.jpg"
              title="App Development"
              tag="Android Dev"
              path="/project-details"
            />
          </div>
          <div className="col-md-6 col-xxl-auto">
            <ProjectBoxOne
              image="images/project/p-2-4.jpg"
              title="Graphic Design"
              tag="Project Manage"
              path="/project-details"
            />
          </div>
          <div className="col-md-6 col-xxl-auto">
            <ProjectBoxOne
              image="images/project/p-2-5.jpg"
              title="Affiliat Marketing"
              tag="Sale Increase"
              path="/project-details"
            />
          </div>
          <div className="col-md-6 col-xxl-auto">
            <ProjectBoxOne
              image="images/project/p-2-6.jpg"
              title="Wordpress Theme"
              tag="Skill Art"
              path="/project-details"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectThree;