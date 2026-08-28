import React, {Fragment} from 'react';
import {Seo, Breadcrumb, ScrollTopBtn} from '../components';
import {
  HeaderOne, HeaderThree,
  ContactTwo, 
  FooterOne,FooterTwo,DirectContactCTA,GrowthRequirement
} from '../containers';

const Contact = () => (
  <Fragment>
    <Seo 
  title="Contact Indieur | Digital Marketing Agency in India"
  description="Get in touch with Indieur for SEO, Google Ads, Meta Ads, branding, social media marketing, WhatsApp marketing and digital growth solutions for your business."
  keywords="contact Indieur, digital marketing agency contact India, digital marketing consultation India, SEO consultation India, digital marketing services India, Google Ads agency India, Meta Ads agency India, branding agency India, social media marketing agency India, business growth consultation India"
/>
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