import React from 'react';

const BlogAuthor = ({image, name, designation, text})=> (
  <div className="blog-author">
    <div className="media-img">
      <img src={image} alt="Blog Author"/>
    </div>
    <div className="media-body">
      <h3 className="author-name h4">{name}</h3>
      <p className="author-degi">{designation}</p>
      <p className="author-text">{text}</p>
    </div>
  </div>
);

export default BlogAuthor;
