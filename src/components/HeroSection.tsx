"use client";

import React from "react";
import { site } from "@/content/site";
import { Button } from "./Button";
import { LoopVideo } from "./LoopVideo";
import { FaLinkedin } from "react-icons/fa";

export function HeroSection() {
  const handleScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("projects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-[100svh] overflow-hidden flex flex-col justify-center bg-white">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <LoopVideo src="/media/hero.mp4" className="w-full h-full object-cover object-top block" />
      </div>

      {/* Top Right LinkedIn */}
      <div className="absolute top-[32px] right-[32px] flex items-center z-20">
        <a
          href={site.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-black hover:opacity-80 transition-opacity"
        >
          <FaLinkedin className="w-[16px] h-[16px]" />
          <span className="text-[16px] font-medium">LinkedIn</span>
        </a>
      </div>

      <div className="absolute bottom-[260px] right-[32px] flex flex-col gap-[12px] items-end z-20">
        {[
          { name: "App1", src: "/assets/logos/images (1).png", fallback: "1" },
          { name: "App2", src: "/assets/logos/images (34).jpg", fallback: "2" },
          { name: "App3", src: "/assets/logos/images (36).jpg", fallback: "3" },
          { name: "App4", src: "/assets/logos/images (37).jpg", fallback: "4" },
          { name: "App5", src: "/assets/logos/images.png", fallback: "5" },
        ].map((tool) => (
          <div
            key={tool.name}
            title={tool.name}
            aria-label={tool.name}
            className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center overflow-hidden"
          >
            <img src={tool.src} alt={tool.name} className="w-full h-full object-cover" onError={(e) => {
               (e.target as HTMLImageElement).style.display = 'none';
               const nextSibling = (e.target as HTMLImageElement).nextElementSibling as HTMLElement;
               if(nextSibling) nextSibling.style.display = 'block';
            }} />
            <span className="text-black font-bold text-xs hidden">{tool.fallback}</span>
          </div>
        ))}
      </div>

      {/* Main Container for Text */}
      <div className="relative z-10 w-full h-full max-w-[1280px] mx-auto flex flex-col pointer-events-none">
        
        {/* Center Text Block */}
        <div className="flex-1 flex flex-col justify-center px-[32px] lg:px-[64px] pointer-events-auto">
          <div className="max-w-[560px]">
            <h1 className="text-white text-[32px] md:text-[48px] lg:text-[64px] font-bold leading-tight mb-4 md:mb-5">
              Hey, I am {site.name}
            </h1>
            <p className="text-white text-[16px] md:text-[20px] font-normal leading-[1.5] mb-4">
              I turn ambiguity into clarity. I am a UI/UX designer and end-to-end product builder, obsessively curious about people&apos;s behavior and the <i className="italic">why behind it all</i>.
            </p>
            <p className="text-white text-[16px] md:text-[20px] font-normal leading-[1.5] mb-8">
              I am currently in my final year of my master&apos;s degree in UI/UX design.
            </p>
            <Button href="#projects" onClick={handleScroll}>
              See projects
            </Button>
          </div>
        </div>
      </div>

      {/* Fade Transition (Inside Hero at the bottom) */}
      <div className="absolute bottom-0 left-0 w-full h-[260px] z-30 pointer-events-none">
        {/* Gradient to soften into black on the bottom edge */}
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-b from-transparent to-black"></div>
      </div>
    </section>
  );
}
