import React, {Fragment} from 'react';
import {Seo, Breadcrumb, ScrollTopBtn} from '../components';
import {
  HeaderOne,
  ProjectSingle,HeaderThree,
  FooterOne,FooterTwo
} from '../containers';

const ProjectDetails = ()=> (
  <Fragment>
    <Seo title="Project Details" />
    <HeaderThree />
    <Breadcrumb pageName="Project Details" bgImage="images/breadcumb/breadcumb-bg.jpg" />
    <ProjectSingle className="space-top space-extra-bottom"/>
    <FooterTwo/>
    <ScrollTopBtn/>
  </Fragment>
);

export default ProjectDetails;