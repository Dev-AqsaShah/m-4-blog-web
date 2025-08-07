"use client";

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import BlogTableItem from "@/Components/adminComponents/BlogTableItem";
import { toast } from "react-toastify";

interface Blog {
  _id: string; // Blog ID
  author: string; // Author name
  title: string; // Blog title
  description : string;
}

const Page: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Get API base URL from .env
  const API_URL = process.env.NEXT_PUBLIC_BASE_URL
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog`
    : "/api/blog";

  console.log("API URL:", API_URL); // Debugging log

  // Memoized fetchBlogs function
  const fetchBlogs = useCallback(async () => {
    try {
      const response = await axios.get<{ blogs: Blog[] }>(API_URL);
      setBlogs(response.data.blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError("An error occurred while fetching the blogs. Please try again later.");
    }
  }, [API_URL]); // Include API_URL as a dependency

  // Delete a blog by ID
  const deleteBlog = async (mongoId: string) => {
    console.log("Deleting blog with ID:", mongoId);

    if (!mongoId) {
      toast.error("Blog ID is missing");
      return;
    }

    try {
      const response = await axios.delete(API_URL, {
        params: { id: mongoId },
      });

      if (response.data.success) {
        toast.success(response.data.msg);
        fetchBlogs(); // Refresh blog list
      } else {
        toast.error("Error deleting blog.");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Error deleting blog.");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]); // Now fetchBlogs is included as a dependency

  return (
    <div className=" lg:pt-28 p-5 sm:p-12 pt-24 bg-gradient-to-b from-blue-800 to-black min-h-screen text-white ">
      <h1 className="text-2xl font-bold text-white mb-5">All Blogs</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="overflow-x-auto shadow-md rounded-lg border-2">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-white uppercase ">
            <tr>
              <th scope="col" className="px-6 py-3">Author</th>
              <th scope="col" className="px-6 py-3">Title</th>
              <th scope="col" className="px-6 py-3">Description</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <BlogTableItem
                key={blog._id}
                id={blog._id}
                author={blog.author}
                title={blog.title}
                description={blog.description}
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
