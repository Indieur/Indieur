import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = ({
  title,
  description,
  keywords,
  canonical
}) => {
  return (
    <Helmet>
      <title>{title}</title>

      <meta
        name="description"
        content={description}
      />

      <meta
        name="keywords"
        content={keywords}
      />

      <link
        rel="canonical"
        href={canonical}
      />
    </Helmet>
  );
};

export default SEO;