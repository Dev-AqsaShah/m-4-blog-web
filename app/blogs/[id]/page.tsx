"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

type Blog = {
  _id: string;
  title: string;
  description: string;
  category: string;
  author: string;
  image: string;
  authorImage?: string;
};

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id && typeof params.id === "string" ? params.id : null; // Ensure id is a string

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || ["undefined", "null", "NaN"].includes(id)) {
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
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold">{blog?.title}</h1>
      <p>{blog?.description}</p>
    </div>
  );
}
