"use client";

import Sidebar from "@/Components/adminComponents/Sidebar";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/Components/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FiLogOut } from "react-icons/fi";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await axios.post("/api/admin/logout");
    router.push("/");
    router.refresh();
  };

  return (
    <>
      {/* Top bar */}
      <div className="fixed left-0 right-0 top-0 z-50 h-14 bg-black/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4">
        <Link href="/">
          <button className="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 bg-white/10 hover:bg-white/20 text-white border border-white/20">
            ← Back to Home
          </button>
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium text-red-400 border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 transition-all"
        >
          <FiLogOut />
          Logout
        </button>
      </div>

      <ToastContainer theme="dark" />

      <div className="flex min-h-screen pt-14">
        <Sidebar />
        <div className="flex flex-col w-full">{children}</div>
      </div>

      <Footer />
    </>
  );
}
