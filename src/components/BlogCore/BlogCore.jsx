import React from 'react';
import {Link} from 'react-router-dom';

const Blog = ({className, children, ...restProps}) => (
  <div className={`vs-blog ${className || ''}`}  {...restProps}>
    {children}
  </div>
);

Blog.Image = ({src, alt, path}) => (
  <div className="blog-img">
    {path ? <Link to={path}><img src={src} alt="thumb"/></Link> : <img src={src} alt={alt}/>}
  </div>
);

Blog.Body = ({className, children}) => (
  <div className={`blog-content ${className || ''}`} >
    {children}
  </div>
);

Blog.Title = ({className, children, path}) => (
  <h2 className={`blog-title ${className || ''}`}>
    {path ? <Link to={path}>{children}</Link> : children}
  </h2>
);

Blog.Meta = ({className, children}) => (
  <div className={`blog-meta ${className || ''}`}>
    {children}
  </div>
);

Blog.Bottom = ({className, children}) => (
  <div className={`share-links clearfix ${className || ''}`}>
    <div className="row justify-content-between">
      {children}
    </div>
  </div>
);

Blog.BottomColumn = ({columnTitle, className, children}) => (
  <div className={`col-auto ${className || ''}`}>
    <span className="share-links-title">{columnTitle}</span>
    {children}
  </div>
);

export default Blog;