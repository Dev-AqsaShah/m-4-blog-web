"use client";

import React, { useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import axios from "axios";

interface Blog {
  _id: string;
  image: string;
  title: string;
  category: string;
  author: string;
}

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredData, setFilteredData] = useState<Blog[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

  const fetchBlogs = async () => {
    try {
      const response = await axios.get<{ blogs: Blog[] }>("/api/blog");
      setBlogs(response.data.blogs);
      setFilteredData(response.data.blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const filterByCategory = (category: string) => {
    setActiveCategory(category);
    if (category === "All") {
      setFilteredData(blogs);
    } else {
      setFilteredData(blogs.filter((item) => item.category === category));
    }
  };

  const categories = ["All", "Technology", "Traveling", "Animals", "Plants", "Arts", "Lifestyle"];

  return (
    <div className="bg-gradient-to-b from-blue-950 to-black min-h-screen pt-6 pb-12 px-4 sm:px-8">
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => filterByCategory(category)}
            className={`px-5 py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-300 
              ${
                activeCategory === category
                  ? "bg-white text-black border-2 border-white shadow-[0_0_10px_2px_white]"
                  : "bg-black text-white border border-white hover:bg-white hover:text-black shadow-[0_0_10px_4px_white]"
              }
            `}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto ">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <BlogItem
              key={item._id}
              id={item._id}
              image={`${BASE_URL}${item.image.startsWith("/") ? "" : "/"}${item.image}`}
              title={item.title}
              category={item.category}
              author={item.author}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-300 text-lg">No blogs available.</div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
