"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";

interface ProjectCardProps {
  thumbnail?: string;
  title?: string;
  brief?: string;
  pdf?: string;
  href?: string;
}

export function ProjectCard({ thumbnail, title, brief, href }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [tooltipPos, setTooltipPos] = useState<{
    top?: number;
    bottom?: number;
    left: number;
    arrowLeft: number;
    flippedAbove: boolean;
  } | null>(null);

  const cardRef = useRef<HTMLAnchorElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const updateTooltipPosition = () => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const tooltipWidth = 360;
    // Estimate or measure tooltip height
    const tooltipHeight = tooltipRef.current?.offsetHeight || 230;

    const spaceBelow = window.innerHeight - rect.bottom;
    const flippedAbove = spaceBelow < tooltipHeight + 24;

    // Ideal start X is ~60% of thumbnail's width
    const idealLeft = rect.left + rect.width * 0.6;
    let actualLeft = idealLeft;

    // Boundary check right
    const maxLeft = window.innerWidth - tooltipWidth - 16;
    if (actualLeft > maxLeft) {
      actualLeft = Math.max(16, maxLeft);
    }
    // Boundary check left
    if (actualLeft < 16) {
      actualLeft = 16;
    }

    // Arrow points at idealLeft
    let arrowLeft = idealLeft - actualLeft + 8;
    // Clamp arrow inside tooltip bounds
    arrowLeft = Math.max(16, Math.min(tooltipWidth - 28, arrowLeft));

    if (flippedAbove) {
      setTooltipPos({
        bottom: window.innerHeight - rect.top + 12,
        left: actualLeft,
        arrowLeft,
        flippedAbove: true,
      });
    } else {
      setTooltipPos({
        top: rect.bottom + 12,
        left: actualLeft,
        arrowLeft,
        flippedAbove: false,
      });
    }
  };

  const handleMouseEnter = () => {
    updateTooltipPosition();
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleFocus = () => {
    updateTooltipPosition();
    setIsHovered(true);
  };

  const handleBlur = () => {
    setIsHovered(false);
  };

  const isClickable = !!href;
  const Wrapper = isClickable ? "a" : "div";
  const wrapperProps = isClickable
    ? {
        href,
        target: "_blank",
        rel: "noopener noreferrer",
      }
    : {};

  return (
    <div className="w-full flex flex-col">
      <Wrapper
        ref={cardRef as any}
        {...wrapperProps}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`relative block w-full aspect-[16/9] rounded-none overflow-hidden group select-none ${
          isClickable ? "cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/40" : "cursor-default"
        }`}
        aria-label={title || "Case study"}
      >
        <div className="w-full h-full bg-black relative overflow-hidden rounded-none">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={title || "Case study cover"}
              fill
              className={`object-contain ${
                isClickable
                  ? "transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                  : ""
              }`}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center opacity-10">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
              </svg>
            </div>
          )}

          {/* Thumbnail hover bottom gradient overlay */}
          {title && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out flex items-end p-3 sm:p-4 pointer-events-none rounded-none">
              <span className="text-white text-xs sm:text-sm font-semibold leading-snug drop-shadow-sm">
                {title}
              </span>
            </div>
          )}
        </div>
      </Wrapper>

      {/* Mobile/Tablet brief block directly below thumbnail (< 1024px) */}
      {brief && (
        <div className="lg:hidden mt-2 text-left">
          <p className="text-white text-xs sm:text-sm font-semibold">{title}</p>
          <p className="text-[#D4D4D4] text-xs leading-[1.6] mt-1">{brief}</p>
        </div>
      )}

      {/* Desktop Frosted Glass Hover Tooltip Popup (Portal to body for unrestricted z-index & no clipping) */}
      {mounted &&
        brief &&
        createPortal(
          <div
            ref={tooltipRef}
            className="hidden lg:block fixed pointer-events-none transition-all duration-200 ease-out z-[9999]"
            style={{
              width: "360px",
              maxWidth: "calc(100vw - 32px)",
              top: tooltipPos?.top !== undefined ? `${tooltipPos.top}px` : "auto",
              bottom: tooltipPos?.bottom !== undefined ? `${tooltipPos.bottom}px` : "auto",
              left: tooltipPos ? `${tooltipPos.left}px` : "-9999px",
              padding: "20px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, rgba(70, 70, 70, 0.8), rgba(50, 50, 50, 0.75))",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              boxShadow: "0 12px 40px rgba(0, 0, 0, 0.5)",
              opacity: isHovered && tooltipPos ? 1 : 0,
              transform: isHovered
                ? "translateY(0)"
                : tooltipPos?.flippedAbove
                ? "translateY(-6px)"
                : "translateY(6px)",
              transition: isHovered
                ? "opacity 0.2s ease, transform 0.2s ease"
                : "opacity 0.15s ease, transform 0.15s ease",
            }}
          >
            {/* Small pointer / arrow */}
            {tooltipPos && (
              <div
                className="absolute w-3 h-3 bg-[#404040]/90 backdrop-blur-md"
                style={{
                  left: `${tooltipPos.arrowLeft}px`,
                  top: tooltipPos.flippedAbove ? "auto" : "-6px",
                  bottom: tooltipPos.flippedAbove ? "-6px" : "auto",
                  transform: "rotate(45deg)",
                  borderTop: tooltipPos.flippedAbove ? "none" : "1px solid rgba(255, 255, 255, 0.12)",
                  borderLeft: tooltipPos.flippedAbove ? "none" : "1px solid rgba(255, 255, 255, 0.12)",
                  borderBottom: tooltipPos.flippedAbove ? "1px solid rgba(255, 255, 255, 0.12)" : "none",
                  borderRight: tooltipPos.flippedAbove ? "1px solid rgba(255, 255, 255, 0.12)" : "none",
                }}
              />
            )}

            {/* Tooltip Content */}
            <div className="relative z-10 text-left">
              <h4 className="text-white text-[16px] font-semibold leading-snug">
                {title}
              </h4>
              <p className="text-[#D4D4D4] text-[14px] leading-[1.6] mt-[8px]">
                {brief}
              </p>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
