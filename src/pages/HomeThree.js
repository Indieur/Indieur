import React, { Fragment } from 'react';
import {Seo, ScrollTopBtn} from '../components';
import {
  HeaderFour,
  HeroThree,
  ServiceThree,
  CounterThree,
  AboutFive,
  CtaOne,
  AboutSix,
  TeamThree,
  ProjectTwo,
  ProcessTwo,
  TestimonialTwo,
  BrandOne,
  BlogFive,
  FooterThree
} from '../containers';

const HomeThree = ()=> (
  <Fragment>
    <Seo title="Home Three" />
    <HeaderFour/>
    <HeroThree/>
    <ServiceThree className="space-top space-extra-bottom"/>
    <CounterThree className="space"/>
    <AboutFive className="space-top space-extra-bottom"/>
    <CtaOne className="space"/>
    <AboutSix className="space"/>
    <TeamThree className="space-top space-extra-bottom"/>
    <ProjectTwo className="space"/>
    <ProcessTwo className="space-top space-extra-bottom"/>
    <TestimonialTwo className="space-top space-extra-bottom"/>
    <BrandOne className="space background-image" style={{backgroundImage: 'url(images/bg/brand-bg-2-2.jpg)'}}/>
    <BlogFive className="space-top space-extra-bottom"/>
    <FooterThree/>
    <ScrollTopBtn/>
  </Fragment>
);

export default HomeThree;