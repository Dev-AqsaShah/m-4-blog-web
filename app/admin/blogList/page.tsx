"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogTableItem from "@/Components/adminComponents/BlogTableItem";

interface Blog {
  id: string; // Blog ID
  author: string; // Author name
  title: string; // Blog title
}

const Page: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null); // Error state

  // Fetch blogs from the API
  const fetchBlogs = async () => {
    try {
      const response = await axios.get<{ blogs: Blog[] }>("/api/blog");
      setBlogs(response.data.blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError("An error occurred while fetching the blogs. Please try again later.");
    }
  };

  // Delete a blog by ID
  const deleteBlog = async (id: string) => {
    try {
      await axios.delete(`/api/blog/${id}`);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id)); // Update state
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="p-5 sm:p-12">
      <h1 className="text-2xl font-bold text-gray-800 mb-5">All Blogs</h1>
      {error && <p className="text-red-500">{error}</p>} {/* Show error if exists */}
      <div className="overflow-x-auto shadow-md rounded-lg border">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">Author</th>
              <th scope="col" className="px-6 py-3">Title</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <BlogTableItem
                key={blog.id}
                id={blog.id}
                author={blog.author}
                title={blog.title}
                onDelete={deleteBlog}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
