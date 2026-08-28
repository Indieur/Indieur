import React, {Fragment} from 'react';
import {Seo, Breadcrumb, ScrollTopBtn} from '../components';
import {HeaderOne,HeaderThree, BlogThree, FooterOne,FooterTwo} from '../containers';

const BlogGrid = () => (
  <Fragment>
    <Seo title="Blogs" />
    <HeaderThree />
    <Breadcrumb pageName="Blogs" bgImage="images/breadcumb/breadcumb-bg-new.jpg" />
    <BlogThree className="space-top space-extra-bottom"/>
    <FooterTwo/>
    <ScrollTopBtn/>
  </Fragment>
);

export default BlogGrid;