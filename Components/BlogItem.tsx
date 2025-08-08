import React from "react";

interface BlogItemProps {
  id: string;
  image?: string; // Optional now
  title: string;
  category: string;
  author: string;
}

const BlogItem: React.FC<BlogItemProps> = ({
  id,
  image,
  title,
  category,
  author,
}) => {
  const fallbackImage = "/assets/artsblog1.webp";

  return (
    <div className="border rounded-lg p-5 shadow-lg bg-gray-300 transition-transform duration-500 ease-in-out hover:scale-90 hover:shadow-2xl">
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
          className="text-2xl font-semibold text-black hover:text-blue-900 transition-colors "
        >
          {title}
        </a>
        <p className="text-sm text-blue-800 mt-1 font-semibold">
          By <span className="font-medium">{author}</span> | {category}
        </p>
      </div>
    </div>
  );
};

export default BlogItem;
