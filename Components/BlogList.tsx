// import React, { useEffect, useState } from "react";
// import { blog_data } from "./Details"; // Ensure this path is correct
// import BlogItem from "./BlogItem"; // Ensure this path is correct
// import axios from "axios";


// const BlogList = () => {
//   const [filteredData, setFilteredData] = useState(blog_data);

//   const filterByCategory = (category: string) => {
//     if (category === "All") {
//       setFilteredData(blog_data);
//     } else {
//       setFilteredData(blog_data.filter(item => item.category === category));
//     }
//   };


// const [blog,setBlogs] =useState([]);
// const fetchBlogs = async () =>{

// const response = await axios.get("/api/blog");
// setBlogs(response.data.blogs);
// console.log(response.data.blogs);
// }

// useEffect(()=>{
//   fetchBlogs();
// },[])


//   return (
//     <div className="bg-gradient-to-b from-blue-900 to-black min-h-screen pt-1 pb-1 ">
//       {/* Button Section */}
//       <div className="flex justify-center flex-wrap gap-10 my-8 text-white">
//         {["All", "Technology", "Traveling", "Animals", "Plants","Arts", "Lifestyle"].map((category) => (
//           <button
//             key={category}
//             onClick={() => filterByCategory(category)}
//             className="bg-black text-white py-2 px-6 rounded-full text-sm md:text-base lg:text-lg mt-4 hover:bg-white hover:text-black shadow-[0_0_15px_5px_rgba(255,255,255,1)]"
//           >
//             {category}
//           </button>
//         ))}
//       </div>

//       {/* Blog Items Section */}
//       <div className="flex flex-wrap justify-around gap-2 gap-y-10 mb-16 xl:mx-24 ">
//         {filteredData.map((item, index) => (
//           <BlogItem
//             key={index}
//             id={item.id}
//             image={item.Image}  // Check if 'Image' is correct
//             title={item.title}
//             description={item.description}
//             category={item.category}
//             author={item.author}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BlogList;


import React, { useEffect, useState } from "react";
import BlogItem from "./BlogItem"; // Ensure this path is correct
import axios from "axios";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // Fetch Blogs from API
  const fetchBlogs = async () => {
    try {
      const response = await axios.get("/api/blog");
      setBlogs(response.data.blogs);
      setFilteredData(response.data.blogs); // Set initial filtered data
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Filter Blogs by Category
  const filterByCategory = (category: string) => {
    if (category === "All") {
      setFilteredData(blogs);
    } else {
      setFilteredData(blogs.filter((item) => item.category === category));
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-900 to-black min-h-screen pt-1 pb-1 ">
      {/* Button Section */}
      <div className="flex justify-center flex-wrap gap-10 my-8 text-white">
        {["All", "Technology", "Traveling", "Animals", "Plants", "Arts", "Lifestyle"].map((category) => (
          <button
            key={category}
            onClick={() => filterByCategory(category)}
            className="bg-black text-white py-2 px-6 rounded-full text-sm md:text-base lg:text-lg mt-4 hover:bg-white hover:text-black shadow-[0_0_15px_5px_rgba(255,255,255,1)]"
          >
            {category}
          </button>
        ))}
      </div>

      {/* Blog Items Section */}
      <div className="flex flex-wrap justify-around gap-2 gap-y-10 mb-16 xl:mx-24 ">
        {filteredData.map((item, index) => (
          <BlogItem
            key={index}
            id={item._id} // MongoDB ID
            image={item.image} // Ensure field names match API response
            title={item.title}
            description={item.description}
            category={item.category}
            author={item.author}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
