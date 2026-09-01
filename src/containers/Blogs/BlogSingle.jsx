import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Link,
  useParams,
} from "react-router-dom";

import SidebarOne from "../Sidebars/SidebarOne";

import {
  Blog,
  IconLink,
  TagWidget,
} from "../../components";

import {
  getBlogBySlug,
  getPublishedBlogs,
  getBlogComments,
  addBlogComment,
} from "../../services/blogService";


/* =========================================================
   BLOG CONTENT HEADING NORMALIZATION

   FINAL SEO STRUCTURE:

   H1
   └── Main Blog Title

   H2
   ├── Main Article Section
   ├── Main Article Section
   └── Main Article Section

   H3
   ├── Sub Section
   ├── Sub Section
   └── Sub Section


   CMS CONTENT CONVERSION:

   CMS H1  →  H2
   CMS H2  →  H3
   CMS H3  →  H3
   CMS H4  →  H3
   CMS H5  →  H3
   CMS H6  →  H3

   This guarantees that the blog title is the
   ONLY H1 on the page.
========================================================= */

const normalizeBlogContentHeadings = (
  html = ""
) => {

  if (!html) {
    return "";
  }


  let content =
    String(html);


  /*
   * Convert H1 inside blog content
   * into H2.
   *
   * Example:
   *
   * <h1>What Is Brand Positioning?</h1>
   *
   * becomes:
   *
   * <h2>What Is Brand Positioning?</h2>
   */

  content =
    content.replace(
      /<h1(\s[^>]*)?>/gi,
      "<h2>"
    );

  content =
    content.replace(
      /<\/h1>/gi,
      "</h2>"
    );


  /*
   * Convert H2 inside blog content
   * into H3.
   *
   * Example:
   *
   * <h2>Brand Strategy Is the Foundation</h2>
   *
   * becomes:
   *
   * <h3>Brand Strategy Is the Foundation</h3>
   */

  content =
    content.replace(
      /<h2(\s[^>]*)?>/gi,
      "<h3>"
    );

  content =
    content.replace(
      /<\/h2>/gi,
      "</h3>"
    );


  /*
   * Keep H3 as H3.
   */

  content =
    content.replace(
      /<h3(\s[^>]*)?>/gi,
      "<h3>"
    );

  content =
    content.replace(
      /<\/h3>/gi,
      "</h3>"
    );


  /*
   * Convert H4/H5/H6 to H3.
   *
   * This keeps the article hierarchy
   * simple and SEO-friendly.
   */

  content =
    content.replace(
      /<h[4-6](\s[^>]*)?>/gi,
      "<h3>"
    );

  content =
    content.replace(
      /<\/h[4-6]>/gi,
      "</h3>"
    );


  return content;
};


