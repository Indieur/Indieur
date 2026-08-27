import React from 'react';
import {
  SecSubTitle,
  SecTitle,
  ProgressOne
} from '../../components';

const AboutTwo = ({...restProps})=> (
  <div {...restProps}>
    <div className="container">
      <div className="row flex-row-reverse">
        <div className="col-lg-5 col-xxl-auto mb-30 pb-20 pb-lg-0">
          <img src="images/skill/skill-1-1.jpg" alt="Skill"/>
        </div>
        <div className="col-lg-7 col-xxl-6 me-xl-auto">
          <SecSubTitle><i className="fas fa-bring-forward"/>The Great Company Skill</SecSubTitle>
          <SecTitle className="h1">Connecting People And Build Technology</SecTitle>
          <p className="mb-4 pb-1">Energistically evisculate an expanded array of meta-services after cross-media strategic theme areas. Interactively simplify interactive customer service before fully tested relationship parallel task high standards...</p>
          <ProgressOne title="Business Security" now={60}/>
          <ProgressOne title="Career Development" now={88}/>
          <ProgressOne title="Business Inovation" now={90}/>
        </div>
      </div>
    </div>
  </div>
);

export default AboutTwo;