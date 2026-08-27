import React from 'react';
import {Link} from 'react-router-dom';
import Slider from 'react-slick';
import {
  Blog,
  SecSubTitle,
  SecTitle,
  TitleWrap
} from '../../components/';

// blog Two data
import blogData from '../../data/blog.json'; 

const BlogFour = ({...restProps})=> {
  const settings = {
    autoplay: true,
    autoplaySpeed: 8000,
    infinite: true,
    arrows: false,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {          
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 992,
        settings: {          
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 767,
        settings: {          
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div {...restProps}>   
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-xl-6">
            <TitleWrap>
              <SecSubTitle>Weekly Updates</SecSubTitle>
              <SecTitle className="text-capitalize h1">Weekly Latest Updates</SecTitle>
            </TitleWrap>
          </div>
        </div>
        <Slider className="row" {...settings}>
          {blogData.map(post => (
            <Blog className="blog-style1" key={post.id}>
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
            ))}
        </Slider>        
      </div>
    </div>
  );
}

export default BlogFour;