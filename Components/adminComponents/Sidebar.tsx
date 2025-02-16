import Image from "next/image";
import React from "react";
import { FaPenToSquare } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import Link from "next/link";

const Sidebar: React.FC = () => {
  return (
    <div className="flex flex-col bg-blue-900 h-screen">
      {/* Logo Section */}
      <div className="px-4 sm:px-14 py-4 border-b border-black">
        <Image src="./assets/logo.png" width={120} height={120} alt="Logo" />
      </div>

      {/* Sidebar Items */}
      <div className="flex-1 relative py-6 sm:py-12 border-b border-black text-white">
        <div className="space-y-6 sm:space-y-8 px-4 sm:px-8">
          {/* Add Blog */}
          <Link
            href="/admin/addProduct"
            className="flex items-center gap-3 border border-white rounded-full px-3 py-2 shadow-[0_0_15px_5px_rgba(255,255,255,1)] hover:bg-blue-800 transition-all"
          >
            <IoIosAddCircleOutline size={24} />
            <p className="hidden sm:block">Add Blog</p>
          </Link>

          {/* Blog List */}
          <Link
            href="/admin/blogList"
            className="flex items-center gap-3 border border-white rounded-full px-3 py-2 shadow-[0_0_15px_5px_rgba(255,255,255,1)] hover:bg-blue-800 transition-all"
          >
            <FaPenToSquare size={24} />
            <p className="hidden sm:block">Blog Lists</p>
          </Link>

          {/* Subscriptions */}
          <Link
            href="/admin/subscriptions"
            className="flex items-center gap-3 border border-white rounded-full px-3 py-2 shadow-[0_0_15px_5px_rgba(255,255,255,1)] hover:bg-blue-800 transition-all"
          >
            <MdOutlineMail size={24} />
            <p className="hidden sm:block">Subscriptions</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
