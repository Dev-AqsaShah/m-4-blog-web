import Sidebar from "@/Components/adminComponents/Sidebar";
import { ReactNode } from "react";
import { FaUserCircle } from "react-icons/fa";
import { ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <>
  <div className="flex">

    <div className="flex"/>
    <ToastContainer theme="dark"/>
    <Sidebar />
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between w-full py-3 max-h-[60px] px-12 border border-white ">
      <h3 className="font-medium">ADMIN PANEL</h3>
      <FaUserCircle />
      </div>
      {children}

    </div>
  </div>
  </>;
}
