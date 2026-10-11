import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export function Button({ children, href, onClick, type = "button", className = "" }: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center bg-white text-black font-semibold px-[28px] py-[14px] rounded-none hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black transition-opacity";
  
  if (href) {
    return (
      <a href={href} className={`${baseStyles} ${className}`}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={`${baseStyles} ${className}`}>
      {children}
    </button>
  );
}
