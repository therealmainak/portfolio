import React from "react";
import Image from "next/image";
import { site } from "@/content/site";
import { SiGmail, SiWhatsapp } from "react-icons/si";

export function ContactSection() {
  return (
    <section className="w-full bg-black pt-[24px] pb-[64px] md:py-[96px] text-white">
      <div className="w-full max-w-[1280px] mx-auto px-[20px] md:px-[32px] lg:px-[64px] flex flex-col md:flex-row items-start md:items-center justify-between gap-[36px] md:gap-[48px] lg:gap-[96px]">
        
        {/* Left Side - Photo, About & Contact Info */}
        <div className="w-full md:w-3/5 lg:w-2/3 flex flex-col items-start max-w-[720px]">
          {/* Photo: ~120px wide on mobile (rounded 12px), 180px wide on desktop (rounded 16px) */}
          <div 
            className="relative w-[120px] md:w-[180px] aspect-[427/562] overflow-hidden mb-[20px] md:mb-[24px] shrink-0"
            style={{
              borderRadius: "16px",
              clipPath: "inset(0 round 12px)",
            }}
          >
            <Image
              src="/assets/me.png"
              alt="Mainak"
              fill
              className="object-cover scale-[1.04]"
              sizes="(max-width: 768px) 120px, 180px"
              priority
            />
          </div>

          {/* Small Heading */}
          <h3 className="text-[20px] font-semibold mb-[16px] leading-none text-white">
            About me
          </h3>

          {/* About Text (3 paragraphs with 16px gap, max-w ~720px) */}
          <div className="flex flex-col gap-[16px] text-[#E5E5E5] text-[15px] md:text-[16px] leading-[1.6]">
            <p>
              I&apos;m currently in the final year of my masters degree (M.Des) in UI/UX design. I design experiences keeping the business, user and the product in the centre.
            </p>
            <p>
              The unique edge I bring to the table is understanding human psychology, the user and their behavior in their journey to derive insights and friction, and propose experience ideas backed by principles and heuristics to improve the business metrics.
            </p>
            <p>
              I have a background in English (minor in social sciences) which fortifies my ability in ux copywriting and articulating my decisions to the stakeholders. During my undergraduate degree, I freelanced as a digital illustrator which helped me gain experience in handling deadlines, iterations and feedback.
            </p>
          </div>

          {/* Contact rows below text with 32px gap */}
          <div className="flex flex-col gap-[16px] mt-[32px]">
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-[12px] group hover:opacity-80 transition-opacity min-h-[44px]"
            >
              <SiGmail className="w-[22px] h-[22px] md:w-[24px] md:h-[24px]" />
              <span className="text-[16px] md:text-[18px]">{site.email}</span>
            </a>
            
            <a
              href={site.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-[12px] group hover:opacity-80 transition-opacity min-h-[44px]"
            >
              <SiWhatsapp className="w-[22px] h-[22px] md:w-[24px] md:h-[24px]" />
              <span className="text-[16px] md:text-[18px]">{site.phoneDisplay}</span>
            </a>
          </div>
        </div>

        {/* Right Side - Dog Image: ~120px on mobile placed at bottom right below contacts; desktop vertically centered ~240px */}
        <div className="w-full md:w-2/5 lg:w-1/3 flex justify-end">
          <div 
            className="relative w-[120px] md:w-[220px] lg:w-[240px] aspect-[676/768] overflow-hidden"
            style={{
              WebkitMaskImage: "radial-gradient(ellipse 75% 75% at center, black 50%, transparent 100%)",
              maskImage: "radial-gradient(ellipse 75% 75% at center, black 50%, transparent 100%)"
            }}
          >
            <Image
              src="/assets/dog-chair.png"
              alt="Sleeping golden retriever on office chair"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 120px, 240px"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
