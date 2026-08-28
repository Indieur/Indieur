import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  getAllBlogs,
  deleteBlog,
} from "../../services/blogService";

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  // =========================================================
  // LOAD BLOGS
  // =========================================================
  const loadBlogs = async () => {
    try {
      setLoading(true);

      const data = await getAllBlogs();

      setBlogs(data || []);
    } catch (error) {
      console.error(error);
      alert("Unable to load blogs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  // =========================================================
  // DELETE BLOG
  // =========================================================
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      await deleteBlog(id);

      setBlogs((prev) =>
        prev.filter((blog) => blog.id !== id)
      );
    } catch (error) {
      console.error(error);
      alert("Unable to delete blog.");
    } finally {
      setDeletingId(null);
    }
  };

  // =========================================================
  // SEARCH
  // =========================================================
  const filteredBlogs = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return blogs;

    return blogs.filter((blog) => {
      return (
        blog.title?.toLowerCase().includes(keyword) ||
        blog.author_name?.toLowerCase().includes(keyword) ||
        blog.status?.toLowerCase().includes(keyword)
      );
    });
  }, [blogs, search]);

  // =========================================================
  // STATUS
  // =========================================================
  const getStatusClass = (status) => {
    const value = status?.toLowerCase();

    if (value === "published") {
      return "admin-blog-status admin-blog-status--published";
    }

    if (value === "draft") {
      return "admin-blog-status admin-blog-status--draft";
    }

    return "admin-blog-status admin-blog-status--default";
  };

  // =========================================================
  // DATE
  // =========================================================
  const formatDate = (date) => {
    if (!date) return "-";

    try {
      return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "-";
    }
  };

  // =========================================================
  // LOADING
  // =========================================================
  if (loading) {
    return (
      <>
        <style>{adminBlogsStyles}</style>

        <div className="admin-blog-page">
          <div className="admin-blog-container">
            <div className="admin-blog-loading">
              <div className="admin-blog-spinner"></div>
              <h3>Loading Blogs</h3>
              <p>Please wait while we fetch your blogs...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  // =========================================================
  // MAIN
  // =========================================================
  return (
    <>
      <style>{adminBlogsStyles}</style>

      <div className="admin-blog-page">
        <div className="admin-blog-container">

          {/* =================================================
              HEADER
          ================================================== */}
          <div className="admin-blog-top">

            <div className="admin-blog-heading">

              <div className="admin-blog-heading-icon">
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  <path d="M8 6h8" />
                  <path d="M8 10h8" />
                  <path d="M8 14h5" />
                </svg>
              </div>

              <div>
                <span className="admin-blog-eyebrow">
                  CONTENT MANAGEMENT
                </span>

                <h1>Manage Blogs</h1>

                <p>
                  Create, edit and manage your business content.
                </p>
              </div>

            </div>

            <Link
              to="/admin/blogs/create"
              className="admin-blog-add-btn"
            >
              <span className="admin-blog-add-icon">+</span>
              <span>Add New Blog</span>
            </Link>

          </div>


          {/* =================================================
              STATS
          ================================================== */}
          <div className="admin-blog-stats">

            <div className="admin-blog-stat-card">

              <div className="admin-blog-stat-icon">
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
              </div>

              <div>
                <span>Total Blogs</span>
                <strong>{blogs.length}</strong>
              </div>

            </div>


            <div className="admin-blog-stat-card">

              <div className="admin-blog-stat-icon admin-blog-stat-icon--green">
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>

              <div>
                <span>Published</span>
                <strong>
                  {
                    blogs.filter(
                      (blog) =>
                        blog.status?.toLowerCase() === "published"
                    ).length
                  }
                </strong>
              </div>

            </div>


            <div className="admin-blog-stat-card">

              <div className="admin-blog-stat-icon admin-blog-stat-icon--orange">
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </svg>
              </div>

              <div>
                <span>Drafts</span>
                <strong>
                  {
                    blogs.filter(
                      (blog) =>
                        blog.status?.toLowerCase() === "draft"
                    ).length
                  }
                </strong>
              </div>

            </div>

          </div>


          {/* =================================================
              MAIN CARD
          ================================================== */}
          <div className="admin-blog-card">

            {/* TOOLBAR */}
            <div className="admin-blog-toolbar">

              <div>
                <h2>All Blogs</h2>
                <p>
                  {filteredBlogs.length}{" "}
                  {filteredBlogs.length === 1
                    ? "blog"
                    : "blogs"}{" "}
                  found
                </p>
              </div>


              <div className="admin-blog-search">

                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-4-4" />
                </svg>

                <input
                  type="text"
                  placeholder="Search blogs..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                />

                {search && (
                  <button
                    type="button"
                    className="admin-blog-search-clear"
                    onClick={() => setSearch("")}
                  >
                    ×
                  </button>
                )}

              </div>

            </div>


            {/* =================================================
                EMPTY STATE
            ================================================== */}
            {filteredBlogs.length === 0 ? (

              <div className="admin-blog-empty">

                <div className="admin-blog-empty-icon">
                  <svg
                    width="34"
                    height="34"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                </div>

                <h3>
                  {search
                    ? "No blogs found"
                    : "No blogs yet"}
                </h3>

                <p>
                  {search
                    ? "Try searching with a different keyword."
                    : "Start creating useful content for your audience."}
                </p>

                {!search && (
                  <Link
                    to="/admin/blogs/create"
                    className="admin-blog-empty-btn"
                  >
                    + Create Your First Blog
                  </Link>
                )}

              </div>

            ) : (

              <>
                {/* =================================================
                    DESKTOP TABLE
                ================================================== */}
                <div className="admin-blog-table-wrapper">

                  <table className="admin-blog-table">

                    <thead>
                      <tr>
                        <th className="admin-blog-title-column">
                          Blog
                        </th>

                        <th>Status</th>

                        <th>Author</th>

                        <th>Date</th>

                        <th className="admin-blog-actions-column">
                          Actions
                        </th>
                      </tr>
                    </thead>


                    <tbody>

                      {filteredBlogs.map((blog) => (

                        <tr key={blog.id}>

                          {/* BLOG */}
                          <td>

                            <div className="admin-blog-title-cell">

                              <div className="admin-blog-thumbnail">

                                {blog.featured_image ||
                                blog.image ? (

                                  <img
                                    src={
                                      blog.featured_image ||
                                      blog.image
                                    }
                                    alt={blog.title}
                                  />

                                ) : (

                                  <div className="admin-blog-thumbnail-placeholder">
                                    <svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="1.6"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <rect
                                        x="3"
                                        y="3"
                                        width="18"
                                        height="18"
                                        rx="2"
                                      />
                                      <circle
                                        cx="8.5"
                                        cy="8.5"
                                        r="1.5"
                                      />
                                      <path d="m21 15-5-5L5 21" />
                                    </svg>
                                  </div>

                                )}

                              </div>


                              <div className="admin-blog-title-info">

                                <strong>
                                  {blog.title ||
                                    "Untitled Blog"}
                                </strong>

                                {blog.slug && (
                                  <span>
                                    /blog/{blog.slug}
                                  </span>
                                )}

                              </div>

                            </div>

                          </td>


                          {/* STATUS */}
                          <td>
                            <span
                              className={getStatusClass(
                                blog.status
                              )}
                            >
                              <span className="admin-blog-status-dot"></span>

                              {blog.status ||
                                "Unknown"}
                            </span>
                          </td>


                          {/* AUTHOR */}
                          <td>

                            <div className="admin-blog-author">

                              <div className="admin-blog-author-avatar">
                                {(
                                  blog.author_name ||
                                  "A"
                                )
                                  .charAt(0)
                                  .toUpperCase()}
                              </div>

                              <span>
                                {blog.author_name ||
                                  "Admin"}
                              </span>

                            </div>

                          </td>


                          {/* DATE */}
                          <td>

                            <span className="admin-blog-date">
                              {formatDate(
                                blog.published_date ||
                                  blog.created_at
                              )}
                            </span>

                          </td>


                          {/* ACTIONS */}
                          <td>

                            <div className="admin-blog-actions">

                              <Link
                                to={`/blog/${blog.slug}`}
                                target="_blank"
                                rel="noreferrer"
                                className="admin-blog-action admin-blog-action--view"
                                title="View Blog"
                              >
                                <svg
                                  width="17"
                                  height="17"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.8"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
                                  <circle
                                    cx="12"
                                    cy="12"
                                    r="3"
                                  />
                                </svg>

                                <span>View</span>
                              </Link>


                              <Link
                                to={`/admin/blogs/edit/${blog.id}`}
                                className="admin-blog-action admin-blog-action--edit"
                                title="Edit Blog"
                              >
                                <svg
                                  width="17"
                                  height="17"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.8"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="M12 20h9" />
                                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
                                </svg>

                                <span>Edit</span>
                              </Link>


                              <button
                                type="button"
                                className="admin-blog-action admin-blog-action--delete"
                                title="Delete Blog"
                                disabled={
                                  deletingId === blog.id
                                }
                                onClick={() =>
                                  handleDelete(blog.id)
                                }
                              >
                                {deletingId === blog.id ? (
                                  <span className="admin-blog-mini-spinner"></span>
                                ) : (
                                  <svg
                                    width="17"
                                    height="17"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <polyline points="3 6 5 6 21 6" />
                                    <path d="M19 6l-1 14H6L5 6" />
                                    <path d="M10 11v6" />
                                    <path d="M14 11v6" />
                                    <path d="M9 6V4h6v2" />
                                  </svg>
                                )}

                                <span>
                                  {deletingId === blog.id
                                    ? "Deleting..."
                                    : "Delete"}
                                </span>

                              </button>

                            </div>

                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>


                {/* =================================================
                    MOBILE CARDS
                ================================================== */}
                <div className="admin-blog-mobile-list">

                  {filteredBlogs.map((blog) => (

                    <div
                      className="admin-blog-mobile-card"
                      key={blog.id}
                    >

                      <div className="admin-blog-mobile-top">

                        <div className="admin-blog-thumbnail admin-blog-mobile-thumbnail">

                          {blog.featured_image ||
                          blog.image ? (

                            <img
                              src={
                                blog.featured_image ||
                                blog.image
                              }
                              alt={blog.title}
                            />

                          ) : (

                            <div className="admin-blog-thumbnail-placeholder">
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <rect
                                  x="3"
                                  y="3"
                                  width="18"
                                  height="18"
                                  rx="2"
                                />
                                <circle
                                  cx="8.5"
                                  cy="8.5"
                                  r="1.5"
                                />
                                <path d="m21 15-5-5L5 21" />
                              </svg>
                            </div>

                          )}

                        </div>


                        <div className="admin-blog-mobile-main">

                          <h3>
                            {blog.title ||
                              "Untitled Blog"}
                          </h3>

                          <span className="admin-blog-mobile-slug">
                            {blog.slug
                              ? `/blog/${blog.slug}`
                              : ""}
                          </span>

                        </div>

                      </div>


                      <div className="admin-blog-mobile-details">

                        <div>
                          <span>STATUS</span>

                          <span
                            className={getStatusClass(
                              blog.status
                            )}
                          >
                            <span className="admin-blog-status-dot"></span>

                            {blog.status ||
                              "Unknown"}
                          </span>
                        </div>


                        <div>
                          <span>AUTHOR</span>

                          <strong>
                            {blog.author_name ||
                              "Admin"}
                          </strong>
                        </div>


                        <div>
                          <span>DATE</span>

                          <strong>
                            {formatDate(
                              blog.published_date ||
                                blog.created_at
                            )}
                          </strong>
                        </div>

                      </div>


                      <div className="admin-blog-mobile-actions">

                        <Link
                          to={`/blog/${blog.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="admin-blog-mobile-action admin-blog-mobile-action--view"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
                            <circle
                              cx="12"
                              cy="12"
                              r="3"
                            />
                          </svg>

                          View
                        </Link>


                        <Link
                          to={`/admin/blogs/edit/${blog.id}`}
                          className="admin-blog-mobile-action admin-blog-mobile-action--edit"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
                          </svg>

                          Edit
                        </Link>


                        <button
                          type="button"
                          className="admin-blog-mobile-action admin-blog-mobile-action--delete"
                          disabled={
                            deletingId === blog.id
                          }
                          onClick={() =>
                            handleDelete(blog.id)
                          }
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6l-1 14H6L5 6" />
                            <path d="M10 11v6" />
                            <path d="M14 11v6" />
                            <path d="M9 6V4h6v2" />
                          </svg>

                          {deletingId === blog.id
                            ? "Deleting"
                            : "Delete"}
                        </button>

                      </div>

                    </div>

                  ))}

                </div>

              </>
            )}

          </div>


          {/* FOOTER */}
          {blogs.length > 0 && (
            <div className="admin-blog-footer">

              <span>
                Showing{" "}
                <strong>
                  {filteredBlogs.length}
                </strong>{" "}
                of{" "}
                <strong>
                  {blogs.length}
                </strong>{" "}
                blogs
              </span>

              <span className="admin-blog-footer-brand">
                INDIEUR
              </span>

            </div>
          )}

        </div>
      </div>
    </>
  );
};


// =============================================================
// SAME-FILE CSS
// =============================================================

const adminBlogsStyles = `

/* ============================================================
   PAGE
============================================================ */

.admin-blog-page {
  width: 100%;
  min-height: 100vh;
  padding: 45px 20px 70px;
  background:
    linear-gradient(
      180deg,
      #f7faff 0%,
      #ffffff 42%,
      #f6f9ff 100%
    );
  box-sizing: border-box;
  font-family:
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
}

.admin-blog-container {
  width: 100%;
  max-width: 1250px;
  margin: 0 auto;
}


/* ============================================================
   HEADER
============================================================ */

.admin-blog-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  margin-bottom: 30px;
}

.admin-blog-heading {
  display: flex;
  align-items: center;
  gap: 17px;
}

.admin-blog-heading-icon {
  width: 55px;
  height: 55px;
  flex: 0 0 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  color: #ffffff;
  background:
    linear-gradient(
      135deg,
      #075cff 0%,
      #174eea 100%
    );
  box-shadow:
    0 12px 25px rgba(20, 91, 240, 0.22);
}

.admin-blog-eyebrow {
  display: block;
  margin-bottom: 4px;
  color: #155eef;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1.3px;
}

.admin-blog-heading h1 {
  margin: 0;
  color: #101828;
  font-size: 31px;
  line-height: 1.15;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.admin-blog-heading p {
  margin: 6px 0 0;
  color: #667085;
  font-size: 14px;
  line-height: 1.5;
}


/* ============================================================
   ADD BUTTON
============================================================ */

.admin-blog-add-btn {
  min-height: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 0 21px;
  border-radius: 9px;
  color: #ffffff !important;
  background:
    linear-gradient(
      135deg,
      #075cff 0%,
      #1454e8 100%
    );
  box-shadow:
    0 9px 22px rgba(21, 89, 235, 0.22);
  text-decoration: none !important;
  font-size: 14px;
  font-weight: 700;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.admin-blog-add-btn:hover {
  color: #ffffff !important;
  transform: translateY(-2px);
  box-shadow:
    0 13px 28px rgba(21, 89, 235, 0.30);
}

.admin-blog-add-icon {
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background: rgba(255,255,255,0.18);
  font-size: 20px;
  line-height: 1;
  font-weight: 400;
}


/* ============================================================
   STATS
============================================================ */

.admin-blog-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 17px;
  margin-bottom: 22px;
}

.admin-blog-stat-card {
  min-height: 95px;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 18px 21px;
  box-sizing: border-box;
  background: #ffffff;
  border: 1px solid #e7ecf5;
  border-radius: 13px;
  box-shadow:
    0 5px 20px rgba(16, 24, 40, 0.045);
}

.admin-blog-stat-icon {
  width: 46px;
  height: 46px;
  flex: 0 0 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #155eef;
  background: #edf4ff;
  border-radius: 11px;
}

.admin-blog-stat-icon--green {
  color: #079455;
  background: #ecfdf3;
}

.admin-blog-stat-icon--orange {
  color: #dc6803;
  background: #fff6ed;
}

.admin-blog-stat-card span {
  display: block;
  color: #667085;
  font-size: 12px;
  font-weight: 600;
}

.admin-blog-stat-card strong {
  display: block;
  margin-top: 3px;
  color: #101828;
  font-size: 23px;
  line-height: 1;
  font-weight: 800;
}


/* ============================================================
   MAIN CARD
============================================================ */

.admin-blog-card {
  overflow: hidden;
  background: #ffffff;
  border: 1px solid #e6eaf0;
  border-radius: 15px;
  box-shadow:
    0 8px 30px rgba(16, 24, 40, 0.055);
}


/* ============================================================
   TOOLBAR
============================================================ */

.admin-blog-toolbar {
  min-height: 85px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 25px;
  padding: 18px 23px;
  border-bottom: 1px solid #edf0f5;
}

.admin-blog-toolbar h2 {
  margin: 0;
  color: #101828;
  font-size: 18px;
  font-weight: 750;
}

.admin-blog-toolbar p {
  margin: 4px 0 0;
  color: #98a2b3;
  font-size: 12px;
}

.admin-blog-search {
  width: 280px;
  height: 43px;
  position: relative;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}

.admin-blog-search > svg {
  position: absolute;
  left: 13px;
  color: #98a2b3;
  pointer-events: none;
}

.admin-blog-search input {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 0 38px 0 40px;
  outline: none;
  color: #101828;
  background: #f8fafc;
  border: 1px solid #e4e7ec;
  border-radius: 8px;
  font-size: 13px;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}

.admin-blog-search input::placeholder {
  color: #98a2b3;
}

.admin-blog-search input:focus {
  background: #ffffff;
  border-color: #4e83ff;
  box-shadow:
    0 0 0 3px rgba(21, 94, 239, 0.09);
}

.admin-blog-search-clear {
  position: absolute;
  right: 10px;
  width: 22px;
  height: 22px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  color: #667085;
  background: #e9edf3;
  cursor: pointer;
  font-size: 16px;
  line-height: 20px;
}


/* ============================================================
   TABLE
============================================================ */

.admin-blog-table-wrapper {
  width: 100%;
  overflow-x: auto;
}

.admin-blog-table {
  width: 100%;
  min-width: 850px;
  border-collapse: collapse;
  table-layout: auto;
}

.admin-blog-table thead {
  background: #f8faff;
}

.admin-blog-table th {
  padding: 13px 18px;
  color: #667085;
  border-bottom: 1px solid #e9edf3;
  text-align: left;
  white-space: nowrap;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.8px;
  text-transform: uppercase;
}

.admin-blog-table td {
  padding: 15px 18px;
  border-bottom: 1px solid #f0f2f5;
  vertical-align: middle;
}

.admin-blog-table tbody tr {
  transition:
    background 0.18s ease;
}

.admin-blog-table tbody tr:hover {
  background: #f9fbff;
}

.admin-blog-table tbody tr:last-child td {
  border-bottom: 0;
}

.admin-blog-title-column {
  width: 42%;
}

.admin-blog-actions-column {
  width: 235px;
}


/* ============================================================
   BLOG TITLE
============================================================ */

.admin-blog-title-cell {
  display: flex;
  align-items: center;
  gap: 13px;
  min-width: 280px;
}

.admin-blog-thumbnail {
  width: 58px;
  height: 48px;
  flex: 0 0 58px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #edf3ff;
}

.admin-blog-thumbnail img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.admin-blog-thumbnail-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #5282e9;
  background:
    linear-gradient(
      135deg,
      #eef4ff,
      #e3edff
    );
}

.admin-blog-title-info {
  min-width: 0;
}

.admin-blog-title-info strong {
  display: block;
  max-width: 390px;
  overflow: hidden;
  color: #101828;
  font-size: 13px;
  font-weight: 700;
  line-height: 1.45;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.admin-blog-title-info span {
  display: block;
  max-width: 390px;
  margin-top: 3px;
  overflow: hidden;
  color: #98a2b3;
  font-size: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
}


/* ============================================================
   STATUS
============================================================ */

.admin-blog-status {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 25px;
  padding: 0 9px;
  border-radius: 100px;
  font-size: 10px;
  font-weight: 700;
  text-transform: capitalize;
}

.admin-blog-status-dot {
  width: 6px;
  height: 6px;
  display: inline-block;
  border-radius: 50%;
  background: currentColor;
}

.admin-blog-status--published {
  color: #067647;
  background: #ecfdf3;
}

.admin-blog-status--draft {
  color: #b54708;
  background: #fffaeb;
}

.admin-blog-status--default {
  color: #475467;
  background: #f2f4f7;
}


/* ============================================================
   AUTHOR
============================================================ */

.admin-blog-author {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #344054;
  white-space: nowrap;
  font-size: 12px;
  font-weight: 600;
}

.admin-blog-author-avatar {
  width: 29px;
  height: 29px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: #155eef;
  background: #eaf2ff;
  font-size: 11px;
  font-weight: 800;
}

.admin-blog-date {
  color: #667085;
  white-space: nowrap;
  font-size: 12px;
  font-weight: 500;
}


/* ============================================================
   ACTIONS
============================================================ */

.admin-blog-actions {
  display: flex;
  align-items: center;
  gap: 6px;
}

.admin-blog-action {
  min-height: 34px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 0 9px;
  border: 1px solid transparent;
  border-radius: 7px;
  background: transparent;
  text-decoration: none !important;
  cursor: pointer;
  font-family: inherit;
  font-size: 11px;
  font-weight: 700;
  transition:
    background 0.18s ease,
    border-color 0.18s ease,
    color 0.18s ease,
    transform 0.18s ease;
}

.admin-blog-action:hover {
  transform: translateY(-1px);
}

.admin-blog-action--view {
  color: #155eef !important;
  background: #f0f5ff;
  border-color: #dce8ff;
}

.admin-blog-action--view:hover {
  background: #e5eeff;
  border-color: #c8dcff;
}

.admin-blog-action--edit {
  color: #344054;
  background: #f8fafc;
  border-color: #e4e7ec;
}

.admin-blog-action--edit:hover {
  color: #155eef;
  background: #f0f5ff;
  border-color: #dce8ff;
}

.admin-blog-action--delete {
  color: #d92d20;
  background: #fff5f4;
  border-color: #fee4e2;
}

.admin-blog-action--delete:hover {
  background: #feeceb;
  border-color: #fecdca;
}

.admin-blog-action:disabled {
  opacity: 0.55;
  cursor: not-allowed;
  transform: none;
}


/* ============================================================
   MOBILE LIST
============================================================ */

.admin-blog-mobile-list {
  display: none;
}


/* ============================================================
   EMPTY
============================================================ */

.admin-blog-empty {
  min-height: 330px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 40px 20px;
  text-align: center;
}

.admin-blog-empty-icon {
  width: 72px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 17px;
  border-radius: 18px;
  color: #155eef;
  background: #edf4ff;
}

.admin-blog-empty h3 {
  margin: 0;
  color: #101828;
  font-size: 18px;
  font-weight: 750;
}

.admin-blog-empty p {
  max-width: 400px;
  margin: 7px 0 19px;
  color: #667085;
  font-size: 13px;
}

.admin-blog-empty-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 0 17px;
  border-radius: 8px;
  color: #ffffff !important;
  background: #155eef;
  text-decoration: none !important;
  font-size: 12px;
  font-weight: 700;
}


/* ============================================================
   LOADING
============================================================ */

.admin-blog-loading {
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
}

.admin-blog-spinner {
  width: 40px;
  height: 40px;
  margin-bottom: 17px;
  border: 3px solid #dce8ff;
  border-top-color: #155eef;
  border-radius: 50%;
  animation: adminBlogSpin 0.75s linear infinite;
}

@keyframes adminBlogSpin {
  to {
    transform: rotate(360deg);
  }
}

.admin-blog-loading h3 {
  margin: 0;
  color: #101828;
  font-size: 18px;
}

.admin-blog-loading p {
  margin: 6px 0 0;
  color: #667085;
  font-size: 13px;
}


/* ============================================================
   MINI SPINNER
============================================================ */

.admin-blog-mini-spinner {
  width: 12px;
  height: 12px;
  display: inline-block;
  border: 2px solid #fecdca;
  border-top-color: #d92d20;
  border-radius: 50%;
  animation: adminBlogSpin 0.7s linear infinite;
}


/* ============================================================
   FOOTER
============================================================ */

.admin-blog-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 3px 0;
  color: #98a2b3;
  font-size: 11px;
}

.admin-blog-footer strong {
  color: #667085;
}

.admin-blog-footer-brand {
  color: #155eef;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: 1.2px;
}


/* ============================================================
   TABLET
============================================================ */

@media (max-width: 900px) {

  .admin-blog-page {
    padding: 30px 15px 55px;
  }

  .admin-blog-top {
    align-items: flex-start;
  }

  .admin-blog-heading h1 {
    font-size: 27px;
  }

  .admin-blog-stats {
    gap: 12px;
  }

  .admin-blog-stat-card {
    padding: 15px;
  }

  .admin-blog-toolbar {
    padding: 16px;
  }

  .admin-blog-search {
    width: 230px;
  }

  .admin-blog-actions {
    flex-wrap: wrap;
  }

}


/* ============================================================
   MOBILE
============================================================ */

@media (max-width: 767px) {

  .admin-blog-page {
    padding: 22px 12px 45px;
  }

  .admin-blog-top {
    display: block;
    margin-bottom: 20px;
  }

  .admin-blog-heading {
    align-items: flex-start;
    gap: 12px;
  }

  .admin-blog-heading-icon {
    width: 45px;
    height: 45px;
    flex: 0 0 45px;
    border-radius: 11px;
  }

  .admin-blog-heading-icon svg {
    width: 21px;
    height: 21px;
  }

  .admin-blog-eyebrow {
    font-size: 9px;
    letter-spacing: 0.9px;
  }

  .admin-blog-heading h1 {
    font-size: 23px;
  }

  .admin-blog-heading p {
    font-size: 12px;
  }

  .admin-blog-add-btn {
    width: 100%;
    min-height: 45px;
    margin-top: 16px;
  }


  /* STATS */

  .admin-blog-stats {
    grid-template-columns: 1fr;
    gap: 9px;
    margin-bottom: 15px;
  }

  .admin-blog-stat-card {
    min-height: 70px;
    padding: 12px 14px;
  }

  .admin-blog-stat-icon {
    width: 40px;
    height: 40px;
    flex: 0 0 40px;
  }

  .admin-blog-stat-card strong {
    font-size: 20px;
  }


  /* CARD */

  .admin-blog-card {
    border-radius: 11px;
  }


  /* TOOLBAR */

  .admin-blog-toolbar {
    display: block;
    min-height: auto;
    padding: 16px 14px;
  }

  .admin-blog-toolbar h2 {
    font-size: 16px;
  }

  .admin-blog-toolbar p {
    font-size: 11px;
  }

  .admin-blog-search {
    width: 100%;
    height: 42px;
    margin-top: 13px;
  }


  /* HIDE TABLE */

  .admin-blog-table-wrapper {
    display: none;
  }


  /* MOBILE BLOG LIST */

  .admin-blog-mobile-list {
    display: block;
    padding: 10px;
    background: #f8fafc;
  }

  .admin-blog-mobile-card {
    padding: 13px;
    margin-bottom: 9px;
    background: #ffffff;
    border: 1px solid #e7ebf1;
    border-radius: 10px;
    box-shadow:
      0 3px 12px rgba(16, 24, 40, 0.035);
  }

  .admin-blog-mobile-card:last-child {
    margin-bottom: 0;
  }

  .admin-blog-mobile-top {
    display: flex;
    align-items: flex-start;
    gap: 11px;
  }

  .admin-blog-mobile-thumbnail {
    width: 72px;
    height: 58px;
    flex: 0 0 72px;
    border-radius: 7px;
  }

  .admin-blog-mobile-main {
    min-width: 0;
    padding-top: 1px;
  }

  .admin-blog-mobile-main h3 {
    display: -webkit-box;
    overflow: hidden;
    margin: 0;
    color: #101828;
    font-size: 13px;
    line-height: 1.4;
    font-weight: 750;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .admin-blog-mobile-slug {
    display: block;
    overflow: hidden;
    margin-top: 4px;
    color: #98a2b3;
    font-size: 9px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }


  /* MOBILE DETAILS */

  .admin-blog-mobile-details {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 7px;
    margin-top: 13px;
    padding: 11px 0;
    border-top: 1px solid #f0f2f5;
    border-bottom: 1px solid #f0f2f5;
  }

  .admin-blog-mobile-details > div {
    min-width: 0;
  }

  .admin-blog-mobile-details > div > span:first-child {
    display: block;
    margin-bottom: 4px;
    color: #98a2b3;
    font-size: 8px;
    font-weight: 800;
    letter-spacing: 0.5px;
  }

  .admin-blog-mobile-details strong {
    display: block;
    overflow: hidden;
    color: #344054;
    font-size: 10px;
    font-weight: 650;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .admin-blog-mobile-details .admin-blog-status {
    max-width: 100%;
    min-height: 22px;
    padding: 0 7px;
    font-size: 8px;
  }

  .admin-blog-mobile-details .admin-blog-status-dot {
    width: 5px;
    height: 5px;
  }


  /* MOBILE ACTIONS */

  .admin-blog-mobile-actions {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 7px;
    margin-top: 11px;
  }

  .admin-blog-mobile-action {
    min-height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    border: 1px solid transparent;
    border-radius: 6px;
    text-decoration: none !important;
    font-size: 10px;
    font-weight: 700;
    font-family: inherit;
    cursor: pointer;
  }

  .admin-blog-mobile-action--view {
    color: #155eef !important;
    background: #f0f5ff;
    border-color: #dce8ff;
  }

  .admin-blog-mobile-action--edit {
    color: #344054;
    background: #f8fafc;
    border-color: #e4e7ec;
  }

  .admin-blog-mobile-action--delete {
    color: #d92d20;
    background: #fff5f4;
    border-color: #fee4e2;
  }

  .admin-blog-mobile-action:disabled {
    opacity: 0.55;
  }


  /* FOOTER */

  .admin-blog-footer {
    padding-top: 12px;
    font-size: 9px;
  }

}


/* ============================================================
   SMALL MOBILE
============================================================ */

@media (max-width: 400px) {

  .admin-blog-page {
    padding-left: 8px;
    padding-right: 8px;
  }

  .admin-blog-heading h1 {
    font-size: 21px;
  }

  .admin-blog-heading p {
    max-width: 220px;
    font-size: 11px;
  }

  .admin-blog-mobile-card {
    padding: 11px;
  }

  .admin-blog-mobile-thumbnail {
    width: 64px;
    height: 52px;
    flex-basis: 64px;
  }

  .admin-blog-mobile-main h3 {
    font-size: 12px;
  }

  .admin-blog-mobile-details {
    gap: 4px;
  }

  .admin-blog-mobile-action {
    min-height: 33px;
    font-size: 9px;
  }

}

`;

export default AdminBlogs;