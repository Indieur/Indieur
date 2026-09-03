import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import {
  getRecentPosts,
  getBlogCategories,
  getPopularTags,
} from "../../services/blogService";


const SidebarOne = () => {

  const navigate = useNavigate();
  const location = useLocation();


  const [search, setSearch] = useState(
    new URLSearchParams(location.search).get("search") || ""
  );

  const [recentPosts, setRecentPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [popularTags, setPopularTags] = useState([]);

  const [loading, setLoading] = useState(true);


  /*
  |--------------------------------------------------------------------------
  | FETCH SIDEBAR DATA
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    const loadSidebarData = async () => {

      try {

        setLoading(true);

        const [
          recent,
          categoryData,
          tagData,
        ] = await Promise.all([
          getRecentPosts(5),
          getBlogCategories(),
          getPopularTags(),
        ]);


        setRecentPosts(recent);
        setCategories(categoryData);
        setPopularTags(tagData.slice(0, 12));

      } catch (error) {

        console.error(
          "Sidebar loading error:",
          error
        );

      } finally {

        setLoading(false);

      }
    };


    loadSidebarData();

  }, []);


  /*
  |--------------------------------------------------------------------------
  | SEARCH
  |--------------------------------------------------------------------------
  */

  const handleSearch = (e) => {

    e.preventDefault();

    const value = search.trim();

    if (!value) {
      navigate("/blog");
      return;
    }

    navigate(
      `/blog?search=${encodeURIComponent(value)}`
    );
  };


  /*
  |--------------------------------------------------------------------------
  | SEARCH INPUT
  |--------------------------------------------------------------------------
  */

  const handleSearchChange = (e) => {

    setSearch(e.target.value);

  };


  return (
    <>
      <style>{sidebarCSS}</style>


      <aside className="dynamic-blog-sidebar">


        {/* =====================================================
            SEARCH
        ====================================================== */}

        <div className="dynamic-sidebar-widget">

          <h3 className="dynamic-sidebar-title">
            Search
          </h3>


          <form
            onSubmit={handleSearch}
            className="dynamic-blog-search"
          >

            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search blogs..."
              aria-label="Search blogs"
            />


            <button type="submit">
              <i className="far fa-search" />
            </button>

          </form>

        </div>


        {/* =====================================================
            RECENT POSTS
        ====================================================== */}

        <div className="dynamic-sidebar-widget">

          <h3 className="dynamic-sidebar-title">
            Recent Posts
          </h3>


          {loading ? (

            <div className="dynamic-sidebar-loading">
              Loading...
            </div>

          ) : recentPosts.length > 0 ? (

            <div className="dynamic-recent-posts">

              {recentPosts.map((post) => (

                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="dynamic-recent-post"
                >

                  <div className="dynamic-recent-image">

                    {post.featured_image ? (

                      <img
                        src={
                          post.featured_image
                        }
                        alt={
                          post.featured_image_alt ||
                          post.title
                        }
                      />

                    ) : (

                      <div className="dynamic-recent-placeholder">
                        <i className="far fa-image" />
                      </div>

                    )}

                  </div>


                  <div className="dynamic-recent-content">

                    <span className="dynamic-recent-date">

                      <i className="far fa-calendar" />

                      {post.published_date
                        ? new Date(
                            post.published_date
                          ).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )
                        : ""}

                    </span>


                    <h4>
                      {post.title}
                    </h4>

                  </div>

                </Link>

              ))}

            </div>

          ) : (

            <p className="dynamic-sidebar-empty">
              No recent posts.
            </p>

          )}

        </div>


        {/* =====================================================
            CATEGORIES
        ====================================================== */}

        <div className="dynamic-sidebar-widget">

          <h3 className="dynamic-sidebar-title">
            Categories
          </h3>


          {categories.length > 0 ? (

            <ul className="dynamic-category-list">

              {categories.map((category) => (

                <li key={category.name}>

                  <Link
                    to={`/blogs?category=${encodeURIComponent(
                      category.name
                    )}`}
                  >

                    <span>
                      {category.name}
                    </span>

                    <strong>
                      {category.count}
                    </strong>

                  </Link>

                </li>

              ))}

            </ul>

          ) : (

            <p className="dynamic-sidebar-empty">
              No categories yet.
            </p>

          )}

        </div>


        {/* =====================================================
            POPULAR TAGS
        ====================================================== */}

        <div className="dynamic-sidebar-widget">

          <h3 className="dynamic-sidebar-title">
            Popular Tags
          </h3>


          {popularTags.length > 0 ? (

            <div className="dynamic-tag-list">

              {popularTags.map((tag) => (

                <Link
                  key={tag.name}
                  to={`/blogs?tag=${encodeURIComponent(
                    tag.name
                  )}`}
                  className="dynamic-blog-tag"
                >
                  {tag.name}
                </Link>

              ))}

            </div>

          ) : (

            <p className="dynamic-sidebar-empty">
              No tags yet.
            </p>

          )}

        </div>


      </aside>
    </>
  );
};


