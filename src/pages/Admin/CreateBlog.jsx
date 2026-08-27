import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  createBlog,
  uploadBlogImage,
} from "../../services/blogService";

import BlogEditor from "../../components/BlogEditor/BlogEditor";

const CreateBlog = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featured_image: "",
    featured_image_alt: "",
    author_name: "Admin",
    category: "",
    tags: "",
    status: "draft",
    meta_title: "",
    meta_description: "",
    canonical_url: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  /* ==========================================
     CREATE LOCAL IMAGE PREVIEW
  ========================================== */

  useEffect(() => {
    if (!imageFile) {
      setImagePreview("");
      return;
    }

    const previewUrl = URL.createObjectURL(imageFile);

    setImagePreview(previewUrl);

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [imageFile]);

  /* ==========================================
     HANDLE CHANGE
  ========================================== */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ==========================================
     GENERATE SLUG
  ========================================== */

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  /* ==========================================
     TITLE CHANGE
  ========================================== */

  const handleTitleChange = (e) => {
    const title = e.target.value;

    setForm((prev) => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }));
  };

  /* ==========================================
     IMAGE SELECT
  ========================================== */

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    setImageFile(file);
  };

  /* ==========================================
     REMOVE IMAGE
  ========================================== */

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview("");

    setForm((prev) => ({
      ...prev,
      featured_image: "",
    }));
  };

  /* ==========================================
     UPLOAD IMAGE
  ========================================== */

  const handleImageUpload = async () => {
    if (!imageFile) {
      alert("Please select an image.");
      return;
    }

    try {
      setUploading(true);

      const url = await uploadBlogImage(imageFile);

      setForm((prev) => ({
        ...prev,
        featured_image: url,
      }));

      alert("Image uploaded successfully.");
    } catch (error) {
      console.error(error);
      alert("Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  /* ==========================================
     SUBMIT
  ========================================== */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      alert("Blog title is required.");
      return;
    }

    if (!form.slug.trim()) {
      alert("Blog slug is required.");
      return;
    }

    if (!form.content.trim()) {
      alert("Blog content is required.");
      return;
    }

    try {
      setSaving(true);

      await createBlog({
        ...form,

        tags: form.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),

        published_date:
          form.status === "published"
            ? new Date().toISOString()
            : null,
      });

      alert("Blog created successfully!");

      navigate("/admin/blogs");
    } catch (error) {
      console.error(error);

      alert(
        error.message ||
          "Unable to create blog."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <div className="create-blog-page">

        <div className="create-blog-container">

          {/* ======================================
              PAGE HEADER
          ======================================= */}

          <div className="create-blog-header">

            <div className="create-blog-header-left">

              <button
                type="button"
                className="back-button"
                onClick={() =>
                  navigate("/admin/blogs")
                }
              >
                <i className="far fa-arrow-left" />
              </button>

              <div>
                <h1>Create Blog</h1>

                <p>
                  Create, optimize and publish
                  your blog article.
                </p>
              </div>

            </div>

            <div className="blog-status-indicator">

              <span
                className={
                  form.status === "published"
                    ? "status-dot published"
                    : "status-dot draft"
                }
              />

              <span>
                {form.status === "published"
                  ? "Ready to Publish"
                  : "Draft"}
              </span>

            </div>

          </div>


          {/* ======================================
              FORM
          ======================================= */}

          <form onSubmit={handleSubmit}>

            <div className="create-blog-layout">

              {/* ==================================
                  LEFT COLUMN
              =================================== */}

              <div className="create-blog-main">

                {/* ==================================
                    BLOG INFORMATION
                =================================== */}

                <div className="blog-card">

                  <div className="blog-card-header">

                    <div>
                      <h2>
                        Blog Information
                      </h2>

                      <p>
                        Add the basic information
                        for your article.
                      </p>
                    </div>

                  </div>


                  {/* TITLE */}

                  <div className="blog-field">

                    <label>
                      Blog Title
                      <span>*</span>
                    </label>

                    <input
                      type="text"
                      name="title"
                      value={form.title}
                      onChange={
                        handleTitleChange
                      }
                      placeholder="Enter an engaging blog title"
                      className="blog-input blog-title-input"
                    />

                  </div>


                  {/* SLUG */}

                  <div className="blog-field">

                    <label>
                      URL Slug
                      <span>*</span>
                    </label>

                    <div className="slug-input-wrapper">

                      <span>
                        /blog/
                      </span>

                      <input
                        type="text"
                        name="slug"
                        value={form.slug}
                        onChange={handleChange}
                        placeholder="your-blog-url"
                        className="blog-input"
                      />

                    </div>

                  </div>


                  {/* EXCERPT */}

                  <div className="blog-field last-field">

                    <label>
                      Short Description / Excerpt
                    </label>

                    <textarea
                      name="excerpt"
                      value={form.excerpt}
                      onChange={handleChange}
                      rows="4"
                      placeholder="Write a short description that will appear on blog cards and search results..."
                      className="blog-textarea"
                    />

                  </div>

                </div>


                {/* ==================================
                    FEATURED IMAGE
                =================================== */}

                <div className="blog-card">

                  <div className="blog-card-header">

                    <div>
                      <h2>
                        Featured Image
                      </h2>

                      <p>
                        Add the main image for
                        your blog article.
                      </p>
                    </div>

                  </div>


                  {/* IMAGE UPLOAD */}

                  {!imagePreview &&
                    !form.featured_image && (
                      <div className="image-upload-area">

                        <div className="upload-icon">
                          <i className="far fa-image" />
                        </div>

                        <h3>
                          Upload Featured Image
                        </h3>

                        <p>
                          JPG, PNG or WebP
                        </p>

                        <label className="choose-image-button">

                          <i className="far fa-upload" />

                          Choose Image

                          <input
                            type="file"
                            accept="image/*"
                            onChange={
                              handleImageSelect
                            }
                          />

                        </label>

                      </div>
                    )}


                  {/* IMAGE PREVIEW */}

                  {(imagePreview ||
                    form.featured_image) && (
                    <div className="featured-image-preview">

                      <div className="preview-label">
                        FEATURED IMAGE PREVIEW
                      </div>

                      <div className="preview-image-wrapper">

                        <img
                          src={
                            imagePreview ||
                            form.featured_image
                          }
                          alt={
                            form.featured_image_alt ||
                            form.title ||
                            "Featured image"
                          }
                        />

                        <div className="image-preview-overlay">

                          <label className="change-image-button">

                            <i className="far fa-image" />

                            Change

                            <input
                              type="file"
                              accept="image/*"
                              onChange={
                                handleImageSelect
                              }
                            />

                          </label>

                          <button
                            type="button"
                            className="remove-image-button"
                            onClick={
                              handleRemoveImage
                            }
                          >
                            <i className="far fa-trash-alt" />

                            Remove
                          </button>

                        </div>

                      </div>


                      {/* FILE INFO */}

                      {imageFile && (
                        <div className="selected-file-info">

                          <div>
                            <i className="far fa-file-image" />
                          </div>

                          <div className="selected-file-details">

                            <strong>
                              {imageFile.name}
                            </strong>

                            <span>
                              {(
                                imageFile.size /
                                1024 /
                                1024
                              ).toFixed(2)}{" "}
                              MB
                            </span>

                          </div>

                        </div>
                      )}


                      {/* UPLOAD BUTTON */}

                      {imageFile && (
                        <button
                          type="button"
                          className="upload-image-button"
                          onClick={
                            handleImageUpload
                          }
                          disabled={uploading}
                        >
                          <i
                            className={
                              uploading
                                ? "far fa-spinner fa-spin"
                                : "far fa-cloud-upload"
                            }
                          />

                          {uploading
                            ? "Uploading..."
                            : form.featured_image
                            ? "Upload New Image"
                            : "Upload Image"}
                        </button>
                      )}

                    </div>
                  )}


                  {/* ALT TEXT */}

                  <div className="blog-field image-alt-field">

                    <label>
                      Image ALT Text
                    </label>

                    <input
                      type="text"
                      name="featured_image_alt"
                      value={
                        form.featured_image_alt
                      }
                      onChange={handleChange}
                      placeholder="Describe the image for SEO and accessibility"
                      className="blog-input"
                    />

                    <small>
                      Helpful for SEO and
                      accessibility.
                    </small>

                  </div>

                </div>


                {/* ==================================
                    BLOG CONTENT
                =================================== */}

                <div className="blog-card blog-content-card">

                  <div className="blog-card-header">

                    <div>
                      <h2>
                        Blog Content
                        <span className="required-star">
                          *
                        </span>
                      </h2>

                      <p>
                        Write and format your
                        complete article.
                      </p>
                    </div>

                    <div className="editor-badge">
                      RICH TEXT EDITOR
                    </div>

                  </div>


                  {/* LARGE EDITOR */}

                  <div className="large-blog-editor">

                    <BlogEditor
                      value={form.content}
                      onChange={(content) =>
                        setForm((prev) => ({
                          ...prev,
                          content,
                        }))
                      }
                    />

                  </div>

                  <div className="editor-help-text">
                    <i className="far fa-lightbulb" />
                    Use headings, paragraphs,
                    lists, links and images to
                    structure your article.
                  </div>

                </div>


                {/* ==================================
                    PUBLISHING DETAILS
                =================================== */}

                <div className="blog-card">

                  <div className="blog-card-header">

                    <div>
                      <h2>
                        Publishing Details
                      </h2>

                      <p>
                        Set author, category and
                        tags.
                      </p>
                    </div>

                  </div>


                  <div className="publishing-grid">

                    {/* AUTHOR */}

                    <div className="blog-field">

                      <label>
                        Author
                      </label>

                      <input
                        type="text"
                        name="author_name"
                        value={
                          form.author_name
                        }
                        onChange={handleChange}
                        className="blog-input"
                      />

                    </div>


                    {/* CATEGORY */}

                    <div className="blog-field">

                      <label>
                        Category
                      </label>

                      <input
                        type="text"
                        name="category"
                        value={
                          form.category
                        }
                        onChange={handleChange}
                        placeholder="e.g. SEO"
                        className="blog-input"
                      />

                    </div>

                  </div>


                  {/* TAGS */}

                  <div className="blog-field last-field">

                    <label>
                      Tags
                    </label>

                    <input
                      type="text"
                      name="tags"
                      value={form.tags}
                      onChange={handleChange}
                      placeholder="SEO, Google Ads, Marketing"
                      className="blog-input"
                    />

                    <small>
                      Separate tags with commas.
                    </small>

                  </div>

                </div>

              </div>


              {/* ==================================
                  RIGHT SIDEBAR
              =================================== */}

              <aside className="create-blog-sidebar">

                {/* ==================================
                    PUBLISH CARD
                =================================== */}

                <div className="sidebar-card">

                  <div className="sidebar-card-title">
                    <i className="far fa-paper-plane" />

                    <h3>
                      Publish
                    </h3>
                  </div>


                  <div className="blog-field">

                    <label>
                      Blog Status
                    </label>

                    <select
                      name="status"
                      value={form.status}
                      onChange={handleChange}
                      className="blog-input blog-select"
                    >
                      <option value="draft">
                        Save as Draft
                      </option>

                      <option value="published">
                        Publish Now
                      </option>
                    </select>

                  </div>


                  <button
                    type="submit"
                    className="publish-button"
                    disabled={saving}
                  >
                    <i
                      className={
                        saving
                          ? "far fa-spinner fa-spin"
                          : form.status ===
                            "published"
                          ? "far fa-paper-plane"
                          : "far fa-save"
                      }
                    />

                    {saving
                      ? "Saving..."
                      : form.status ===
                        "published"
                      ? "Publish Blog"
                      : "Save Draft"}

                  </button>


                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() =>
                      navigate(
                        "/admin/blogs"
                      )
                    }
                  >
                    Cancel
                  </button>

                </div>


                {/* ==================================
                    SEO CARD
                =================================== */}

                <div className="sidebar-card">

                  <div className="sidebar-card-title">

                    <i className="far fa-search" />

                    <h3>
                      SEO Settings
                    </h3>

                  </div>

                  <p className="sidebar-description">
                    Optimize your article for
                    search engines.
                  </p>


                  {/* META TITLE */}

                  <div className="blog-field">

                    <label>
                      Meta Title
                    </label>

                    <input
                      type="text"
                      name="meta_title"
                      value={
                        form.meta_title
                      }
                      onChange={handleChange}
                      placeholder="SEO optimized title"
                      className="blog-input"
                    />

                    <div
                      className={
                        form.meta_title
                          .length > 60
                          ? "character-count danger"
                          : "character-count"
                      }
                    >
                      {form.meta_title.length}
                      /60
                    </div>

                  </div>


                  {/* META DESCRIPTION */}

                  <div className="blog-field">

                    <label>
                      Meta Description
                    </label>

                    <textarea
                      name="meta_description"
                      value={
                        form.meta_description
                      }
                      onChange={handleChange}
                      rows="5"
                      placeholder="Write a compelling SEO description..."
                      className="blog-textarea"
                    />

                    <div
                      className={
                        form
                          .meta_description
                          .length > 160
                          ? "character-count danger"
                          : "character-count"
                      }
                    >
                      {
                        form.meta_description
                          .length
                      }
                      /160
                    </div>

                  </div>


                  {/* CANONICAL */}

                  <div className="blog-field last-field">

                    <label>
                      Canonical URL
                    </label>

                    <input
                      type="text"
                      name="canonical_url"
                      value={
                        form.canonical_url
                      }
                      onChange={handleChange}
                      placeholder="https://indieur.com/blog/..."
                      className="blog-input"
                    />

                  </div>

                </div>


                {/* ==================================
                    CHECKLIST
                =================================== */}

                <div className="sidebar-card checklist-card">

                  <div className="sidebar-card-title">

                    <i className="far fa-check-circle" />

                    <h3>
                      Blog Checklist
                    </h3>

                  </div>


                  <div className="checklist">

                    {[
                      [
                        !!form.title,
                        "Blog title added",
                      ],

                      [
                        !!form.slug,
                        "URL slug added",
                      ],

                      [
                        !!form.featured_image,
                        "Featured image uploaded",
                      ],

                      [
                        !!form.content,
                        "Blog content added",
                      ],

                      [
                        !!form.meta_title,
                        "Meta title added",
                      ],

                      [
                        !!form.meta_description,
                        "Meta description added",
                      ],
                    ].map(
                      ([complete, text], index) => (
                        <div
                          className="checklist-item"
                          key={index}
                        >

                          <span
                            className={
                              complete
                                ? "check-icon complete"
                                : "check-icon"
                            }
                          >
                            {complete
                              ? "✓"
                              : ""}
                          </span>

                          <span>
                            {text}
                          </span>

                        </div>
                      )
                    )}

                  </div>

                </div>

              </aside>

            </div>

          </form>

        </div>

      </div>


      {/* ==========================================
          SAME FILE CSS
      =========================================== */}

      <style>{`

        /* ==========================================
           PAGE
        =========================================== */

        .create-blog-page {
          min-height: 100vh;
          background: #f5f7fb;
          padding: 30px 20px 70px;
          box-sizing: border-box;
        }

        .create-blog-container {
          width: 100%;
          max-width: 1450px;
          margin: 0 auto;
        }


        /* ==========================================
           HEADER
        =========================================== */

        .create-blog-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 25px;
        }

        .create-blog-header-left {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .create-blog-header h1 {
          margin: 0;
          color: #172033;
          font-size: 29px;
          line-height: 1.2;
          font-weight: 800;
        }

        .create-blog-header p {
          margin: 6px 0 0;
          color: #64748b;
          font-size: 14px;
        }

        .back-button {
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          background: #fff;
          color: #334155;
          cursor: pointer;
          font-size: 15px;
          transition: all 0.2s ease;
        }

        .back-button:hover {
          color: #1458ff;
          border-color: #1458ff;
          transform: translateX(-2px);
        }

        .blog-status-indicator {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 9px 13px;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          color: #475569;
          font-size: 13px;
          font-weight: 700;
        }

        .status-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          display: block;
        }

        .status-dot.draft {
          background: #f59e0b;
        }

        .status-dot.published {
          background: #22c55e;
        }


        /* ==========================================
           MAIN LAYOUT
        =========================================== */

        .create-blog-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 350px;
          gap: 24px;
          align-items: start;
        }

        .create-blog-main {
          min-width: 0;
        }

        .create-blog-sidebar {
          position: sticky;
          top: 20px;
        }


        /* ==========================================
           CARDS
        =========================================== */

        .blog-card,
        .sidebar-card {
          background: #fff;
          border: 1px solid #e6ebf2;
          border-radius: 16px;
          box-shadow: 0 5px 20px rgba(15, 23, 42, 0.045);
        }

        .blog-card {
          padding: 25px;
          margin-bottom: 24px;
        }

        .sidebar-card {
          padding: 22px;
          margin-bottom: 20px;
        }

        .blog-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          padding-bottom: 17px;
          margin-bottom: 23px;
          border-bottom: 1px solid #edf1f5;
        }

        .blog-card-header h2 {
          margin: 0;
          color: #172033;
          font-size: 18px;
          line-height: 1.3;
          font-weight: 800;
        }

        .blog-card-header p {
          margin: 5px 0 0;
          color: #64748b;
          font-size: 13px;
          line-height: 1.5;
        }

        .editor-badge {
          flex-shrink: 0;
          padding: 7px 10px;
          border-radius: 7px;
          background: #f1f5f9;
          color: #64748b;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.5px;
        }


        /* ==========================================
           FORM
        =========================================== */

        .blog-field {
          margin-bottom: 21px;
        }

        .blog-field.last-field {
          margin-bottom: 0;
        }

        .blog-field label {
          display: block;
          margin-bottom: 8px;
          color: #253047;
          font-size: 13px;
          line-height: 1.3;
          font-weight: 700;
        }

        .blog-field label span,
        .required-star {
          margin-left: 3px;
          color: #ef4444;
        }

        .blog-input {
          width: 100%;
          height: 50px;
          padding: 0 15px;
          box-sizing: border-box;
          border: 1px solid #dfe6ef;
          border-radius: 10px;
          outline: none;
          background: #fff;
          color: #172033;
          font-family: inherit;
          font-size: 14px;
          transition: all 0.2s ease;
        }

        .blog-input:focus {
          border-color: #1458ff;
          box-shadow: 0 0 0 3px rgba(20, 88, 255, 0.08);
        }

        .blog-title-input {
          height: 55px;
          font-size: 16px;
          font-weight: 600;
        }

        .blog-textarea {
          width: 100%;
          padding: 13px 15px;
          box-sizing: border-box;
          border: 1px solid #dfe6ef;
          border-radius: 10px;
          outline: none;
          resize: vertical;
          background: #fff;
          color: #172033;
          font-family: inherit;
          font-size: 14px;
          line-height: 1.6;
          transition: all 0.2s ease;
        }

        .blog-textarea:focus {
          border-color: #1458ff;
          box-shadow: 0 0 0 3px rgba(20, 88, 255, 0.08);
        }

        .blog-field small {
          display: block;
          margin-top: 6px;
          color: #94a3b8;
          font-size: 11px;
        }


        /* ==========================================
           SLUG
        =========================================== */

        .slug-input-wrapper {
          position: relative;
        }

        .slug-input-wrapper > span {
          position: absolute;
          left: 15px;
          top: 50%;
          z-index: 1;
          transform: translateY(-50%);
          color: #94a3b8;
          font-size: 13px;
          pointer-events: none;
        }

        .slug-input-wrapper .blog-input {
          padding-left: 62px;
        }


        /* ==========================================
           FEATURED IMAGE UPLOAD
        =========================================== */

        .image-upload-area {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 300px;
          padding: 35px 25px;
          box-sizing: border-box;
          border: 2px dashed #d9e2ef;
          border-radius: 14px;
          background: #f8fafc;
          text-align: center;
        }

        .upload-icon {
          width: 62px;
          height: 62px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 15px;
          border-radius: 14px;
          background: #edf4ff;
          color: #1458ff;
          font-size: 25px;
        }

        .image-upload-area h3 {
          margin: 0 0 5px;
          color: #253047;
          font-size: 15px;
          font-weight: 800;
        }

        .image-upload-area p {
          margin: 0 0 17px;
          color: #94a3b8;
          font-size: 12px;
        }

        .choose-image-button,
        .change-image-button {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 700;
        }

        .choose-image-button {
          padding: 11px 17px;
          border-radius: 9px;
          background: #1458ff;
          color: #fff;
          box-shadow: 0 5px 14px rgba(20, 88, 255, 0.2);
        }

        .choose-image-button input,
        .change-image-button input {
          position: absolute;
          width: 1px;
          height: 1px;
          opacity: 0;
          pointer-events: none;
        }


        /* ==========================================
           IMAGE PREVIEW
        =========================================== */

        .featured-image-preview {
          width: 100%;
        }

        .preview-label {
          margin-bottom: 9px;
          color: #64748b;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.6px;
        }

        .preview-image-wrapper {
          position: relative;
          overflow: hidden;
          width: 100%;
          min-height: 280px;
          max-height: 500px;
          border-radius: 13px;
          background: #f1f5f9;
        }

        .preview-image-wrapper img {
          display: block;
          width: 100%;
          height: 100%;
          min-height: 280px;
          max-height: 500px;
          object-fit: cover;
        }

        .image-preview-overlay {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 14px;
          background: linear-gradient(
            to top,
            rgba(15, 23, 42, 0.75),
            rgba(15, 23, 42, 0)
          );
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .preview-image-wrapper:hover
        .image-preview-overlay {
          opacity: 1;
        }

        .change-image-button,
        .remove-image-button {
          padding: 9px 13px;
          border-radius: 8px;
          border: 0;
          font-family: inherit;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
        }

        .change-image-button {
          background: #fff;
          color: #253047;
        }

        .remove-image-button {
          background: #ef4444;
          color: #fff;
        }

        .selected-file-info {
          display: flex;
          align-items: center;
          gap: 11px;
          margin-top: 13px;
          padding: 11px;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          background: #f8fafc;
        }

        .selected-file-info > div:first-child {
          width: 37px;
          height: 37px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border-radius: 8px;
          background: #eaf1ff;
          color: #1458ff;
        }

        .selected-file-details {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .selected-file-details strong {
          overflow: hidden;
          color: #334155;
          font-size: 12px;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .selected-file-details span {
          margin-top: 3px;
          color: #94a3b8;
          font-size: 10px;
        }

        .upload-image-button {
          width: 100%;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 12px;
          border: 0;
          border-radius: 9px;
          background: #1458ff;
          color: #fff;
          font-family: inherit;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .upload-image-button:hover:not(:disabled) {
          background: #0d4be5;
          transform: translateY(-1px);
        }

        .upload-image-button:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .image-alt-field {
          margin-top: 21px;
        }


        /* ==========================================
           LARGE BLOG EDITOR
        =========================================== */

        .blog-content-card {
          padding-bottom: 20px;
        }

        .large-blog-editor {
          width: 100%;
          min-height: 750px;
          border: 1px solid #dfe6ef;
          border-radius: 12px;
          background: #fff;
          overflow: hidden;
          box-shadow: inset 0 1px 3px rgba(15, 23, 42, 0.03);
        }

        /*
          These selectors make the editor large even
          if BlogEditor uses common contenteditable/
          textarea structures.
        */

        .large-blog-editor textarea {
          min-height: 700px !important;
        }

        .large-blog-editor [contenteditable="true"] {
          min-height: 700px !important;
          padding: 22px !important;
          box-sizing: border-box;
        }

        .large-blog-editor .blog-editor-content {
          min-height: 700px !important;
        }

        .large-blog-editor .editor-content {
          min-height: 700px !important;
        }

        .large-blog-editor .ProseMirror {
          min-height: 700px !important;
          padding: 22px !important;
          box-sizing: border-box;
        }

        .editor-help-text {
          display: flex;
          align-items: center;
          gap: 7px;
          margin-top: 10px;
          color: #94a3b8;
          font-size: 11px;
        }

        .editor-help-text i {
          color: #1458ff;
        }


        /* ==========================================
           PUBLISHING
        =========================================== */

        .publishing-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }


        /* ==========================================
           SIDEBAR
        =========================================== */

        .sidebar-card-title {
          display: flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 15px;
        }

        .sidebar-card-title i {
          color: #1458ff;
          font-size: 16px;
        }

        .sidebar-card-title h3 {
          margin: 0;
          color: #172033;
          font-size: 16px;
          font-weight: 800;
        }

        .sidebar-description {
          margin: -5px 0 20px;
          color: #64748b;
          font-size: 12px;
          line-height: 1.5;
        }

        .blog-select {
          cursor: pointer;
        }

        .publish-button {
          width: 100%;
          height: 51px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: 0;
          border-radius: 10px;
          background: #1458ff;
          color: #fff;
          font-family: inherit;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 0 7px 18px rgba(20, 88, 255, 0.2);
          transition: all 0.2s ease;
        }

        .publish-button:hover:not(:disabled) {
          background: #0d4be5;
          transform: translateY(-1px);
        }

        .publish-button:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .cancel-button {
          width: 100%;
          height: 45px;
          margin-top: 9px;
          border: 1px solid #dce3ec;
          border-radius: 9px;
          background: #fff;
          color: #475569;
          font-family: inherit;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .cancel-button:hover {
          border-color: #94a3b8;
          background: #f8fafc;
        }


        /* ==========================================
           CHARACTER COUNT
        =========================================== */

        .character-count {
          margin-top: 5px;
          color: #94a3b8;
          font-size: 10px;
          text-align: right;
        }

        .character-count.danger {
          color: #ef4444;
          font-weight: 700;
        }


        /* ==========================================
           CHECKLIST
        =========================================== */

        .checklist-card {
          background: linear-gradient(
            135deg,
            #f8fbff,
            #fff
          );
          border-color: #dbe7ff;
        }

        .checklist {
          display: flex;
          flex-direction: column;
          gap: 11px;
        }

        .checklist-item {
          display: flex;
          align-items: center;
          gap: 9px;
          color: #64748b;
          font-size: 12px;
        }

        .check-icon {
          width: 19px;
          height: 19px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          border-radius: 50%;
          background: #f1f5f9;
          color: #94a3b8;
          font-size: 10px;
          font-weight: 800;
        }

        .check-icon.complete {
          background: #dcfce7;
          color: #16a34a;
        }


        /* ==========================================
           RESPONSIVE
        =========================================== */

        @media (max-width: 1150px) {

          .create-blog-layout {
            grid-template-columns: minmax(0, 1fr) 310px;
            gap: 18px;
          }

        }


        @media (max-width: 950px) {

          .create-blog-layout {
            grid-template-columns: 1fr;
          }

          .create-blog-sidebar {
            position: static;
          }

          .sidebar-card {
            margin-bottom: 20px;
          }

        }


        @media (max-width: 700px) {

          .create-blog-page {
            padding: 18px 12px 45px;
          }

          .create-blog-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .create-blog-header-left {
            width: 100%;
          }

          .create-blog-header h1 {
            font-size: 24px;
          }

          .create-blog-header p {
            font-size: 12px;
          }

          .blog-status-indicator {
            align-self: flex-start;
          }

          .blog-card,
          .sidebar-card {
            padding: 18px;
            border-radius: 13px;
          }

          .blog-card-header {
            align-items: flex-start;
            flex-direction: column;
          }

          .editor-badge {
            display: none;
          }

          .publishing-grid {
            grid-template-columns: 1fr;
            gap: 0;
          }

          .image-upload-area {
            min-height: 240px;
            padding: 25px 15px;
          }

          .preview-image-wrapper,
          .preview-image-wrapper img {
            min-height: 210px;
          }

          .large-blog-editor {
            min-height: 550px;
          }

          .large-blog-editor textarea {
            min-height: 500px !important;
          }

          .large-blog-editor [contenteditable="true"] {
            min-height: 500px !important;
          }

          .large-blog-editor .blog-editor-content,
          .large-blog-editor .editor-content,
          .large-blog-editor .ProseMirror {
            min-height: 500px !important;
          }

        }


        @media (max-width: 450px) {

          .create-blog-header-left {
            align-items: flex-start;
          }

          .back-button {
            width: 38px;
            height: 38px;
          }

          .create-blog-header h1 {
            font-size: 21px;
          }

          .blog-card {
            padding: 15px;
          }

          .sidebar-card {
            padding: 15px;
          }

          .blog-title-input {
            font-size: 15px;
          }

          .image-preview-overlay {
            opacity: 1;
          }

          .change-image-button,
          .remove-image-button {
            padding: 8px 10px;
          }

        }

      `}</style>
    </>
  );
};

export default CreateBlog;