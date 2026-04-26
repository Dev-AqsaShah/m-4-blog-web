"use client";

import React, { useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowRightLong } from "react-icons/fa6";
import axios from "axios";
import { toast } from "react-toastify";
import Link from "next/link";

interface SlideData {
  id: number;
  img: string;
}

const Header: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: false,
    arrows: false,
  };

  const slideData: SlideData[] = [
    { id: 0, img: "/assets/h1.jpeg" },
    { id: 1, img: "/assets/h2.jpeg" },
    { id: 2, img: "/assets/h3.jpeg" },
    { id: 3, img: "/assets/h5.jpeg" },
  ];

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter a valid email.");
      return;
    }
    setSubmitting(true);
    try {
      const response = await axios.post("/api/email", { email });
      if (response.data.success) {
        toast.success(response.data.message);
        setEmail("");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Error submitting. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Background Image Slider */}
      <div className="absolute inset-0 z-0">
        <Slider {...settings}>
          {slideData.map((item) => (
            <div key={item.id} className="relative w-full h-screen">
              <Image
                src={item.img}
                alt={`Slide ${item.id + 1}`}
                fill
                className="object-cover"
                priority={item.id === 0}
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

      {/* Navbar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center px-6 md:px-12 lg:px-20 py-5">
        <Link href="/">
          <Image
            src="/assets/logo.png"
            alt="Life Unfolded"
            width={120}
            height={60}
            className="w-[90px] sm:w-[110px] opacity-95 hover:opacity-100 transition-opacity"
          />
        </Link>
        <Link href="/admin">
          <button className="flex items-center gap-2 text-sm font-medium py-2 px-5 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 hover:border-white/50 transition-all">
            Admin
            <FaArrowRightLong size={12} />
          </button>
        </Link>
      </div>

      {/* Hero Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-white text-center px-4 sm:px-8 pb-20">
        <div className="fade-in-up">
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-xs sm:text-sm text-white/80 mb-5 tracking-widest uppercase">
            Stories · Life · Moments
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold mb-4 leading-tight tracking-tight">
            Life{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Unfolded
            </span>
          </h1>
          <p className="text-base sm:text-lg text-white/70 max-w-xl mx-auto mb-10 leading-relaxed">
            A heartfelt space where stories meet reality — animals, plants, arts,
            technology, travel, and everything in between.
          </p>
        </div>

        {/* Subscription Form */}
        <div className="fade-in-up w-full max-w-md">
          <form
            onSubmit={onSubmitHandler}
            className="flex gap-0 border border-white/20 rounded-full overflow-hidden bg-white/10 backdrop-blur-md"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email for updates"
              className="pl-5 h-12 flex-1 bg-transparent text-white placeholder-white/40 outline-none text-sm"
              required
            />
            <button
              type="submit"
              disabled={submitting}
              className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-700 text-white px-6 py-3 transition-all font-medium text-sm whitespace-nowrap"
            >
              {submitting ? "..." : "Subscribe"}
            </button>
          </form>
          <p className="text-white/30 text-xs mt-2">No spam, unsubscribe anytime.</p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30">
          <div className="w-0.5 h-8 bg-gradient-to-b from-white/50 to-transparent animate-pulse" />
          <span className="text-xs tracking-widest uppercase">Scroll</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
