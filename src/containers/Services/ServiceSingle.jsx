import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { List } from '../../components';
import { SidebarTwo } from '../';
import { Link } from "react-router-dom";

const ServiceSingle = ({ service, ...restProps }) => {

  if (!service) {
    return (
      <div {...restProps}>
        <div className="container">
          <h2>Service Not Found</h2>
          <p>The requested service could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div {...restProps}>
      <div className="container">
        <div className="row flex-row-reverse">

          {/* MAIN CONTENT */}
          <div className="col-lg-8">

            {/* Main Service Image */}
            <div className="mb-3 pb-3">
              <img
                src={service.image}
                alt={service.title}
                className="w-100"
              />
            </div>

            {/* Heading */}
            <h2 className="h4">
              {service.heading}
            </h2>

            {/* Intro */}
            <p>{service.intro}</p>

            {/* What This Service Includes */}
            <div className="row gx-0 mb-4 pb-2 pt-3">

              {/* <div className="col-xl-6">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-100"
                />
              </div> */}

              <div className="col-xl-6">
                <div className="service-list-box">

                  <h3 className="h5 title">
                    {service.featuresTitle}
                  </h3>

                  <List className="list-style3">

                    {service.features?.map((feature, index) => (
                      <List.Item key={index}>
                        <i className="fal fa-check-circle" />
                        {feature}
                      </List.Item>
                    ))}

                  </List>

                </div>
              </div>

            </div>

            {/* Business Challenge */}
            <h3 className="h5">
              {service.challengeTitle}
            </h3>

            {service.challenge?.map((item, index) => (
              <p key={index}>
                {item}
              </p>
            ))}

            {/* Approach */}
            <h3 className="h5">
              {service.approachTitle}
            </h3>

            {service.approach?.map((item, index) => (
              <p key={index}>
                {item}
              </p>
            ))}

            {/* Service Features */}
            <h3 className="h5">
              {service.serviceFeaturesTitle}
            </h3>

            <List className="list-style3">

              {service.serviceFeatures?.map((feature, index) => (
                <List.Item key={index}>
                  <i className="fal fa-check-circle" />
                  {feature}
                </List.Item>
              ))}

            </List>

            {/* Important Service Note */}
            {service.importantServiceNote && (
              <div className="service-important-note mt-4 mb-4">

                <h3 className="h5">
                  {service.importantServiceNoteTitle}
                </h3>

                <p>
                  {service.importantServiceNote}
                </p>

              </div>
            )}

            {/* FAQs */}
            <h3 className="h5" style={{ marginTop: '2rem' }}>
              FAQs
            </h3>
            {service.faqs?.length > 0 && (
              <Accordion
                defaultActiveKey="0"
                className="accordion-style1 layout2"
              >

                {service.faqs.map((item, index) => (

                  <Accordion.Item
                    key={index}
                    eventKey={index.toString()}
                  >

                    <Accordion.Header>
                      {item.question}
                    </Accordion.Header>

                    <Accordion.Body>
                      <p>
                        {item.answer}
                      </p>
                    </Accordion.Body>

                  </Accordion.Item>

                ))}

              </Accordion>
            )}

            {/* CTA */}
            <div className="mt-5">

              <h3 className="h5">
                {service.ctaTitle}
              </h3>

              <Link
                to="/contact"
                className="vs-btn"
              >
                {service.ctaText}
                <i className="far fa-long-arrow-right" />
              </Link>

            </div>

          </div>

          {/* SIDEBAR */}
          <div className="col-lg-4">
            <SidebarTwo />
          </div>

        </div>
      </div>
    </div>
  );
};

export default ServiceSingle;