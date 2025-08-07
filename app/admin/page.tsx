"use client";

import Image from "next/image";
// import Link from "next/link";

export default function Page() {
  return (
    <div className="bg-gradient-to-b from-blue-800 to-black min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 relative pt-20 ">
      {/* Back to Home Button */}
      {/* <div className="absolute left-6 top-7">
        <Link href="/">
          <button
            className="px-5 py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-300 bg-white hover:bg-black hover:text-white text-black border-2 border-black shadow-[0_0_10px_2px_white] hover:scale-105"
          >
            Back to Home
          </button>
        </Link>
      </div> */}

      {/* Profile Image */}
      <div className="border-2 border-white shadow-[0_0_60px_rgba(255,255,255,0.9)] rounded-full overflow-hidden w-[180px] h-[200px] sm:w-[220px] sm:h-[240px] md:w-[260px] md:h-[300px] lg:w-[280px] lg:h-[320px] relative ">
        <Image
          src="/assets/aqsa.jpg"
          alt="Aqsa"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 80vw, 280px"
        />
      </div>

      {/* Welcome Button-like Text */}
      <div className="mt-6">
        <div className="px-6 py-3 rounded-full text-base sm:text-lg md:text-xl font-bold transition-all duration-300 bg-white hover:bg-black hover:text-white text-black border-2 border-black shadow-[0_0_10px_4px_white] text-center">
          Meet Aqsa Shah
        </div>
      </div>

      {/* About Me Description */}
      <p className="mt-6 text-white text-sm sm:text-base md:text-lg text-center max-w-lg sm:max-w-xl px-2 leading-relaxed">
        Hello, Im Aqsa — a passionate tech enthusiast currently pursuing my BS in Computer Science from the University of Sindh. Alongside my degree, I’ve completed a Web Development course under the Governor Sindh IT Initiative in Karachi, and Im also a certified Agentic AI SDK Expert from PIAIC.
        <br /><br />
        Feel free to connect with me on <span className="underline underline-offset-2">LinkedIn</span> and explore my work on <span className="underline underline-offset-2">GitHub</span> — links are provided below.
        <br /><br />
        If you have a real story or life experience to share, post your blog here and inspire others!
        <br /><br />
        Thank you for visiting 
      </p>
    </div>
  );
}
