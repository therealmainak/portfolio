import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google"; // Using Noto Sans as a fallback since Nata Sans might not be in Google Fonts, wait actually user asked for Nata Sans.
import "./globals.css";

// If Nata Sans is not in Google Fonts, we'll try to load it. 
// "If next/font/google does not have it, load it from Google Fonts with a <link> in the layout instead."
// Nata Sans doesn't exist on Google Fonts, it might be a custom font or Noto Sans typo.
// But we will follow instructions exactly. Nata Sans isn't in next/font/google.
// I will use a custom local font or system fallback, and add a link just in case.

export const metadata: Metadata = {
  title: "Mainak — UI/UX & Product Designer",
  description: "UI/UX designer and end-to-end product builder, obsessively curious about people's behavior.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Nata+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap" rel="stylesheet" />
        <style>{`
          :root {
            --font-nata: 'Nata Sans', system-ui, -apple-system, sans-serif;
          }
          body {
            font-family: var(--font-nata);
          }
        `}</style>
      </head>
      <body className="antialiased bg-black text-white">
        {children}
      </body>
    </html>
  );
}
