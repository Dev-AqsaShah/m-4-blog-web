"use client";

import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowRightLong } from "react-icons/fa6";

const Header: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    arrows: false,
  };

  const slideData = [
    { id: 0, img: "/Assets/home1.jpg" },
    { id: 1, img: "/Assets/artsblog1.webp" },
    { id: 2, img: "/Assets/home3.jpeg" },
    { id: 3, img: "/Assets/home4.webp" },
  ];

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image Slider */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Slider {...settings}>
          {slideData.map((item) => (
            <div key={item.id} className="w-full h-full">
              <Image
                src={item.img}
                alt={`Background ${item.id}`}
                width={1500}
                height={700}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10"></div>

      {/* Content Section */}
      <div className="relative z-20 h-full flex flex-col justify-between text-white px-5 md:px-12 lg:px-24">
        {/* Header Section */}
        <div className="flex justify-between items-center pt-4 sm:pt-6 lg:pt-8">
          <img
            src="/Assets/logo.png"
            alt="Aqsa Life Dairy"
            width={130}
            height={80}
            className="w-[90px] sm:w-[100px] md:w-[110px]"
          />
          <button className="flex items-center gap-2 font-medium py-2 px-4 sm:py-3 sm:px-6 border shadow-[0_0_15px_5px_rgba(255,255,255,1)] border-white bg-blue-900 text-white hover:bg-black hover:text-white transition-all transform hover:scale-105 rounded-full">
            Get Started
            <FaArrowRightLong />
          </button>
        </div>

        {/* Main Content */}
        <div className="text-center mt-10 sm:mt-16 lg:mt-20">
          <h1 className="text-3xl sm:text-5xl font-bold">LATEST BLOGS</h1>
          <h3 className="text-lg sm:text-2xl font-semibold mt-4">
            Your stories. My stories. Life's unfolding moments.
          </h3>
          <p className="mt-3 max-w-[740px] mx-auto text-sm sm:text-base">
            Welcome to Life Unfolded — a heartfelt space where stories meet
            reality. This is more than just a blog; it's a platform for everyone
            to share their journey. From the wonder of animals and the serenity
            of plants to the creativity of arts, the logic of programming
            languages, and the thrill of traveling — there's a category for every
            story. Whether you're here to read, reflect, or contribute, this is
            your space. Add your own real-life stories, connect with others, and
            explore the beauty of life through shared experiences. Let's create a
            tapestry of moments together.
          </p>
        </div>

        {/* Subscription Section */}
        <form
          className="flex justify-between max-w-[500px] mx-auto mb-6 lg:mb-10 border shadow-[0_0_15px_5px_rgba(255,255,255,1)] border-white rounded-full overflow-hidden"
          action=""
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="pl-4 h-12 flex-1 text-black outline-none"
          />
          <button
            type="submit"
            className="bg-blue-900 text-white px-6 sm:px-8 py-3 hover:bg-black transition-all "
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;