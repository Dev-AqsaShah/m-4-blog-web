import React from 'react';
import Image from 'next/image'; // Next.js Image component
import Link from 'next/link';

// Define the type for a blog item
import { StaticImageData } from 'next/image';

type BlogItemType = {
  id: number;
  image: string | StaticImageData; // Allow both StaticImageData and string
  title: string;
  description: string;
  category: string;
  author: string;
  author_img?: string;
};

const BlogItem: React.FC<BlogItemType> = ({
  id,
  image,
  title,
  description,
  category,
  author,
}) => {
  // Fallback image URL (you can replace this with a default image URL or leave it blank)
  const fallbackImage = '/assets/blog1.jpeg';

  return (
    <div className="max-w-[330px] sm:max-w-[300px] border border-white">
      {/* Wrap the Image in the Link component */}
      <Link href={`/blogs/${id}`} passHref>
        {/* Check if the image is valid */}
        {image && (typeof image === 'string' ? image !== '' : image) ? (
          // If the image is a string URL
          typeof image === 'string' ? (
            <Image
              src={image}
              alt={title || 'Blog Image'}
              width={400}
              height={400}
              className="border border-white cursor-pointer transform transition duration-500 hover:scale-110"
            />
          ) : (
            // If the image is a StaticImageData import
            <Image
              src={image}
              alt={title || 'Blog Image'}
              width={400}
              height={400}
              className="border border-white cursor-pointer"
            />
          )
        ) : (
          // Fallback image if the image prop is empty or invalid
          <Image
            src={fallbackImage}
            alt="Fallback Image"
            width={400}
            height={400}
            className="border border-white cursor-pointer"
          />
        )}
      </Link>

      <div className="p-5 text-white">
        {/* Category */}
        <p className="ml-5 mt-5 px-1 inline-block bg-black text-white text-sm">
          Category: {category}
        </p>

        {/* Title, Description, and Author */}
        <h5 className="mb-2 text-lg font-medium tracking-tight text-white">{title}</h5>
        <p className="mb-3 text-sm tracking-tight text-white">{description}</p>
        <p>Author: {author}</p>
      </div>
    </div>
  );
};

export default BlogItem;
