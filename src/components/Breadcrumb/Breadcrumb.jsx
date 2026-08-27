import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({
  pageName,
  bgImage,
  serviceDetails = false
}) => (
  <div
    className="breadcumb-wrapper background-image"
    style={{
      backgroundImage: `url('${bgImage}')`
    }}
  >
    <div className="container z-index-common">
      <div className="breadcumb-content">

        <h3 style={{ color: '#fff' }}>
          {pageName}
        </h3>

        <div className="breadcumb-menu-wrap">
          <ul className="breadcumb-menu">

            <li>
              <Link to="/">Home</Link>
            </li>

            {serviceDetails ? (
              <li>
                <Link to="/service">Service</Link> / {pageName}
              </li>
            ) : (
              <li>
                {pageName}
              </li>
            )}

          </ul>
        </div>

      </div>
    </div>
  </div>
);

export default Breadcrumb;