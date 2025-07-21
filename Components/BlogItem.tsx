import React from "react";

interface BlogItemProps {
  id: string;
  image?: string; // Optional now
  title: string;
  description: string;
  category: string;
  author: string;
}

const BlogItem: React.FC<BlogItemProps> = ({
  id,
  image,
  title,
  description,
  category,
  author,
}) => {
  const fallbackImage = "/assets/artsblog1.webp";

  return (
    <div className="border rounded-lg p-5 shadow-lg bg-white transition-transform duration-500 ease-in-out hover:scale-105 hover:shadow-2xl">
      <a href={`/blogs/${id}`} className="block overflow-hidden rounded-md">
        <img
          src={image || fallbackImage}
          alt={title}
          className="w-full h-52 object-cover rounded-md transition-transform duration-300 ease-in-out hover:scale-110"
        />
      </a>

      <div className="mt-4">
        <a
          href={`/blogs/${id}`}
          className="text-2xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
        >
          {title}
        </a>
        <p className="text-sm text-gray-500 mt-1">
          By <span className="font-medium">{author}</span> | {category}
        </p>
        <p className="mt-3 text-gray-700 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default BlogItem;
