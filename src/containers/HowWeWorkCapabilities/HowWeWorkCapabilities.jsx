import React from "react";


const capabilities = [
  {
    number: "01",
    eyebrow: "STRATEGY",
    title: "Strategy & Growth Planning",
    text: "We study the business, audience, competition, customer journey and available data before recommending the right priorities.",
    accent: "blue",
    icon: "↗",
  },
  {
    number: "02",
    eyebrow: "EXECUTION",
    title: "Campaign Execution",
    text: "We plan, launch and optimise the agreed advertising, content, search and customer-engagement activities.",
    accent: "yellow",
    icon: "→",
  },
  {
    number: "03",
    eyebrow: "OPTIMISATION",
    title: "Tracking & Optimisation",
    text: "We measure important actions, review performance and use the findings to improve future decisions.",
    accent: "blue",
    icon: "↻",
  },
];

const HowWeWorkCapabilities = () => {
  return (
    <section className="how-work-capabilities">
      <div className="container">

        {/* ==========================================
            SECTION HEADER
        =========================================== */}

        <div className="how-work-capabilities__header">

          {/* Eyebrow */}
          <div className="how-work-capabilities__eyebrow">
            <span></span>
            HOW WE WORK
          </div>

          {/* Main heading + description */}
          <div className="how-work-capabilities__heading">

            <h2>
              Expertise Connected Around
              <strong>Your Business Goals</strong>
            </h2>

            <p>
              Our capabilities work together to create a more
              connected approach to business growth.
            </p>

          </div>

        </div>


        {/* ==========================================
            CAPABILITY CARDS
        =========================================== */}

        <div className="how-work-capabilities__stack">

          {capabilities.map((item) => (
            <article
              className={`how-work-capability how-work-capability--${item.accent}`}
              key={item.number}
            >

              {/* Number */}
              <div className="how-work-capability__number">
                {item.number}
              </div>


              {/* Content */}
              <div className="how-work-capability__content">

                <span className="how-work-capability__eyebrow">
                  {item.eyebrow}
                </span>

                <h3>
                  {item.title}
                </h3>

                <p>
                  {item.text}
                </p>

              </div>


              {/* Right visual */}
              <div className="how-work-capability__visual">


                {/* <span className="how-work-capability__arrow">
                  →
                </span> */}

              </div>

            </article>
          ))}

        </div>


        {/* ==========================================
            SUPPORTING LINE
        =========================================== */}

        <div className="how-work-capabilities__support">

          <div className="how-work-capabilities__support-icon">
            ✓
          </div>

          <div className="how-work-capabilities__support-content">

            <span>
              OUR DELIVERY PRINCIPLE
            </span>

            <p>
              Every engagement follows an agreed scope,
              defined responsibilities and clear reporting expectations.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
};

export default HowWeWorkCapabilities;