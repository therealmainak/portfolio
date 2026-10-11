"use client";

import React, { useEffect, useRef } from "react";

interface LoopVideoProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
}

export function LoopVideo({ src, className = "", style }: LoopVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const video = videoRef.current;
    
    if (video) {
      if (mediaQuery.matches) {
        video.pause();
      } else {
        video.play().catch(e => console.error("Autoplay prevented:", e));
      }
    }

    const handleChange = () => {
      if (video) {
        if (mediaQuery.matches) {
          video.pause();
        } else {
          video.play().catch(e => console.error("Autoplay prevented:", e));
        }
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      className={className}
      style={style}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
    />
  );
}
