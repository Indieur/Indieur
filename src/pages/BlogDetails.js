import React, {Fragment} from 'react';
import {
  Seo,
  Breadcrumb,
  ScrollTopBtn
} from '../components';
import {
  HeaderOne,HeaderThree,
  BlogSingle,
  FooterOne,FooterTwo
} from '../containers';

const BlogDetails = () => (
  <Fragment>
    <Seo title="Blog Details" />
    <HeaderThree />
    <Breadcrumb pageName="Blog Details" bgImage="images/breadcumb/breadcumb-bg.jpg" />
    <BlogSingle className="space-top space-extra-bottom"/>
    <FooterTwo/>
    <ScrollTopBtn/>
  </Fragment>
);

export default BlogDetails;