import React from "react";
const ServicesIntroduction = () => {
  return (
    <section className="services-introduction">
      <div className="container">

        <div className="services-introduction__content">

          {/* Eyebrow */}
          <div className="services-introduction__eyebrow" style={{fontSize:'18px'}}>
            <span></span>

            WHAT WE OFFER

            <span></span>
          </div>


          {/* Heading */}
          <h2>
            Digital Growth Services Built Around 
            <strong style={{ marginLeft: '5px' }}>Your Business</strong>
          </h2>


          {/* Description */}
          <p className="services-introduction__description" style={{fontSize:'18px'}}>
            Indieur helps businesses across India connect customer
            acquisition, conversion, communication, tracking and
            retention through a structured digital growth approach.
          </p>


          {/* Supporting text */}
          <p className="services-introduction__subtext" style={{fontSize:'15px'}}>
            You can engage us for one specialist requirement or discuss
            a coordinated plan covering multiple growth priorities.
          </p>

        </div>

      </div>
    </section>
  );
};

export default ServicesIntroduction;