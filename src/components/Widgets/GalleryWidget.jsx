import React from 'react'; 

const GalleryWidget = ({children})=> (
  <div className="sidebar-gallery">{children}</div>
);

GalleryWidget.Item = ({src, alt})=> (
  <div className="gallery-thumb">
    <img src={src} alt={alt} className="w-100"/>
  </div>
);

export default GalleryWidget;