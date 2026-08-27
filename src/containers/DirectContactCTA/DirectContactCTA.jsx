import React from "react";

const DirectContactCTA = () => {
  return (
    <section className="direct-contact-cta">
      <div className="container">

        <div className="direct-contact-cta__box">

          {/* ==========================================
              LEFT CONTENT
          =========================================== */}

          <div className="direct-contact-cta__content">

            <div className="direct-contact-cta__eyebrow">
              <span></span>
              DIRECT CONTACT
            </div>

            <h2>
              Prefer to Speak
              <strong>With Us Directly?</strong>
            </h2>

            <p>
              Have a question or want to discuss your growth
              requirement directly? Reach us by phone, WhatsApp
              or email.
            </p>

          </div>


          {/* ==========================================
              RIGHT CONTACT
          =========================================== */}

          <div className="direct-contact-cta__contact">

            <div className="direct-contact-cta__details">

              {/* ========================================
                  PHONE / WHATSAPP
              ========================================= */}

              <div className="direct-contact-cta__detail">

                <div className="direct-contact-cta__icon">
                  ☎
                </div>

                <div className="direct-contact-cta__detail-content">

                  <span>PHONE / WHATSAPP</span>

                  <div className="direct-contact-cta__phone-list">

                    <a href="tel:+4915562461769">
                      <span>+49 15562 461769</span>
                    </a>

                    <a href="tel:+919965532994">
                      <span>+91 99655 32994</span>
                    </a>

                    <a href="tel:+918667696097">
                      <span>+91 866 769 6097</span>
                    </a>

                  </div>

                </div>

              </div>


              {/* ========================================
                  EMAIL
              ========================================= */}

              <div className="direct-contact-cta__detail">

                <div className="direct-contact-cta__icon">
                  @
                </div>

                <div className="direct-contact-cta__detail-content">

                  <span>EMAIL</span>

                  <a
                    href="mailto:info@indieur.com"
                    className="direct-contact-cta__email"
                  >
                    info@indieur.com
                  </a>

                </div>

              </div>

            </div>


            {/* ========================================
                BUTTONS
            ========================================= */}

            <div className="direct-contact-cta__buttons">

              <a
                href="https://wa.me/4915562461769"
                className="direct-contact-cta__button direct-contact-cta__button--primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact Us on WhatsApp
                <span>→</span>
              </a>

              <a
                href="mailto:info@indieur.com"
                className="direct-contact-cta__button direct-contact-cta__button--secondary"
              >
                Send an Email
                <span>→</span>
              </a>

            </div>

          </div>


          {/* ==========================================
              YELLOW DECORATIVE ELEMENT
          =========================================== */}

          <div className="direct-contact-cta__accent"></div>

        </div>

      </div>
    </section>
  );
};

export default DirectContactCTA;