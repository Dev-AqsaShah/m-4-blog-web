"use client";

import React, { useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import axios from "axios";
import { FiSearch } from "react-icons/fi";

interface Blog {
  _id: string;
  image: string;
  title: string;
  description: string;
  category: string;
  author: string;
  createdAt?: string;
}

const CATEGORIES = ["All", "Technology", "Traveling", "Animals", "Plants", "Arts", "Lifestyle"];
const BLOGS_PER_PAGE = 6;

const SkeletonCard = () => (
  <div className="bg-white/[0.04] border border-white/8 rounded-2xl overflow-hidden animate-pulse">
    <div className="w-full h-52 bg-white/8" />
    <div className="p-5 space-y-3">
      <div className="h-3 bg-white/8 rounded-full w-1/4" />
      <div className="h-5 bg-white/8 rounded-full w-3/4" />
      <div className="h-4 bg-white/8 rounded-full w-full" />
      <div className="h-4 bg-white/8 rounded-full w-2/3" />
      <div className="h-4 bg-white/8 rounded-full w-1/3 mt-2" />
    </div>
  </div>
);

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get<{ blogs: Blog[] }>("/api/blog");
        setBlogs(response.data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Reset to page 1 when filter/search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory = activeCategory === "All" || blog.category === activeCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !query ||
      blog.title.toLowerCase().includes(query) ||
      blog.description.toLowerCase().includes(query) ||
      blog.author.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredBlogs.length / BLOGS_PER_PAGE);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * BLOGS_PER_PAGE,
    currentPage * BLOGS_PER_PAGE
  );

  return (
    <section className="bg-gradient-to-b from-black via-blue-950/30 to-black min-h-screen pt-12 pb-16 px-4 sm:px-8 lg:px-16">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          Explore Stories
        </h2>
        <p className="text-white/40">Discover blogs from every corner of life</p>
      </div>

      {/* Search + Filter Bar */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={16} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search blogs..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-white/30 text-sm outline-none focus:border-blue-500/40 transition-all"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeCategory === category
                  ? "bg-blue-600 text-white border border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                  : "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      {!loading && (
        <div className="max-w-7xl mx-auto mb-5 text-white/30 text-sm">
          {filteredBlogs.length === 0
            ? "No blogs found"
            : `Showing ${paginatedBlogs.length} of ${filteredBlogs.length} blog${filteredBlogs.length !== 1 ? "s" : ""}`}
        </div>
      )}

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
        ) : paginatedBlogs.length > 0 ? (
          paginatedBlogs.map((blog) => (
            <BlogItem
              key={blog._id}
              id={blog._id}
              image={blog.image}
              title={blog.title}
              description={blog.description}
              category={blog.category}
              author={blog.author}
              createdAt={blog.createdAt}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-white/40 text-lg">No blogs found</p>
            <p className="text-white/25 text-sm mt-1">Try a different search or category</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="max-w-7xl mx-auto mt-10 flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm"
          >
            ← Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-9 h-9 rounded-xl text-sm font-medium transition-all ${
                currentPage === page
                  ? "bg-blue-600 text-white border border-blue-500"
                  : "bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm"
          >
            Next →
          </button>
        </div>
      )}
    </section>
  );
};

export default BlogList;
