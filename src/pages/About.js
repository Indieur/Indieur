import React, { Fragment } from 'react';
import { Seo, Breadcrumb, ScrollTopBtn } from '../components';
import {
  HeaderOne,
  FooterTwo,
  HeaderThree,
  ServiceFour,
  AboutSeven,
  CounterTwo,
  TeamTwo,
  TestimonialThree,
  CtaOne,
  BlogFour,
  FooterOne,
  GrowthPillars,
  HowWeWorkCapabilities
} from '../containers';


const About = () => (
  <Fragment>
    <Seo
      title="About Indieur | Digital Marketing & Growth Company"
      description="Learn how Indieur helps Indian businesses improve customer acquisition, digital advertising, search visibility, WhatsApp marketing, analytics and retention."
      keywords="digital marketing and growth company in India, digital growth agency India, performance marketing company India, marketing strategy consulting India, WhatsApp marketing company India, customer acquisition agency India, marketing analytics services India"
      canonical="https://indieur.com/about"
    />
    <HeaderThree />
    <Breadcrumb pageName="About Us" bgImage="images/breadcumb/breadcumb-bg.jpg" />
    {/* <ServiceFour className="space-top space-extra-bottom" /> */}
    <AboutSeven />
    <HowWeWorkCapabilities />
    <CounterTwo className="space" />
    {/* <TeamTwo className="space-top space-extra-bottom"/> */}
    <TestimonialThree className="space-top space-extra-bottom" />
    <CtaOne className="space" />
    <GrowthPillars />

    {/* <BlogFour className="space-top space-extra-bottom"/> */}
    <FooterTwo />
    <ScrollTopBtn />
  </Fragment>
);

export default About;