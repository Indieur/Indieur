import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { supabase } from "../../lib/supabase";
import { uploadBlogImage } from "../../services/blogService";

import {
  EditorContent,
  useEditor,
} from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import TiptapLink from "@tiptap/extension-link";
import TiptapImage from "@tiptap/extension-image";


const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [imageFile, setImageFile] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [error, setError] = useState("");

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
  published_date: null,
});


  /*
  |--------------------------------------------------------------------------
  | TIPTAP EDITOR
  |--------------------------------------------------------------------------
  */

  const editor = useEditor({
    extensions: [
      StarterKit,

      TiptapLink.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: "noopener noreferrer",
        },
      }),

      TiptapImage.configure({
        inline: false,
        allowBase64: false,
      }),
    ],

    content: "",

    onUpdate: ({ editor }) => {
      setForm((prev) => ({
        ...prev,
        content: editor.getHTML(),
      }));
    },
  });


  /*
  |--------------------------------------------------------------------------
  | FETCH BLOG
  |--------------------------------------------------------------------------
  */

useEffect(() => {
  const fetchBlog = async () => {
    try {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        throw error;
      }

      if (!data) {
        throw new Error("Blog not found.");
      }

      setForm({
        title: data.title || "",
        slug: data.slug || "",
        excerpt: data.excerpt || "",
        content: data.content || "",
        featured_image: data.featured_image || "",
        featured_image_alt: data.featured_image_alt || "",
        author_name: data.author_name || "Admin",

        category: data.category || "",

        tags: Array.isArray(data.tags)
          ? data.tags.join(", ")
          : "",

        status: data.status || "draft",

        meta_title: data.meta_title || "",

        meta_description:
          data.meta_description || "",

        canonical_url:
          data.canonical_url || "",

        published_date:
          data.published_date || null,
      });

      if (editor) {
        editor.commands.setContent(
          data.content || ""
        );
      }

    } catch (err) {
      console.error(
        "Fetch blog error:",
        err
      );

      setError(
        err.message ||
        "Unable to load blog."
      );

    } finally {
      setLoading(false);
    }
  };

  if (id) {
    fetchBlog();
  }

}, [id, editor]);


  /*
  |--------------------------------------------------------------------------
  | INPUT CHANGE
  |--------------------------------------------------------------------------
  */

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  /*
  |--------------------------------------------------------------------------
  | SLUG GENERATOR
  |--------------------------------------------------------------------------
  */

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };


  /*
  |--------------------------------------------------------------------------
  | TITLE CHANGE
  |--------------------------------------------------------------------------
  */

  const handleTitleChange = (e) => {
    const title = e.target.value;

    setForm((prev) => ({
      ...prev,
      title,
    }));
  };


  /*
  |--------------------------------------------------------------------------
  | AUTO GENERATE SLUG
  |--------------------------------------------------------------------------
  */

  const generateSlugFromTitle = () => {
    setForm((prev) => ({
      ...prev,
      slug: generateSlug(prev.title),
    }));
  };


  /*
  |--------------------------------------------------------------------------
  | FEATURED IMAGE SELECT
  |--------------------------------------------------------------------------
  */

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    setImageFile(file);
  };


  /*
  |--------------------------------------------------------------------------
  | UPLOAD FEATURED IMAGE
  |--------------------------------------------------------------------------
  */

  const handleImageUpload = async () => {
    if (!imageFile) {
      alert("Please select an image first.");
      return;
    }

    try {
      setUploadingImage(true);

      const imageUrl =
        await uploadBlogImage(imageFile);

      setForm((prev) => ({
        ...prev,
        featured_image: imageUrl,
      }));

      setImageFile(null);

      alert("Image uploaded successfully.");

    } catch (err) {
      console.error("Image upload error:", err);

      alert(
        err.message ||
        "Unable to upload image."
      );

    } finally {
      setUploadingImage(false);
    }
  };


  /*
  |--------------------------------------------------------------------------
  | ADD LINK
  |--------------------------------------------------------------------------
  */

  const addLink = () => {
    if (!editor) return;

    const previousUrl =
      editor.getAttributes("link").href || "";

    const url = window.prompt(
      "Enter URL",
      previousUrl
    );

    if (url === null) {
      return;
    }

    if (url === "") {
      editor
        .chain()
        .focus()
        .unsetLink()
        .run();

      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({
        href: url,
      })
      .run();
  };


  /*
  |--------------------------------------------------------------------------
  | REMOVE LINK
  |--------------------------------------------------------------------------
  */

  const removeLink = () => {
    if (!editor) return;

    editor
      .chain()
      .focus()
      .unsetLink()
      .run();
  };


  /*
  |--------------------------------------------------------------------------
  | ADD IMAGE URL
  |--------------------------------------------------------------------------
  */

  const addImage = () => {
    if (!editor) return;

    const url = window.prompt(
      "Enter image URL"
    );

    if (!url) {
      return;
    }

    const alt = window.prompt(
      "Enter image ALT text"
    );

    editor
      .chain()
      .focus()
      .setImage({
        src: url,
        alt: alt || "",
      })
      .run();
  };


  /*
  |--------------------------------------------------------------------------
  | SAVE BLOG
  |--------------------------------------------------------------------------
  */

 const handleSubmit = async (e) => {
  e.preventDefault();

  setError("");

  /*
  |--------------------------------------------------------------------------
  | VALIDATION
  |--------------------------------------------------------------------------
  */

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


    /*
    |--------------------------------------------------------------------------
    | TAGS
    |--------------------------------------------------------------------------
    */

    const tags = form.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);


    /*
    |--------------------------------------------------------------------------
    | PUBLISHED DATE
    |--------------------------------------------------------------------------
    */

    let publishedDate =
      form.published_date;


    /*
    | If changing Draft → Published,
    | create publish date.
    */

    if (
      form.status === "published" &&
      !publishedDate
    ) {
      publishedDate =
        new Date().toISOString();
    }


    /*
    | If changing Published → Draft,
    | remove published date.
    */

    if (
      form.status === "draft"
    ) {
      publishedDate = null;
    }


    /*
    |--------------------------------------------------------------------------
    | UPDATE BLOG
    |--------------------------------------------------------------------------
    */

    const updateData = {

      title:
        form.title.trim(),

      slug:
        form.slug.trim(),

      excerpt:
        form.excerpt.trim(),

      content:
        form.content,

      featured_image:
        form.featured_image || null,

      featured_image_alt:
        form.featured_image_alt.trim(),

      author_name:
        form.author_name.trim() ||
        "Admin",

      category:
        form.category.trim() ||
        null,

      tags,

      status:
        form.status,

      published_date:
        publishedDate,

      meta_title:
        form.meta_title.trim() ||
        null,

      meta_description:
        form.meta_description.trim() ||
        null,

      canonical_url:
        form.canonical_url.trim() ||
        null,

      updated_at:
        new Date().toISOString(),

    };


    console.log(
      "Updating blog:",
      id
    );

    console.log(
      "Update data:",
      updateData
    );


    /*
    |--------------------------------------------------------------------------
    | SUPABASE UPDATE
    |--------------------------------------------------------------------------
    */

    const {
      data: updatedBlog,
      error: updateError,
    } = await supabase
      .from("blogs")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();


    if (updateError) {
      throw updateError;
    }


    if (!updatedBlog) {
      throw new Error(
        "Blog was not updated."
      );
    }


    /*
    |--------------------------------------------------------------------------
    | SUCCESS
    |--------------------------------------------------------------------------
    */

    alert(
      "Blog updated successfully!"
    );


    navigate(
      "/admin/blogs"
    );


  } catch (err) {

    console.error(
      "Update blog error:",
      err
    );


    const message =
      err?.message ||
      "Unable to update blog.";


    setError(message);


    alert(message);


  } finally {

    setSaving(false);

  }
};


  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <>
        <style>{adminBlogCSS}</style>

        <div className="edit-blog-loading">
          <div className="edit-blog-spinner" />
          <p>Loading blog...</p>
        </div>
      </>
    );
  }


  /*
  |--------------------------------------------------------------------------
  | ERROR
  |--------------------------------------------------------------------------
  */

  if (error && !form.title) {
    return (
      <>
        <style>{adminBlogCSS}</style>

        <div className="edit-blog-error">
          <div className="edit-blog-error-box">
            <h2>Unable to Load Blog</h2>

            <p>{error}</p>

            <Link
              to="/admin/blogs"
              className="edit-blog-back-btn"
            >
              ← Back to Blogs
            </Link>
          </div>
        </div>
      </>
    );
  }


  /*
  |--------------------------------------------------------------------------
  | MAIN UI
  |--------------------------------------------------------------------------
  */

  return (
    <>
      <style>{adminBlogCSS}</style>

      <div className="edit-blog-page">

        <div className="edit-blog-container">

          {/* HEADER */}

          <div className="edit-blog-header">

            <div>
              <span className="edit-blog-eyebrow">
                BLOG MANAGEMENT
              </span>

              <h1>Edit Blog</h1>

              <p>
                Update your blog content,
                images and SEO settings.
              </p>
            </div>

            <Link
              to="/admin/blogs"
              className="edit-blog-back-btn"
            >
              ← All Blogs
            </Link>

          </div>


          {/* ERROR */}

          {error && (
            <div className="edit-blog-alert">
              {error}
            </div>
          )}


          <form
            onSubmit={handleSubmit}
            className="edit-blog-form"
          >

            <div className="edit-blog-grid">

              {/* =====================================================
                  LEFT COLUMN
              ====================================================== */}

              <div className="edit-blog-main">

                {/* BASIC INFORMATION */}

                <div className="edit-blog-card">

                  <div className="edit-blog-card-title">
                    <h2>Blog Information</h2>
                    <span>
                      Main content
                    </span>
                  </div>


                  {/* TITLE */}

                  <div className="edit-form-group">

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
                      placeholder="Enter blog title"
                    />

                  </div>


                  {/* SLUG */}

                  <div className="edit-form-group">

                    <label>
                      URL Slug
                      <span>*</span>
                    </label>

                    <div className="edit-slug-row">

                      <input
                        type="text"
                        name="slug"
                        value={form.slug}
                        onChange={
                          handleChange
                        }
                        placeholder="your-blog-url"
                      />

                      <button
                        type="button"
                        onClick={
                          generateSlugFromTitle
                        }
                        className="edit-generate-slug"
                      >
                        Generate
                      </button>

                    </div>

                    <small>
                      /blog/{form.slug}
                    </small>

                  </div>


                  {/* EXCERPT */}

                  <div className="edit-form-group">

                    <label>
                      Excerpt
                    </label>

                    <textarea
                      name="excerpt"
                      value={form.excerpt}
                      onChange={
                        handleChange
                      }
                      rows="4"
                      placeholder="Short description of the blog..."
                    />

                  </div>

                </div>


                {/* FEATURED IMAGE */}

                <div className="edit-blog-card">

                  <div className="edit-blog-card-title">
                    <h2>Featured Image</h2>
                    <span>
                      SEO image
                    </span>
                  </div>


                  {form.featured_image && (
                    <div className="current-blog-image">

                      <img
                        src={
                          form.featured_image
                        }
                        alt={
                          form.featured_image_alt ||
                          form.title
                        }
                      />

                    </div>
                  )}


                  <div className="edit-form-group">

                    <label>
                      Replace Image
                    </label>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={
                        handleImageSelect
                      }
                    />

                    {imageFile && (
                      <div className="selected-file">
                        Selected:{" "}
                        <strong>
                          {imageFile.name}
                        </strong>
                      </div>
                    )}

                  </div>


                  <button
                    type="button"
                    className="edit-upload-btn"
                    onClick={
                      handleImageUpload
                    }
                    disabled={
                      uploadingImage ||
                      !imageFile
                    }
                  >
                    {uploadingImage
                      ? "Uploading..."
                      : "Upload New Image"}
                  </button>


                  {/* ALT */}

                  <div className="edit-form-group">

                    <label>
                      Image ALT Text
                      <span>*</span>
                    </label>

                    <input
                      type="text"
                      name="featured_image_alt"
                      value={
                        form.featured_image_alt
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Describe the image accurately"
                    />

                    <small>
                      Example: Google Ads campaign
                      dashboard showing business
                      performance
                    </small>

                  </div>

                </div>


                {/* CONTENT EDITOR */}

                <div className="edit-blog-card">

                  <div className="edit-blog-card-title">
                    <h2>Blog Content</h2>
                    <span>
                      Rich text editor
                    </span>
                  </div>


                  <div className="blog-editor">

                    {/* TOOLBAR */}

                    <div className="blog-editor-toolbar">

                      <button
                        type="button"
                        className={
                          editor?.isActive(
                            "bold"
                          )
                            ? "active"
                            : ""
                        }
                        onClick={() =>
                          editor
                            ?.chain()
                            .focus()
                            .toggleBold()
                            .run()
                        }
                      >
                        <strong>B</strong>
                      </button>


                      <button
                        type="button"
                        className={
                          editor?.isActive(
                            "italic"
                          )
                            ? "active"
                            : ""
                        }
                        onClick={() =>
                          editor
                            ?.chain()
                            .focus()
                            .toggleItalic()
                            .run()
                        }
                      >
                        <em>I</em>
                      </button>


                      <button
                        type="button"
                        className={
                          editor?.isActive(
                            "heading",
                            {
                              level: 2,
                            }
                          )
                            ? "active"
                            : ""
                        }
                        onClick={() =>
                          editor
                            ?.chain()
                            .focus()
                            .toggleHeading({
                              level: 2,
                            })
                            .run()
                        }
                      >
                        H2
                      </button>


                      <button
                        type="button"
                        onClick={() =>
                          editor
                            ?.chain()
                            .focus()
                            .toggleHeading({
                              level: 3,
                            })
                            .run()
                        }
                      >
                        H3
                      </button>


                      <button
                        type="button"
                        onClick={() =>
                          editor
                            ?.chain()
                            .focus()
                            .toggleBulletList()
                            .run()
                        }
                      >
                        • List
                      </button>


                      <button
                        type="button"
                        onClick={() =>
                          editor
                            ?.chain()
                            .focus()
                            .toggleOrderedList()
                            .run()
                        }
                      >
                        1. List
                      </button>


                      <button
                        type="button"
                        onClick={
                          addLink
                        }
                      >
                        🔗 Link
                      </button>


                      <button
                        type="button"
                        onClick={
                          removeLink
                        }
                      >
                        Unlink
                      </button>


                      <button
                        type="button"
                        onClick={
                          addImage
                        }
                      >
                        🖼 Image
                      </button>

                    </div>

<div className="edit-form-group">

  <label>
    Category
  </label>

  <input
    type="text"
    name="category"
    value={form.category}
    onChange={handleChange}
    placeholder="e.g. SEO"
  />

</div>


<div className="edit-form-group">

  <label>
    Tags
  </label>

  <input
    type="text"
    name="tags"
    value={form.tags}
    onChange={handleChange}
    placeholder="SEO, Google Ads, Marketing"
  />

  <small>
    Separate tags with commas.
  </small>

</div>
                    {/* EDITOR */}

                    <EditorContent
                      editor={editor}
                    />

                  </div>

                </div>

              </div>


              {/* =====================================================
                  RIGHT COLUMN
              ====================================================== */}

              <div className="edit-blog-sidebar">

                {/* PUBLISH */}

                <div className="edit-blog-card">

                  <div className="edit-blog-card-title">
                    <h2>Publish</h2>
                  </div>


                  <div className="edit-form-group">

                    <label>
                      Status
                    </label>

                    <select
                      name="status"
                      value={form.status}
                      onChange={
                        handleChange
                      }
                    >

                      <option value="draft">
                        Draft
                      </option>

                      <option value="published">
                        Published
                      </option>

                    </select>

                  </div>


                  <button
                    type="submit"
                    className="edit-save-btn"
                    disabled={saving}
                  >
                    {saving
                      ? "Saving Changes..."
                      : "Save Changes"}
                  </button>


                  <Link
                    to={`/blog/${form.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="edit-preview-btn"
                  >
                    Preview Blog
                  </Link>

                </div>


                {/* AUTHOR */}

                <div className="edit-blog-card">

                  <div className="edit-blog-card-title">
                    <h2>Author</h2>
                  </div>

                  <div className="edit-form-group">

                    <label>
                      Author Name
                    </label>

                    <input
                      type="text"
                      name="author_name"
                      value={
                        form.author_name
                      }
                      onChange={
                        handleChange
                      }
                    />

                  </div>

                </div>


                {/* SEO */}

                <div className="edit-blog-card">

                  <div className="edit-blog-card-title">
                    <h2>SEO Settings</h2>

                    <span>
                      Search optimization
                    </span>
                  </div>


                  {/* META TITLE */}

                  <div className="edit-form-group">

                    <label>
                      Meta Title
                    </label>

                    <input
                      type="text"
                      name="meta_title"
                      value={
                        form.meta_title
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="SEO title"
                    />

                    <small>
                      Recommended:
                      50–60 characters
                    </small>

                  </div>


                  {/* META DESCRIPTION */}

                  <div className="edit-form-group">

                    <label>
                      Meta Description
                    </label>

                    <textarea
                      name="meta_description"
                      value={
                        form.meta_description
                      }
                      onChange={
                        handleChange
                      }
                      rows="5"
                      placeholder="SEO description..."
                    />

                    <small>
                      Recommended:
                      150–160 characters
                    </small>

                  </div>


                  {/* CANONICAL */}

                  <div className="edit-form-group">

                    <label>
                      Canonical URL
                    </label>

                    <input
                      type="text"
                      name="canonical_url"
                      value={
                        form.canonical_url
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="https://indieur.com/blog/..."
                    />

                  </div>

                </div>

              </div>

            </div>

          </form>

        </div>

      </div>
    </>
  );
};


/*
|--------------------------------------------------------------------------
| CSS
|--------------------------------------------------------------------------
*/

const adminBlogCSS = `

.edit-blog-page {
  min-height: 100vh;
  padding: 60px 20px 100px;
  background: #f6f7fb;
}

.edit-blog-container {
  width: 100%;
  max-width: 1250px;
  margin: 0 auto;
}


/* HEADER */

.edit-blog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  margin-bottom: 35px;
}

.edit-blog-eyebrow {
  display: inline-block;
  margin-bottom: 8px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.edit-blog-header h1 {
  margin: 0 0 8px;
  font-size: 38px;
  line-height: 1.2;
}

.edit-blog-header p {
  margin: 0;
  color: #777;
  font-size: 15px;
}

.edit-blog-back-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 0 20px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: #fff;
  color: #222;
  text-decoration: none;
  font-weight: 600;
  transition: all .2s ease;
}

.edit-blog-back-btn:hover {
  background: #222;
  color: #fff;
}


/* GRID */

.edit-blog-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 350px;
  gap: 25px;
}

.edit-blog-main,
.edit-blog-sidebar {
  min-width: 0;
}


/* CARD */

.edit-blog-card {
  margin-bottom: 25px;
  padding: 28px;
  border: 1px solid #e8e8e8;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 3px 15px rgba(0, 0, 0, .03);
}

.edit-blog-card-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.edit-blog-card-title h2 {
  margin: 0;
  font-size: 21px;
}

.edit-blog-card-title span {
  color: #888;
  font-size: 12px;
}


/* FORM */

.edit-form-group {
  margin-bottom: 22px;
}

.edit-form-group:last-child {
  margin-bottom: 0;
}

.edit-form-group label {
  display: block;
  margin-bottom: 8px;
  color: #222;
  font-size: 14px;
  font-weight: 600;
}

.edit-form-group label span {
  margin-left: 3px;
}

.edit-form-group input,
.edit-form-group textarea,
.edit-form-group select {
  width: 100%;
  box-sizing: border-box;
  padding: 12px 14px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: #fff;
  color: #222;
  font-size: 14px;
  outline: none;
  transition: border-color .2s ease,
              box-shadow .2s ease;
}

.edit-form-group input:focus,
.edit-form-group textarea:focus,
.edit-form-group select:focus {
  border-color: #999;
  box-shadow: 0 0 0 3px rgba(0, 0, 0, .04);
}

.edit-form-group textarea {
  resize: vertical;
  min-height: 110px;
}

.edit-form-group small {
  display: block;
  margin-top: 7px;
  color: #888;
  font-size: 12px;
  line-height: 1.5;
}


/* SLUG */

.edit-slug-row {
  display: flex;
  gap: 8px;
}

.edit-slug-row input {
  min-width: 0;
}

.edit-generate-slug {
  flex: 0 0 auto;
  padding: 0 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: #f7f7f7;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
}


/* IMAGE */

.current-blog-image {
  margin-bottom: 20px;
  overflow: hidden;
  border-radius: 8px;
  background: #f5f5f5;
}

.current-blog-image img {
  display: block;
  width: 100%;
  max-height: 350px;
  object-fit: cover;
}

.selected-file {
  margin-top: 10px;
  padding: 10px 12px;
  border-radius: 5px;
  background: #f6f6f6;
  color: #666;
  font-size: 13px;
}

.edit-upload-btn {
  min-height: 42px;
  margin-bottom: 22px;
  padding: 0 18px;
  border: 0;
  border-radius: 6px;
  background: #222;
  color: #fff;
  cursor: pointer;
  font-weight: 600;
}

.edit-upload-btn:disabled {
  opacity: .5;
  cursor: not-allowed;
}


/* EDITOR */

.blog-editor {
  overflow: hidden;
  border: 1px solid #ddd;
  border-radius: 7px;
  background: #fff;
}

.blog-editor-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  background: #f8f8f8;
}

