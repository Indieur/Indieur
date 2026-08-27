import React from "react";
import { Link } from "react-router-dom";

const growthPhases = [
  {
    number: "01",
    title: "Diagnose",
    subtitle: "Find where growth is leaking",
    items: [
      "Business and marketing discovery",
      "Audience, offer and competitor review",
      "Website and conversion-journey analysis",
      "Advertising, SEO, social and WhatsApp review",
      "Tracking and data-quality assessment",
      "Priority leakage identification",
    ],
  },
  {
    number: "02",
    title: "Build & Test",
    subtitle: "Test the highest-value opportunities",
    items: [
      "Correct essential tracking gaps",
      "Select the highest-priority channels",
      "Prepare campaign and journey improvements",
      "Launch controlled tests",
      "Review creative, audience, keyword and offer response",
      "Improve enquiry or purchase follow-ups",
    ],
  },
  {
    number: "03",
    title: "Learn & Scale",
    subtitle: "Turn results into a growth direction",
    items: [
      "Compare channel and campaign performance",
      "Identify meaningful customer actions",
      "Improve the strongest-performing areas",
      "Document findings and limitations",
      "Build the next-stage growth roadmap",
      "Recommend what to scale, stop or test next",
    ],
  },
];

const Growth90Day = () => {
  return (
    <section className="growth-90-section">
      <div className="growth-90-bg-circle growth-90-bg-circle-one"></div>
      <div className="growth-90-bg-circle growth-90-bg-circle-two"></div>

      <div className="container">
        <div className="growth-90-header">
          <span className="growth-90-eyebrow">
            OUR FLAGSHIP GROWTH ENGAGEMENT
          </span>

          <h2>
            The <span>90-Day</span> Growth
            <br />
            Testing System
          </h2>

          <p>
            For businesses that know they need growth but are unsure which
            channel, campaign, customer journey or marketing activity should
            receive the highest priority.
          </p>
        </div>

        <div className="growth-90-intro">
          <div className="growth-90-intro-line"></div>

          <p>
            Instead of committing to disconnected long-term activities, we use
            90 days to examine the current system, establish measurement, test
            the most relevant opportunities and create a clearer growth
            direction.
          </p>
        </div>

        <div className="growth-90-main">
          {/* LEFT - 90 DAYS VISUAL */}
          <div className="growth-90-visual">
            <div className="growth-90-orbit growth-90-orbit-one"></div>
            <div className="growth-90-orbit growth-90-orbit-two"></div>

            <div className="growth-90-center">
              <span className="growth-90-center-small">YOUR</span>

              <strong>90</strong>

              <span className="growth-90-center-days">DAYS</span>
            </div>

            <div className="growth-90-label growth-90-label-one">
              <span>01</span>
              Diagnose
            </div>

            <div className="growth-90-label growth-90-label-two">
              <span>02</span>
              Test
            </div>

            <div className="growth-90-label growth-90-label-three">
              <span>03</span>
              Scale
            </div>
          </div>

          {/* RIGHT - PHASES */}
          <div className="growth-90-phases">
            {growthPhases.map((phase) => (
              <div className="growth-90-phase" key={phase.number}>
                <div className="growth-90-phase-number">
                  {phase.number}
                </div>

                <div className="growth-90-phase-content">
                  <div className="growth-90-phase-heading">
                    <div>
                      <span>PHASE {phase.number}</span>

                      <h3>{phase.title}</h3>

                      <p>{phase.subtitle}</p>
                    </div>

                    {/* <div className="growth-90-arrow">↗</div> */}
                  </div>

                  <div className="growth-90-items">
                    {phase.items.map((item, index) => (
                      <div className="growth-90-item" key={index}>
                        <span className="growth-90-check">✓</span>
                        <p>{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SCOPE NOTE */}
        <div className="growth-90-scope">
          <div className="growth-90-scope-icon">i</div>

          <div>
            <strong>Important scope note</strong>

            <p>
              We analyse the wider customer journey but implement only the
              highest-priority activities agreed within the 90-day scope.
              Extensive website development, high-volume content production,
              photography, video shoots, advanced integrations and other major
              production requirements are quoted separately.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="growth-90-cta">
          <div className="growth-90-cta-text">
            <span>READY TO FIND YOUR PRIORITIES?</span>

            <h3>
              Let's identify where your next growth opportunity lies.
            </h3>
          </div>

          <Link
            to="/contact"
            className="growth-90-button"
          >
            Check Your Eligibility
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Growth90Day;