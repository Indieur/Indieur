import React from "react";
import { Link } from "react-router-dom";

const processSteps = [
  {
    number: "01",
    title: "Understand",
    text: "We study your business, customers, offer, current marketing, available data, budget and operational readiness.",
  },
  {
    number: "02",
    title: "Diagnose",
    text: "We identify the most important acquisition, conversion, tracking and retention gaps.",
  },
  {
    number: "03",
    title: "Prioritise",
    text: "We recommend what should be addressed now, what should be tested next and what can wait.",
  },
  {
    number: "04",
    title: "Implement",
    text: "The approved campaigns, tracking improvements, customer journeys and marketing activities are executed within a defined scope.",
  },
  {
    number: "05",
    title: "Measure",
    text: "We monitor meaningful actions such as qualified enquiries, calls, WhatsApp conversations, purchases and repeat engagement.",
  },
  {
    number: "06",
    title: "Optimise",
    text: "Performance data is used to improve campaigns and recommend the next growth priorities.",
  },
];

const HowWeWork = () => {
  return (
    <section className="how-we-work-section">
      <div className="container">
        
        {/* Section Heading */}
        <div className="how-work-heading">
          <span className="how-work-eyebrow">
            HOW WE WORK
          </span>

          <h2>
            From Business Problem <br />
            <span>to Measurable Action</span>
          </h2>

          {/* <p>
            A structured approach that turns business challenges into
            focused marketing actions, measurable outcomes and continuous
            growth opportunities.
          </p> */}
        </div>

        {/* Process */}
        <div className="process-wrapper">
          <div className="process-line"></div>

          <div className="process-grid">
            {processSteps.map((step, index) => (
              <div
                className={`process-step ${
                  index % 2 !== 0 ? "process-step-alt" : ""
                }`}
                key={step.number}
              >
                <div className="process-number">
                  {step.number}
                </div>

                <div className="process-card">
                  <span className="process-small-number">
                    STEP {step.number}
                  </span>

                  <h3>{step.title}</h3>

                  <p>{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="how-work-cta">
          <Link to="/contact" className="how-work-btn">
            Start With a Growth Consultation
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;