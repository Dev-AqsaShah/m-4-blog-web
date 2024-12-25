import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "/public/assets/logo.png";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center bg-gradient-to-t from-blue-900 to-black  py-5 px-5 sm:px-10">
      {/* Logo */}
      <div className="mb-4 sm:mb-0">
        <Image src={logo} alt="Logo" width={120} height={60} />
      </div>

      {/* Copyright Text */}
      <p className="text-sm text-white text-center mb-4 sm:mb-0">
        All rights reserved. Copyright @whispersofreality
      </p>

      {/* Social Icons */}
      <div className="flex gap-4">
        <Link
          href="https://github.com/Dev-AqsaShah"
          passHref
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="text-white text-xl hover:text-gray-400 transition"
        >
          <FaGithub />
        </Link>
        <Link
          href="https://linkedin.com/in/aqsa-shah-"
          passHref
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-white text-xl hover:text-gray-400 transition"
        >
          <FaLinkedin />
        </Link>
        <Link
          href="https://www.instagram.com/developer_aqsashah?igsh=MTJ4dW9vZ211Zm5sMA=="
          passHref
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="text-white text-xl hover:text-gray-400 transition"
        >
          <FaInstagram />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
