import React, {Fragment} from 'react';
import {Seo, Breadcrumb, ScrollTopBtn} from '../components';
import {HeaderOne,HeaderThree, BlogOne, FooterOne,FooterTwo} from '../containers';

const Blog = () => (
  <Fragment>
    <Seo 
  title="Digital Marketing Blog | SEO, Ads, Branding & Growth | Indieur"
  description="Read Indieur's digital marketing blog for practical insights on SEO, Google Ads, Meta Ads, branding, social media marketing, ecommerce growth and business strategy."
  keywords="digital marketing blog India, SEO blog India, digital marketing tips, SEO tips India, Google Ads tips, Meta Ads tips, social media marketing tips, branding strategy, brand positioning, brand identity, ecommerce marketing tips, digital marketing strategy, online marketing tips, business growth strategies, performance marketing tips, marketing automation, lead generation strategies"
/>
    <HeaderThree />
    <Breadcrumb pageName="Blogs" bgImage="images/breadcumb/breadcumb-bg-new.jpg" />
    <BlogOne className="space-top space-extra-bottom"/>
    <FooterTwo/>
    <ScrollTopBtn/>
  </Fragment>
);

export default Blog;