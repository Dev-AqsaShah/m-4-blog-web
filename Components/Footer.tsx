import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          {/* Logo + tagline */}
          <div className="flex flex-col items-center sm:items-start gap-2">
            <Image src="/assets/logo.png" alt="Life Unfolded" width={110} height={55} className="opacity-80" />
            <p className="text-white/30 text-xs">Stories · Life · Moments</p>
          </div>

          {/* Copyright */}
          <p className="text-white/30 text-xs text-center">
            © {new Date().getFullYear()} whispersofreality. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/Dev-AqsaShah"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all"
            >
              <FaGithub size={15} />
            </Link>
            <Link
              href="https://linkedin.com/in/aqsa-shah-"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 hover:text-blue-400 hover:border-blue-400/30 hover:bg-blue-400/10 transition-all"
            >
              <FaLinkedin size={15} />
            </Link>
            <Link
              href="https://www.instagram.com/developer_aqsashah?igsh=MTJ4dW9vZ211Zm5sMA=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 hover:text-pink-400 hover:border-pink-400/30 hover:bg-pink-400/10 transition-all"
            >
              <FaInstagram size={15} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
