import React from "react";

const bestFitItems = [
  "D2C and ecommerce brands with existing products and fulfilment capacity",
  "Local and multi-location businesses seeking enquiries, store visits or WhatsApp sales",
  "Businesses already spending on advertising but lacking reliable tracking or results",
  "Healthcare, automotive, education and other high-customer-value service businesses",
  "B2B companies, manufacturers and exporters where each qualified opportunity has meaningful value",
  "Businesses that can respond promptly to leads and provide the required data and access",
];

const notFitItems = [
  "The business has no validated offer or operating budget",
  "There is no separate budget for advertising or necessary tools",
  "The team cannot respond to enquiries or fulfil orders",
  "Required platform access and business data cannot be shared",
  "Guaranteed leads, sales or ROAS are expected",
  "Unlimited multi-service execution is expected within a limited fee",
];

const journeyProblems = [
  {
    number: "01",
    title: "Offer",
    text: "The audience may not understand the offer.",
  },
  {
    number: "02",
    title: "Landing Page",
    text: "The landing page may not build enough trust.",
  },
  {
    number: "03",
    title: "Tracking",
    text: "Important actions may not be tracked.",
  },
  {
    number: "04",
    title: "Follow-Up",
    text: "Enquiries may not receive timely follow-up.",
  },
  {
    number: "05",
    title: "Sales",
    text: "The sales team may not know the lead source.",
  },
  {
    number: "06",
    title: "Retention",
    text: "Existing customers may not receive retention campaigns.",
  },
  {
    number: "07",
    title: "Reporting",
    text: "Reports may focus on clicks instead of business outcomes.",
  },
];

const BestFitSystem = () => {
  return (
    <section className="best-fit-system-section">

      {/* =====================================================
          PART 1 — BEST FIT
      ====================================================== */}

      <div className="best-fit-wrapper">
        <div className="container">

          <div className="best-fit-heading">
            <span className="best-fit-eyebrow">
              IS THIS THE RIGHT FIT?
            </span>

            <h2>
              Businesses We Can
              <br />
              <span>Help Grow</span>
            </h2>

            <p>
              Our approach works best when the business already has the
              foundations required to test, measure and act on meaningful
              growth opportunities.
            </p>
          </div>


          <div className="fit-comparison">

            {/* BEST FIT */}
            <div className="fit-column fit-column-good">

              <div className="fit-column-header">
                <div className="fit-header-icon">✓</div>

                <div>
                  <span>BEST FIT</span>
                  <h3>Best-Fit Businesses</h3>
                </div>
              </div>


              <div className="fit-list">

                {bestFitItems.map((item, index) => (
                  <div className="fit-item" key={index}>

                    <div className="fit-item-number">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="fit-item-check">
                      ✓
                    </div>

                    <p>{item}</p>

                  </div>
                ))}

              </div>

            </div>


            {/* NOT A FIT */}
            <div className="fit-column fit-column-bad">

              <div className="fit-column-header">
                <div className="fit-header-icon">×</div>

                <div>
                  <span>CONSIDER CAREFULLY</span>
                  <h3>This May Not Be the Right Fit If</h3>
                </div>
              </div>


              <div className="fit-list">

                {notFitItems.map((item, index) => (
                  <div className="fit-item" key={index}>

                    <div className="fit-item-number">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="fit-item-check">
                      ×
                    </div>

                    <p>{item}</p>

                  </div>
                ))}

              </div>

            </div>

          </div>

        </div>
      </div>


      {/* =====================================================
          PART 2 — WHY SYSTEM MATTERS
      ====================================================== */}

      <div className="system-matters-wrapper">

        <div className="system-matters-glow"></div>

        <div className="container">

          <div className="system-matters-heading">

            <span className="system-matters-eyebrow">
              WHY THE SYSTEM MATTERS
            </span>

            <h2>
              More Advertising Does Not Automatically
              <br />
              <span>Solve a Broken Customer Journey</span>
            </h2>

            <p>
              A campaign may be generating clicks while the actual problem
              exists somewhere else in the customer journey.
            </p>

          </div>


          {/* CUSTOMER JOURNEY */}

          <div className="journey-system">

            <div className="journey-line"></div>


            {journeyProblems.map((item, index) => (

              <div
                className="journey-step"
                key={item.number}
              >

                <div className="journey-number">
                  {item.number}
                </div>

                <div className="journey-card">

                  <span className="journey-step-label">
                    CUSTOMER JOURNEY
                  </span>

                  <h3>{item.title}</h3>

                  <p>{item.text}</p>

                </div>

              </div>

            ))}


            {/* AGENCY ROLE */}

            <div className="journey-agency">

              <div className="journey-agency-icon">
                <span>↗</span>
              </div>

              <div className="journey-agency-content">

                <span>
                  OUR ROLE
                </span>

                <h3>
                  Connect the system.
                  <br />
                  Improve the right areas.
                </h3>

                <p>
                  Our role is to connect these areas and help the business
                  invest in the right improvements — not simply increase
                  advertising spend.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default BestFitSystem;