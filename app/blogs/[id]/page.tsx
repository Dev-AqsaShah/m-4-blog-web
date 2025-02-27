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
  authorImage?: string;
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

export default function BlogDetailPage() {
  const params = useParams();
  const id = params?.id ? String(params.id) : null;

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || id === "undefined" || id === "null" || id === "NaN") {
      setError("Invalid blog ID");
      setLoading(false);
      return;
    }

    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blog?id=${encodeURIComponent(id)}`);
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
    return <div className="flex justify-center items-center min-h-screen text-lg font-semibold">Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-lg font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      {/* Blog Detail Container with Smooth Zoom Effect */}
      <div className="max-w-4xl w-full p-8 bg-white shadow-2xl rounded-xl transition-transform duration-500 ease-in-out hover:scale-105 hover:shadow-3xl">
        
        {blog?.image && (
          <div className="overflow-hidden rounded-lg">
            <img
              src={`${BASE_URL}${blog.image}`}
              alt={blog.title}
              className="w-full h-[450px] object-cover transition-transform duration-300 ease-in-out hover:scale-110"
            />
          </div>
        )}

        <h1 className="text-4xl font-bold text-gray-900 mt-6">{blog?.title}</h1>
        <p className="text-gray-600 text-sm mt-2">
          By <span className="font-semibold">{blog?.author}</span> | <span className="italic">{blog?.category}</span>
        </p>

        <p className="mt-5 text-lg text-gray-700 leading-relaxed">{blog?.description}</p>
      </div>
    </div>
  );
}
