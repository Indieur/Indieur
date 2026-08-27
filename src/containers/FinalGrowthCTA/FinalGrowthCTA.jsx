import React from "react";
import { Link } from "react-router-dom";
const clarityPoints = [
  "The most important gaps requiring attention",
  "Which channels deserve priority",
  "What can be improved immediately",
  "What should be tested next",
  "Which service route fits your current stage",
];

const FinalGrowthCTA = () => {
  return (
    <section className="final-growth-cta">

      {/* Decorative background */}
      <div className="final-growth-bg-circle final-growth-bg-circle-one"></div>
      <div className="final-growth-bg-circle final-growth-bg-circle-two"></div>

      <div className="container">

        <div className="final-growth-box">

          {/* =====================================
              LEFT CONTENT
          ====================================== */}

          <div className="final-growth-content">

            <span className="final-growth-eyebrow">
              READY TO FIND YOUR BIGGEST GROWTH GAPS?
            </span>

            <h2>
              Let’s Identify Where Your Business
              <span> May Be Losing Enquiries, Customers or Sales</span>
            </h2>

            <p className="final-growth-description">
              Book a focused consultation to review your current advertising,
              website journey, tracking, WhatsApp follow-ups and retention
              opportunities.
            </p>


            {/* =====================================
                CTA BUTTONS
            ====================================== */}

            <div className="final-growth-buttons">

              <Link
                to="https://calendar.app.google/FHDxrBZecPB5XVfB6"
                className="final-growth-primary-btn"
              >
                <span>Book a Growth Consultation</span>
                <i>→</i>
              </Link>

              <a
                href="https://wa.me/4915562461769"
                className="final-growth-whatsapp-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="final-growth-whatsapp-icon">
                  <i className="fab fa-whatsapp"></i>
                </span>

                <span>Send Us a WhatsApp Message</span>
              </a>

            </div>

          </div>


          {/* =====================================
              RIGHT VISUAL
          ====================================== */}

          <div className="final-growth-visual">

            <div className="final-growth-orbit final-growth-orbit-one"></div>

            <div className="final-growth-orbit final-growth-orbit-two"></div>

            <div className="final-growth-orbit final-growth-orbit-three"></div>


            <div className="final-growth-center">

              <span>GROWTH</span>

              <strong>CLARITY</strong>

              <small>START HERE</small>

            </div>


            {/* Floating points */}

            <div className="final-growth-floating final-growth-floating-one">
              <strong>01</strong>
              <span>Identify</span>
            </div>

            <div className="final-growth-floating final-growth-floating-two">
              <strong>02</strong>
              <span>Prioritise</span>
            </div>

            <div className="final-growth-floating final-growth-floating-three">
              <strong>03</strong>
              <span>Act</span>
            </div>

          </div>

        </div>


        {/* =====================================
            CLARITY POINTS
        ====================================== */}

        <div className="final-growth-clarity">

          <div className="final-growth-clarity-heading">

            <span>YOUR CONSULTATION SHOULD GIVE YOU</span>

            <h3>
              Clarity on what to do next.
            </h3>

          </div>


          <div className="final-growth-points">

            {clarityPoints.map((point, index) => (
              <div
                className="final-growth-point"
                key={index}
              >

                <div className="final-growth-point-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="final-growth-point-check">
                  ✓
                </div>

                <p style={{ fontSize: '15px' }}>{point}</p>

              </div>
            ))}

          </div>

        </div>


        {/* =====================================
            SMALL NOTE
        ====================================== */}

        <div className="final-growth-note">

          <span className="final-growth-note-icon">
            i
          </span>

          <p style={{ fontSize: '13px !important' }}>
            The initial consultation is designed to assess fit and identify
            priority opportunities. It is not a substitute for a complete
            marketing strategy or technical audit.
          </p>

        </div>

      </div>

    </section>
  );
};

export default FinalGrowthCTA;