import React from "react";

const ServicesPageCTA = () => {
  return (
    <section className="services-page-cta">
      <div className="container">
        <div className="services-page-cta__content">

          {/* Eyebrow */}
          <div className="services-page-cta__eyebrow" style={{fontSize:'18px'}}>
            <span></span>
            NOT SURE WHICH SERVICE YOU NEED?
            <span></span>
          </div>

          {/* Heading */}
          <h2>
            Let’s Identify the Right{" "}
            <strong>Growth Priority</strong>
          </h2>

          {/* Description */}
          <p className="services-page-cta__description" style={{fontSize:'18px'}}>
            Tell us about your business, current marketing activities and
            biggest challenge. We will review your requirement and recommend
            the most suitable starting point.
          </p>

          {/* CTA Buttons */}
          <div className="services-page-cta__buttons" >

            <a
              href="/contact"
              className="services-page-cta__button services-page-cta__button--primary" style={{fontSize:'15px'}}
            >
              Book a Growth Consultation
              <span>→</span>
            </a>

            <a
              href="/contact"
              className="services-page-cta__button services-page-cta__button--secondary" style={{fontSize:'15px'}}
            >
              Request a Quote
              <span>→</span>
            </a>

          </div>

          {/* Contact */}
          <div className="services-page-cta__contact">

            <a href="mailto:info@indieur.com" style={{fontSize:'12px'}}>
              info@indieur.com
            </a>

            <span></span>

            <a href="tel:+4915562461769" style={{fontSize:'12px'}}>
              +49 15562 461769
            </a>

          </div>

        </div>
      </div>
    </section>
  );
};

export default ServicesPageCTA;