import React, {Fragment} from 'react';
import {Seo, Breadcrumb, ScrollTopBtn} from '../components';
import {
  HeaderOne,HeaderThree,
  TeamSingle,
  FooterOne,FooterTwo
} from '../containers';

const TeamDetails = ()=> (
  <Fragment>
    <Seo title="Team Details" />
    <HeaderThree />
    <Breadcrumb pageName="Team Details" bgImage="images/breadcumb/breadcumb-bg.jpg" />
    <TeamSingle className="space-top space-extra-bottom"/>
    <FooterTwo/>
    <ScrollTopBtn/>
  </Fragment>
);

export default TeamDetails;