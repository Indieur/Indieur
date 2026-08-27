import React, {Fragment} from 'react';
import {Seo, Breadcrumb, ScrollTopBtn} from '../components';
import {
  HeaderOne,HeaderThree,
  TeamFour,
  CtaOne,
  AboutTwo,
  FooterOne,FooterTwo
} from '../containers';

const Team = ()=> (
  <Fragment>
    <Seo title="Team" />
    <HeaderThree />
    <Breadcrumb pageName="Team" bgImage="images/breadcumb/breadcumb-bg.jpg" />
    <TeamFour className="space-top space-extra-bottom"/>
    <CtaOne className="space"/>
    <AboutTwo className="space-top space-extra-bottom background-image" style={{backgroundImage: 'url(images/bg/skill-bg-2-1.jpg)'}} />
    <FooterTwo/>
    <ScrollTopBtn/>
  </Fragment>
);

export default Team;