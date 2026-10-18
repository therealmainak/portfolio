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

  const toolLogos = [
    { name: "App1", src: "/assets/logos/images (1).png", fallback: "1" },
    { name: "App2", src: "/assets/logos/images (34).jpg", fallback: "2" },
    { name: "App3", src: "/assets/logos/images (36).jpg", fallback: "3" },
    { name: "App4", src: "/assets/logos/images (37).jpg", fallback: "4" },
    { name: "App5", src: "/assets/logos/images.png", fallback: "5" },
  ];

  return (
    <section className="relative w-full h-[65vh] h-[65svh] md:h-[100svh] overflow-hidden flex flex-col justify-start md:justify-center bg-[#6FA8DC] md:bg-white">
      <style>{`
        @media (max-width: 767px) {
          .hero-video {
            position: absolute !important;
            right: -36% !important;
            bottom: -12% !important;
            width: 170% !important;
            height: auto !important;
            max-width: none !important;
            -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 15%) !important;
            mask-image: linear-gradient(to bottom, transparent 0%, black 15%) !important;
          }
        }
        @media (min-width: 768px) {
          .hero-video {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
            object-position: 62% top !important;
          }
        }
      `}</style>

      {/* Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <LoopVideo 
          src="/media/hero.mp4" 
          className="hero-video block" 
        />
      </div>

      {/* Top Right LinkedIn */}
      <div className="absolute top-[16px] right-[16px] md:top-[32px] md:right-[32px] flex items-center z-20">
        <a
          href={site.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-black hover:opacity-80 transition-opacity min-h-[44px] min-w-[44px] justify-end"
        >
          <FaLinkedin className="w-[16px] h-[16px]" />
          <span className="text-[16px] font-medium">LinkedIn</span>
        </a>
      </div>

      {/* Desktop Tool Logos: column on the right */}
      <div className="hidden md:flex absolute bottom-[260px] right-[32px] flex-col gap-[12px] items-end z-20">
        {toolLogos.map((tool) => (
          <div
            key={tool.name}
            title={tool.name}
            aria-label={tool.name}
            className="w-[40px] h-[40px] bg-white rounded-full flex items-center justify-center overflow-hidden shadow-sm"
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
        
        {/* Text Block: On mobile starts ~68px from top, 20px from left, max-w ~60% */}
        <div className="flex-1 flex flex-col justify-start pt-[68px] md:pt-0 md:justify-center pl-[20px] pr-0 md:px-[32px] lg:px-[64px] pointer-events-auto">
          <div className="w-[60vw] max-w-[240px] md:w-auto md:max-w-[560px]">
            <h1 className="text-white text-[30px] md:text-[64px] font-bold leading-[1.15] md:leading-tight mb-[12px] md:mb-5">
              Hey, I am {site.name}
            </h1>
            <p className="text-white text-[14px] md:text-[20px] font-normal leading-[1.5] mb-[12px] md:mb-4">
              I turn ambiguity into clarity. I am a UI/UX designer and end-to-end product builder, obsessively curious about people&apos;s behavior and the <i className="italic">why behind it all</i>.
            </p>
            <p className="text-white text-[14px] md:text-[20px] font-normal leading-[1.5] mb-[16px] md:mb-8">
              I am currently in my final year of my master&apos;s degree in UI/UX design.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-0 sm:gap-4">
              <Button href="#projects" onClick={handleScroll} className="min-h-[40px] md:min-h-[44px] py-[10px] md:py-[14px] px-[24px] md:px-[28px]">
                See projects
              </Button>
              
              {/* Mobile Tool Logos: small horizontal row (28px each) 12px under button */}
              <div className="flex md:hidden items-center gap-2 mt-[12px] sm:mt-0">
                {toolLogos.map((tool) => (
                  <div
                    key={`mobile-tool-${tool.name}`}
                    className="w-[28px] h-[28px] bg-white rounded-full flex items-center justify-center overflow-hidden shadow-sm shrink-0"
                  >
                    <img src={tool.src} alt={tool.name} className="w-full h-full object-cover" onError={(e) => {
                       (e.target as HTMLImageElement).style.display = 'none';
                       const nextSibling = (e.target as HTMLImageElement).nextElementSibling as HTMLElement;
                       if(nextSibling) nextSibling.style.display = 'block';
                    }} />
                    <span className="text-black font-bold text-[10px] hidden">{tool.fallback}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Fade Transition (Inside Hero at the bottom) */}
      <div className="absolute bottom-0 left-0 w-full h-[28px] md:h-[260px] z-30 pointer-events-none">
        {/* Gradient to soften into black on the bottom edge */}
        <div className="absolute bottom-0 left-0 w-full h-full md:h-1/3 bg-gradient-to-b from-transparent to-black"></div>
      </div>
    </section>
  );
}
