export interface ProjectItem {
    slug: string;
    title: string;
    category: "Work & Builds" | "Schoolwork";
    period: string;
    summary: string;
    context: string;
    approach: string;
    takeaway: string;
    tags: string[];
    link?: string;
  }
  
  export interface JourneyMilestone {
    period: string;
    title: string;
    subtitle: string;
    description: string;
  }
  
  export const profile = {
    name: "Akwasi Akosah",
    handle: "akwasi.dev",
    headline: "Exploring software, cloud systems, and thoughtful design.",
    intro:
      "Hi, I’m Akwasi. This is my quiet corner of the internet where I document what I’m building, share standout schoolwork, and keep track of how I got here.",
    currently:
      "Building cloud-native web apps on Azure, sharpening my full-stack engineering fundamentals, and turning coursework into practical tools.",
    github: "https://github.com/Akosah285",
    email: "mailto:hello@akwasi.dev", // [Edit me] Replace with your preferred contact email
  };
  
  export const projects: ProjectItem[] = [
    {
      slug: "green-circuit",
      title: "Green Circuit (Personal Cloud Platform)",
      category: "Work & Builds",
      period: "2026",
      summary:
        "A production-grade personal web platform with automated CI/CD, serverless telemetry, and GitHub-gated routes.",
      context:
        "I wanted a personal space on the web that went beyond a static template—something engineered from scratch to practice real-world cloud deployment and security.",
      approach:
        "Scaffolded with Next.js App Router, TypeScript, and Tailwind CSS, wired to GitHub Actions for zero-touch deployments to Azure Static Web Apps, and protected with built-in authentication.",
      takeaway:
        "Setting up automated deployment pipelines and route protection early makes iterating on design and backend features effortless.",
      tags: ["Next.js", "TypeScript", "Azure", "CI/CD"],
      link: "https://github.com/Akosah285/green-circuit",
    },
    {
      slug: "capstone-system-project",
      title: "[Edit me] Flagship Schoolwork / Course Project",
      category: "Schoolwork",
      period: "2025 – 2026",
      summary:
        "A concise two-sentence overview of a favorite class assignment, research paper, or lab build.",
      context:
        "Describe the problem statement or class prompt you were tackling and why it interested you.",
      approach:
        "Explain the tools, algorithms, or design decisions you used to solve it.",
      takeaway:
        "Share the biggest lesson you walked away with—what worked well and what you would improve next time.",
      tags: ["Algorithms", "Systems", "Academic"],
    },
    {
      slug: "practical-build-two",
      title: "[Edit me] Work Experience or Side Project",
      category: "Work & Builds",
      period: "2025",
      summary:
        "A short highlight of an internship task, team collaboration, or weekend build you are proud of.",
      context:
        "Who was this built for, and what challenge were you helping solve?",
      approach:
        "Outline your contribution and how you kept the solution clean and reliable.",
      takeaway:
        "Summarize the outcome or feedback you received.",
      tags: ["Full-Stack", "Problem Solving"],
    },
  ];
  
  export const journey: JourneyMilestone[] = [
    {
      period: "Present",
      title: "Building & Learning in Public",
      subtitle: "Cloud Architecture & Full-Stack Craft",
      description:
        "Focusing on clean software design, cloud infrastructure on Azure, and documenting projects so anyone curious can follow along.",
    },
    {
      period: "2024 – 2026",
      title: "[Edit me] University / Academic Focus",
      subtitle: "[Edit me] Your Major or Program Name",
      description:
        "Diving deep into core computer science principles, collaborative software projects, and problem-solving through coursework.",
    },
    {
      period: "Where It Started",
      title: "First Lines of Code",
      subtitle: "Curiosity & Tinkering",
      description:
        "Started exploring how websites and software work under the hood, turning small experiments into a long-term passion for building.",
    },
  ];