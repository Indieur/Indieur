import React, {Fragment} from 'react';
import {Seo, Breadcrumb, ScrollTopBtn} from '../components';
import {
  HeaderOne, HeaderThree,
  ContactTwo, 
  FooterOne,FooterTwo,DirectContactCTA,GrowthRequirement
} from '../containers';

const Contact = () => (
  <Fragment>
    <Seo title="Contact Us" />
    <HeaderThree />
    <Breadcrumb pageName="Contact Us" bgImage="images/breadcumb/breadcumb-bg-new.jpg" />
    <GrowthRequirement />
    <ContactTwo className="space-top space-extra-bottom" />
    <DirectContactCTA />
    <FooterTwo/>
    <ScrollTopBtn/>
  </Fragment>
);

export default Contact;