import React from 'react';
import {Link} from 'react-router-dom';
import SidebarOne from '../Sidebars/SidebarOne';
import {
  Blog,
  BlogAuthor,
  BlockQuote,
  TagWidget,
  IconLink,
  PostPagination,
  CommentList,
  CommentForm
} from '../../components';

// Blog Comments
const blogComment = [
  {
    avater: 'images/blog/comment-author-1.jpg',
    author: 'Rosalina Kelian',
    date: '22 April, 2022',
    comment: 'Collaboratively empower multifunctional e-commerce for prospective applications. Seamlessly productivate plug-and-play markets whereas synergistic scenarios.',
    replies: [
      {
        avater: 'images/blog/comment-author-2.jpg',
        author: 'Tara sing',
        date: '26 April, 2022',
        comment: 'Competently provide access to fully researched methods of empowerment without sticky models. Credibly morph front-end niche markets.'
      }
    ]
  },
  {
    avater: 'images/blog/comment-author-3.jpg',
    author: 'John Deo',
    date: '23 April, 2022',
    comment: 'Collaboratively empower multifunctional e-commerce for prospective applications. Seamlessly productivate plug-and-play markets whereas synergistic scenarios.'
  }
]


const BlogSingle = ({className})=> (
  <section className={`vs-blog-wrapper blog-details ${className || ''}`}>
    <div className="container">
      <div className="row gx-40">
        <div className="col-lg-8">
          <Blog className="blog-single">            
            <Blog.Image src="images/blog/blog-s-1-5.jpg" alt="Thumb" />
            <Blog.Body>              
              <Blog.Meta>
                <Link to="/blog"><i className="far fa-calendar"/>24 Feb, 2022</Link>
                <Link to="/blog"><i className="fal fa-user"/>by admin</Link>
              </Blog.Meta>
              <Blog.Title>Global Business Goal Make Life Easy From Tech</Blog.Title>
              <p>Quickly predominate enabled technology and web-enabled schemas. Completely evisculate diverse communities whereas pandemic data. Quickly build covalent data after turnkey content. Distinctively reconceptualize customized growth strategies via prospective potentialities. Professionally pursue cutting-edge web-readiness vis-a-vis just in time infrastructures.</p>
              <p>Conveniently target client-based systems with turnkey sources. Collaboratively syndicate focused opportunities for interactive deliverables. Assertively initiate client-based infomediaries through collaborative mindshare. Completely create bleeding-edge meta-services through compelling functionalities. Distinctively redefine timely initiatives rather than resource maximizing value.</p>
              <BlockQuote 
                text="Holisticly build technologies expanded array relationships productize professional tailers rather mesh stand"
                author="William Benjamin"
              />
              <p>Professionally pursue cutting-edge web-readiness vis-a-vis just in time infrastructures. Conveniently target client-based systems with turnkey sources. Collaboratively syndicate focused opportunities for interactive deliverables. Assertively initiate client-based infomediaries through collaborative mindshare. Completely create bleeding-edge meta-services through compelling functionalities.</p>
              <div className="row mt-30">
                <div className="col-md-6 mb-30">
                  <img src="images/blog/blog-s-1-6.jpg" alt="Blog"/>
                </div>
                <div className="col-md-6 mb-30">
                  <img src="images/blog/blog-s-1-7.jpg" alt="Blog"/>
                </div>
              </div>
              <p>Quickly build covalent data after turnkey content. Distinctively reconceptualize customized growth strategies via prospective potentialities. Professionally pursue cutting-edge web-readiness vis-a-vis just in time infrastructures. Conveniently target client-based systems with turnkey sources.</p>
              <p>Collaboratively syndicate focused opportunities for interactive deliverables. Assertively initiate client-based infomediaries through collaborative mindshare create bleeding-edge meta-services</p>
              <Blog.Bottom>
                <Blog.BottomColumn columnTitle="Tags" >
                  <TagWidget>                    
                    <TagWidget.Item path="/blog">Lawyer</TagWidget.Item>
                    <TagWidget.Item path="/blog">Experts</TagWidget.Item>
                  </TagWidget>
                </Blog.BottomColumn>
                <Blog.BottomColumn columnTitle="Social Icon" >
                  <IconLink className="social-links">
                    <IconLink.Item icon="fab fa-facebook-f" path="/blog-details"/>
                    <IconLink.Item icon="fab fa-twitter" path="/blog-details"/>
                    <IconLink.Item icon="fab fa-instagram" path="/blog-details"/>
                    <IconLink.Item icon="fab fa-dribbble" path="/blog-details"/>
                  </IconLink>
                </Blog.BottomColumn>
              </Blog.Bottom>
              <PostPagination>
                <PostPagination.Post path="/blog-details" image="images/blog/page-1-1.jpg" title="Previous Post" className="prev"/>
                <PostPagination.Icon name="fas fa-th" path="/blog"/>
                <PostPagination.Post path="/blog-details" image="images/blog/page-1-2.jpg" title="Next Post" className="next"/>
              </PostPagination>
              <BlogAuthor 
                image="images/blog/blog-author.jpg"
                name="William Benjamin"
                designation="Author"
                text="Re-engineer multimedia based internal or organic sources for progressive vortals. Assertively leverage existing economically sound total linkage whereas global best practices."
              />
              <CommentList title="Comments" comment={blogComment}/>
              <CommentForm title="Leave a Comment" subtitle="Your email address will not be published. Required fields are marked*"/>
            </Blog.Body>
          </Blog>
        </div>
        <div className="col-lg-4">
          <SidebarOne />
        </div>
      </div>
    </div>
  </section>
);

export default BlogSingle;
