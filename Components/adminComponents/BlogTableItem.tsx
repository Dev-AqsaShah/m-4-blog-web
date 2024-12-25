import React from "react";
import Image from "next/image";

interface BlogTableItemProps {
  id: string; // Blog ID
  author: string; // Author name
  title: string; // Blog title
  authorImg: string; // Author image URL
  onDelete: (id: string) => void; // Function to delete the blog
}

const BlogTableItem: React.FC<BlogTableItemProps> = ({ id, author, title, authorImg, onDelete }) => {
  return (
    <tr className="bg-white border-b hover:bg-gray-50 transition">
      <td className="flex items-center gap-4 px-6 py-4">
        <Image
          src={authorImg} // Author's image
          alt={author}
          width={50}
          height={50}
          className="rounded-full"
        />
        <div>
          <p className="text-sm font-medium text-gray-900">{author}</p>
        </div>
      </td>
      <td className="px-6 py-4 text-gray-700">{title}</td>
      <td
        className="px-6 py-4 text-red-500 cursor-pointer text-lg"
        onClick={() => onDelete(id)} // Trigger delete on click
      >
        X
      </td>
    </tr>
  );
};

export default BlogTableItem;
