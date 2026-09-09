import React from "react";
import "./StartHere.scss";
import { Link } from "react-router-dom";

const services = [
    {
        icon: "/images/performance.png",
        title: "Performance Marketing",
        description:
            "Generate qualified enquiries and measurable sales.",
        link: "service-details/growth-strategy-consulting",
    },
    {
        icon: "/images/website.png",
        title: "Website Building",
        description:
            "Build a fast, professional website designed to convert.",
        link: "service-details/website-building",
    },
    {
        icon: "/images/socialmedia.png",
        title: "Social Media Management",
        description:
            "Create a consistent brand presence with strategic content.",
        link: "service-details/social-media-content-marketing",
    },
];

const StartHere = () => {
    return (
        <section className="start-here">

            {/* =====================================================
          DECORATIVE DOTS
      ====================================================== */}

            <div className="start-here__dots start-here__dots--top">
                {Array.from({ length: 24 }).map((_, index) => (
                    <span key={index}></span>
                ))}
            </div>

            <div className="start-here__dots start-here__dots--bottom">
                {Array.from({ length: 24 }).map((_, index) => (
                    <span key={index}></span>
                ))}
            </div>


            {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

            <div className="start-here__container">


                {/* ===================================================
            HEADER
        ==================================================== */}

                <div className="start-here__header">

                    <div className="start-here__eyebrow">

                        <span className="start-here__eyebrow-line"></span>

                        <span>NOT SURE WHERE TO START?</span>

                        <span className="start-here__eyebrow-line"></span>

                    </div>


                    <h2 className="start-here__title">
                        Start Here.
                    </h2>


                    <p className="start-here__description">
                        Choose what your business needs today. If you’re unsure,
                        book a consultation and we’ll help you identify the right
                        starting point.
                    </p>

                </div>


                {/* ===================================================
            SERVICE CARDS
        ==================================================== */}

                <div className="start-here__services">

                    {services.map((service) => (
                        <a
                            href={service.link}
                            className="start-here__card"
                            key={service.title}
                        >

                            {/* Icon */}

                            <div className="start-here__icon-wrapper">

                                <img
                                    src={service.icon}
                                    alt={`${service.title} icon`}
                                    className="start-here__icon"
                                />

                            </div>


                            {/* Title */}

                            <h3 className="start-here__card-title">
                                {service.title}
                            </h3>


                            {/* Description */}

                            <p className="start-here__card-description">
                                {service.description}
                            </p>


                            {/* Link */}

                            <span className="start-here__card-link">
                                <span>Explore service</span>
                                <span className="start-here__card-link-arrow">
                                    →
                                </span>
                            </span>

                        </a>
                    ))}

                </div>


                {/* ===================================================
            BOTTOM CTA
        ==================================================== */}

                <div className="start-here__bottom">


                    {/* Language */}

                    <div className="start-here__language">
                        <div className="start-here__language-icon" aria-hidden="true">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M6.6 2.8L9.2 2.2C9.8 2.1 10.4 2.4 10.6 3L11.8 6.1C12 6.6 11.8 7.1 11.4 7.4L9.8 8.7C10.7 10.6 12.2 12.2 14.1 13.1L15.4 11.5C15.7 11.1 16.2 10.9 16.7 11.1L19.8 12.3C20.4 12.5 20.7 13.1 20.6 13.7L20 16.3C19.8 17.1 19.1 17.7 18.3 17.7C10.5 17.7 4.2 11.4 4.2 3.6C4.2 2.8 4.8 2.1 5.6 1.9L6.6 2.8Z"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>

                        <p>
                            Consultation support available in{" "}
                            <strong>
                                Tamil, English, Hindi and German.
                            </strong>
                        </p>

                    </div>


                    {/* CTA */}

                    <Link
                        to="https://calendar.app.google/FHDxrBZecPB5XVfB6"
                        className="start-here__cta"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span>
                            Book a Consultation
                        </span>

                        <span className="start-here__cta-arrow">
                            →
                        </span>
                    </Link>


                </div>

            </div>

        </section>
    );
};

export default StartHere;