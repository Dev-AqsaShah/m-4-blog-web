
"use client";

import Image from "next/image";

export default function Page() {
  return (
    <div className="bg-gradient-to-b from-blue-800 to-black min-h-screen flex items-center justify-center px-4 sm:px-6 py-10">
      <div className="flex flex-col-reverse lg:flex-row items-center lg:items-center justify-center gap-10 max-w-6xl w-full">
        
        {/* Left Side - Text */}
        <div className="flex flex-col items-center lg:items-center lg:pt-10 text-center lg:text-left max-w-lg">
          <div className="px-6 py-3  rounded-full text-base sm:text-lg md:text-xl font-bold bg-white hover:bg-black hover:text-white text-black border-2 border-black shadow-[0_0_10px_4px_white] transition-all duration-300 ">
            Meet Aqsa Shah
          </div>
          <p className="mt-6 text-white text-sm sm:text-base md:text-lg leading-relaxed">
            Hello, Im Aqsa a passionate tech enthusiast currently pursuing my BS in Computer Science from the University of Sindh. Alongside my degree, Ive completed a Web Development course under the Governor Sindh IT Initiative in Karachi, and Im also a certified Agentic AI SDK Expert from PIAIC.
            <br /><br />
            Feel free to connect with me on{" "}
            <span className="underline underline-offset-2">LinkedIn</span> and explore my work on{" "}
            <span className="underline underline-offset-2">GitHub</span> — links are provided below.
            <br /><br />
            If you have a real story or life experience to share, post your blog here and inspire others!
            <br /><br />
            Thank you for visiting.
          </p>
        </div>

        {/* Right Side - Image */}
        <div className="border-2 border-white shadow-[0_0_60px_rgba(255,255,255,0.9)] rounded-full overflow-hidden w-[180px] h-[200px] sm:w-[220px] sm:h-[240px] md:w-[260px] md:h-[300px] lg:w-[280px] lg:h-[320px] relative hover:animate-pulse ">
          <Image
            src="/assets/aqsa.jpg"
            alt="Aqsa"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 80vw, 280px"
          />
        </div>

      </div>
    </div>
  );
}