.blog-editor-toolbar button {
  min-width: 36px;
  height: 34px;
  padding: 0 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: #fff;
  color: #333;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
}

.blog-editor-toolbar button:hover,
.blog-editor-toolbar button.active {
  background: #222;
  color: #fff;
  border-color: #222;
}

.blog-editor .ProseMirror {
  min-height: 450px;
  padding: 20px;
  outline: none;
  line-height: 1.8;
}

.blog-editor .ProseMirror p {
  margin-bottom: 15px;
}

.blog-editor .ProseMirror h2 {
  margin-top: 30px;
  margin-bottom: 15px;
  font-size: 28px;
}

.blog-editor .ProseMirror h3 {
  margin-top: 25px;
  margin-bottom: 12px;
  font-size: 22px;
}

.blog-editor .ProseMirror ul,
.blog-editor .ProseMirror ol {
  padding-left: 25px;
  margin-bottom: 20px;
}

.blog-editor .ProseMirror a {
  text-decoration: underline;
}

.blog-editor .ProseMirror img {
  display: block;
  max-width: 100%;
  height: auto;
  margin: 25px 0;
  border-radius: 6px;
}


/* PUBLISH */

.edit-save-btn {
  width: 100%;
  min-height: 50px;
  margin-bottom: 10px;
  border: 0;
  border-radius: 6px;
  background: #222;
  color: #fff;
  cursor: pointer;
  font-size: 15px;
  font-weight: 700;
}

