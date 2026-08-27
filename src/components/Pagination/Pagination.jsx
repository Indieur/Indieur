import React from 'react';
import {Link} from 'react-router-dom';

const Pagination = ()=> (
  <div className="vs-pagination">
    <ul>
      <li><Link className="active" to="/blog">1</Link></li>
      <li><Link to="/blog">2</Link></li>
      <li><Link to="/blog">3</Link></li>
      <li><Link to="/blog"><i className="far fa-arrow-right"/></Link></li>
    </ul>
  </div>
);

export default Pagination;