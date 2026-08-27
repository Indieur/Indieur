import React, {Fragment} from 'react';
import {Seo, Breadcrumb, ScrollTopBtn} from '../components';
import {HeaderOne,HeaderThree, BlogThree, FooterOne,FooterTwo} from '../containers';

const BlogGrid = () => (
  <Fragment>
    <Seo title="Blog Grid" />
    <HeaderThree />
    <Breadcrumb pageName="Blog Grid" bgImage="images/breadcumb/breadcumb-bg.jpg" />
    <BlogThree className="space-top space-extra-bottom"/>
    <FooterTwo/>
    <ScrollTopBtn/>
  </Fragment>
);

export default BlogGrid;