.edit-save-btn:hover {
  opacity: .9;
}

.edit-save-btn:disabled {
  opacity: .55;
  cursor: not-allowed;
}

.edit-preview-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 46px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: #fff;
  color: #222;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
}


/* ALERT */

.edit-blog-alert {
  margin-bottom: 25px;
  padding: 14px 18px;
  border: 1px solid #f0caca;
  border-radius: 7px;
  background: #fff3f3;
  color: #b42318;
  font-size: 14px;
}


/* LOADING */

.edit-blog-loading {
  display: flex;
  min-height: 500px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
}

.edit-blog-spinner {
  width: 35px;
  height: 35px;
  border: 3px solid #ddd;
  border-top-color: #222;
  border-radius: 50%;
  animation: editBlogSpin .7s linear infinite;
}

@keyframes editBlogSpin {
  to {
    transform: rotate(360deg);
  }
}


/* ERROR */

.edit-blog-error {
  display: flex;
  min-height: 500px;
  align-items: center;
  justify-content: center;
  padding: 30px;
}

.edit-blog-error-box {
  max-width: 500px;
  padding: 35px;
  border: 1px solid #eee;
  border-radius: 10px;
  background: #fff;
  text-align: center;
}

.edit-blog-error-box h2 {
  margin-top: 0;
}


/* RESPONSIVE */

@media (max-width: 991px) {

  .edit-blog-grid {
    grid-template-columns: 1fr;
  }

  .edit-blog-sidebar {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 25px;
  }

  .edit-blog-sidebar .edit-blog-card {
    margin-bottom: 0;
  }

}


@media (max-width: 767px) {

  .edit-blog-page {
    padding: 35px 15px 70px;
  }

  .edit-blog-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .edit-blog-header h1 {
    font-size: 30px;
  }

  .edit-blog-grid {
    gap: 15px;
  }

  .edit-blog-sidebar {
    display: block;
  }

  .edit-blog-sidebar .edit-blog-card {
    margin-bottom: 15px;
  }

  .edit-blog-card {
    padding: 20px;
  }

  .edit-blog-card-title {
    align-items: flex-start;
    flex-direction: column;
  }

  .edit-slug-row {
    flex-direction: column;
  }

  .edit-generate-slug {
    min-height: 42px;
  }

  .blog-editor-toolbar {
    gap: 5px;
  }

  .blog-editor .ProseMirror {
    min-height: 350px;
    padding: 15px;
  }

}

`;
 
export default EditBlog;