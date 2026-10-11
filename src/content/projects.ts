export type Project = {
  id: string;
  title: string;
  brief: string;
  pdf: string;
  thumbnail: string;
  href: string;
};

export const caseStudies: Project[] = [
  {
    id: "case-1",
    title: "Chronicle – Reading App",
    brief:
      "A short-fiction reading app that turns doom-scrolling into joyful, productive reading. Built on user research, it helps casual readers build a lasting reading habit and aims to make literature mainstream again.",
    pdf: "/case-studies/case-1.pdf",
    thumbnail: "/case-studies/covers/case-1.jpg",
    href: "/case-studies/case-1",
  },
  {
    id: "case-2",
    title: "INCH – Fitness App",
    brief:
      "A user-centric fitness app for beginner gym-goers who drop off early. Progress starts in week one but goes untracked; INCH tracks these micro-improvements so users see they are improving even before the mirror shows it. Built on user research, this feedback loop keeps users motivated and aims to reduce gym drop-offs.",
    pdf: "/case-studies/case-2.pdf",
    thumbnail: "/case-studies/covers/case-2.jpg",
    href: "/case-studies/case-2",
  },
  {
    id: "case-3",
    title: "Mano – Student Mental Health App",
    brief:
      "An AI-native chat app in Hinglish, designed for Indian students going through stress and low moments. Mano offers a safe, judgement-free space where students feel accepted and can share their student journey. Designed with empathy and user research, it aims to support better mental health and wellbeing.",
    pdf: "/case-studies/case-3.pdf",
    thumbnail: "/case-studies/covers/case-3.jpg",
    href: "/case-studies/case-3",
  },
];

export const miniCaseStudies: Project[] = [
  {
    id: "mini-1",
    title: "YouTube – Mini Case Study",
    brief:
      "Improving YouTube for free users. YouTube Premium promotions often interrupt free users at the wrong moments. This redesign makes Premium promotion feel less obtrusive, so free users enjoy watching while still discovering Premium on their own terms.",
    pdf: "/case-studies/mini-1.pdf",
    thumbnail: "/case-studies/covers/mini-1.jpg",
    href: "/case-studies/mini-1",
  },
  {
    id: "mini-2",
    title: "Instagram – Mini Case Study",
    brief:
      "Improving how Instagram users receive resources from creators. When creators send links via DM (e.g. comment-to-get-link), the resource arrives without the post it came from. This redesign adds post context to those DMs, so users instantly know what each resource is and why they asked for it.",
    pdf: "/case-studies/mini-2.pdf",
    thumbnail: "/case-studies/covers/mini-2.jpg",
    href: "/case-studies/mini-2",
  },
];

export const allProjects: Project[] = [...caseStudies, ...miniCaseStudies];

export function getProjectBySlug(slug: string): Project | undefined {
  return allProjects.find((p) => p.id === slug);
}
