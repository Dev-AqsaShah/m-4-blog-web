import React from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { FiClock, FiUser } from "react-icons/fi";

interface BlogItemProps {
  id: string;
  image?: string;
  title: string;
  description: string;
  category: string;
  author: string;
  createdAt?: string;
}

const CATEGORY_STYLES: Record<string, string> = {
  Technology: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Traveling: "bg-green-500/20 text-green-300 border-green-500/30",
  Animals: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  Plants: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  Arts: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  Lifestyle: "bg-pink-500/20 text-pink-300 border-pink-500/30",
};

const BlogItem: React.FC<BlogItemProps> = ({ id, image, title, description, category, author, createdAt }) => {
  const fallbackImage = "/assets/h1.jpeg";
  const readingTime = Math.max(1, Math.ceil(description.split(/\s+/).length / 200));
  const categoryStyle = CATEGORY_STYLES[category] || "bg-white/10 text-white/60 border-white/20";

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : null;

  return (
    <Link href={`/blogs/${id}`} className="group block">
      <div className="h-full bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden transition-all duration-400 hover:border-blue-400/40 hover:shadow-[0_8px_40px_rgba(59,130,246,0.18)] hover:-translate-y-1">
        {/* Image */}
        <div className="relative w-full h-52 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image || fallbackImage}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Category Badge */}
          <span className={`absolute top-3 left-3 text-xs px-3 py-1 rounded-full border font-medium backdrop-blur-sm ${categoryStyle}`}>
            {category}
          </span>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Meta */}
          <div className="flex items-center gap-3 text-white/40 text-xs mb-3">
            <span className="flex items-center gap-1">
              <FiUser size={11} />
              {author}
            </span>
            <span className="flex items-center gap-1">
              <FiClock size={11} />
              {readingTime} min read
            </span>
            {formattedDate && <span className="ml-auto">{formattedDate}</span>}
          </div>

          {/* Title */}
          <h2 className="text-white font-bold text-lg leading-snug mb-2 group-hover:text-blue-300 transition-colors line-clamp-2">
            {title}
          </h2>

          {/* Excerpt */}
          <p className="text-white/50 text-sm leading-relaxed line-clamp-2 mb-4">
            {description}
          </p>

          {/* Read More */}
          <div className="flex items-center gap-2 text-blue-400 text-sm font-medium group-hover:gap-3 transition-all">
            Read More <FaArrowRight size={12} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogItem;
