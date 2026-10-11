"use client";

import React, { useEffect, useRef } from "react";
import { caseStudies, miniCaseStudies } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);

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

  const rectStyle = {
    width: "min(calc((100% - 24px) / 2), calc(18vh * 16 / 9))",
    aspectRatio: "16 / 9",
  };

  return (
    <section ref={sectionRef} id="projects" className="w-full h-[100svh] bg-black text-white flex flex-col pt-8 pb-[64px] relative z-0">
      
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

        {/* Two-column Layout: Stack on mobile, side-by-side on desktop */}
        <div className="flex flex-col lg:flex-row gap-[24px] lg:gap-[48px] flex-1 min-h-0 overflow-y-auto lg:overflow-hidden no-scrollbar">
          
          {/* Left Column (60% width) */}
          <div className="w-full lg:w-[60%] flex flex-col lg:h-full lg:overflow-y-auto no-scrollbar shrink-0">
            
            {/* Section Heading (Top aligned) */}
            <div className="mb-[48px] shrink-0 reveal-item">
              <h2 className="text-[28px] md:text-[36px] lg:text-[48px] font-black leading-none text-[#4ADE80]">
                Projects
              </h2>
            </div>

            {/* Case Studies Section */}
            <div className="shrink-0">
              <h3 className="text-[20px] font-semibold mb-[12px] shrink-0 leading-none reveal-item" id="case-study-label">Case Studies</h3>
              <div className="flex flex-col gap-[24px]">
                {/* Row 1: TWO rectangles side by side */}
                <div className="flex gap-[24px]">
                  {caseStudies.slice(0, 2).map((project, idx) => (
                    <div key={`cs-${idx}`} className="reveal-item shrink-0" style={rectStyle}>
                      <ProjectCard {...project} />
                    </div>
                  ))}
                </div>
                {/* Row 2: ONE rectangle, left-aligned, the SAME size as above */}
                {caseStudies[2] && (
                  <div className="flex">
                    <div className="reveal-item shrink-0" style={rectStyle}>
                      <ProjectCard {...caseStudies[2]} />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mini Case Studies Section */}
            <div className="mt-[40px] shrink-0 mb-8 lg:mb-0">
              <h3 className="text-[20px] font-semibold leading-none reveal-item">Mini Case Studies</h3>
              <p className="text-[12px] font-normal text-white/55 mt-1 mb-[12px] shrink-0 reveal-item">
                Projects done within 1 week.
              </p>
              {/* Row: TWO rectangles side by side */}
              <div className="flex gap-[24px]">
                {miniCaseStudies.slice(0, 2).map((project, idx) => (
                  <div key={`mini-${idx}`} className="reveal-item shrink-0" style={rectStyle}>
                    <ProjectCard {...project} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Fills exactly remaining width without overflowing parent container */}
          <div className="w-full flex-1 min-w-0 flex flex-col lg:h-full pt-8 lg:pt-0 reveal-item">
            <div className="project-video-frame h-[400px] lg:h-full bg-[#111]">
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
