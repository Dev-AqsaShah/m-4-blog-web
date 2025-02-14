import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

type Blog = {
  id: number;
  title: string;
  author: string;
  author_img: string;
  image: string;
  description: string;
};

const Page = () => {
  const [data, setData] = useState<Blog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch(`/api/blogs/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch blog data");
        }
        const blog = await response.json();
        setData(blog);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlogData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium text-red-500">{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-medium text-gray-600">Blog not found</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{data.title}</h1>
      <p className="text-gray-700">{data.description}</p>
      <img src={data.image} alt={data.title} className="mt-4 w-full rounded-lg" />
      <div className="mt-4 flex items-center">
        <img src={data.author_img} alt={data.author} className="w-12 h-12 rounded-full mr-4" />
        <p className="text-lg font-medium">{data.author}</p>
      </div>
    </div>
  );
};

export default Page;






// "use client";

// import React, { useEffect, useState } from "react";
// import { useParams } from "next/navigation"; // If using Next.js dynamic routes
// import axios from "axios";

// interface Blog {
//   id: number;
//   title: string;
//   author: string;
//   author_img: string;
//   image: string;
//   description: string;
// }

// const BlogDetailPage: React.FC = () => {
//   const { id } = useParams(); // Extract ID from URL
//   const [data, setData] = useState<Blog | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchBlogData = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(`/api/blogs/${id}`);
//         setData(response.data);
//       } catch (error) {
//         console.error("Error fetching blog data:", error);
//         setError("Failed to load blog details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (id) {
//       fetchBlogData();
//     }
//   }, [id]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-lg font-medium">Loading...</p>
//       </div>
//     );
//   }

//   if (error || !data) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <p className="text-lg font-medium text-red-500">{error || "Blog not found!"}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-5 sm:p-12">
//       <h1 className="text-3xl font-bold text-gray-800">{data.title}</h1>
//       <p className="text-gray-600 mt-2">By {data.author}</p>
//       <img src={data.image} alt={data.title} className="w-full max-w-2xl my-5 rounded-lg shadow-md" />
//       <p className="text-gray-700">{data.description}</p>
//     </div>
//   );
// };

// export default BlogDetailPage;

