import Sidebar from "@/Components/adminComponents/Sidebar";
import { ReactNode } from "react";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/Components/Footer";
import Link from "next/link";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      {/* Back to Home Button (top-left corner) */}
      <div className="absolute left-60 top-7 z-50">
        <Link href="/">
          <button className="px-5 py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-300 bg-white hover:bg-black hover:text-white text-black border-2 border-black shadow-[0_0_10px_2px_white] hover:scale-105">
            Back to Home
          </button>
        </Link>
      </div>

      {/* Toast Notifications */}
      <ToastContainer theme="dark" />

      {/* Main Layout with Sidebar */}
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="flex flex-col w-full">
          {/* Page Content */}
          {children}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
