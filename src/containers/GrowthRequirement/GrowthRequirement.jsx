import React from "react";

const GrowthRequirement = () => {
  return (
    <section className="growth-requirement">
      <div className="container">

        <div className="growth-requirement__content">

          <div className="growth-requirement__eyebrow" style={{fontSize:'18px'}}>
            <span></span>
            LET'S DISCUSS YOUR GROWTH REQUIREMENT
            <span></span>
          </div>

          <h2>
            Tell Us What You Want to Improve
          </h2>

          <p style={{fontSize:'16px'}}>
            Whether you need support with digital advertising, SEO,
            social media, WhatsApp, analytics, ecommerce growth or
            lead generation, tell us about your business and current
            challenge.
          </p>

          <p className="growth-requirement__subtext" style={{fontSize:'18px'}}>
            We will review your requirement and contact you to discuss
            the most relevant next step.
          </p>

          {/* <button className="growth-requirement__button">
            Discuss Your Requirement
            <span>→</span>
          </button> */}

        </div>

      </div>
    </section>
  );
};

export default GrowthRequirement;