import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, allProjects } from "@/content/projects";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allProjects.map((project) => ({
    slug: project.id,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Case Study Not Found" };
  return {
    title: `${project.title} — Mainak`,
  };
}

export default async function CaseStudyViewerPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const topBarHeight = "52px";

  return (
    <div className="w-full h-screen bg-black text-white flex flex-col overflow-hidden select-none">
      {/* Slim Top Bar */}
      <header
        className="w-full flex items-center justify-between px-4 sm:px-6 bg-black border-b border-white/10 shrink-0 z-20"
        style={{ height: topBarHeight }}
      >
        {/* Left: Back to portfolio */}
        <div className="flex-1 flex justify-start">
          <Link
            href="/"
            className="text-white/80 hover:text-white text-xs sm:text-sm font-medium transition-colors flex items-center gap-1 group"
          >
            <span className="transition-transform group-hover:-translate-x-0.5">←</span>
            <span>Back to portfolio</span>
          </Link>
        </div>

        {/* Center: Project title */}
        <div className="flex-1 text-center px-2">
          <h1 className="text-xs sm:text-sm md:text-base font-semibold text-white truncate">
            {project.title}
          </h1>
        </div>

        {/* Right: Open PDF raw link */}
        <div className="flex-1 flex justify-end">
          <a
            href={project.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/80 hover:text-white text-xs sm:text-sm font-medium transition-colors flex items-center gap-1 group"
          >
            <span>Open PDF</span>
            <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
          </a>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full flex-1 relative bg-black flex flex-col">
        {/* Desktop / Tablet >= 768px: iframe using browser's native PDF viewer */}
        <div className="hidden md:block w-full h-full">
          <iframe
            src={project.pdf}
            className="w-full h-full border-0 block bg-black"
            title={project.title}
            style={{ height: `calc(100vh - ${topBarHeight})` }}
          />
        </div>

        {/* Below 768px width: Big "Open case study (PDF)" button */}
        <div className="flex md:hidden flex-1 flex-col items-center justify-center p-6 text-center bg-black">
          <div className="max-w-sm flex flex-col items-center gap-6">
            <h2 className="text-xl font-bold text-white">{project.title}</h2>
            <p className="text-sm text-white/60">
              For the best mobile reading experience, open the full PDF directly in your browser.
            </p>
            <a
              href={project.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-white text-black font-semibold px-8 py-4 rounded-full text-base hover:opacity-90 transition-opacity shadow-lg"
            >
              Open case study (PDF) ↗
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
