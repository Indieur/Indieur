import React from 'react';
import { Link } from 'react-router-dom';

import serviceData from '../../data/service.json';

const SidebarTwo = () => (
  <>
    <style>
      {`
        .custom-sidebar {
          width: 100%;
        }

        /* =========================
           COMMON WIDGET
        ========================= */
        .custom-sidebar-widget {
          background: #f4f7fb;
          border-radius: 4px;
          padding: 28px 25px;
          margin-bottom: 25px;
          border: 1px solid #e6ebf2;
        }

        .custom-sidebar-title {
          position: relative;
          margin: 0 0 22px;
          padding-bottom: 14px;
          color: #111827;
          font-size: 20px;
          line-height: 1.3;
          font-weight: 700;
        }

        .custom-sidebar-title::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 42px;
          height: 3px;
          border-radius: 3px;
          background: #1769ff;
        }

        /* =========================
           ALL SERVICES
        ========================= */
        .custom-service-list {
          list-style: none !important;
          margin: 0 !important;
          padding: 0 !important;
        }

        .custom-service-list li {
          list-style: none !important;
          margin: 0 !important;
          padding: 0 !important;
          border-bottom: 1px solid #e1e7ef;
        }

        .custom-service-list li:last-child {
          border-bottom: none;
        }

        .custom-service-link {
          display: flex !important;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          width: 100%;
          padding: 12px 0 !important;
          color: #26364d !important;
          font-size: 14px;
          line-height: 1.45;
          font-weight: 500;
          text-decoration: none !important;
          transition: all 0.25s ease;
        }

        .custom-service-link:hover {
          color: #1769ff !important;
          padding-left: 5px !important;
        }

        .custom-service-name {
          flex: 1;
        }

        .custom-service-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 25px;
          height: 25px;
          flex-shrink: 0;
          border-radius: 50%;
          background: #e8f0ff;
          color: #1769ff;
          font-size: 11px;
          transition: all 0.25s ease;
        }

        .custom-service-link:hover .custom-service-arrow {
          background: #1769ff;
          color: #fff;
          transform: translateX(3px);
        }

        /* =========================
           BUSINESS HOURS
        ========================= */
        .custom-hours {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .custom-hour {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 13px 0;
          border-bottom: 1px solid #e1e7ef;
        }

        .custom-hour:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .custom-hour:first-child {
          padding-top: 0;
        }

        .custom-hour-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          flex-shrink: 0;
          border-radius: 50%;
          background: #e8f0ff;
          color: #1769ff;
          font-size: 13px;
        }

        .custom-hour-content {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .custom-hour-day {
          color: #26364d;
          font-size: 13px;
          font-weight: 600;
        }

        .custom-hour-time {
          color: #68768a;
          font-size: 12px;
          font-weight: 400;
        }

        /* =========================
           ENQUIRY CARD
        ========================= */
        .custom-enquiry {
          position: relative;
          overflow: hidden;
          padding: 32px 25px;
          background: linear-gradient(
            135deg,
            #1769ff 0%,
            #0d5be8 100%
          );
          border: none;
          border-radius: 5px;
          color: #fff;
        }

        .custom-enquiry::before {
          content: "";
          position: absolute;
          width: 120px;
          height: 120px;
          right: -55px;
          top: -55px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
        }

        .custom-enquiry::after {
          content: "";
          position: absolute;
          width: 80px;
          height: 80px;
          left: -40px;
          bottom: -40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.06);
        }

        .custom-enquiry-content {
          position: relative;
          z-index: 1;
        }

        .custom-enquiry-title {
          margin: 0 0 12px;
          color: #fff;
          font-size: 22px;
          line-height: 1.3;
          font-weight: 700;
        }

        .custom-enquiry-text {
          margin: 0 0 22px;
          color: rgba(255, 255, 255, 0.88);
          font-size: 13px;
          line-height: 1.7;
        }

        .custom-enquiry-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 17px;
          background: #fff;
          border-radius: 3px;
          color: #1769ff !important;
          font-size: 12px;
          line-height: 1;
          font-weight: 700;
          text-decoration: none !important;
          transition: all 0.25s ease;
        }

        .custom-enquiry-button:hover {
          background: #111827;
          color: #fff !important;
        }

        .custom-enquiry-button i {
          transition: transform 0.25s ease;
        }

        .custom-enquiry-button:hover i {
          transform: translateX(3px);
        }

        /* =========================
           MOBILE
        ========================= */
        @media (max-width: 991px) {
          .custom-sidebar-widget {
            padding: 25px 22px;
          }
        }

        @media (max-width: 575px) {
          .custom-sidebar-widget {
            padding: 22px 20px;
          }

          .custom-sidebar-title {
            font-size: 18px;
          }

          .custom-service-link {
            font-size: 13px;
          }

          .custom-enquiry-title {
            font-size: 20px;
          }
        }
      `}
    </style>

    <div className="custom-sidebar">

      {/* =========================
          ALL SERVICES
      ========================= */}
      <div className="custom-sidebar-widget">

        <h3 className="custom-sidebar-title">
          All Services
        </h3>

        <ul className="custom-service-list">

          {serviceData.map((service) => (
            <li key={service.id}>

              <Link
                to={service.path}
                className="custom-service-link"
              >

                <span className="custom-service-name">
                  {service.title}
                </span>

                <span className="custom-service-arrow">
                  <i className="far fa-arrow-right" />
                </span>

              </Link>

            </li>
          ))}

        </ul>

      </div>


      {/* =========================
          BUSINESS HOURS
      ========================= */}
      <div className="custom-sidebar-widget">

        <h3 className="custom-sidebar-title">
          Business Hours
        </h3>

        <div className="custom-hours">

          <div className="custom-hour">

            <div className="custom-hour-icon">
              <i className="far fa-clock" />
            </div>

            <div className="custom-hour-content">
              <span className="custom-hour-day">
                Monday – Friday
              </span>

              <span className="custom-hour-time">
                9:00 am – 6:00 pm
              </span>
            </div>

          </div>


          <div className="custom-hour">

            <div className="custom-hour-icon">
              <i className="far fa-clock" />
            </div>

            <div className="custom-hour-content">
              <span className="custom-hour-day">
                Saturday
              </span>

              <span className="custom-hour-time">
                8:00 am – 12:00 pm
              </span>
            </div>

          </div>


          <div className="custom-hour">

            <div className="custom-hour-icon">
              <i className="far fa-calendar-times" />
            </div>

            <div className="custom-hour-content">
              <span className="custom-hour-day">
                Sunday
              </span>

              <span className="custom-hour-time">
                Closed
              </span>
            </div>

          </div>

        </div>

      </div>


      {/* =========================
          ENQUIRY CARD
      ========================= */}
      <div className="custom-enquiry">

        <div className="custom-enquiry-content">

          <h3 className="custom-enquiry-title">
            Have a Growth Requirement?
          </h3>

          <p className="custom-enquiry-text">
            Tell us what you are trying to improve, and we
            will recommend the most relevant service route.
          </p>

          <Link
            to="/contact"
            className="custom-enquiry-button"
          >
            Request a Quote
            <i className="far fa-long-arrow-right" />
          </Link>

        </div>

      </div>

    </div>
  </>
);

export default SidebarTwo;