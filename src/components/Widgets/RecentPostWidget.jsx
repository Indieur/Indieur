import React from 'react';
import { Link } from 'react-router-dom';

const RecentPostWidget = ({title, image, date, path = "#"})=> (
  <div className="recent-post">
    <div className="media-img">
      <Link to={path}><img src={image} alt="Blog"/></Link>
    </div>
    <div className="media-body">
      <h4 className="post-title"><Link className="text-inherit" to={path}>{title}</Link></h4>
      <div className="recent-post-meta">
        <Link to={path}>{date}</Link>
      </div>
    </div>
  </div>  
);

export default RecentPostWidget;