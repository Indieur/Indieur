import React from 'react';
import {Link} from 'react-router-dom';
import {Blog, Pagination} from '../../components/';
import SidebarOne from '../Sidebars/SidebarOne';

// Blog Data
import blogdata from '../../data/blog.json';

const BlogOne = ({className})=> (
  <section className={`vs-blog-wrapper ${className || ''}`}>
    <div className="container">
      <div className="row gx-40">
        <div className="col-lg-8">
          {blogdata.slice(0, 5).map(post => (
            <Blog className="blog-single" key={post.id}>
              <Blog.Image path="/blog-details" src={post.image} />
              <Blog.Body>
                <Blog.Meta>
                  <Link to="/blog"><i className="far fa-calendar"/>{post.date}</Link>
                  <Link to="/blog"><i className="fal fa-user"/>{post.authorName}</Link>
                </Blog.Meta>
                <Blog.Title path="/blog-details">{post.title}</Blog.Title>
                <p>{post.text}</p>
                <Link to="/blog-details" className="link-btn">Read Details <i className="far fa-arrow-right"></i></Link>
              </Blog.Body>
            </Blog>
          ))}
          <Pagination/>
        </div>
        <div className="col-lg-4">
          <SidebarOne />
        </div>
      </div>
    </div>
  </section>
);

export default BlogOne;