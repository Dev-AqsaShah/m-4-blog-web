"use client"; // Add this at the top

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
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blog?blogId=${id}`);
        if (!response.ok) throw new Error("Failed to fetch blog");
        const data = await response.json();
        setBlog(data.blog);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBlog();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!blog) return <p>Blog not found.</p>;

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.description}</p>
      <img src={`/public/${blog.image}`} alt={blog.title} width={400} />
      <p>Category: {blog.category}</p>
      <p>Author: {blog.author}</p>
      <img src={blog.authorImage} alt={blog.author} width={50} />
    </div>
  );
}
