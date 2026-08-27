import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Link,
  useLocation,
} from "react-router-dom";

import {
  Blog,
  Pagination,
} from "../../components";

import {
  getPublishedBlogs,
  searchBlogs,
  getBlogsByCategory,
  getBlogsByTag,
} from "../../services/blogService";


const BlogThree = ({
  className = "",
  ...restProps
}) => {

  const location = useLocation();


  /* =========================================================
     BLOG DATA
  ========================================================= */

  const [blogs, setBlogs] =
    useState([]);


  /* =========================================================
     LOADING
  ========================================================= */

  const [loading, setLoading] =
    useState(true);


  /* =========================================================
     ERROR
  ========================================================= */

  const [error, setError] =
    useState("");


  /* =========================================================
     CURRENT PAGE
  ========================================================= */

  const [currentPage, setCurrentPage] =
    useState(1);


  /* =========================================================
     BLOGS PER PAGE
  ========================================================= */

  const BLOGS_PER_PAGE = 6;


  /* =========================================================
     LOAD BLOGS
  ========================================================= */

  useEffect(() => {

    const loadBlogs = async () => {

      try {

        setLoading(true);
        setError("");


        const params =
          new URLSearchParams(
            location.search
          );


        const search =
          params.get("search");


        const category =
          params.get("category");


        const tag =
          params.get("tag");


        let data;


        /* =====================================================
           SEARCH
        ===================================================== */

        if (search) {

          data =
            await searchBlogs(search);

        }


        /* =====================================================
           CATEGORY
        ===================================================== */

        else if (category) {

          data =
            await getBlogsByCategory(
              category
            );

        }


        /* =====================================================
           TAG
        ===================================================== */

        else if (tag) {

          data =
            await getBlogsByTag(
              tag
            );

        }


        /* =====================================================
           ALL PUBLISHED BLOGS
        ===================================================== */

        else {

          data =
            await getPublishedBlogs();

        }


        setBlogs(
          Array.isArray(data)
            ? data
            : []
        );


        /* Reset pagination */

        setCurrentPage(1);


      } catch (err) {

        console.error(
          "Blog loading error:",
          err
        );


        setError(
          "Unable to load blogs."
        );


        setBlogs([]);

      } finally {

        setLoading(false);

      }

    };


    loadBlogs();

  }, [location.search]);


  /* =========================================================
     PAGINATION
  ========================================================= */

  const totalPages =
    Math.ceil(
      blogs.length /
      BLOGS_PER_PAGE
    );


  /* =========================================================
     CURRENT BLOGS
  ========================================================= */

  const currentBlogs =
    useMemo(() => {

      const startIndex =
        (currentPage - 1) *
        BLOGS_PER_PAGE;


      const endIndex =
        startIndex +
        BLOGS_PER_PAGE;


      return blogs.slice(
        startIndex,
        endIndex
      );

    }, [
      blogs,
      currentPage,
    ]);


  /* =========================================================
     PAGE CHANGE
  ========================================================= */

  const handlePageChange =
    (page) => {

      if (
        page < 1 ||
        page > totalPages
      ) {
        return;
      }


      setCurrentPage(page);


      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    };


  /* =========================================================
     URL FILTERS
  ========================================================= */

  const params =
    new URLSearchParams(
      location.search
    );


  const search =
    params.get("search");


  const category =
    params.get("category");


  const tag =
    params.get("tag");


  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {

    return (

      <div
        {...restProps}
        className={`dynamic-blog-three ${className}`}
      >

        <div className="container">

          <div className="dynamic-blog-loading">

            <div className="dynamic-blog-spinner" />

            <p>
              Loading blogs...
            </p>

          </div>

        </div>


        <style>
          {blogThreeCSS}
        </style>

      </div>

    );

  }


  /* =========================================================
     ERROR
  ========================================================= */

  if (error) {

    return (

      <div
        {...restProps}
        className={`dynamic-blog-three ${className}`}
      >

        <div className="container">

          <div className="dynamic-blog-error">

            <h3>
              Unable to Load Blogs
            </h3>

            <p>
              {error}
            </p>

            <Link
              to="/blog"
              className="vs-btn"
            >
              View All Blogs
            </Link>

          </div>

        </div>


        <style>
          {blogThreeCSS}
        </style>

      </div>

    );

  }


  /* =========================================================
     MAIN
  ========================================================= */

  return (

    <div
      {...restProps}
      className={`dynamic-blog-three ${className}`}
    >

      <div className="container">


        {/* =====================================================
            FILTER RESULT
        ===================================================== */}

        {(search ||
          category ||
          tag) && (

          <div className="blog-filter-result">

            <div>

              <span className="blog-filter-label">
                BLOG RESULTS
              </span>


              <h3>

                {search &&
                  `Search results for "${search}"`}

                {category &&
                  `Category: ${category}`}

                {tag &&
                  `Tag: ${tag}`}

              </h3>


              <p>

                {blogs.length} blog
                {blogs.length !== 1
                  ? "s"
                  : ""} found.

              </p>

            </div>


            <Link
              to="/blog"
              className="blog-filter-reset"
            >
              View All Blogs
              <i className="far fa-arrow-right" />
            </Link>

          </div>

        )}


        {/* =====================================================
            BLOG GRID
        ===================================================== */}

        <div className="row blog-grid-row">

          {currentBlogs.length > 0 ? (

            currentBlogs.map(
              (post) => (

                <div
                  className="col-md-6 col-lg-4 blog-grid-column"
                  key={post.id}
                >

                  <Blog className="blog-style1 dynamic-blog-card">


                    {/* =================================================
                        IMAGE
                    ================================================= */}

                    <Link
                      to={`/blog/${post.slug}`}
                      className="dynamic-blog-image-link"
                    >

                      <div className="dynamic-blog-card-image">

                        {post.featured_image ? (

                          <img
                            src={
                              post.featured_image
                            }
                            alt={
                              post.featured_image_alt ||
                              post.title ||
                              "Blog image"
                            }
                            loading="lazy"
                          />

                        ) : (

                          <div className="dynamic-blog-image-placeholder">

                            <i className="far fa-image" />

                          </div>

                        )}

                      </div>

                    </Link>


                    {/* =================================================
                        BODY
                    ================================================= */}

                    <Blog.Body>


                      {/* =================================================
                          META
                      ================================================= */}

                      <Blog.Meta>

                        {post.published_date && (

                          <Link
                            to={`/blog/${post.slug}`}
                          >

                            <i className="far fa-calendar" />

                            {new Date(
                              post.published_date
                            ).toLocaleDateString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )}

                          </Link>

                        )}


                        <Link
                          to={`/blog/${post.slug}`}
                        >

                          <i className="fal fa-user" />

                          {post.author_name ||
                            "Admin"}

                        </Link>


                        {post.category && (

                          <Link
                            to={`/blog?category=${encodeURIComponent(
                              post.category
                            )}`}
                          >

                            <i className="far fa-folder" />

                            {post.category}

                          </Link>

                        )}

                      </Blog.Meta>


                      {/* =================================================
                          TITLE
                      ================================================= */}

                      <Blog.Title
                        className="h5 dynamic-blog-card-title"
                        path={`/blog/${post.slug}`}
                      >

                        {post.title}

                      </Blog.Title>


                      {/* =================================================
                          EXCERPT
                      ================================================= */}

                      <div className="dynamic-blog-card-excerpt">

                        {post.excerpt ? (

                          <p>
                            {post.excerpt}
                          </p>

                        ) : post.text ? (

                          <p>
                            {post.text}
                          </p>

                        ) : (

                          <p>
                            Discover more about this
                            article and explore the
                            complete details.
                          </p>

                        )}

                      </div>


                      {/* =================================================
                          READ DETAILS
                      ================================================= */}

                      <div className="dynamic-blog-card-footer">

                        <Link
                          to={`/blog/${post.slug}`}
                          className="dynamic-blog-read-more"
                        >

                          <span>
                            Read Details
                          </span>

                          <i className="far fa-arrow-right" />

                        </Link>

                      </div>


                    </Blog.Body>

                  </Blog>

                </div>

              )
            )

          ) : (

            <div className="col-12">

              <div className="dynamic-no-blogs">

                <div className="dynamic-no-blogs-icon">

                  <i className="far fa-file-alt" />

                </div>


                <h3>
                  No Blogs Found
                </h3>


                <p>
                  Try another search,
                  category or tag.
                </p>


                <Link
                  to="/blog"
                  className="vs-btn"
                >
                  View All Blogs
                </Link>

              </div>

            </div>

          )}

        </div>


        {/* =====================================================
            PAGINATION
        ===================================================== */}

        {totalPages > 1 && (

          <div className="dynamic-blog-pagination">

            <Pagination
              currentPage={
                currentPage
              }
              totalPages={
                totalPages
              }
              onPageChange={
                handlePageChange
              }
            />

          </div>

        )}

      </div>


      {/* =======================================================
          CSS
      ======================================================= */}

      <style>
        {blogThreeCSS}
      </style>

    </div>

  );

};


