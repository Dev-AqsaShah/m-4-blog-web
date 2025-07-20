import Image from 'next/image'
import React from 'react'
import { blog_data } from './Details'

const BlogItem = () => {
  return (
    <div className="max-w-[330] sm:max-w-[300px] bg-gradient-to-b from-blue-900 to-black hover:shadow-[-7px_7px_0px_#0000000] ">
      <Image src={blog_data[0].Image } alt=""width={400} height={400} className="border-b border-black" />
      <p className="ml-5 mt-5 px-1 inline-block bg-black text-white text-sm " >{blog_data[0].category}</p>
      <div className="p-5">
        <h5 className="mb-2 text-lg font-medium tracking-tight text-white" >{blog_data[0].title} </h5>
        <p className="mb-3 text-sm tracking-tight text-white" >{blog_data[0].description} </p>
        <div className="inline-flex items-center py-2 font-semibold text-center text-white">
          Read more 
        </div>
      </div>

    </div>
  )
}

export default BlogItem