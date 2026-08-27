import { supabase } from "../lib/supabase";

/*
|--------------------------------------------------------------------------
| GET ALL PUBLISHED BLOGS
|--------------------------------------------------------------------------
*/

export const getPublishedBlogs = async () => {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("status", "published")
    .order("published_date", {
      ascending: false,
    });

  if (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }

  return data;
};


/*
|--------------------------------------------------------------------------
| GET SINGLE BLOG BY SLUG
|--------------------------------------------------------------------------
*/

export const getBlogBySlug = async (slug) => {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) {
    console.error("Error fetching blog:", error);
    throw error;
  }

  return data;
};


/*
|--------------------------------------------------------------------------
| GET ALL BLOGS - ADMIN
|--------------------------------------------------------------------------
*/

export const getAllBlogs = async () => {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error("Error fetching admin blogs:", error);
    throw error;
  }

  return data;
};


/*
|--------------------------------------------------------------------------
| CREATE BLOG
|--------------------------------------------------------------------------
*/

export const createBlog = async (blogData) => {
  const { data, error } = await supabase
    .from("blogs")
    .insert([blogData])
    .select()
    .single();

  if (error) {
    console.error("Error creating blog:", error);
    throw error;
  }

  return data;
};


/*
|--------------------------------------------------------------------------
| UPDATE BLOG
|--------------------------------------------------------------------------
*/

export const updateBlog = async (id, blogData) => {
  const { data, error } = await supabase
    .from("blogs")
    .update({
      ...blogData,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating blog:", error);
    throw error;
  }

  return data;
};


/*
|--------------------------------------------------------------------------
| DELETE BLOG
|--------------------------------------------------------------------------
*/

export const deleteBlog = async (id) => {
  const { error } = await supabase
    .from("blogs")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting blog:", error);
    throw error;
  }

  return true;
};


/*
|--------------------------------------------------------------------------
| UPLOAD BLOG IMAGE
|--------------------------------------------------------------------------
*/

export const uploadBlogImage = async (file) => {
  if (!file) {
    throw new Error("No file selected");
  }

  const fileExt = file.name.split(".").pop();

  const fileName = `${Date.now()}-${Math.random()
    .toString(36)
    .substring(2)}.${fileExt}`;

  const filePath = `blogs/${fileName}`;

  const { error } = await supabase.storage
    .from("blog-images")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Image upload error:", error);
    throw error;
  }

  const { data } = supabase.storage
    .from("blog-images")
    .getPublicUrl(filePath);

  return data.publicUrl;
};

/*
|--------------------------------------------------------------------------
| SEARCH BLOGS
|--------------------------------------------------------------------------
*/

export const searchBlogs = async (searchTerm = "") => {
  const term = searchTerm.trim();

  let query = supabase
    .from("blogs")
    .select("*")
    .eq("status", "published")
    .order("published_date", {
      ascending: false,
    });

  if (term) {
    query = query.or(
      `title.ilike.%${term}%,excerpt.ilike.%${term}%,content.ilike.%${term}%`
    );
  }

  const { data, error } = await query;

  if (error) {
    console.error("Search blogs error:", error);
    throw error;
  }

  return data || [];
};


/*
|--------------------------------------------------------------------------
| GET BLOGS BY CATEGORY
|--------------------------------------------------------------------------
*/

export const getBlogsByCategory = async (category) => {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("status", "published")
    .eq("category", category)
    .order("published_date", {
      ascending: false,
    });

  if (error) {
    console.error(
      "Category blogs error:",
      error
    );

    throw error;
  }

  return data || [];
};


/*
|--------------------------------------------------------------------------
| GET BLOGS BY TAG
|--------------------------------------------------------------------------
*/

export const getBlogsByTag = async (tag) => {
  const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("status", "published")
    .contains("tags", [tag])
    .order("published_date", {
      ascending: false,
    });

  if (error) {
    console.error(
      "Tag blogs error:",
      error
    );

    throw error;
  }

  return data || [];
};


/*
|--------------------------------------------------------------------------
| GET RECENT POSTS
|--------------------------------------------------------------------------
*/

export const getRecentPosts = async (limit = 5) => {
  const { data, error } = await supabase
    .from("blogs")
    .select(
      "id,title,slug,featured_image,featured_image_alt,published_date"
    )
    .eq("status", "published")
    .order("published_date", {
      ascending: false,
    })
    .limit(limit);

  if (error) {
    console.error(
      "Recent posts error:",
      error
    );

    throw error;
  }

  return data || [];
};


/*
|--------------------------------------------------------------------------
| GET CATEGORIES
|--------------------------------------------------------------------------
*/

export const getBlogCategories = async () => {
  const { data, error } = await supabase
    .from("blogs")
    .select("category")
    .eq("status", "published")
    .not("category", "is", null);

  if (error) {
    console.error(
      "Categories error:",
      error
    );

    throw error;
  }

  const categories = {};

  (data || []).forEach((blog) => {
    const category = blog.category?.trim();

    if (!category) return;

    categories[category] =
      (categories[category] || 0) + 1;
  });

  return Object.entries(categories)
    .map(([name, count]) => ({
      name,
      count,
    }))
    .sort((a, b) => b.count - a.count);
};


/*
|--------------------------------------------------------------------------
| GET POPULAR TAGS
|--------------------------------------------------------------------------
*/

export const getPopularTags = async () => {
  const { data, error } = await supabase
    .from("blogs")
    .select("tags")
    .eq("status", "published");

  if (error) {
    console.error(
      "Popular tags error:",
      error
    );

    throw error;
  }

  const tagCounts = {};

  (data || []).forEach((blog) => {
    if (!Array.isArray(blog.tags)) {
      return;
    }

    blog.tags.forEach((tag) => {
      const cleanTag = tag?.trim();

      if (!cleanTag) return;

      tagCounts[cleanTag] =
        (tagCounts[cleanTag] || 0) + 1;
    });
  });

  return Object.entries(tagCounts)
    .map(([name, count]) => ({
      name,
      count,
    }))
    .sort((a, b) => b.count - a.count);
};

/*
|--------------------------------------------------------------------------
| GET BLOG COMMENTS
|--------------------------------------------------------------------------
*/

export const getBlogComments = async (blogId) => {
  const { data, error } = await supabase
    .from("blog_comments")
    .select("*")
    .eq("blog_id", blogId)
    .eq("status", "approved")
    .order("created_at", {
      ascending: true,
    });

  if (error) {
    console.error(
      "Get comments error:",
      error
    );

    throw error;
  }

  return data || [];
};


/*
|--------------------------------------------------------------------------
| ADD BLOG COMMENT
|--------------------------------------------------------------------------
*/

export const addBlogComment = async ({
  blogId,
  name,
  email,
  comment,
  parentId = null,
}) => {

  const { data, error } = await supabase
    .from("blog_comments")
    .insert({
      blog_id: blogId,
      parent_id: parentId,
      name: name.trim(),
      email: email.trim(),
      comment: comment.trim(),
      status: "pending",
    })
    .select()
    .single();

  if (error) {
    console.error("Add comment error:", error);
    throw error;
  }

  return data;
};