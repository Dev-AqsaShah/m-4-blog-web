"use client";

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

interface Blog {
  _id: string;
  author: string;
  title: string;
  description: string;
  image?: string;
  category: string;
  createdAt?: string;
}

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dm5vap7hs";

const getImageUrl = (url?: string) => {
  if (!url) return "";
  if (url.startsWith("http") || url.startsWith("//")) return url;
  if (url.startsWith("/uploads/") || url.startsWith("/assets/")) {
    return `${process.env.NEXT_PUBLIC_BASE_URL || ""}${url}`;
  }
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${url.replace(/^\/+/, "")}`;
};

const CATEGORY_COLORS: Record<string, string> = {
  Technology: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Traveling: "bg-green-500/20 text-green-300 border-green-500/30",
  Animals: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  Plants: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  Arts: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  Lifestyle: "bg-pink-500/20 text-pink-300 border-pink-500/30",
};

const Page: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchBlogs = useCallback(async () => {
    try {
      const response = await axios.get<{ blogs: Blog[] }>("/api/blog");
      setBlogs(response.data.blogs);
    } catch {
      setError("Failed to fetch blogs.");
    }
  }, []);

  const deleteBlog = async (mongoId: string) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    setDeletingId(mongoId);
    try {
      const response = await axios.delete("/api/blog", { params: { id: mongoId } });
      if (response.data.success) {
        toast.success("Blog deleted successfully");
        fetchBlogs();
      } else {
        toast.error("Error deleting blog.");
      }
    } catch {
      toast.error("Error deleting blog.");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 to-black p-6 sm:p-10 pt-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">All Blogs</h1>
        <span className="text-white/40 text-sm">{blogs.length} blogs total</span>
      </div>

      {error && (
        <p className="text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-6">{error}</p>
      )}

      <div className="space-y-3">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-white/20 transition-all"
          >
            {/* Thumbnail */}
            <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-white/5">
              {blog.image ? (
                <Image
                  src={getImageUrl(blog.image)}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/20 text-xs">No img</div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs px-2 py-0.5 rounded-full border ${CATEGORY_COLORS[blog.category] || "bg-white/10 text-white/50 border-white/10"}`}>
                  {blog.category}
                </span>
              </div>
              <h3 className="text-white font-semibold text-sm truncate">{blog.title}</h3>
              <p className="text-white/40 text-xs mt-0.5">
                By {blog.author}
                {blog.createdAt && ` · ${new Date(blog.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href={`/admin/edit/${blog._id}`}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-300 hover:bg-blue-600/30 transition-all text-sm"
              >
                <FiEdit2 size={14} />
                <span className="hidden sm:inline">Edit</span>
              </Link>
              <button
                onClick={() => deleteBlog(blog._id)}
                disabled={deletingId === blog._id}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-600/20 border border-red-500/30 text-red-300 hover:bg-red-600/30 disabled:opacity-50 transition-all text-sm"
              >
                <FiTrash2 size={14} />
                <span className="hidden sm:inline">{deletingId === blog._id ? "Deleting..." : "Delete"}</span>
              </button>
            </div>
          </div>
        ))}

        {blogs.length === 0 && (
          <div className="text-center py-20 text-white/30">
            <p className="text-4xl mb-3">📝</p>
            <p className="text-lg">No blogs yet. Add your first blog!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
