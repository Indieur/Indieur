import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getAllBlogs,
  deleteBlog,
} from "../../services/blogService";


const AdminBlogs = () => {

  const [blogs, setBlogs] = useState([]);

  const [loading, setLoading] = useState(true);


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


  const handleDelete = async (id) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this blog?"
      );


    if (!confirmed) return;


    try {

      await deleteBlog(id);

      setBlogs((prev) =>
        prev.filter(
          (blog) => blog.id !== id
        )
      );

    } catch (error) {

      console.error(error);

      alert("Unable to delete blog.");

    }
  };


  if (loading) {

    return (
      <div className="container">
        <p>Loading blogs...</p>
      </div>
    );

  }


  return (
    <div className="admin-blog-list">

      <div className="container">

        <div className="admin-blog-header">

          <h1>Manage Blogs</h1>

          <Link
            to="/admin/blogs/create"
            className="vs-btn"
          >
            Add New Blog
          </Link>

        </div>


        {blogs.length === 0 ? (

          <p>
            No blogs found.
          </p>

        ) : (

          <div className="table-responsive">

            <table className="table">

              <thead>

                <tr>

                  <th>Title</th>

                  <th>Status</th>

                  <th>Author</th>

                  <th>Date</th>

                  <th>Actions</th>

                </tr>

              </thead>


              <tbody>

                {blogs.map((blog) => (

                  <tr key={blog.id}>

                    <td>
                      {blog.title}
                    </td>

                    <td>
                      {blog.status}
                    </td>

                    <td>
                      {blog.author_name}
                    </td>

                    <td>
                      {blog.published_date
                        ? new Date(
                            blog.published_date
                          ).toLocaleDateString()
                        : "-"}
                    </td>

                    <td>

                      <Link
                        to={`/blog/${blog.slug}`}
                        className="me-2"
                        target="_blank"
                        rel="noreferrer"
                      >
                        View
                      </Link>


                      <Link
                        to={`/admin/blogs/edit/${blog.id}`}
                        className="me-2"
                      >
                        Edit
                      </Link>


                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(
                            blog.id
                          )
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
};


export default AdminBlogs;