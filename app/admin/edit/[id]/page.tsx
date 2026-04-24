"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter, useParams } from "next/navigation";
import { FiUpload } from "react-icons/fi";

const CATEGORIES = ["Technology", "Traveling", "Animals", "Plants", "Arts", "Lifestyle"];
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dm5vap7hs";

const getImageUrl = (url: string) => {
  if (!url) return "";
  if (/^https?:\/\//.test(url)) return url;
  if (url.startsWith("/uploads/") || url.startsWith("/assets/")) return url;
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${url.replace(/^\/+/, "")}`;
};

const Page: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : "";

  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Technology",
    author: "Aqsa Shah",
    authorImg: "/assets/aqsa.jpg",
    currentImage: "",
  });

  useEffect(() => {
    if (!id) return;
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/api/blog?id=${id}`);
        if (res.data.blog) {
          const blog = res.data.blog;
          setData({
            title: blog.title,
            description: blog.description,
            category: blog.category,
            author: blog.author,
            authorImg: blog.authorImage || "/assets/aqsa.jpg",
            currentImage: blog.image || "",
          });
        }
      } catch {
        toast.error("Failed to load blog data.");
      } finally {
        setFetching(false);
      }
    };
    fetchBlog();
  }, [id]);

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("id", id);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("authorImage", data.authorImg);
    if (image) formData.append("image", image);

    try {
      const response = await axios.put("/api/blog", formData);
      if (response.data.success) {
        toast.success("Blog updated successfully!");
        router.push("/admin/blogList");
      } else {
        toast.error(response.data.error || "Update failed");
      }
    } catch {
      toast.error("Failed to update blog.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-950 to-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-blue-400 rounded-full animate-spin" />
      </div>
    );
  }

  const displayImage = previewImage || (data.currentImage ? getImageUrl(data.currentImage) : null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 to-black p-6 sm:p-10 pt-8">
      <h1 className="text-2xl font-bold text-white mb-8">Edit Blog</h1>

      <form onSubmit={onSubmitHandler} className="max-w-2xl space-y-6">
        {/* Thumbnail */}
        <div>
          <p className="text-white/70 text-sm font-medium mb-3 uppercase tracking-wide">
            Thumbnail {!image && data.currentImage && <span className="text-white/30 normal-case">(current image shown — click to replace)</span>}
          </p>
          <label
            htmlFor="image"
            className="relative block w-full h-52 rounded-2xl border-2 border-dashed border-white/20 hover:border-blue-400/50 cursor-pointer overflow-hidden transition-all group"
          >
            {displayImage ? (
              <Image src={displayImage} alt="Preview" fill className="object-cover" />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/30 group-hover:text-white/60 transition-colors">
                <FiUpload size={32} />
                <span className="text-sm">Click to upload thumbnail</span>
              </div>
            )}
          </label>
          <input onChange={onFileChange} type="file" id="image" accept="image/*" hidden />
        </div>

        {/* Title */}
        <div>
          <p className="text-white/70 text-sm font-medium mb-2 uppercase tracking-wide">Blog Title</p>
          <input
            name="title"
            onChange={onChangeHandler}
            value={data.title}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none focus:border-blue-500/50 transition-all"
            type="text"
            placeholder="Enter title..."
            required
          />
        </div>

        {/* Description */}
        <div>
          <p className="text-white/70 text-sm font-medium mb-2 uppercase tracking-wide">Blog Content</p>
          <textarea
            name="description"
            onChange={onChangeHandler}
            value={data.description}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none focus:border-blue-500/50 transition-all resize-none"
            placeholder="Write content here..."
            rows={10}
            required
          />
          <p className="text-white/25 text-xs mt-1">{data.description.split(/\s+/).filter(Boolean).length} words</p>
        </div>

        {/* Category & Author */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-white/70 text-sm font-medium mb-2 uppercase tracking-wide">Category</p>
            <select
              name="category"
              onChange={onChangeHandler}
              value={data.category}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500/50 transition-all"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat} className="bg-blue-950">{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <p className="text-white/70 text-sm font-medium mb-2 uppercase tracking-wide">Author</p>
            <input
              name="author"
              onChange={onChangeHandler}
              value={data.author}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none focus:border-blue-500/50 transition-all"
              type="text"
              required
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="px-10 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </span>
            ) : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/blogList")}
            className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 font-medium rounded-xl transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
