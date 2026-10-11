import { HeroSection } from "@/components/HeroSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ContactSection } from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="w-full bg-black min-h-screen relative">
      <HeroSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
