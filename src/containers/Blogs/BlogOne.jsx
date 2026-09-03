import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Blog, Pagination } from '../../components/';
import SidebarOne from '../Sidebars/SidebarOne';

// Blog Data
import blogdata from '../../data/blog.json';

const BlogOne = ({ className }) => {
  const location = useLocation();

  /* =========================================================
     GET CATEGORY FROM URL
     
     Example:
     /blogs
     /blogs?category=Build%20%26%20Develop
     ========================================================= */

  const searchParams = new URLSearchParams(location.search);

  const selectedCategory =
    searchParams.get('category') || '';

  /* =========================================================
     FILTER BLOGS BY CATEGORY
     ========================================================= */

  const filteredBlogs = useMemo(() => {
    // If no category is selected,
    // show all blogs
    if (!selectedCategory.trim()) {
      return blogdata;
    }

    const selected =
      selectedCategory.trim().toLowerCase();

    return blogdata.filter((post) => {

      /*
       * Support both:
       *
       * category: "Build & Develop"
       *
       * OR
       *
       * categories: ["Build & Develop"]
       */

      const category =
        post.category ||
        post.categories ||
        '';

      // If categories is an array
      if (Array.isArray(category)) {
        return category.some(
          (item) =>
            String(item)
              .trim()
              .toLowerCase() === selected
        );
      }

      // If category is a string
      return (
        String(category)
          .trim()
          .toLowerCase() === selected
      );
    });
  }, [selectedCategory]);

  /* =========================================================
     SHOW FIRST 5 BLOGS
     ========================================================= */

  const blogsToShow = filteredBlogs.slice(0, 5);

  return (
    <section
      className={`vs-blog-wrapper ${
        className || ''
      }`}
    >
      <div className="container">
        <div className="row gx-40">

          {/* =================================================
              BLOG CONTENT
          ================================================= */}

          <div className="col-lg-8">

            {/* =================================================
                CATEGORY HEADING
            ================================================= */}

            {selectedCategory && (
              <div
                className="blog-category-heading"
                style={{
                  marginBottom: '30px'
                }}
              >
                <h2>
                  {selectedCategory}
                </h2>

                <p>
                  Showing blogs from{' '}
                  <strong>
                    {selectedCategory}
                  </strong>{' '}
                  category.
                </p>
              </div>
            )}

            {/* =================================================
                BLOG POSTS
            ================================================= */}

            {blogsToShow.length > 0 ? (

              blogsToShow.map((post) => (

                <Blog
                  className="blog-single"
                  key={post.id}
                >

                  {/* =================================================
                      IMAGE
                  ================================================= */}

                  <Blog.Image
                    path={
                      post.slug
                        ? `/blog/${post.slug}`
                        : '/blog-details'
                    }
                    src={post.image}
                  />

                  <Blog.Body>

                    {/* =================================================
                        META
                    ================================================= */}

                    <Blog.Meta>

                      <Link to="/blogs">
                        <i className="far fa-calendar" />
                        {post.date}
                      </Link>

                      <Link to="/blogs">
                        <i className="fal fa-user" />
                        {post.authorName}
                      </Link>

                    </Blog.Meta>

                    {/* =================================================
                        TITLE
                    ================================================= */}

                    <Blog.Title
                      path={
                        post.slug
                          ? `/blog/${post.slug}`
                          : '/blog-details'
                      }
                    >
                      {post.title}
                    </Blog.Title>

                    {/* =================================================
                        DESCRIPTION
                    ================================================= */}

                    <p>
                      {post.text}
                    </p>

                    {/* =================================================
                        READ DETAILS
                    ================================================= */}

                    <Link
                      to={
                        post.slug
                          ? `/blog/${post.slug}`
                          : '/blog-details'
                      }
                      className="link-btn"
                    >
                      Read Details{' '}
                      <i className="far fa-arrow-right" />
                    </Link>

                  </Blog.Body>

                </Blog>

              ))

            ) : (

              /* =================================================
                 NO BLOGS FOUND
                 ================================================= */

              <div
                className="blog-no-results"
                style={{
                  padding: '50px 20px',
                  textAlign: 'center'
                }}
              >

                <h3>
                  No Blogs Found
                </h3>

                <p>
                  No blogs are available in the{' '}
                  <strong>
                    {selectedCategory}
                  </strong>{' '}
                  category.
                </p>

                <Link
                  to="/blogs"
                  className="vs-btn"
                >
                  View All Blogs
                </Link>

              </div>

            )}

            {/* =================================================
                PAGINATION
            ================================================= */}

            {blogsToShow.length > 0 && (
              <Pagination />
            )}

          </div>

          {/* =================================================
              SIDEBAR
          ================================================= */}

          <div className="col-lg-4">
            <SidebarOne />
          </div>

        </div>
      </div>
    </section>
  );
};

export default BlogOne;