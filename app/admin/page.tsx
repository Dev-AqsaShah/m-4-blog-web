"use client";

import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 to-black flex items-center justify-center px-4 sm:px-6 py-16">
      <div className="flex flex-col lg:flex-row items-center gap-12 max-w-5xl w-full">

        {/* Profile Image */}
        <div className="shrink-0">
          <div className="relative w-48 h-52 sm:w-56 sm:h-60 rounded-3xl overflow-hidden border border-white/20 shadow-[0_0_50px_rgba(59,130,246,0.25)]">
            <Image
              src="/assets/aqsa.jpg"
              alt="Aqsa Shah"
              fill
              className="object-cover"
              sizes="224px"
            />
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-lg">
          <span className="inline-block px-4 py-1.5 rounded-full border border-blue-400/30 bg-blue-600/10 text-blue-300 text-xs font-medium mb-4 tracking-widest uppercase">
            Admin Dashboard
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
            Aqsa Shah
          </h1>
          <p className="text-white/50 text-sm mb-5">Full-Stack Developer · AI Engineer · Blogger</p>

          <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-6">
            Hello! I&apos;m Aqsa — a passionate tech enthusiast pursuing my BS in Computer Science
            from the University of Sindh. I&apos;ve completed Web Development under the Governor Sindh
            IT Initiative and hold a certified Agentic AI SDK Expert certification from PIAIC.
            <br /><br />
            Welcome to your admin panel. Manage your blogs, view subscriptions, and share
            your stories with the world.
          </p>

          {/* Social Links */}
          <div className="flex gap-3 mb-6">
            <Link
              href="https://github.com/Dev-AqsaShah"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all text-sm"
            >
              <FaGithub size={15} /> GitHub
            </Link>
            <Link
              href="https://linkedin.com/in/aqsa-shah-"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-300 hover:bg-blue-600/20 transition-all text-sm"
            >
              <FaLinkedin size={15} /> LinkedIn
            </Link>
          </div>

          {/* Quick Action */}
          <Link
            href="/admin/addProduct"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] text-sm"
          >
            + Publish New Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
