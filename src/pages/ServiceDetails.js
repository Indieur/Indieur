import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';

import {
  Seo,
  Breadcrumb,
  ScrollTopBtn
} from '../components';

import {
  HeaderThree,
  ServiceSingle,
  FooterTwo
} from '../containers';

import serviceData from '../data/service.json';
import serviceDetailsData from '../data/service-details.json';

const ServiceDetails = () => {

  const { slug } = useParams();

  const service = serviceData.find(
    item => item.slug === slug
  );

  const serviceDetails = serviceDetailsData.find(
    item => item.slug === slug
  );

  const data = {
    ...service,
    ...serviceDetails
  };

  return (
    <Fragment>

      <Seo
        title={data?.title || 'Services Details'}
      />

      <HeaderThree />

      <Breadcrumb
        pageName={data?.title || 'Services Details'}
        bgImage="/images/breadcumb/breadcumb-bg.jpg"
        serviceDetails={true}
      />

      <ServiceSingle
        service={data}
        className="space-top space-extra-bottom"
      />

      <FooterTwo />

      <ScrollTopBtn />

    </Fragment>
  );
};

export default ServiceDetails;