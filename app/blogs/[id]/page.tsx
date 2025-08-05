
// import { blog_data } from '@/Components/Details';
// import { useState, useEffect } from "react";
// import { useParams } from "next/navigation";
// import Image from "next/image";

// type Blog = {
//   _id: string;
//   title: string;
//   description: string;
//   category: string;
//   author: string;
//   image: string;
//   authorImage?: string;
// };

// const BASE_URL =
//   process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "") || "";

// export default function BlogDetailPage() {
//   const params = useParams();
//   const id = params?.id ? String(params.id) : null;

//   const [blog, setBlog] = useState<Blog | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!id || id === "undefined" || id === "null" || id === "NaN") {
//       setError("Invalid blog ID");
//       setLoading(false);
//       return;
//     }

//     const fetchBlog = async () => {
//       try {
//         const response = await fetch(`/api/blog?id=${encodeURIComponent(id)}`);
//         if (!response.ok) throw new Error("Failed to fetch blog");

//         const data = await response.json();
//         if (!data.blog) throw new Error("Blog not found");

//         setBlog(data.blog);
//       } catch (error) {
//         setError((error as Error).message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBlog();
//   }, [id]);

//   if (loading) {
//     return <div className="flex justify-center items-center min-h-screen text-lg font-semibold">Loading...</div>;
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <p className="text-red-500 text-lg font-medium">{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex justify-center items-center min-h-screen px-4">
//       <div className="max-w-4xl w-full p-8 bg-white shadow-2xl rounded-xl transition-transform duration-500 ease-in-out hover:scale-105 hover:shadow-3xl">

//         {blog?.image && (
//           <div className="overflow-hidden rounded-lg relative w-full h-[450px]">
//             <Image
//               src={`${BASE_URL}${blog.image}`}
//               alt={blog.title}
//               fill
//               className="object-cover transition-transform duration-300 ease-in-out hover:scale-110"
//               sizes="(max-width: 768px) 100vw, 768px"
//               priority
//             />
//           </div>
//         )}

//         <h1 className="text-4xl font-bold text-gray-900 mt-6">{blog?.title}</h1>
//         <p className="text-gray-600 text-sm mt-2">
//           By <span className="font-semibold">{blog?.author}</span> | <span className="italic">{blog?.category}</span>
//         </p>

//         <p className="mt-5 text-lg text-gray-700 leading-relaxed">{blog?.description}</p>
//       </div>
//     </div>
//   );
// }


"use client";

import { blog_data } from '@/Components/Details';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const page = ({params}) => {

  const [data,setData] = useState(null);
  const fetchBlogData = () =>{
      for(let i=0;i<blog_data.length;i++)

        {
          if (Number(params.id)===blog_data[i].id) {
              setData(blog_data[i]);
              console.log(blog_data[i]);
              break;
              
          }
        }

  }
    useEffect(() =>{
        fetchBlogData();
  },[])

  return (data?<>
    <div>
        <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28">
          <div className="flex justify-between items-center">
            <Image src={public\assets.logo} width={180} alt="" className='w-[130px] sm:w-auto'/>
            <button className="flex items-center gap-2 font-medium py-1 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]">
                Get Started <Image src={public\assets.arrow}alt="" />
            </button>
          </div>
          <div className="text-center my-24">
            <h1 className="text-2x1 sm:text-5x1 font-semibold max-w-[700px] mx-auto" >{data.title} </h1>
            <Image src={}
          </div>
        </div>
    </div>
    </>:<></>
  )
}

export default page