/* =============================================================
   CSS
============================================================= */

const blogThreeCSS = `


/* =========================================================
   BLOG GRID
========================================================= */

.dynamic-blog-three {
  width: 100%;
}


.dynamic-blog-three .blog-grid-row {
  display: flex;
  align-items: stretch;
  row-gap: 30px;
}


.dynamic-blog-three .blog-grid-column {
  display: flex;
  flex-direction: column;
}


/* =========================================================
   CARD
========================================================= */

.dynamic-blog-three .dynamic-blog-card {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  overflow: hidden;
  background: #fff;
  border-radius: 0;
  box-shadow: 0 8px 35px rgba(0, 0, 0, 0.045);
  transition:
    transform .3s ease,
    box-shadow .3s ease;
}


.dynamic-blog-three .dynamic-blog-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.09);
}


/* =========================================================
   IMAGE LINK
========================================================= */

.dynamic-blog-three .dynamic-blog-image-link {
  display: block;
  width: 100%;
  text-decoration: none;
}


/* =========================================================
   IMAGE
   16:9 — FOR 1600 × 900 IMAGES

   The image is NOT cropped.
   The complete image remains visible.

   Desktop example:
   387 × 218 approximately
========================================================= */

.dynamic-blog-three .dynamic-blog-card-image {
  position: relative;
  width: 100%;
  height: auto;
  min-height: 0;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #f1f2f4;
}


.dynamic-blog-three .dynamic-blog-card-image img {
  display: block;
  width: 100%;
  height: 100%;
  max-width: none;
  margin: 0;
  padding: 0;
  object-fit: contain;
  object-position: center center;
  transition: transform .45s ease;
}


/* =========================================================
   IMAGE HOVER
========================================================= */

.dynamic-blog-three
.dynamic-blog-card:hover
.dynamic-blog-card-image img {
  transform: scale(1.025);
}


/* =========================================================
   IMAGE PLACEHOLDER
========================================================= */

.dynamic-blog-image-placeholder {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background: #f1f2f4;
  color: #aaa;
  font-size: 35px;
}


/* =========================================================
   BLOG BODY
========================================================= */

.dynamic-blog-three
.dynamic-blog-card
.blog-body {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 24px 0 5px;
}


/* =========================================================
   META
========================================================= */

.dynamic-blog-three
.dynamic-blog-card
.blog-meta {
  display: flex;
  min-height: 22px;
  align-items: center;
  flex-wrap: wrap;
  gap: 5px 13px;
  margin-bottom: 10px;
}


.dynamic-blog-three
.dynamic-blog-card
.blog-meta a {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  white-space: nowrap;
  font-size: 12px;
}


.dynamic-blog-three
.dynamic-blog-card
.blog-meta i {
  font-size: 12px;
}


/* =========================================================
   TITLE
========================================================= */

.dynamic-blog-three
.dynamic-blog-card
.dynamic-blog-card-title {
  display: -webkit-box;
  min-height: 52px;
  overflow: hidden;
  margin-top: 0;
  margin-bottom: 10px;
  line-height: 1.45;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}


.dynamic-blog-three
.dynamic-blog-card
.dynamic-blog-card-title a {
  text-decoration: none;
}


/* =========================================================
   EXCERPT
========================================================= */

.dynamic-blog-card-excerpt {
  flex: 1;
}


.dynamic-blog-card-excerpt p {
  display: -webkit-box;
  min-height: 66px;
  overflow: hidden;
  margin: 0;
  color: #777;
  font-size: 14px;
  line-height: 1.65;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}


/* =========================================================
   FOOTER
========================================================= */

.dynamic-blog-card-footer {
  margin-top: auto;
  padding-top: 17px;
}


.dynamic-blog-read-more {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: #125cff;
  text-decoration: none;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  transition: gap .25s ease;
}


.dynamic-blog-read-more i {
  font-size: 13px;
}


.dynamic-blog-read-more:hover {
  gap: 13px;
}


/* =========================================================
   FILTER RESULT
========================================================= */

.dynamic-blog-three .blog-filter-result {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 25px;
  margin-bottom: 35px;
  padding: 22px 25px;
  border: 1px solid #eee;
  background: #f8f9fa;
}


.dynamic-blog-three .blog-filter-label {
  display: block;
  margin-bottom: 5px;
  color: #125cff;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.5px;
}


.dynamic-blog-three .blog-filter-result h3 {
  margin: 0 0 5px;
  font-size: 21px;
  line-height: 1.35;
}


.dynamic-blog-three .blog-filter-result p {
  margin: 0;
  color: #777;
  font-size: 13px;
}


.dynamic-blog-three .blog-filter-reset {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  gap: 8px;
  color: #125cff;
  text-decoration: none;
  font-size: 12px;
  font-weight: 700;
}


/* =========================================================
   PAGINATION
========================================================= */

.dynamic-blog-three
.dynamic-blog-pagination {
  width: 100%;
  margin-top: 40px;
  padding-top: 10px;
  text-align: center;
}


.dynamic-blog-three
.dynamic-pagination ul {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 7px;
  margin: 0;
  padding: 0;
  list-style: none;
}


.dynamic-blog-three
.dynamic-pagination li {
  margin: 0;
  padding: 0;
}


.dynamic-blog-three
.dynamic-pagination button {
  display: flex;
  width: 42px;
  height: 42px;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  background: #fff;
  color: #222;
  cursor: pointer;
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  transition: all .25s ease;
}


.dynamic-blog-three
.dynamic-pagination button.active {
  border-color: #125cff;
  background: #125cff;
  color: #fff;
}


.dynamic-blog-three
.dynamic-pagination button:hover {
  border-color: #125cff;
  background: #125cff;
  color: #fff;
}


/* =========================================================
   NO BLOGS
========================================================= */

.dynamic-no-blogs {
  padding: 80px 20px;
  text-align: center;
}


.dynamic-no-blogs-icon {
  display: flex;
  width: 60px;
  height: 60px;
  align-items: center;
  justify-content: center;
  margin: 0 auto 18px;
  border-radius: 50%;
  background: #f2f4f7;
  color: #777;
  font-size: 22px;
}


.dynamic-no-blogs h3 {
  margin-bottom: 8px;
}


.dynamic-no-blogs p {
  margin-bottom: 22px;
  color: #777;
}


/* =========================================================
   LOADING
========================================================= */

.dynamic-blog-loading {
  display: flex;
  min-height: 350px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}


.dynamic-blog-loading p {
  margin-top: 12px;
  color: #777;
  font-size: 14px;
}


.dynamic-blog-spinner {
  width: 35px;
  height: 35px;
  border: 3px solid #ddd;
  border-top-color: #125cff;
  border-radius: 50%;
  animation: dynamicBlogSpin .7s linear infinite;
}


@keyframes dynamicBlogSpin {

  to {
    transform: rotate(360deg);
  }

}


/* =========================================================
   ERROR
========================================================= */

.dynamic-blog-error {
  padding: 70px 20px;
  text-align: center;
}


.dynamic-blog-error h3 {
  margin-bottom: 10px;
}


.dynamic-blog-error p {
  margin-bottom: 20px;
  color: #777;
}


/* =========================================================
   LARGE DESKTOP
========================================================= */

@media (min-width: 1200px) {

  .dynamic-blog-three
  .blog-grid-column {
    display: flex;
  }


  /*
     Keep the 16:9 image ratio.

     Card width is approximately 387px.
     Image height becomes approximately 218px.
  */

  .dynamic-blog-three
  .dynamic-blog-card-image {
    width: 100%;
    height: auto;
    min-height: 0;
    aspect-ratio: 16 / 9;
  }

}


/* =========================================================
   TABLET
========================================================= */

@media (min-width: 768px)
and (max-width: 1199px) {

  .dynamic-blog-three
  .dynamic-blog-card-image {
    width: 100%;
    height: auto;
    min-height: 0;
    aspect-ratio: 16 / 9;
  }


  .dynamic-blog-three
  .dynamic-blog-card
  .blog-body {
    padding-top: 20px;
  }


  .dynamic-blog-card-excerpt p {
    font-size: 13px;
  }

}


/* =========================================================
   MOBILE
========================================================= */

@media (max-width: 767px) {

  .dynamic-blog-three
  .blog-grid-row {
    row-gap: 25px;
  }


  .dynamic-blog-three
  .blog-grid-column {
    display: flex;
  }


  /*
     MOBILE IMAGE

     Still 16:9 so 1600 × 900 images
     remain completely visible.
  */

  .dynamic-blog-three
  .dynamic-blog-card-image {
    width: 100%;
    height: auto;
    min-height: 0;
    aspect-ratio: 16 / 9;
  }


  .dynamic-blog-three
  .dynamic-blog-card-image img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }


  .dynamic-blog-three
  .dynamic-blog-card
  .blog-body {
    padding-top: 18px;
  }


  .dynamic-blog-three
  .dynamic-blog-card
  .blog-meta {
    gap: 5px 10px;
  }


  .dynamic-blog-three
  .dynamic-blog-card
  .blog-meta a {
    font-size: 11px;
  }


  .dynamic-blog-three
  .dynamic-blog-card
  .dynamic-blog-card-title {
    min-height: auto;
    font-size: 20px;
  }


  .dynamic-blog-card-excerpt p {
    min-height: auto;
    font-size: 13px;
    -webkit-line-clamp: 4;
  }


  .dynamic-blog-three
  .blog-filter-result {
    align-items: flex-start;
    flex-direction: column;
    margin-bottom: 25px;
    padding: 18px;
  }


  .dynamic-blog-three
  .blog-filter-reset {
    margin-top: 3px;
  }


  .dynamic-blog-three
  .dynamic-blog-pagination {
    margin-top: 30px;
  }

}


/* =========================================================
   SMALL MOBILE
========================================================= */

@media (max-width: 480px) {

  .dynamic-blog-three
  .blog-grid-row {
    row-gap: 22px;
  }


  .dynamic-blog-three
  .dynamic-blog-card-image {
    width: 100%;
    height: auto;
    min-height: 0;
    aspect-ratio: 16 / 9;
  }


  .dynamic-blog-three
  .dynamic-blog-card
  .blog-meta {
    margin-bottom: 8px;
  }


  .dynamic-blog-three
  .dynamic-blog-card
  .dynamic-blog-card-title {
    font-size: 19px;
    line-height: 1.4;
  }


  .dynamic-blog-card-excerpt p {
    font-size: 13px;
    line-height: 1.65;
  }


  .dynamic-blog-three
  .dynamic-pagination ul {
    gap: 5px;
  }


  .dynamic-blog-three
  .dynamic-pagination button {
    width: 38px;
    height: 38px;
    font-size: 12px;
  }

}

`;


export default BlogThree;