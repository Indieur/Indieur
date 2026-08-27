import React from "react";

const growthPillars = [
  {
    number: "01",
    tag: "BRING THE RIGHT PEOPLE IN",
    title: "Customer Acquisition",
    text: "Reach relevant prospects using Meta Ads, Google Ads, search visibility and carefully selected digital channels.",
    cta: "Explore Acquisition Services",
    path: "/services/acquisition",
    icon: "↗",
  },
  {
    number: "02",
    tag: "TURN INTEREST INTO ACTION",
    title: "Conversion & Follow-Up",
    text: "Improve landing journeys, lead handling, WhatsApp communication and the path from interest to action.",
    cta: "Explore Conversion Services",
    path: "/services/conversion",
    icon: "→",
  },
  {
    number: "03",
    tag: "BUILD WHAT HAPPENS NEXT",
    title: "Retention & Measurement",
    text: "Strengthen repeat purchases, customer communication, analytics, conversion tracking and performance reporting.",
    cta: "Explore Retention Services",
    path: "/services/retention",
    icon: "↻",
  },
];

const GrowthPillars = () => {
  return (
    <section className="growth-pillars-section">

      <div className="growth-pillars-bg"></div>

      <div className="container">

        {/* ==============================
            HEADING
        =============================== */}

        <div className="growth-pillars-heading">

          <span className="growth-pillars-eyebrow">
            WHAT WE HELP BUSINESSES IMPROVE
          </span>

          <h2>
            Growth Is More Than
            <br />
            <span>Getting More Traffic</span>
          </h2>

          <p>
            We help businesses improve the connected system behind acquisition,
            conversion, follow-up, retention and measurement.
          </p>

        </div>


        {/* ==============================
            GROWTH PATH
        =============================== */}

        <div className="growth-pillars-path">

          <div className="growth-pillars-line">
            <span></span>
            <span></span>
          </div>


          <div className="growth-pillars-grid">

            {growthPillars.map((pillar) => (

              <article
                className="growth-pillar-card"
                key={pillar.number}
              >

                {/* Number */}

                <div className="growth-pillar-top">

                  <div className="growth-pillar-number">
                    {pillar.number}
                  </div>
{/* 
                  <div className="growth-pillar-icon">
                    {pillar.icon}
                  </div> */}

                </div>


                {/* Content */}

                <div className="growth-pillar-content">

                  <span className="growth-pillar-tag">
                    {pillar.tag}
                  </span>

                  <h3>
                    {pillar.title}
                  </h3>

                  <p>
                    {pillar.text}
                  </p>

                </div>


                {/* CTA */}

                <a
                  href={pillar.path}
                  className="growth-pillar-link"
                >
                  <span>{pillar.cta}</span>
                </a>

              </article>

            ))}

          </div>

        </div>


        {/* ==============================
            BOTTOM STATEMENT
        =============================== */}

        <div className="growth-pillars-bottom">

          <div className="growth-pillars-bottom-line"></div>

          <p style={{fontSize:'14px'}}>
            The goal is not simply to increase activity.
            <strong>
              It is to improve the parts of the growth system that matter most.
            </strong>
          </p>

        </div>

      </div>

    </section>
  );
};

export default GrowthPillars;