"use client";

import Image from "next/image";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Page: React.FC = () => {
  const router = useRouter();
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Technology",
    author: "Aqsa Shah",
    authorImg: "/author.jpeg",
  });

  const onChangeHandler = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("authorImage", data.authorImg);

    if (image) {
      formData.append("image", image);
    } else {
      toast.error("Please select an image!");
      return;
    }

    try {
      const response = await axios.post("/api/blog", formData);
      if (response.data.success) {
        toast.success("Blog successfully added!");
        setImage(null);
        setPreviewImage(null);
        setData({
          title: "",
          description: "",
          category: "Technology",
          author: "Aqsa Shah",
          authorImg: "/author.jpeg",
        });
        router.push("/admin/blogList");
      } else {
        toast.error(response.data.error || "Error submitting the form");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error("An error occurred while submitting");
    }
  };

  return(

    <form
      className=" lg:pt-28 h-full pt-28 px-5 sm:pt-12 sm:pl-16 bg-gradient-to-b from-blue-800 to-black min-h-screen text-gray-300 font-semibold"
      onSubmit={onSubmitHandler}
    >

      <p className="text-xl">UPLOAD THUMBNAIL</p>
      <label htmlFor="image">
        <Image
          className="mt-4 border-2 border-black rounded-lg text-gray-500 shadow-[0_0_15px_5px_rgba(255,255,255,1)]"
          src={previewImage || "/assets/upload_area.png"}
          width={140}
          height={140}
          alt="Upload Thumbnail"
        />
      </label>
      <input onChange={onFileChange} type="file" id="image" hidden required />

      <p className="text-xl mt-4">BLOG TITLE</p>
      <input
        name="title"
        onChange={onChangeHandler}
        value={data.title}
        className="w-full sm:w-[500px] mt-4 px-4 py-3 border-2 border-black rounded-lg text-gray-500 shadow-[0_0_15px_5px_rgba(255,255,255,1)]"
        type="text"
        placeholder="Type here"
        required
      />

      <p className="text-xl mt-4">BLOG DESCRIPTION</p>
      <textarea
        name="description"
        onChange={onChangeHandler}
        value={data.description}
        className="w-full sm:w-[500px] mt-4 px-4 py-3 border-2 border-black rounded-lg text-gray-500 shadow-[0_0_15px_5px_rgba(255,255,255,1)]"
        placeholder="Write content here"
        rows={6}
        required
      />

      <p className="text-xl mt-4">BLOG CATEGORY</p>
      <select
        name="category"
        onChange={onChangeHandler}
        value={data.category}
        className="w-40 mt-4 px-4 py-3 border-2 border-black rounded-lg text-gray-500 shadow-[0_0_15px_5px_rgba(255,255,255,1)]"
      >
        <option value="Animals">Animals</option>
        <option value="Plants">Plants</option>
        <option value="Arts">Arts</option>
        <option value="Traveling">Traveling</option>
        <option value="Technology">Technology</option>
        <option value="Lifestyle">Lifestyle</option>
      </select>

      <br />
      <button
        type="submit"
        className="mt-8 mb-4 w-40 h-12 bg-blue-900 text-white rounded-full border-2 border-black shadow-[0_0_15px_5px_rgba(255,255,255,1)]"
      >
        ADD
      </button>
    </form>
  );
};

export default Page;
