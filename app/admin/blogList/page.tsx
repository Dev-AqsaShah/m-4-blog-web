"use client";

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";

interface Blog {
  _id: string;
  author: string;
  title: string;
  description: string;
  imageUrl?: string;
}

const Page: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_BASE_URL
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog`
    : "/api/blog";

  const fetchBlogs = useCallback(async () => {
    try {
      const response = await axios.get<{ blogs: Blog[] }>(API_URL);
      setBlogs(response.data.blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError("An error occurred while fetching the blogs.");
    }
  }, [API_URL]);

  const deleteBlog = async (mongoId: string) => {
    if (!mongoId) {
      toast.error("Blog ID is missing");
      return;
    }

    // Alert before delete
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmed) return;

    try {
      const response = await axios.delete(API_URL, {
        params: { id: mongoId },
      });

      if (response.data.success) {
        toast.success(response.data.msg);
        fetchBlogs();
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
  }, [fetchBlogs]);

  // ✅ FIX: Cloudinary-safe image URL handling
  const getImageUrl = (url?: string) => {
    if (!url) return "";

    // If the URL starts with "http" or "//" — return as is (Cloudinary or external)
    if (url.startsWith("http") || url.startsWith("//")) {
      return url;
    }

    // Otherwise, treat as local file path
    return `${process.env.NEXT_PUBLIC_BASE_URL || ""}${url}`;
  };

  return (
    <div className="lg:pt-28 p-5 sm:p-12 pt-24 bg-gradient-to-b from-gray-900 to-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-8 border-b border-gray-700 pb-2">
        📚 All Blogs
      </h1>
      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-700">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-800 text-gray-300 uppercase text-xs">
            <tr>
              <th className="px-6 py-4">Image</th>
              <th className="px-6 py-4">Author</th>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {blogs.map((blog) => (
              <tr
                key={blog._id}
                className="hover:bg-gray-800 transition-colors duration-150"
              >
                <td className="px-6 py-4">
                  {blog.imageUrl ? (
                    <Image
                      src={getImageUrl(blog.imageUrl)}
                      alt={blog.title}
                      width={80}
                      height={80}
                      className="object-cover rounded-md shadow"
                    />
                  ) : (
                    <span className="text-gray-500 italic">No Image</span>
                  )}
                </td>
                <td className="px-6 py-4">{blog.author}</td>
                <td className="px-6 py-4 font-semibold">{blog.title}</td>
                <td className="px-6 py-4 text-gray-400">
                  {blog.description.length > 80
                    ? blog.description.slice(0, 80) + "..."
                    : blog.description}
                </td>
                <td className="px-6 py-4 flex items-center justify-center gap-3">
                  <button
                    onClick={() => deleteBlog(blog._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md shadow-md transition-colors duration-200"
                  >
                    🗑 Delete
                  </button>
                  <button
                    onClick={() =>
                      toast.info("Edit functionality coming soon!")
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-md transition-colors duration-200"
                  >
                    ✏ Edit
                  </button>
                </td>
              </tr>
            ))}
            {blogs.length === 0 && ( <tr>
                <td
                  colSpan={5}
                  className="px-6 py-8 text-center text-gray-500 italic"
                >
                  No blogs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
