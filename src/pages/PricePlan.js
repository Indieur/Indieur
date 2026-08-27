import React, {Fragment} from 'react';
import {Seo, Breadcrumb, ScrollTopBtn} from '../components';
import {
  HeaderOne,
  PricePlanTwo,
  CtaOne,
  BlogFour,HeaderThree,
  FooterOne,FooterTwo
} from '../containers';

const PricePlan = ()=> (
  <Fragment>
    <Seo title="Pricing Plans" />
    <HeaderThree />
    <Breadcrumb pageName="Pricing Plans" bgImage="images/breadcumb/breadcumb-bg.jpg" />
    <PricePlanTwo className="space-top space-extra-bottom"/>
    <CtaOne className="space"/>
    <BlogFour className="space-top space-extra-bottom"/>
    <FooterTwo/>
    <ScrollTopBtn/>
  </Fragment>
);

export default PricePlan;