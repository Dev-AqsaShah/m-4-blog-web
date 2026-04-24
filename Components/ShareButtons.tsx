"use client";

import { useState } from "react";
import { FaTwitter, FaWhatsapp } from "react-icons/fa";
import { FiLink, FiCheck } from "react-icons/fi";

interface ShareButtonsProps {
  url: string;
  title: string;
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for unsupported browsers
    }
  };

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`;

  return (
    <div className="flex items-center gap-2">
      <span className="text-white/40 text-xs mr-1">Share:</span>
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:bg-sky-500/20 hover:border-sky-500/30 hover:text-sky-300 transition-all text-xs"
      >
        <FaTwitter size={12} /> Twitter
      </a>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:bg-green-500/20 hover:border-green-500/30 hover:text-green-300 transition-all text-xs"
      >
        <FaWhatsapp size={12} /> WhatsApp
      </a>
      <button
        onClick={copyLink}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white transition-all text-xs"
      >
        {copied ? <FiCheck size={12} className="text-green-400" /> : <FiLink size={12} />}
        {copied ? "Copied!" : "Copy Link"}
      </button>
    </div>
  );
}
