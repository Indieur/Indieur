import React, {Fragment} from 'react';
import {Seo, Breadcrumb, ScrollTopBtn} from '../components';
import {
  HeaderOne,HeaderThree,
  ProjectThree,
  FooterOne,FooterTwo
} from '../containers';

const Project = ()=> (
  <Fragment>
    <Seo title="Projects" />
    <HeaderThree />
    <Breadcrumb pageName="Projects" bgImage="images/breadcumb/breadcumb-bg.jpg" />
    <ProjectThree className="space-top space-extra-bottom"/>
    <FooterTwo/>
    <ScrollTopBtn/>
  </Fragment>
);

export default Project;