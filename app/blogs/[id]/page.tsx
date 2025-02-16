"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

type Blog = {
  _id: string;
  title: string;
  description: string;
  category: string;
  author: string;
  image: string;
  authorImage: string;
};

export default function BlogDetailPage() {
  const params = useParams();
  const id = params?.id as string | undefined;

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get base URL from environment variables
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    if (!id || id === "NaN" || id.length !== 24) {
      setError("Invalid blog ID");
      setLoading(false);
      return;
    }

    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blog?id=${id}`);
        if (!response.ok) throw new Error("Failed to fetch blog");

        const data = await response.json();
        if (!data.blog) throw new Error("Blog not found");

        setBlog(data.blog);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg">Blog not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      {/* Blog Image */}
      <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden">
        <img
          src={`${BASE_URL}${
            blog.image.startsWith("/") ? blog.image : `/assets/${blog.image}`
          }`}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Blog Content */}
      <h1 className="text-3xl font-bold mt-6">{blog.title}</h1>
      <p className="text-gray-600 text-sm mt-2">
        <span className="text-blue-500 font-semibold">{blog.category}</span> | By{" "}
        <span className="font-semibold">{blog.author}</span>
      </p>

      <p className="text-gray-700 text-lg mt-4 leading-relaxed">
        {blog.description}
      </p>

      {/* Author Section */}
      <div className="flex items-center gap-4 mt-6 p-4 bg-gray-100 rounded-lg">
        {blog.authorImage && (
          <img
            src={`${BASE_URL}${
              blog.authorImage.startsWith("/")
                ? blog.authorImage
                : `/assets/${blog.authorImage}`
            }`}
            alt={blog.author}
            className="w-14 h-14 rounded-full object-cover"
          />
        )}
        <div>
          <p className="text-lg font-semibold">{blog.author}</p>
          <p className="text-sm text-gray-500">Blog Author</p>
        </div>
      </div>
    </div>
  );
}
