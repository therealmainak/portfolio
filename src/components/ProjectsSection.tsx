"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { caseStudies, miniCaseStudies, allProjects } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMini, setIsMini] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll(".reveal-item");
            items.forEach((item, index) => {
              const el = item as HTMLElement;
              const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
              if (!prefersReducedMotion) {
                setTimeout(() => {
                  el.style.opacity = "1";
                  el.style.transform = "translateY(0)";
                }, index * 80);
              } else {
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
              }
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handleCarouselScroll = () => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const cards = container.querySelectorAll<HTMLElement>("[data-card-index]");
    if (cards.length === 0) return;

    const containerLeft = container.getBoundingClientRect().left;
    let closestIdx = 0;
    let minDiff = Infinity;

    cards.forEach((card) => {
      const idx = parseInt(card.getAttribute("data-card-index") || "0", 10);
      const cardRect = card.getBoundingClientRect();
      const diff = Math.abs(cardRect.left - containerLeft);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });

    setActiveIndex(closestIdx);
    // 0 to 3 are Case Studies (Chronicle, INCH, Mano, Blinkit)
    // 4 and 5 are Mini Case Studies (YouTube, Instagram)
    setIsMini(closestIdx >= 4);
  };

  const rectStyle = {
    width: "min(calc((100% - 24px) / 2), calc(16.5vh * 16 / 9))",
    aspectRatio: "16 / 9",
  };

  return (
    <section 
      ref={sectionRef} 
      id="projects" 
      className="w-full lg:h-[100svh] md:min-h-screen bg-black text-white flex flex-col pt-8 pb-[24px] md:py-10 lg:pt-8 lg:pb-[64px] relative z-0 overflow-x-clip"
    >
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .reveal-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease-out, transform 0.5s ease-out;
          }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes fadeSlide {
          0% { opacity: 0; transform: translateY(4px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-slide {
          animation: fadeSlide 0.25s ease-out forwards;
        }
        .project-video-frame {
          position: relative;
          width: 100%;
          max-width: 100%;
          height: 100%;
          border-radius: 16px;
          overflow: hidden;
          clip-path: inset(0 round 16px);
          isolation: isolate;
          transform: translateZ(0);
          margin: 0;
          box-sizing: border-box;
        }
        .project-video {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 85%;
          border-radius: 16px;
          transform: none;
          margin: 0;
        }
      `}</style>

      <div className="w-full max-w-[1280px] h-full mx-auto px-[20px] md:px-[32px] lg:px-[64px] flex flex-col min-h-0">

        {/* ============================================================== */}
        {/* MOBILE VIEW (below 1024px): Responsive Header + Carousel       */}
        {/* ============================================================== */}
        <div className="flex lg:hidden flex-col w-full">
          {/* Header Row: "Projects" on the left, Meadow video thumbnail on the right */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[32px] sm:text-[36px] font-black leading-none text-[#4ADE80]">
              Projects
            </h2>
            <div className="w-[96px] aspect-[16/9] rounded-[8px] overflow-hidden bg-[#111] shrink-0 border border-white/10">
              <video
                src="/media/grass.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
                style={{ objectPosition: "center 85%" }}
              />
            </div>
          </div>

          {/* Dynamic Label: Case Studies vs Mini Case Studies */}
          <div className="relative h-[48px] mb-3 flex flex-col justify-center">
            <div key={isMini ? "mini-label" : "case-label"} className="animate-fade-slide">
              <h3 className="text-[20px] font-semibold leading-none text-white">
                {isMini ? "Mini Case Studies" : "Case Studies"}
              </h3>
              {isMini && (
                <p className="text-[12px] text-white/55 mt-1.5 leading-none">
                  Projects done within 1 week.
                </p>
              )}
            </div>
          </div>

          {/* Horizontal Carousel (All 6 cards in exact order) */}
          <div
            ref={carouselRef}
            onScroll={handleCarouselScroll}
            className="flex gap-[12px] overflow-x-auto no-scrollbar -mr-[20px] pr-[20px] snap-x snap-mandatory pb-2"
            style={{
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {allProjects.map((project, idx) => (
              <div
                key={`mobile-card-${project.id}`}
                data-card-index={idx}
                className="w-[65vw] max-w-[320px] shrink-0 snap-start flex flex-col"
              >
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full aspect-[16/9] bg-black relative overflow-hidden rounded-none active:opacity-90"
                >
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-contain"
                    sizes="65vw"
                  />
                </a>
                <div className="mt-3 text-left">
                  <h4 className="text-white text-[15px] font-semibold leading-snug">
                    {project.title}
                  </h4>
                  <p className="text-[#A3A3A3] text-[13px] leading-[1.5] mt-1 line-clamp-3">
                    {project.brief}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Position indicator dots: 6 dots with a gap between 4th and 5th */}
          <div className="flex items-center justify-center gap-1.5 mt-5">
            {allProjects.map((_, i) => (
              <React.Fragment key={`dot-${i}`}>
                {i === 4 && <div className="w-2.5" />}
                <div
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeIndex === i ? "w-4 bg-white" : "w-1.5 bg-white/30"
                  }`}
                />
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ============================================================== */}
        {/* DESKTOP VIEW (above 1024px): 2-Column Layout, 2x2 Case Studies  */}
        {/* ============================================================== */}
        <div className="hidden lg:flex gap-[24px] lg:gap-[48px] flex-1 min-h-0 overflow-hidden no-scrollbar">
          
          {/* Left Column (60% width) */}
          <div className="w-full lg:w-[60%] flex flex-col lg:h-full lg:overflow-y-auto no-scrollbar shrink-0">
            
            {/* Section Heading (Top aligned) */}
            <div className="mb-[32px] xl:mb-[48px] shrink-0 reveal-item">
              <h2 className="text-[28px] md:text-[36px] lg:text-[48px] font-black leading-none text-[#4ADE80]">
                Projects
              </h2>
            </div>

            {/* Case Studies Section: 2x2 Grid */}
            <div className="shrink-0">
              <h3 className="text-[20px] font-semibold mb-[12px] shrink-0 leading-none reveal-item" id="case-study-label">
                Case Studies
              </h3>
              <div className="flex flex-col gap-[20px] xl:gap-[24px]">
                {/* Row 1: Chronicle (case-1), INCH (case-2) */}
                <div className="flex gap-[20px] xl:gap-[24px]">
                  {caseStudies.slice(0, 2).map((project, idx) => (
                    <div key={`cs-${idx}`} className="reveal-item shrink-0" style={rectStyle}>
                      <ProjectCard {...project} />
                    </div>
                  ))}
                </div>
                {/* Row 2: Mano (case-3), Blinkit (case-4) */}
                <div className="flex gap-[20px] xl:gap-[24px]">
                  {caseStudies.slice(2, 4).map((project, idx) => (
                    <div key={`cs-${idx + 2}`} className="reveal-item shrink-0" style={rectStyle}>
                      <ProjectCard {...project} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mini Case Studies Section: YouTube (mini-1), Instagram (mini-2) */}
            <div className="mt-[28px] xl:mt-[40px] shrink-0 mb-8 lg:mb-0">
              <h3 className="text-[20px] font-semibold leading-none reveal-item">Mini Case Studies</h3>
              <p className="text-[12px] font-normal text-white/55 mt-1 mb-[12px] shrink-0 reveal-item">
                Projects done within 1 week.
              </p>
              <div className="flex gap-[20px] xl:gap-[24px]">
                {miniCaseStudies.slice(0, 2).map((project, idx) => (
                  <div key={`mini-${idx}`} className="reveal-item shrink-0" style={rectStyle}>
                    <ProjectCard {...project} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Meadow video frame (top aligned with Projects, full column height) */}
          <div className="w-full flex-1 min-w-0 flex flex-col lg:h-full reveal-item">
            <div className="project-video-frame h-full bg-[#111]">
              <video 
                className="project-video"
                src="/media/grass.mp4" 
                autoPlay 
                muted 
                loop 
                playsInline 
                preload="auto" 
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