/*
|--------------------------------------------------------------------------
| CSS
|--------------------------------------------------------------------------
*/

const sidebarCSS = `

.dynamic-blog-sidebar {
  width: 100%;
}

.dynamic-sidebar-widget {
  margin-bottom: 30px;
  padding: 28px;
  border-radius: 10px;
  background: #f7f7f7;
}

.dynamic-sidebar-title {
  position: relative;
  margin: 0 0 22px;
  padding-bottom: 13px;
  font-size: 22px;
  line-height: 1.3;
  font-weight: 700;
}

.dynamic-sidebar-title::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 45px;
  height: 2px;
  background: currentColor;
}


/* =========================================================
   SEARCH
========================================================= */

.dynamic-blog-search {
  position: relative;
  display: flex;
  width: 100%;
}

.dynamic-blog-search input {
  width: 100%;
  height: 55px;
  padding: 0 58px 0 16px;
  border: 1px solid #e1e1e1;
  border-radius: 6px;
  outline: none;
  background: #fff;
  color: #222;
  font-size: 14px;
  transition: border-color .2s ease;
}

.dynamic-blog-search input:focus {
  border-color: #222;
}

.dynamic-blog-search button {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  width: 55px;
  height: 55px;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 0 6px 6px 0;
  background: #222;
  color: #fff;
  cursor: pointer;
}


/* =========================================================
   RECENT POSTS
========================================================= */

.dynamic-recent-posts {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.dynamic-recent-post {
  display: flex;
  align-items: flex-start;
  gap: 13px;
  text-decoration: none;
}

.dynamic-recent-image {
  flex: 0 0 80px;
  width: 80px;
  height: 70px;
  overflow: hidden;
  border-radius: 6px;
  background: #eaeaea;
}

.dynamic-recent-image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform .3s ease;
}

.dynamic-recent-post:hover
.dynamic-recent-image img {
  transform: scale(1.07);
}

.dynamic-recent-placeholder {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  color: #999;
}

.dynamic-recent-content {
  min-width: 0;
}

.dynamic-recent-date {
  display: block;
  margin-bottom: 5px;
  color: #777;
  font-size: 11px;
}

.dynamic-recent-date i {
  margin-right: 5px;
}

.dynamic-recent-content h4 {
  overflow: hidden;
  display: -webkit-box;
  margin: 0;
  color: #222;
  font-size: 14px;
  line-height: 1.45;
  font-weight: 600;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.dynamic-recent-post:hover
.dynamic-recent-content h4 {
  text-decoration: underline;
}


/* =========================================================
   CATEGORIES
========================================================= */

.dynamic-category-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.dynamic-category-list li {
  border-bottom: 1px solid #e2e2e2;
}

.dynamic-category-list li:last-child {
  border-bottom: 0;
}

.dynamic-category-list a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  padding: 11px 0;
  color: #333;
  text-decoration: none;
  font-size: 14px;
  transition: all .2s ease;
}

.dynamic-category-list a:hover {
  padding-left: 5px;
}

.dynamic-category-list strong {
  display: flex;
  min-width: 25px;
  height: 25px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #fff;
  color: #555;
  font-size: 11px;
}


/* =========================================================
   TAGS
========================================================= */

.dynamic-tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.dynamic-blog-tag {
  display: inline-flex;
  align-items: center;
  min-height: 34px;
  padding: 0 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
  color: #555;
  text-decoration: none;
  font-size: 12px;
  line-height: 1;
  transition: all .2s ease;
}

.dynamic-blog-tag:hover {
  background: #222;
  color: #fff;
  border-color: #222;
}


/* =========================================================
   STATES
========================================================= */

.dynamic-sidebar-loading,
.dynamic-sidebar-empty {
  margin: 0;
  color: #888;
  font-size: 13px;
}


/* =========================================================
   RESPONSIVE
========================================================= */

@media (max-width: 991px) {

  .dynamic-sidebar-widget {
    padding: 24px;
  }

}


@media (max-width: 575px) {

  .dynamic-sidebar-widget {
    padding: 20px;
  }

  .dynamic-sidebar-title {
    font-size: 20px;
  }

  .dynamic-recent-image {
    flex-basis: 70px;
    width: 70px;
    height: 65px;
  }

}

`;


export default SidebarOne;