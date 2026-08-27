import React from 'react';
import {Link} from 'react-router-dom';
import {Blog, Pagination} from '../../components/';

// blog Two data
import blogData from '../../data/blog.json'; 

const BlogThree = ({...restProps})=> (
  <div {...restProps}>   
    <div className="container">
      <div className="row">
        {blogData.map(post => (
          <div className="col-md-6 col-lg-4" key={post.id}>
            <Blog className="blog-style1">
              <Blog.Image path="/blog-details" src={post.featureImage} />
              <Blog.Body>
                <Blog.Meta>
                  <Link to="/blog"><i className="far fa-calendar"/>{post.date}</Link>
                  <Link to="/blog"><i className="fal fa-user"/>{post.authorName}</Link>
                </Blog.Meta>
                <Blog.Title className="h5" path="/blog-details">{post.title}</Blog.Title>
                <Link to="/blog-details" className="link-btn">Read Details <i className="far fa-arrow-right"></i></Link>
              </Blog.Body>
            </Blog>
          </div>
        ))} 
      </div>      
      <div className="pt-20 text-center">
        <Pagination />
      </div>
    </div>
  </div>
);

export default BlogThree;