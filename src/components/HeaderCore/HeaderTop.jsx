import React from 'react';

const HeaderTop = ({children}) => (
  <div className="header-top">
    <div className="container">
      <div className="row align-items-center justify-content-between text-center text-lg-start">
        {children}
      </div>
    </div>
  </div>
);

HeaderTop.Left = ({children})=> (
  <div className="col-md-auto text-center text-md-start">{children}</div>
);

HeaderTop.Right = ({children})=> (
  <div className="col-auto d-none d-md-block">{children}</div>
);


export default HeaderTop;