const BlogSingle = ({
  className,
}) => {

  const { slug } =
    useParams();


  /* =========================================================
     BLOG STATE
  ========================================================= */

  const [blog, setBlog] =
    useState(null);

  const [allBlogs, setAllBlogs] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  /* =========================================================
     READ MORE / READ LESS
  ========================================================= */

  const [
    isContentExpanded,
    setIsContentExpanded,
  ] = useState(false);


  /* =========================================================
     COMMENTS
  ========================================================= */

  const [comments, setComments] =
    useState([]);

  const [
    commentsLoading,
    setCommentsLoading,
  ] = useState(true);

  const [
    submittingComment,
    setSubmittingComment,
  ] = useState(false);

  const [
    commentMessage,
    setCommentMessage,
  ] = useState("");


  /* =========================================================
     COMMENT FORM
  ========================================================= */

  const [commentForm, setCommentForm] =
    useState({
      name: "",
      email: "",
      comment: "",
    });


  /* =========================================================
     REPLY
  ========================================================= */

  const [replyTo, setReplyTo] =
    useState(null);

  const [replyForm, setReplyForm] =
    useState({
      name: "",
      email: "",
      comment: "",
    });


  /* =========================================================
     LOAD BLOG
  ========================================================= */

  useEffect(() => {

    const loadBlog = async () => {

      try {

        setLoading(true);

        setError("");


        const blogData =
          await getBlogBySlug(
            slug
          );


        if (!blogData) {

          setError(
            "Blog not found."
          );

          return;
        }


        setBlog(
          blogData
        );


        /*
         * Reset Read More whenever
         * another blog is opened.
         */

        setIsContentExpanded(
          false
        );


        const blogs =
          await getPublishedBlogs();


        setAllBlogs(
          Array.isArray(blogs)
            ? blogs
            : []
        );


      } catch (err) {

        console.error(
          "Blog loading error:",
          err
        );


        setError(
          "Unable to load this blog."
        );


      } finally {

        setLoading(false);

      }

    };


    if (slug) {

      loadBlog();

    }

  }, [slug]);


  /* =========================================================
     LOAD COMMENTS
  ========================================================= */

  useEffect(() => {

    const loadComments =
      async () => {

        if (!blog?.id) {

          return;
        }


        try {

          setCommentsLoading(
            true
          );


          const data =
            await getBlogComments(
              blog.id
            );


          setComments(
            Array.isArray(data)
              ? data
              : []
          );


        } catch (err) {

          console.error(
            "Comments loading error:",
            err
          );


          setComments([]);

        } finally {

          setCommentsLoading(
            false
          );

        }

      };


    loadComments();

  }, [blog?.id]);


  /* =========================================================
     DATE
  ========================================================= */

  const formattedDate =
    useMemo(() => {

      if (
        !blog?.published_date
      ) {

        return "";
      }


      const date =
        new Date(
          blog.published_date
        );


      if (
        Number.isNaN(
          date.getTime()
        )
      ) {

        return "";
      }


      return date.toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      );

    }, [blog]);


  /* =========================================================
     TAGS
  ========================================================= */

  const tags =
    Array.isArray(
      blog?.tags
    )
      ? blog.tags
      : [];


  /* =========================================================
     CURRENT BLOG
  ========================================================= */

  const currentIndex =
    allBlogs.findIndex(
      (item) =>
        String(item.id) ===
        String(blog?.id)
    );


  /* =========================================================
     PREVIOUS BLOG
  ========================================================= */

  const previousBlog =
    currentIndex > 0
      ? allBlogs[
          currentIndex - 1
        ]
      : null;


  /* =========================================================
     NEXT BLOG
  ========================================================= */

  const nextBlog =
    currentIndex !== -1 &&
    currentIndex <
      allBlogs.length - 1
      ? allBlogs[
          currentIndex + 1
        ]
      : null;


  /* =========================================================
     RELATED BLOGS
  ========================================================= */

  const relatedBlogs =
    useMemo(() => {

      if (!blog) {

        return [];
      }


      let related =
        allBlogs.filter(
          (item) =>
            String(item.id) !==
            String(blog.id)
        );


      /*
       * Same category first.
       */

      if (blog.category) {

        const sameCategory =
          related.filter(
            (item) =>
              item.category ===
              blog.category
          );


        const otherBlogs =
          related.filter(
            (item) =>
              item.category !==
              blog.category
          );


        related = [
          ...sameCategory,
          ...otherBlogs,
        ];

      }


      /*
       * Matching tags first.
       */

      if (
        tags.length > 0
      ) {

        related.sort(
          (a, b) => {

            const aTags =
              Array.isArray(
                a.tags
              )
                ? a.tags
                : [];


            const bTags =
              Array.isArray(
                b.tags
              )
                ? b.tags
                : [];


            const aMatches =
              tags.filter(
                (tag) =>
                  aTags.includes(
                    tag
                  )
              ).length;


            const bMatches =
              tags.filter(
                (tag) =>
                  bTags.includes(
                    tag
                  )
              ).length;


            return (
              bMatches -
              aMatches
            );

          }
        );

      }


      return related.slice(
        0,
        3
      );

    }, [
      blog,
      allBlogs,
      tags,
    ]);


  /* =========================================================
     COMMENT INPUT
  ========================================================= */

  const handleCommentChange =
    (e) => {

      const {
        name,
        value,
      } = e.target;


      setCommentForm(
        (prev) => ({
          ...prev,
          [name]: value,
        })
      );

    };


  /* =========================================================
     REPLY INPUT
  ========================================================= */

  const handleReplyChange =
    (e) => {

      const {
        name,
        value,
      } = e.target;


      setReplyForm(
        (prev) => ({
          ...prev,
          [name]: value,
        })
      );

    };


  /* =========================================================
     SUBMIT COMMENT
  ========================================================= */

  const handleCommentSubmit =
    async (e) => {

      e.preventDefault();


      if (
        !commentForm.name.trim() ||
        !commentForm.email.trim() ||
        !commentForm.comment.trim()
      ) {

        setCommentMessage(
          "Please fill all required fields."
        );

        return;
      }


      try {

        setSubmittingComment(
          true
        );

        setCommentMessage(
          ""
        );


        await addBlogComment({

          blogId:
            blog.id,

          name:
            commentForm.name.trim(),

          email:
            commentForm.email.trim(),

          comment:
            commentForm.comment.trim(),

        });


        setCommentForm({

          name: "",
          email: "",
          comment: "",

        });


        setCommentMessage(
          "Thank you! Your comment has been submitted and is awaiting approval."
        );


      } catch (err) {

        console.error(
          "Add comment error:",
          err
        );


        setCommentMessage(
          err?.message ||
          "Unable to submit comment. Please try again."
        );


      } finally {

        setSubmittingComment(
          false
        );

      }

    };


  /* =========================================================
     SUBMIT REPLY
  ========================================================= */

  const handleReplySubmit =
    async (
      e,
      parentId
    ) => {

      e.preventDefault();


      if (
        !replyForm.name.trim() ||
        !replyForm.email.trim() ||
        !replyForm.comment.trim()
      ) {

        return;
      }


      try {

        setSubmittingComment(
          true
        );


        await addBlogComment({

          blogId:
            blog.id,

          parentId:
            parentId,

          name:
            replyForm.name.trim(),

          email:
            replyForm.email.trim(),

          comment:
            replyForm.comment.trim(),

        });


        setReplyForm({

          name: "",
          email: "",
          comment: "",

        });


        setReplyTo(
          null
        );


        setCommentMessage(
          "Your reply has been submitted and is awaiting approval."
        );


      } catch (err) {

        console.error(
          "Add reply error:",
          err
        );


        setCommentMessage(
          err?.message ||
          "Unable to submit reply."
        );


      } finally {

        setSubmittingComment(
          false
        );

      }

    };


  /* =========================================================
     GET REPLIES
  ========================================================= */

  const getReplies =
    (commentId) => {

      return comments.filter(
        (comment) =>
          String(
            comment.parent_id
          ) ===
          String(commentId)
      );

    };


  /* =========================================================
     COMMENT RENDER
  ========================================================= */

  const renderComment =
    (
      comment,
      isReply = false
    ) => {

      const replies =
        getReplies(
          comment.id
        );


      return (

        <div
          key={comment.id}
          className={
            isReply
              ? "dynamic-comment dynamic-comment-reply"
              : "dynamic-comment"
          }
        >

          <div className="dynamic-comment-avatar">

            {comment.name
              ?.charAt(0)
              ?.toUpperCase() ||
              "U"}

          </div>


          <div className="dynamic-comment-body">

            <div className="dynamic-comment-top">

              <div>

                <h4>
                  {comment.name}
                </h4>


                <span>

                  {comment.created_at &&
                    new Date(
                      comment.created_at
                    ).toLocaleDateString(
                      "en-IN",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}

                </span>

              </div>


              {!isReply && (

                <button
                  type="button"
                  className="dynamic-reply-btn"
                  onClick={() =>
                    setReplyTo(
                      replyTo ===
                        comment.id
                        ? null
                        : comment.id
                    )
                  }
                >

                  Reply

                </button>

              )}

            </div>


            <p>
              {comment.comment}
            </p>


            {replyTo ===
              comment.id && (

              <form
                className="dynamic-reply-form"
                onSubmit={(e) =>
                  handleReplySubmit(
                    e,
                    comment.id
                  )
                }
              >

                <div className="row">

                  <div className="col-md-6">

                    <input
                      type="text"
                      name="name"
                      value={
                        replyForm.name
                      }
                      onChange={
                        handleReplyChange
                      }
                      placeholder="Your Name *"
                      required
                    />

                  </div>


                  <div className="col-md-6">

                    <input
                      type="email"
                      name="email"
                      value={
                        replyForm.email
                      }
                      onChange={
                        handleReplyChange
                      }
                      placeholder="Your Email *"
                      required
                    />

                  </div>


                  <div className="col-12">

                    <textarea
                      name="comment"
                      value={
                        replyForm.comment
                      }
                      onChange={
                        handleReplyChange
                      }
                      placeholder="Your Reply *"
                      rows="4"
                      required
                    />

                  </div>


                  <div className="col-12">

                    <button
                      type="submit"
                      disabled={
                        submittingComment
                      }
                    >

                      {submittingComment
                        ? "Submitting..."
                        : "Submit Reply"}

                    </button>

                  </div>

                </div>

              </form>

            )}


            {replies.length >
              0 && (

              <div className="dynamic-comment-replies">

                {replies.map(
                  (reply) =>
                    renderComment(
                      reply,
                      true
                    )
                )}

              </div>

            )}

          </div>

        </div>

      );

    };


  /* =========================================================
     ROOT COMMENTS
  ========================================================= */

  const rootComments =
    comments.filter(
      (comment) =>
        !comment.parent_id
    );


  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {

    return (

      <section
        className={`vs-blog-wrapper blog-details ${
          className || ""
        }`}
      >

        <style>
          {blogDetailCSS}
        </style>


        <div className="container">

          <div className="dynamic-blog-loading">

            <div className="dynamic-blog-spinner" />

            <p>
              Loading blog...
            </p>

          </div>

        </div>

      </section>

    );

  }


  /* =========================================================
     NOT FOUND
  ========================================================= */

  if (
    error ||
    !blog
  ) {

    return (

      <section
        className={`vs-blog-wrapper blog-details ${
          className || ""
        }`}
      >

        <style>
          {blogDetailCSS}
        </style>


        <div className="container">

          <div className="dynamic-blog-not-found">

            <h2>
              Blog Not Found
            </h2>


            <p>
              The blog you're looking for
              could not be found.
            </p>


            <Link
              to="/blog"
              className="vs-btn"
            >

              Back to Blog

            </Link>

          </div>

        </div>

      </section>

    );

  }


  /* =========================================================
     SHARE URL
  ========================================================= */

  const currentUrl =
    window.location.href;


  const encodedUrl =
    encodeURIComponent(
      currentUrl
    );


  const encodedTitle =
    encodeURIComponent(
      blog.title
    );


  /* =========================================================
     MAIN BLOG
  ========================================================= */

  return (

    <>

      <style>
        {blogDetailCSS}
      </style>


      <section
        className={`vs-blog-wrapper blog-details dynamic-blog-details ${
          className || ""
        }`}
      >

        <div className="container">

          <div className="row gx-40">


            {/* =================================================
                MAIN BLOG
            ================================================= */}

            <div className="col-lg-8">

              <Blog
                className="blog-single"
              >


                {/* =================================================
                    FEATURED IMAGE
                ================================================= */}

                {blog.featured_image && (

                  <div className="dynamic-featured-image">

                    <img
                      src={
                        blog.featured_image
                      }
                      alt={
                        blog.featured_image_alt ||
                        blog.title
                      }
                      loading="eager"
                    />

                  </div>

                )}


                <Blog.Body>


                  {/* =================================================
                      META
                  ================================================= */}

                  <Blog.Meta>

                    {formattedDate && (

                      <Link to="/blog">

                        <i className="far fa-calendar" />

                        {formattedDate}

                      </Link>

                    )}


                    <Link to="/blog">

                      <i className="fal fa-user" />

                      by{" "}

                      {blog.author_name ||
                        "Admin"}

                    </Link>


                    {blog.category && (

                      <Link
                        to={`/blog?category=${encodeURIComponent(
                          blog.category
                        )}`}
                      >

                        <i className="far fa-folder" />

                        {blog.category}

                      </Link>

                    )}

                  </Blog.Meta>


                  {/* =================================================
                      MAIN BLOG TITLE

                      ONLY H1 ON THE PAGE
                  ================================================= */}

                  <h1 className="blog-title">

                    {blog.title}

                  </h1>


                  {/* =================================================
                      BLOG CONTENT

                      CMS:
                      H1 -> H2
                      H2 -> H3
                      H3 -> H3
                      H4 -> H3
                      H5 -> H3
                      H6 -> H3
                  ================================================= */}

                  <div
                    className={`blog-dynamic-content ${
                      isContentExpanded
                        ? "blog-content-expanded"
                        : "blog-content-collapsed"
                    }`}
                    dangerouslySetInnerHTML={{
                      __html:
                        normalizeBlogContentHeadings(
                          blog.content ||
                          ""
                        ),
                    }}
                  />


                  {/* =================================================
                      READ MORE
                  ================================================= */}

                  <div className="blog-read-more-wrapper">

                    <button
                      type="button"
                      className="blog-read-more-btn"
                      onClick={() =>
                        setIsContentExpanded(
                          (prev) =>
                            !prev
                        )
                      }
                      aria-expanded={
                        isContentExpanded
                      }
                    >

                      <span>

                        {isContentExpanded
                          ? "Read Less"
                          : "Read More"}

                      </span>


                      <i
                        className={
                          isContentExpanded
                            ? "far fa-chevron-up"
                            : "far fa-chevron-down"
                        }
                      />

                    </button>

                  </div>


                  {/* =================================================
                      TAGS + SHARE
                  ================================================= */}

                  <Blog.Bottom>

                    {tags.length >
                      0 && (

                      <Blog.BottomColumn
                        columnTitle="Tags"
                      >

                        <TagWidget>

                          {tags.map(
                            (tag) => (

                              <TagWidget.Item
                                key={tag}
                                path={`/blog?tag=${encodeURIComponent(
                                  tag
                                )}`}
                              >

                                {tag}

                              </TagWidget.Item>

                            )
                          )}

                        </TagWidget>

                      </Blog.BottomColumn>

                    )}


                    <Blog.BottomColumn
                      columnTitle="Share"
                    >

                      <IconLink
                        className="social-links"
                      >

                        <IconLink.Item
                          icon="fab fa-facebook-f"
                          path={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                        />


                        <IconLink.Item
                          icon="fab fa-twitter"
                          path={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                        />


                        <IconLink.Item
                          icon="fab fa-linkedin-in"
                          path={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                        />


                        <IconLink.Item
                          icon="fab fa-whatsapp"
                          path={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
                        />

                      </IconLink>

                    </Blog.BottomColumn>

                  </Blog.Bottom>


                  {/* =================================================
                      PREVIOUS / NEXT
                  ================================================= */}

                  <div className="dynamic-post-navigation">

                    {previousBlog ? (

                      <Link
                        to={`/blog/${previousBlog.slug}`}
                        className="dynamic-post-nav previous"
                      >

                        {previousBlog.featured_image && (

                          <img
                            src={
                              previousBlog.featured_image
                            }
                            alt={
                              previousBlog.featured_image_alt ||
                              previousBlog.title
                            }
                            loading="lazy"
                          />

                        )}


                        <div>

                          <span>
                            Previous Post
                          </span>


                          <strong>
                            {
                              previousBlog.title
                            }
                          </strong>

                        </div>

                      </Link>

                    ) : (

                      <div />

                    )}


                    <Link
                      to="/blogs"
                      className="dynamic-post-grid"
                      aria-label="All Blogs"
                    >

                      <i className="fas fa-th" />

                    </Link>


                    {nextBlog ? (

                      <Link
                        to={`/blog/${nextBlog.slug}`}
                        className="dynamic-post-nav next"
                      >

                        <div>

                          <span>
                            Next Post
                          </span>


                          <strong>
                            {
                              nextBlog.title
                            }
                          </strong>

                        </div>


                        {nextBlog.featured_image && (

                          <img
                            src={
                              nextBlog.featured_image
                            }
                            alt={
                              nextBlog.featured_image_alt ||
                              nextBlog.title
                            }
                            loading="lazy"
                          />

                        )}

                      </Link>

                    ) : (

                      <div />

                    )}

                  </div>


                  {/* =================================================
                      AUTHOR
                  ================================================= */}

                  <div className="dynamic-author-box">

                    <div className="dynamic-author-avatar">

                      {blog.author_name
                        ?.charAt(0)
                        ?.toUpperCase() ||
                        "A"}

                    </div>


                    <div>

                      <span>
                        Written by
                      </span>


                      <h3>
                        {blog.author_name ||
                          "Admin"}
                      </h3>


                      <p>
                        Author of this article.
                      </p>

                    </div>

                  </div>


                  {/* =================================================
                      RELATED POSTS
                  ================================================= */}

                  {relatedBlogs.length >
                    0 && (

                    <div className="dynamic-related-posts">

                      <div className="dynamic-section-heading">

                        <span>
                          RELATED CONTENT
                        </span>


                        <h2>
                          Related Posts
                        </h2>

                      </div>


                      <div className="row">

                        {relatedBlogs.map(
                          (related) => (

                            <div
                              className="col-md-4"
                              key={related.id}
                            >

                              <Link
                                to={`/blog/${related.slug}`}
                                className="dynamic-related-card"
                              >

                                {related.featured_image && (

                                  <div className="dynamic-related-image">

                                    <img
                                      src={
                                        related.featured_image
                                      }
                                      alt={
                                        related.featured_image_alt ||
                                        related.title
                                      }
                                      loading="lazy"
                                    />

                                  </div>

                                )}


                                <div className="dynamic-related-content">

                                  <span>
                                    {
                                      related.category ||
                                      "Blog"
                                    }
                                  </span>


                                  <h3>
                                    {
                                      related.title
                                    }
                                  </h3>

                                </div>

                              </Link>

                            </div>

                          )
                        )}

                      </div>

                    </div>

                  )}


                  {/* =================================================
                      COMMENTS
                  ================================================= */}

                  <div className="dynamic-comments">

                    <div className="dynamic-section-heading">

                      <span>
                        COMMUNITY
                      </span>


                      <h2>

                        Comments{" "}

                        <small>
                          ({comments.length})
                        </small>

                      </h2>

                    </div>


                    {commentsLoading ? (

                      <p className="dynamic-comments-loading">

                        Loading comments...

                      </p>

                    ) : rootComments.length >
                      0 ? (

                      <div>

                        {rootComments.map(
                          (comment) =>
                            renderComment(
                              comment
                            )
                        )}

                      </div>

                    ) : (

                      <div className="dynamic-no-comments">

                        <i className="far fa-comments" />

                        <p>

                          Be the first to
                          comment on this
                          article.

                        </p>

                      </div>

                    )}

                  </div>


                  {/* =================================================
                      COMMENT FORM
                  ================================================= */}

                  <div className="dynamic-comment-form">

                    <div className="dynamic-section-heading">

                      <span>
                        JOIN THE DISCUSSION
                      </span>


                      <h2>
                        Leave a Comment
                      </h2>

                    </div>


                    <p className="dynamic-comment-note">

                      Your email address will
                      not be published.
                      Required fields are marked *.

                    </p>


                    {commentMessage && (

                      <div className="dynamic-comment-message">

                        {commentMessage}

                      </div>

                    )}


                    <form
                      onSubmit={
                        handleCommentSubmit
                      }
                    >

                      <div className="row">

                        <div className="col-md-6">

                          <input
                            type="text"
                            name="name"
                            value={
                              commentForm.name
                            }
                            onChange={
                              handleCommentChange
                            }
                            placeholder="Your Name *"
                            required
                          />

                        </div>


                        <div className="col-md-6">

                          <input
                            type="email"
                            name="email"
                            value={
                              commentForm.email
                            }
                            onChange={
                              handleCommentChange
                            }
                            placeholder="Your Email *"
                            required
                          />

                        </div>


                        <div className="col-12">

                          <textarea
                            name="comment"
                            value={
                              commentForm.comment
                            }
                            onChange={
                              handleCommentChange
                            }
                            placeholder="Your Comment *"
                            rows="6"
                            required
                          />

                        </div>


                        <div className="col-12">

                          <button
                            type="submit"
                            className="dynamic-comment-submit"
                            disabled={
                              submittingComment
                            }
                          >

                            {submittingComment
                              ? "Submitting..."
                              : "Post Comment"}

                            <i className="far fa-arrow-right" />

                          </button>

                        </div>

                      </div>

                    </form>

                  </div>

                </Blog.Body>

              </Blog>

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

    </>

  );

};


/* ============================================================
   CSS
============================================================ */

const blogDetailCSS = `

/* =========================================================
   BLOG
========================================================= */

.dynamic-blog-details {
  overflow: hidden;
}

.dynamic-blog-details .blog-single {
  width: 100%;
}


/* =========================================================
   FEATURED IMAGE
========================================================= */

.dynamic-featured-image {
  width: 100%;
  height: 450px;

  margin: 0 0 22px;

  overflow: hidden;

  position: relative;

  background: #f3f4f6;
}


.dynamic-featured-image img {
  display: block;

  width: 100%;
  height: 450px;

  margin: 0;

  object-fit: cover;
  object-position: center;

  transform: scale(1);

  animation:
    blogFeaturedZoom
    8s
    ease-in-out
    infinite
    alternate;

  transition:
    transform .5s ease,
    filter .5s ease;
}


.dynamic-featured-image:hover img {
  transform: scale(1.07);

  animation-play-state: paused;

  filter: brightness(1.04);
}


@keyframes blogFeaturedZoom {

  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(1.06);
  }

}


/* =========================================================
   META
========================================================= */

.dynamic-blog-details .blog-meta {
  margin-top: 0;
  margin-bottom: 10px;

  line-height: 1.5;
}


.dynamic-blog-details .blog-meta a {
  display: inline-flex;

  align-items: center;

  gap: 5px;
}


/* =========================================================
   MAIN BLOG TITLE

   THIS IS THE ONLY H1
========================================================= */

.dynamic-blog-details .blog-title {
  margin-top: 0;

  margin-bottom: 15px;

  line-height: 1.3;
}


/* =========================================================
   BLOG CONTENT
========================================================= */

.blog-dynamic-content {
  width: 100%;

  margin: 0;

  color: #555;

  font-size: 15px;

  line-height: 1.75;

  transition:
    max-height .45s ease;
}


/* =========================================================
   ARTICLE H2

   Main article sections
========================================================= */

.blog-dynamic-content h2 {
  margin-top: 35px;

  margin-bottom: 16px;

  font-size: 34px;

  line-height: 1.3;

  font-weight: 700;
}


/* =========================================================
   ARTICLE H3

   Article sub-sections
========================================================= */

.blog-dynamic-content h3 {
  margin-top: 28px;

  margin-bottom: 13px;

  font-size: 23px;

  line-height: 1.4;

  font-weight: 700;
}


/* =========================================================
   H4/H5/H6

   Normally these are converted to H3 by JS.
   These styles are kept as a fallback.
========================================================= */

.blog-dynamic-content h4,
.blog-dynamic-content h5,
.blog-dynamic-content h6 {
  margin-top: 23px;

  margin-bottom: 11px;

  font-size: 19px;

  line-height: 1.4;

  font-weight: 700;
}


/* =========================================================
   COLLAPSED
========================================================= */

.blog-dynamic-content.blog-content-collapsed {
  max-height: 250px;

  overflow: hidden;

  position: relative;
}


/* =========================================================
   FADE
========================================================= */

.blog-dynamic-content.blog-content-collapsed::after {

  content: "";

  position: absolute;

  left: 0;

  right: 0;

  bottom: 0;

  height: 80px;

  pointer-events: none;

  background:
    linear-gradient(
      to bottom,
      rgba(255,255,255,0),
      #fff
    );
}


/* =========================================================
   EXPANDED
========================================================= */

.blog-dynamic-content.blog-content-expanded {
  max-height: none;

  overflow: visible;
}


/* =========================================================
   PARAGRAPHS
========================================================= */

.blog-dynamic-content p {
  margin-top: 0;

  margin-bottom: 17px;
}


/* =========================================================
   LISTS
========================================================= */

.blog-dynamic-content ul,
.blog-dynamic-content ol {
  margin: 18px 0;

  padding-left: 25px;
}


.blog-dynamic-content li {
  margin-bottom: 7px;

  line-height: 1.7;
}


/* =========================================================
   LINKS
========================================================= */

.blog-dynamic-content a {
  text-decoration: underline;

  text-decoration-thickness: 1px;

  text-underline-offset: 2px;

  font-weight: 600;
}


/* =========================================================
   IMAGES
========================================================= */

.blog-dynamic-content
p:has(> img:only-child) {

  display: inline-block;

  width:
    calc(50% - 10px);

  margin:
    10px 16px 20px 0;

  padding: 0;

  vertical-align: top;

  line-height: 0;
}


.blog-dynamic-content
p:has(> img:only-child):nth-of-type(even) {
  margin-right: 0;
}


.blog-dynamic-content
p:has(> img:only-child) img {

  display: block;

  width: 100%;

  height: 215px;

  margin: 0;

  object-fit: cover;

  object-position: center;
}


.blog-dynamic-content > img {

  display: inline-block;

  width:
    calc(50% - 10px);

  height: 215px;

  margin:
    10px 16px 20px 0;

  vertical-align: top;

  object-fit: cover;
}


.blog-dynamic-content > img:nth-of-type(even) {
  margin-right: 0;
}


/* =========================================================
   FIGURE
========================================================= */

.blog-dynamic-content figure {
  margin: 20px 0;
}


.blog-dynamic-content figure img {
  display: block;

  max-width: 100%;

  height: auto;
}


/* =========================================================
   BLOCKQUOTE
========================================================= */

.blog-dynamic-content blockquote {

  margin: 28px 0;

  padding: 25px 28px;

  border-left:
    3px solid currentColor;

  background: #f4f5f7;

  font-style: italic;

  line-height: 1.75;
}


/* =========================================================
   READ MORE
========================================================= */

.blog-read-more-wrapper {

  display: flex;

  width: 100%;

  align-items: center;

  justify-content: center;

  margin-top: 18px;

  margin-bottom: 30px;
}


.blog-read-more-btn {

  display: inline-flex;

  align-items: center;

  justify-content: center;

  gap: 9px;

  min-width: 130px;

  min-height: 44px;

  padding: 12px 23px;

  border: 0;

  border-radius: 5px;

  background: #222;

  color: #fff;

  cursor: pointer;

  outline: none;

  font-family: inherit;

  font-size: 13px;

  font-weight: 600;

  line-height: 1;

  transition:
    transform .3s ease,
    background .3s ease,
    box-shadow .3s ease;
}


.blog-read-more-btn:hover {

  background: #111;

  transform:
    translateY(-3px);

  box-shadow:
    0 8px 22px
    rgba(0,0,0,.16);
}


.blog-read-more-btn:active {

  transform:
    translateY(-1px);
}


.blog-read-more-btn i {

  font-size: 10px;

  transition:
    transform .3s ease;
}


.blog-read-more-btn:hover i {

  transform:
    translateY(3px);
}


/* =========================================================
   POST NAVIGATION
========================================================= */

.dynamic-post-navigation {

  display: grid;

  grid-template-columns:
    1fr 48px 1fr;

  gap: 18px;

  align-items: center;

  margin-top: 38px;

  padding: 24px 0;

  border-top:
    1px solid #eee;

  border-bottom:
    1px solid #eee;
}


.dynamic-post-nav {

  display: flex;

  min-width: 0;

  align-items: center;

  gap: 12px;

  color: #222;

  text-decoration: none;
}


.dynamic-post-nav.next {

  justify-content: flex-end;

  text-align: right;
}


.dynamic-post-nav img {

  width: 70px;

  height: 58px;

  flex:
    0 0 70px;

  object-fit: cover;

  border-radius: 5px;
}


.dynamic-post-nav span {

  display: block;

  margin-bottom: 4px;

  color: #888;

  font-size: 10px;

  font-weight: 600;

  text-transform: uppercase;
}


.dynamic-post-nav strong {

  display: -webkit-box;

  overflow: hidden;

  font-size: 12px;

  line-height: 1.45;

  -webkit-line-clamp: 2;

  -webkit-box-orient: vertical;
}


.dynamic-post-grid {

  display: flex;

  width: 44px;

  height: 44px;

  align-items: center;

  justify-content: center;

  margin: auto;

  border-radius: 5px;

  background: #f3f4f6;

  color: #222;

  text-decoration: none;

  transition: .25s ease;
}


.dynamic-post-grid:hover {

  transform:
    translateY(-2px);
}


/* =========================================================
   AUTHOR
========================================================= */

.dynamic-author-box {

  display: flex;

  align-items: center;

  gap: 18px;

  margin-top: 38px;

  padding: 24px;

  background: #f3f4f6;
}


.dynamic-author-avatar {

  display: flex;

  width: 75px;

  height: 75px;

  flex:
    0 0 75px;

  align-items: center;

  justify-content: center;

  border-radius: 50%;

  background: #fff;

  font-size: 25px;

  font-weight: 700;
}


.dynamic-author-box span {

  display: block;

  margin-bottom: 4px;

  color: #888;

  font-size: 10px;

  font-weight: 600;

  letter-spacing: .5px;

  text-transform: uppercase;
}


.dynamic-author-box h3 {

  margin: 0 0 5px;

  font-size: 20px;
}


.dynamic-author-box p {

  margin: 0;

  color: #777;

  font-size: 13px;
}


/* =========================================================
   SECTION HEADING
========================================================= */

.dynamic-section-heading {

  margin-bottom: 22px;
}


.dynamic-section-heading span {

  display: block;

  margin-bottom: 5px;

  font-size: 10px;

  font-weight: 700;

  letter-spacing: 1.5px;
}


.dynamic-section-heading h2 {

  margin: 0;

  font-size: 27px;

  line-height: 1.3;
}


.dynamic-section-heading h2 small {

  color: #888;

  font-size: 14px;

  font-weight: 400;
}


/* =========================================================
   RELATED
========================================================= */

.dynamic-related-posts {

  margin-top: 52px;
}


.dynamic-related-card {

  display: block;

  height: 100%;

  color: #222;

  text-decoration: none;
}


.dynamic-related-image {

  width: 100%;

  height: 170px;

  overflow: hidden;

  border-radius: 6px;

  background: #f3f4f6;
}


.dynamic-related-image img {

  display: block;

  width: 100%;

  height: 100%;

  object-fit: cover;

  transition:
    transform .35s ease;
}


.dynamic-related-card:hover
.dynamic-related-image img {

  transform:
    scale(1.05);
}


.dynamic-related-content {

  padding-top: 11px;
}


.dynamic-related-content span {

  font-size: 10px;

  text-transform: uppercase;
}


.dynamic-related-content h3 {

  display: -webkit-box;

  overflow: hidden;

  margin: 5px 0 0;

  font-size: 16px;

  line-height: 1.45;

  -webkit-line-clamp: 2;

  -webkit-box-orient: vertical;
}


/* =========================================================
   COMMENTS
========================================================= */

.dynamic-comments {

  margin-top: 52px;

  padding-top: 32px;

  border-top:
    1px solid #eee;
}


.dynamic-comments-loading {

  color: #777;

  font-size: 13px;
}


.dynamic-comment {

  display: flex;

  gap: 15px;

  padding: 19px 0;

  border-bottom:
    1px solid #eee;
}


.dynamic-comment-reply {

  margin-top: 14px;

  padding: 15px;

  border-bottom: 0;

  background: #f6f7f8;
}


.dynamic-comment-avatar {

  display: flex;

  width: 48px;

  height: 48px;

  flex:
    0 0 48px;

  align-items: center;

  justify-content: center;

  border-radius: 50%;

  background: #e9eaec;

  color: #333;

  font-size: 17px;

  font-weight: 700;
}


.dynamic-comment-body {

  flex: 1;

  min-width: 0;
}


.dynamic-comment-top {

  display: flex;

  align-items: flex-start;

  justify-content: space-between;

  gap: 15px;
}


.dynamic-comment-top h4 {

  margin: 0 0 3px;

  font-size: 15px;
}


.dynamic-comment-top span {

  color: #999;

  font-size: 11px;
}


.dynamic-comment-body > p {

  margin: 9px 0 0;

  color: #666;

  font-size: 13px;

  line-height: 1.7;
}


.dynamic-reply-btn {

  padding: 0;

  border: 0;

  background: transparent;

  color: #555;

  cursor: pointer;

  font-size: 11px;

  font-weight: 600;
}


.dynamic-reply-btn:hover {

  text-decoration: underline;
}


.dynamic-comment-replies {

  margin-top: 5px;

  margin-left: 20px;

  padding-left: 20px;

  border-left:
    1px solid #ddd;
}


/* =========================================================
   REPLY FORM
========================================================= */

.dynamic-reply-form {

  margin-top: 15px;

  padding: 18px;

  background: #f5f6f8;
}


.dynamic-reply-form input,
.dynamic-reply-form textarea {

  width: 100%;

  margin-bottom: 12px;

  padding: 11px 13px;

  border:
    1px solid #ddd;

  border-radius: 4px;

  outline: none;

  background: #fff;

  font-size: 13px;
}


.dynamic-reply-form input:focus,
.dynamic-reply-form textarea:focus {

  border-color: #999;
}


.dynamic-reply-form button {

  min-height: 40px;

  padding: 0 17px;

  border: 0;

  border-radius: 4px;

  background: #222;

  color: #fff;

  cursor: pointer;

  font-size: 12px;

  font-weight: 600;
}


.dynamic-reply-form button:disabled {

  opacity: .5;

  cursor: not-allowed;
}


/* =========================================================
   NO COMMENTS
========================================================= */

.dynamic-no-comments {

  padding: 28px;

  background: #f7f7f7;

  text-align: center;
}


.dynamic-no-comments i {

  display: block;

  margin-bottom: 9px;

  font-size: 27px;
}


.dynamic-no-comments p {

  margin: 0;

  color: #777;

  font-size: 13px;
}


/* =========================================================
   COMMENT FORM
========================================================= */

.dynamic-comment-form {

  margin-top: 42px;

  padding: 28px;

  background: #f5f6f8;
}


.dynamic-comment-note {

  margin-bottom: 20px;

  color: #777;

  font-size: 13px;
}


.dynamic-comment-message {

  margin-bottom: 18px;

  padding: 12px 14px;

  border-radius: 5px;

  background: #fff;

  color: #555;

  font-size: 13px;

  line-height: 1.6;
}


.dynamic-comment-form input,
.dynamic-comment-form textarea {

  width: 100%;

  margin-bottom: 14px;

  padding: 12px 14px;

  border:
    1px solid #ddd;

  border-radius: 5px;

  outline: none;

  background: #fff;

  font-size: 13px;
}


.dynamic-comment-form input:focus,
.dynamic-comment-form textarea:focus {

  border-color: #999;
}


.dynamic-comment-form textarea {

  resize: vertical;
}


.dynamic-comment-submit {

  display: inline-flex;

  min-height: 46px;

  align-items: center;

  gap: 9px;

  padding: 0 21px;

  border: 0;

  border-radius: 5px;

  background: #222;

  color: #fff;

  cursor: pointer;

  font-size: 13px;

  font-weight: 700;

  transition: .25s ease;
}


.dynamic-comment-submit:hover {

  transform:
    translateY(-1px);
}


.dynamic-comment-submit:disabled {

  opacity: .5;

  cursor: not-allowed;

  transform: none;
}


/* =========================================================
   LOADING
========================================================= */

.dynamic-blog-loading {

  display: flex;

  min-height: 400px;

  align-items: center;

  justify-content: center;

  flex-direction: column;
}


.dynamic-blog-loading p {

  margin: 0;

  color: #777;

  font-size: 14px;
}


.dynamic-blog-spinner {

  width: 35px;

  height: 35px;

  margin-bottom: 15px;

  border:
    3px solid #ddd;

  border-top-color:
    #222;

  border-radius: 50%;

  animation:
    dynamicBlogSpin
    .7s
    linear
    infinite;
}


@keyframes dynamicBlogSpin {

  to {

    transform:
      rotate(360deg);

  }

}


/* =========================================================
   NOT FOUND
========================================================= */

.dynamic-blog-not-found {

  padding: 100px 20px;

  text-align: center;
}


.dynamic-blog-not-found h2 {

  margin-bottom: 10px;
}


.dynamic-blog-not-found p {

  margin-bottom: 25px;

  color: #777;
}


/* =========================================================
   TABLET
========================================================= */

@media (
  min-width: 768px
)
and (
  max-width: 991px
) {

  .dynamic-featured-image {

    width: 100%;

    height: auto;

    aspect-ratio:
      803 / 450;

    margin-bottom: 20px;
  }


  .dynamic-featured-image img {

    width: 100%;

    height: 100%;

    object-fit: cover;
  }


  .blog-dynamic-content {

    font-size: 14px;

    line-height: 1.8;
  }


  .blog-dynamic-content
  p:has(> img:only-child) {

    width:
      calc(50% - 9px);

    margin-right: 14px;
  }


  .blog-dynamic-content
  p:has(> img:only-child) img {

    height: 190px;
  }


  .blog-dynamic-content > img {

    width:
      calc(50% - 9px);

    height: 190px;

    margin-right: 14px;
  }


  .dynamic-related-image {

    height: 150px;
  }

}


/* =========================================================
   MOBILE
========================================================= */

@media (max-width: 767px) {

  .dynamic-featured-image {

    width: 100%;

    height: auto;

    aspect-ratio:
      803 / 450;

    margin-bottom: 18px;
  }


  .dynamic-featured-image img {

    width: 100%;

    height: 100%;

    object-fit: cover;

    object-position: center;

    animation:
      blogFeaturedZoom
      8s
      ease-in-out
      infinite
      alternate;
  }


  .dynamic-blog-details
  .blog-meta {

    margin-bottom: 9px;
  }


  .dynamic-blog-details
  .blog-title {

    margin-bottom: 13px;

    font-size: 25px;

    line-height: 1.3;
  }


  .blog-dynamic-content {

    font-size: 14px;

    line-height: 1.75;
  }


  .blog-dynamic-content.blog-content-collapsed {

    max-height: 250px;
  }


  .blog-dynamic-content p {

    margin-bottom: 16px;
  }


  /* H2 = main article sections */

  .blog-dynamic-content h2 {

    margin-top: 28px;

    font-size: 26px;

    line-height: 1.35;
  }


  /* H3 = article sub-sections */

  .blog-dynamic-content h3 {

    margin-top: 24px;

    font-size: 21px;

    line-height: 1.4;
  }


  .blog-dynamic-content
  p:has(> img:only-child) {

    display: block;

    width: 100%;

    margin: 15px 0;
  }


  .blog-dynamic-content
  p:has(> img:only-child) img {

    width: 100%;

    height: auto;

    aspect-ratio:
      803 / 450;

    object-fit: cover;
  }


  .blog-dynamic-content > img {

    display: block;

    width: 100%;

    height: auto;

    aspect-ratio:
      803 / 450;

    margin: 15px 0;

    object-fit: cover;
  }


  .blog-read-more-wrapper {

    width: 100%;

    margin-top: 15px;

    margin-bottom: 25px;

    display: flex;

    align-items: center;

    justify-content: center;
  }


  .blog-read-more-btn {

    min-width: 120px;

    min-height: 42px;

    padding:
      10px 20px;

    font-size: 12px;
  }


  .dynamic-post-navigation {

    grid-template-columns:
      1fr 42px 1fr;

    gap: 8px;
  }


  .dynamic-post-nav img {

    display: none;
  }


  .dynamic-post-nav strong {

    font-size: 11px;
  }


  .dynamic-author-box {

    align-items: flex-start;

    padding: 20px;
  }


  .dynamic-comment {

    gap: 10px;
  }


  .dynamic-comment-avatar {

    width: 40px;

    height: 40px;

    flex-basis: 40px;
  }


  .dynamic-comment-replies {

    margin-left: 5px;

    padding-left: 10px;
  }


  .dynamic-comment-form {

    padding: 20px;
  }


  .dynamic-related-posts {

    margin-top: 42px;
  }


  .dynamic-related-image {

    height: 210px;
  }

}


/* =========================================================
   SMALL MOBILE
========================================================= */

@media (max-width: 480px) {

  .dynamic-featured-image {

    width: 100%;

    height: auto;

    aspect-ratio:
      803 / 450;

    margin-bottom: 17px;
  }


  .dynamic-featured-image img {

    width: 100%;

    height: 100%;

    object-fit: cover;
  }


  .dynamic-blog-details
  .blog-title {

    font-size: 22px;
  }


  .blog-dynamic-content {

    font-size: 13px;

    line-height: 1.75;
  }


  .blog-dynamic-content h2 {

    font-size: 23px;
  }


  .blog-dynamic-content h3 {

    font-size: 20px;
  }


  .dynamic-author-box {

    gap: 13px;
  }


  .dynamic-author-avatar {

    width: 60px;

    height: 60px;

    flex-basis: 60px;

    font-size: 20px;
  }


  .dynamic-section-heading h2 {

    font-size: 23px;
  }


  .dynamic-comment-form {

    padding: 18px;
  }

}

`;


export default BlogSingle;