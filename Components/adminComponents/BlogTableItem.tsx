import React from "react";

interface BlogTableItemProps {
  id: string; // Blog ID
  author: string; // Author name
  title: string; // Blog title
  onDelete: (id: string) => void; // Function to delete the blog
}

const BlogTableItem: React.FC<BlogTableItemProps> = ({ id, author, title, onDelete }) => {
  return (
    <tr className="bg-white border-b hover:bg-gray-50 transition">
      <td className="px-6 py-4">
        <p className="text-sm font-medium text-gray-900">{author}</p>
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
