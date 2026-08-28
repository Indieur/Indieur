import React, {Fragment} from 'react';
import {Seo, Breadcrumb, ScrollTopBtn} from '../components';
import {HeaderOne,HeaderThree, BlogOne, FooterOne,FooterTwo} from '../containers';

const Blog = () => (
  <Fragment>
    <Seo title="Blog List" />
    <HeaderThree />
    <Breadcrumb pageName="Blog List" bgImage="images/breadcumb/breadcumb-bg-new.jpg" />
    <BlogOne className="space-top space-extra-bottom"/>
    <FooterTwo/>
    <ScrollTopBtn/>
  </Fragment>
);

export default Blog;