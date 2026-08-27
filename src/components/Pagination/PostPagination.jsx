import React from 'react';
import {Link} from 'react-router-dom';

const PostPagination = ({className, children})=> (
  <div className={`post-pagination  ${className || ''}`}>
    <div className="row justify-content-between align-items-center">
      {children}
    </div>
  </div>
);

PostPagination.Post = ({className, image, title, path})=> (
  <div className={`col ${className || ''}`}>
    <div className="post-pagi-box">
      <Link to={path}><img src={image} alt="pagi"/></Link>
      <Link to={path}>{title}</Link>
    </div>
  </div>
);

PostPagination.Icon = ({className, name, path})=> (
  <div className={`col-auto d-none d-sm-block ${className || ''}`}>
    <Link className="pagi-icon" to={path}><i className={name}/></Link>
  </div>
);

export default PostPagination;

