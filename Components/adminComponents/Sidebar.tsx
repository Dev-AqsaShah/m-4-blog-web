import Image from "next/image";
import React from "react";
import { FaPenToSquare } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import Link from "next/link";

const Sidebar: React.FC = () => {
  return (
    <div className="flex flex-col bg-black/40 backdrop-blur-md border-r border-white/10 min-h-full w-16 sm:w-56 flex-shrink-0">
      {/* Logo Section */}
      <div className="px-3 sm:px-6 py-5 border-b border-white/10 flex justify-center sm:justify-start">
        <Image src="/assets/logo.png" width={100} height={50} alt="Logo" className="opacity-90" />
      </div>

      {/* Sidebar Items */}
      <div className="flex-1 py-6 space-y-3 px-2 sm:px-4">
        <Link
          href="/admin/addProduct"
          className="flex items-center gap-3 border border-white/10 rounded-xl px-3 py-3 text-white/70 hover:text-white hover:bg-blue-600/20 hover:border-blue-500/30 transition-all group"
        >
          <IoIosAddCircleOutline size={22} className="shrink-0" />
          <p className="hidden sm:block text-sm font-medium">Add Blog</p>
        </Link>

        <Link
          href="/admin/blogList"
          className="flex items-center gap-3 border border-white/10 rounded-xl px-3 py-3 text-white/70 hover:text-white hover:bg-blue-600/20 hover:border-blue-500/30 transition-all group"
        >
          <FaPenToSquare size={20} className="shrink-0" />
          <p className="hidden sm:block text-sm font-medium">Blog List</p>
        </Link>

        <Link
          href="/admin/subscriptions"
          className="flex items-center gap-3 border border-white/10 rounded-xl px-3 py-3 text-white/70 hover:text-white hover:bg-blue-600/20 hover:border-blue-500/30 transition-all group"
        >
          <MdOutlineMail size={22} className="shrink-0" />
          <p className="hidden sm:block text-sm font-medium">Subscriptions</p>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
