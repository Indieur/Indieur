import React, { Fragment } from 'react';
import { Seo, Breadcrumb, ScrollTopBtn } from '../components';
import {
  HeaderOne,
  ServiceFive, HeaderThree,
  CtaOne,
  ProcessThree,
  TestimonialOne,
  FooterOne, FooterTwo, ServicesIntroduction,
  ServicesPageCTA
} from '../containers';

const Service = () => (
  <Fragment>
    <Seo
      title="Digital Marketing Services in India | Indieur"
      description="Explore Indieur’s digital marketing services, including Meta Ads, Google Ads, SEO, social media, WhatsApp automation, analytics, ecommerce growth and lead generation."
      keywords="digital marketing services in India, performance marketing services India, Meta Ads management India, Google Ads services India, SEO services India, WhatsApp marketing India, ecommerce marketing services, lead generation services India, digital marketing analytics"
      canonical="https://indieur.com/services"
    />
    <HeaderThree />
    <Breadcrumb pageName="Our Services" bgImage="images/breadcumb/breadcumb-bg.jpg" />
    <ServicesIntroduction />
    <ServiceFive className="space-top space-extra-bottom" />
    {/* <CtaOne className="space"/>
    <ProcessThree className="space-top space-extra-bottom"/>
    <TestimonialOne className="space-top space-extra-bottom"/> */}
    <ServicesPageCTA />
    <FooterTwo />
    <ScrollTopBtn />
  </Fragment>
);

export default Service;