"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Footer from "@/Components/Footer";

type Blog = {
  _id: string;
  title: string;
  description: string;
  category: string;
  author: string;
  image: string;
  authorImage?: string;
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "") || "";

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = typeof params?.id === "string" ? params.id : "";

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
        const res = await fetch(`/api/blog?id=${encodeURIComponent(id)}`);
        if (!res.ok) throw new Error("Failed to fetch blog");

        const data = await res.json();
        if (!data.blog) throw new Error("Blog not found");

        setBlog(data.blog);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // ✅ Ensure Cloudinary URLs are returned as-is
  const getImageUrl = (image: string) => {
    if (/^https?:\/\/res\.cloudinary\.com/.test(image)) {
      return image; // Cloudinary URL → return directly
    }
    if (/^https?:\/\//.test(image)) {
      return image; // Any other full URL → return directly
    }
    return `${BASE_URL}${image.startsWith("/") ? "" : "/"}${image}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg font-bold text-blue-900">
        LOADING...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-lg font-medium">{error}</p>
      </div>
    );
  }

  return (
    <>
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={() => router.push("/")}
          className="bg-white text-blue-900 px-4 py-2 rounded-full shadow-md hover:bg-black hover:text-white transition-all font-semibold text-sm sm:text-base"
        >
          ⬅ Back to Home
        </button>
      </div>

      {/* Blog Content */}
      <div className="flex justify-center items-start min-h-screen px-4 pt-20 pb-16 bg-blue-900">
        <div className="w-full max-w-3xl p-6 sm:p-8 bg-gradient-to-t from-black to-blue-900 rounded-2xl border-2 border-white transition-all duration-500 shadow-[0_0_60px_rgba(255,255,255,0.9)] mb-10">
          {/* Image */}
          {blog?.image && (
            <div className="overflow-hidden rounded-xl relative w-[280px] h-[350px] sm:h-[220px] md:h-[250px] lg:h-[380px] mb-6 shadow-md">
              <Image
                src={getImageUrl(blog.image)}
                alt={blog.title}
                fill
                className="object-cover border-4 border-black shadow-[0_0_60px_rgba(255,255,255,0.9)] transition-transform duration-300 ease-in-out hover:scale-105"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
          )}

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            {blog?.title}
          </h1>

          {/* Author & Category */}
          <p className="text-gray-300 text-sm mb-6">
            By <span className="font-semibold text-white">{blog?.author}</span>{" "}
            | <span className="italic">{blog?.category}</span>
          </p>

          {/* Description */}
          <p className="text-white text-base sm:text-lg leading-relaxed">
            {blog?.description}
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
