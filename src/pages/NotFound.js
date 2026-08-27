import React, {Fragment} from 'react';
import {
  Seo,
  Breadcrumb,
  ScrollTopBtn
} from '../components';
import {
  HeaderOne,HeaderThree,
  NotFoundOne,
  FooterTwo
} from '../containers';

const NotFound = ()=> (
  <Fragment>
    <Seo title="Error Page" />
    <HeaderThree />
    <Breadcrumb pageName="Error Page" bgImage="images/breadcumb/breadcumb-bg.jpg" />
    <NotFoundOne />
    <FooterTwo/>
    <ScrollTopBtn/>
  </Fragment>
);

export default NotFound;