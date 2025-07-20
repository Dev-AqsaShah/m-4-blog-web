"use client"

import Header from "@/Components/Header"
import BlogList from "@/Components/BlogList"
import Footer from "@/Components/Footer"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import BlogItem from "@/Components/BlogItem"

export default function Home() {
  return (
    <>
    <ToastContainer theme="dark"/>
    <Header />
    <BlogItem id={""} image={""} title={""} description={""} category={""} author={""}/>
    <BlogList />
    <Footer />
    </>
  )
}