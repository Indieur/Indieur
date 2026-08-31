import React from 'react';
import Slider from 'react-slick';
import {
  TitleWrap,
  SecTitle,
  SecSubTitle,
  PricePlanBoxOne
} from '../../components';

// Package Data
import pricePlanData from '../../data/pricePlan.json';

const PricePlanOne = ({ ...restProps }) => {

  let sliderRef = null;

  const settings = {
    infinite: true,
    arrows: false,
    centerMode: true,
    centerPadding: '0',
    autoplay: true,
    autoplaySpeed: 8000,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 767,
        settings: {
          centerMode: false,
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <>
      {/* ==========================================
          CUSTOM SLIDER CSS
      =========================================== */}
      <style>{`

        /* Main slider wrapper */
        .price-slider-wrapper {
          position: relative;
          width: 100%;
        }

        /* Bootstrap container becomes arrow parent */
        .price-slider-container {
          position: relative;
        }

        /* ==========================================
           ARROWS
        =========================================== */

        .price-slider-arrow {
          position: absolute;
          top: 37%;
          transform: translateY(-50%);

          width: 34px;
          height: 34px;

          padding: 0;
          margin: 0;

          border: none;
          border-radius: 50%;

          background: #155eef;
          color: #ffffff;

          display: flex;
          align-items: center;
          justify-content: center;

          cursor: pointer;

          z-index: 100;

          font-size: 11px;
          line-height: 1;

          box-shadow: 0 5px 15px rgba(21, 94, 239, 0.20);

          transition:
            background 0.25s ease,
            transform 0.25s ease,
            box-shadow 0.25s ease;
        }

        .price-slider-arrow i {
          line-height: 1;
          margin: 0;
        }

        .price-slider-arrow:hover {
          background: #0d4fd7;
          color: #ffffff;

          transform: translateY(-50%) scale(1.08);

          box-shadow: 0 7px 18px rgba(21, 94, 239, 0.30);
        }

        .price-slider-arrow:active {
          transform: translateY(-50%) scale(0.95);
        }

        .price-slider-arrow:focus {
          outline: none;
        }

        /* ==========================================
           ARROW POSITION
        =========================================== */

        .price-slider-prev {
          left: 0;
        }

        .price-slider-next {
          right: 0;
        }

        /* ==========================================
           TABLET
        =========================================== */

        @media (max-width: 1199px) {

          .price-slider-prev {
            left: 5px;
          }

          .price-slider-next {
            right: 5px;
          }

        }

        /* ==========================================
           MOBILE
        =========================================== */

        @media (max-width: 767px) {

          .price-slider-arrow {
            width: 30px;
            height: 30px;
            font-size: 9px;
          }

          .price-slider-prev {
            left: 6px;
          }

          .price-slider-next {
            right: 15px;
          }

        }

        /* ==========================================
           SMALL MOBILE
        =========================================== */

        @media (max-width: 480px) {

          .price-slider-arrow {
            width: 28px;
            height: 28px;
            font-size: 8px;
          }

          .price-slider-prev {
            left: 6px;
          }

          .price-slider-next {
            right: 15px;
          }

        }

      `}</style>


      {/* ==========================================
          PRICE PLAN SECTION
      =========================================== */}

      <div
        {...restProps}
        className={`price-plan-section ${restProps.className || ''}`}
      >

        {/* Section Heading */}
        <TitleWrap className="text-center">

          <SecSubTitle>
            WHAT WE CURRENTLY OFFER
          </SecSubTitle>

          <SecTitle className="text-capitalize h1">
            Growth Services for Indian Businesses
          </SecTitle>

        </TitleWrap>


        {/* ==========================================
            SLIDER
        =========================================== */}

        <div className="price-slider-wrapper">

          <div className="container price-slider-container">

            {/* ======================================
                LEFT ARROW
            ======================================= */}

            <button
              type="button"
              className="price-slider-arrow price-slider-prev"
              onClick={() => sliderRef?.slickPrev()}
              aria-label="Previous service"
            >
              <i className="fas fa-chevron-left"></i>
            </button>


            {/* ======================================
                PRICE PLAN SLIDER
            ======================================= */}

            <Slider
              ref={(slider) => {
                sliderRef = slider;
              }}
              className="row"
              {...settings}
            >

              {pricePlanData.map((plan, index) => (

                <PricePlanBoxOne
                  key={index}
                  id={index}
                  bgImage={plan.bgImage}
                  title={plan.title}
                  price={plan.price}
                  duration={plan.duration}
                  path={plan.path}
                >

                  {plan.features.map(
                    (planFeature, featureIndex) => (

                      <PricePlanBoxOne.Feature
                        key={featureIndex}
                        text={planFeature}
                        icon="far fa-check-circle"
                      />

                    )
                  )}

                </PricePlanBoxOne>

              ))}

            </Slider>


            {/* ======================================
                RIGHT ARROW
            ======================================= */}

            <button
              type="button"
              className="price-slider-arrow price-slider-next"
              onClick={() => sliderRef?.slickNext()}
              aria-label="Next service"
            >
              <i className="fas fa-chevron-right"></i>
            </button>

          </div>

        </div>

      </div>
    </>
  );
};

export default PricePlanOne;