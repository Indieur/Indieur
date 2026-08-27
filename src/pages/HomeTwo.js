import React, { Fragment } from 'react';
import {Seo, ScrollTopBtn} from '../components';
import {
  HeaderThree,
  HeroTwo,
  FeatureTwo,
  AboutThree,
  TeamTwo,
  CounterTwo,
  AboutFour,
  ServiceTwo,
  ProjectOne,
  PricePlanOne,
  ContactOne,
  FaqOne,
  BlogFour,
  BrandTwo,
  FooterTwo,
  HowWeWork,
  Growth90Day,
  BestFitSystem
} from '../containers';
import FinalGrowthCTA from '../containers/FinalGrowthCTA/FinalGrowthCTA';

const HomeTwo = ()=> (
  <Fragment>
    <Seo
  title="Digital Marketing & Growth Agency in India | Indieur"
  description="Grow your Indian business with Meta Ads, Google Ads, SEO, WhatsApp marketing, ecommerce growth, conversion tracking and customer-retention solutions."
  keywords="digital marketing agency in India, performance marketing agency India, Meta Ads agency India, Google Ads management India, WhatsApp marketing agency India, SEO agency India, ecommerce marketing agency India, lead generation agency India, digital growth agency India, marketing automation services India, Facebook Ads management, Instagram Ads management, Google PPC services, WhatsApp Business API setup, digital marketing for small businesses, ecommerce growth services, conversion tracking services, customer-retention marketing, marketing analytics and reporting, digital marketing consultation India"
  canonical="https://indieur.com/"
/>
    <HeaderThree/>
    <HeroTwo/>
    <FeatureTwo className="space-top"/>
    <AboutThree/>
    {/* <TeamTwo className="space-top space-extra-bottom"/> */}
    {/* <CounterTwo className="space" /> */}
    <AboutFour className="space space-extra-bottom"/>
    <ServiceTwo className="space space-extra-bottom"/>
    {/* <ProjectOne className="space-top"/> */}
     <HowWeWork/>
    <PricePlanOne className=" space-extra"/>
    <Growth90Day/>
    {/* <BestFitSystem/> */}
    <FinalGrowthCTA/>
     <ContactOne/>
      <FaqOne/>
    {/* <BlogFour className="space-top space-extra-bottom"/> */}
    {/* <BrandTwo className="space"/> */}
    <FooterTwo/>
    <ScrollTopBtn/>
  </Fragment>
);

export default HomeTwo;