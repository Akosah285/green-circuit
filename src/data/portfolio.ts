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

export function projectHref(project: ProjectItem) {
  const destination =
    project.category === "Schoolwork" ? "/schoolwork" : "/builds";
  return `${destination}#${project.slug}`;
}

export interface JourneyMilestone {
  period: string;
  title: string;
  subtitle: string;
  description: string;
  mark: string;
}

export interface HonorItem {
  title: string;
  issuer: string;
  year: string;
  highlight?: string;
}

export interface CourseGroup {
  pillar: string;
  summary: string;
  courses: { code: string; name: string; citation?: boolean }[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export const profile = {
  name: "Akwasi Akosah",
  handle: "akwasi.dev",
  headline: "Software engineer building resilient systems—and keeping things clear.",
  intro:
    "Hi, I’m Akwasi. I’m a Software Engineer II at Microsoft in Redmond, with roots in engineering systems, applied mathematics, and leadership at Dartmouth—and a journey that began in Kumasi, Ghana. This is my quiet corner of the web to share what I’m building, revisit standout schoolwork, and document the path.",
  currently:
    "Engineering production software at Microsoft, exploring cloud-native architectures on Azure, and building small, purposeful tools in my personal lab.",
  portalHeading: "I’m Akwasi.",
  portalIntro: "I’m a Ghanaian software engineer who loves learning, sharing ideas, and soccer.",
  portalNote:
    "This is my little corner of the internet for sharing what I’m learning and tinkering with.",
  portalLately:
    "Working on production software at Microsoft and tinkering with small, purposeful tools on Azure.",
  github: "https://github.com/Akosah285",
  linkedin: "https://www.linkedin.com/in/akwasi-akosah-a39832148/",
  email: "mailto:hello@akwasi.dev",
};

export const portalSections = [
  {
    id: "building",
    number: "01",
    menuLabel: "Building",
    eyebrow: "What I am building",
    title: "An interactive engineering portfolio.",
    description:
      "A portfolio of engineering coursework, with interactive demos and reflections.",
    tags: ["Engineering", "Interactive demos", "Coursework"],
    href: "https://github.com/Akosah285/engineering-portfolio",
    action: "View the project on GitHub",
  },
  {
    id: "learning",
    number: "02",
    menuLabel: "Learning",
    eyebrow: "What I am learning",
    title: "Books, ideas, and better questions.",
    reading: [
      {
        label: "Currently reading",
        books: [
          { title: "System Design Interview", author: "Alex Xu and Sahn Lam" },
          { title: "Six Math Essentials", author: "Terence Tao" },
        ],
      },
      {
        label: "Recent reads",
        books: [
          { title: "The Joy of x", author: "Steven Strogatz" },
          { title: "Transcendent Kingdom", author: "Yaa Gyasi" },
        ],
      },
    ],
    tags: ["Energy-based reasoning models", "Why LLMs lie", "LLM sycophancy"],
  },
  {
    id: "writing",
    number: "03",
    menuLabel: "Writing",
    eyebrow: "What I am writing about",
    title: "Notes from the work, still taking shape.",
    description:
      "Two pieces are in draft as I explore ideas around agents and language models.",
    tags: ["Draft: The Bouncer Problem — Agent Gateways", "Draft: The Forgetting Machine — LLM Blindspot"],
  },
  {
    id: "beyond",
    number: "04",
    menuLabel: "Beyond work",
    eyebrow: "What I am into",
    title: "A little beyond the terminal.",
    description:
      "Outside of engineering, I’m into soccer, curating music, and video games.",
    tags: ["Soccer", "Music curation", "Video games"],
    href: "/journey",
    action: "Get to know me",
  },
] as const;

export const projects: ProjectItem[] = [
  {
    slug: "green-circuit",
    title: "Green Circuit (Personal Cloud Platform)",
    category: "Work & Builds",
    period: "2026",
    summary:
      "A personal web platform engineered from scratch with automated CI/CD, serverless telemetry, and GitHub-gated routes on Azure.",
    context:
      "I wanted a personal space on the web that reflected how I approach production engineering—clean architecture, automated deployments, and zero unnecessary bloat.",
    approach:
      "Built with Next.js App Router, TypeScript, and Tailwind CSS, connected to GitHub Actions for automated builds to Azure Static Web Apps, and secured with route-level authentication.",
    takeaway:
      "Establishing automated CI/CD and clean data boundaries early keeps a project effortless to evolve over time.",
    tags: ["Next.js", "TypeScript", "Azure", "CI/CD"],
    link: "https://github.com/Akosah285/green-circuit",
  },
  {
    slug: "microsoft-engineering-craft",
    title: "Production Software Engineering at Microsoft",
    category: "Work & Builds",
    period: "2021 – Present",
    summary:
      "Building and operating reliable, scalable production software in Redmond—growing from Software Engineer to Software Engineer II.",
    context:
      "Over 5+ years at Microsoft (following a Summer 2020 SWE internship), I’ve focused on building software where reliability, clarity, and maintainability matter at scale.",
    approach:
      "Applying systems-engineering discipline—clear interfaces, thoughtful observability, and pragmatic trade-offs—to ship resilient features across collaborative engineering teams.",
    takeaway:
      "Great production engineering is less about clever tricks and more about building systems that teammates can reason about and trust.",
    tags: ["Software Engineering", "Cloud Systems", "Microsoft"],
  },
  {
    slug: "autonomous-maze-solving-bot",
    title: "Autonomous Maze Solving Bot",
    category: "Schoolwork",
    period: "May 2021 – Jun 2021",
    summary:
      "Designed and programmed an autonomous robot capable of navigating, mapping, and solving an unknown maze.",
    context:
      "Built collaboratively with a four-person engineering team (Pierre, Carolina, and teammate) to bring real-time sensor feedback, pathfinding logic, and motor control together under physical constraints.",
    approach:
      "Combined onboard sensor readings with decision-making and navigation algorithms so the bot could detect walls, avoid dead ends, and reliably reach the exit.",
    takeaway:
      "Real-world hardware rarely behaves like an ideal simulation—calibrating for sensor noise and physical tolerances is where true engineering happens.",
    tags: ["Robotics", "Pathfinding", "Embedded Systems"],
  },
  {
    slug: "liines-research",
    title: "Data Classification for Intelligent Engineering Networks (LIINES)",
    category: "Schoolwork",
    period: "Jun 2019 – Mar 2020",
    summary:
      "Automated data ingestion and classification pipelines as an Undergraduate Researcher & James O. Freedman Presidential Scholar.",
    context:
      "Research at Dartmouth’s Laboratory for Intelligent Integrated Networks of Engineering Systems (LIINES) required structured collection and categorization of large-scale engineering datasets.",
    approach:
      "Wrote programmatic pipelines to download, clean, and classify high-volume research data to support downstream systems modeling.",
    takeaway:
      "Reliable data pipelines and clean abstractions are the foundation of any analytical or distributed system.",
    tags: ["Research", "Data Pipelines", "Presidential Scholar"],
  },
  {
    slug: "morse-code-translator",
    title: "Morse Code Translator",
    category: "Schoolwork",
    period: "May 2020 – Jun 2020",
    summary:
      "Built a hardware/digital-logic translator at Dartmouth to encode and decode Morse code signals in real time.",
    context:
      "Developed with Tyler as part of Dartmouth’s engineering curriculum to translate timed signal inputs (dots and dashes) into readable characters cleanly and deterministically.",
    approach:
      "Implemented state-machine timing logic and signal decoding rules to distinguish short pulses, long pulses, and character spacing accurately.",
    takeaway:
      "Designing clean state machines makes timing-sensitive protocols far easier to debug and verify.",
    tags: ["Digital Logic", "State Machines", "Dartmouth"],
  },
  {
    slug: "digital-stopwatch",
    title: "Digital Stopwatch",
    category: "Schoolwork",
    period: "Apr 2020 – May 2020",
    summary:
      "Engineered a precision digital stopwatch with start, stop, and reset controls at Dartmouth College.",
    context:
      "Collaborated with Ijeoma (Ijay) and Tyler to design a reliable timing circuit and display controller from foundational digital building blocks.",
    approach:
      "Structured clock-division counters, debounced button inputs, and display multiplexing to track elapsed time accurately without drift or input glitches.",
    takeaway:
      "Mastering low-level clock synchronization and input debouncing builds a deep intuition for how computers keep time under the hood.",
    tags: ["Digital Design", "Hardware Timing", "Dartmouth"],
  },
  {
    slug: "miniature-autonomous-car",
    title: "Miniature Autonomous Car (Control Theory)",
    category: "Schoolwork",
    period: "Sep 2019 – Nov 2019",
    summary:
      "Applied control theory principles to design an autonomous car that detects obstacles and brakes smoothly to maintain a safe following distance.",
    context:
      "Built at Dartmouth with Eric using feedback control principles—bridging mathematical stability theory with a physical moving vehicle.",
    approach:
      "Used distance sensor feedback to continuously adjust motor output, ensuring the vehicle decelerated smoothly behind obstacles without oscillation or overshoot.",
    takeaway:
      "Seeing a mathematical feedback loop physically bring a car to a smooth stop makes control theory click in a way textbooks never could.",
    tags: ["Control Theory", "Feedback Loops", "Autonomous Systems"],
  },
];

export const journey: JourneyMilestone[] = [
  {
    period: "Dec 2023 – Present",
    mark: "/journey/microsoft.svg",
    title: "Software Engineer II · Microsoft",
    subtitle: "Redmond, Washington",
    description:
      "Designing, building, and operating production software systems while mentoring teammates and sharpening architectural craft.",
  },
  {
    period: "Aug 2021 – Nov 2023",
    mark: "/journey/microsoft.svg",
    title: "Software Engineer · Microsoft",
    subtitle: "Redmond, Washington (Returned after Summer 2020 Internship)",
    description:
      "Transitioned from a Summer 2020 SWE internship into full-time engineering, shipping production services and learning what it takes to run reliable software at scale.",
  },
  {
    period: "2017 – 2021",
    mark: "/journey/dartmouth.png",
    title: "King Leadership Scholar & Engineering · Dartmouth College",
    subtitle: "Hanover, New Hampshire · College Honor List (2017–2021)",
    description:
      "Selected as a King Leadership Scholar focused on leadership and development impact in home communities. Researched intelligent engineering networks at LIINES as a Presidential Scholar, built autonomous robotics, studied German literature, and spent over two years mentoring peers as a Mathematics Resident Expert, Learning Fellow, and TA.",
  },
  {
    period: "2016",
    mark: "/journey/opoku-ware.png",
    title: "Valedictorian · Opoku Ware School",
    subtitle: "Kumasi, Ghana · Class of 991 Students",
    description:
      "Graduated first in a class of 991 students at one of West Africa’s premier secondary institutions—a foundation built on discipline, curiosity, and community.",
  },
];

export const honors: HonorItem[] = [
  {
    title: "King Leadership Scholar",
    issuer: "Dartmouth College",
    year: "2017 – 2021",
    highlight:
      "Full four-year leadership scholarship supporting students committed to solving development and poverty challenges in their home countries, including community field research in Ghana.",
  },
  {
    title: "James O. Freedman Presidential Scholar",
    issuer: "Dartmouth College",
    year: "2019",
    highlight:
      "Selected for faculty-mentored undergraduate research at the Laboratory for Intelligent Integrated Networks of Engineering Systems (LIINES).",
  },
  {
    title: "College Honor List",
    issuer: "Dartmouth College",
    year: "2017 – 2021",
    highlight: "Recognized for sustained academic excellence across Dartmouth.",
  },
  {
    title: "Valedictorian (Class of 991)",
    issuer: "Opoku Ware School",
    year: "2016",
    highlight:
      "Graduated top of a 991-student graduating class at one of West Africa’s most prestigious schools.",
  },
  {
    title: "German Studies Book Prize",
    issuer: "Department of German Studies, Dartmouth",
    year: "2019",
    highlight:
      "Awarded for excellence in German language, literature, and comparative studies alongside a Citation for Meritorious Performance in German 015.",
  },
];

export const citations = [
  {
    course: "Machine Learning and Statistical Data Analysis (COSC 074)",
    faculty: "Dr. Soroush Vosoughi, Assistant Professor of Computer Science",
    term: "Jun 2020",
  },
  {
    course: "Distributed Systems and Fields (ENGS 023)",
    faculty: "Dr. Ulf L. Österberg, Professor of Engineering",
    term: "Mar 2020",
  },
  {
    course: "Control Theory (ENGS 026)",
    faculty: "Dr. Laura E. Ray, Professor of Engineering & Senior Associate Dean",
    term: "Nov 2019",
  },
  {
    course: "German 015",
    faculty: "Dr. Irene Kacandes, Professor of German Studies & Comparative Literature",
    term: "Jun 2019",
  },
];

export const courseGroups: CourseGroup[] = [
  {
    pillar: "Systems, Control & Hardware",
    summary:
      "From microprocessors and digital electronics to closed-loop control, mechatronics, and distributed systems.",
    courses: [
      { code: "ENGS 026", name: "Control Theory", citation: true },
      { code: "ENGS 023", name: "Distributed Systems and Fields", citation: true },
      { code: "ENGS 022", name: "Systems" },
      { code: "ENGS 027", name: "Discrete and Probabilistic Systems" },
      { code: "ENGS 031 / COSC 056", name: "Digital Electronics" },
      { code: "ENGS 062", name: "Microprocessors in Engineering Systems" },
      { code: "ENGS 085", name: "Embedded Systems" },
      { code: "ENGS 147", name: "Mechatronics" },
      { code: "ENGS 021", name: "Engineering Design" },
      { code: "ENGS 033", name: "Solid Mechanics" },
    ],
  },
  {
    pillar: "Computer Science & Machine Learning",
    summary:
      "Software architecture, algorithms, and statistical learning.",
    courses: [
      { code: "COSC 074", name: "Machine Learning and Statistical Data Analysis", citation: true },
      { code: "ENGS 050 / COSC 050", name: "Software Design and Implementation" },
      { code: "COSC 010", name: "Data Structures and Algorithms" },
      { code: "COSC 001", name: "Introduction to Programming and Computation" },
    ],
  },
  {
    pillar: "Applied Mathematics",
    summary:
      "Differential equations, linear algebra, numerical methods, and complex analysis (tutored across 6+ courses).",
    courses: [
      { code: "MATH 046 / 136", name: "Applied Mathematics II" },
      { code: "MATH 056", name: "Computational and Numerical Methods" },
      { code: "ENGS 092 / PHYS 070", name: "Fourier Transforms and Complex Variables" },
      { code: "MATH 023", name: "Differential Equations" },
      { code: "MATH 022", name: "Linear Algebra with Applications" },
      { code: "MATH 013", name: "Calculus III (Vector-Valued Functions)" },
      { code: "MATH 008", name: "Calculus II" },
      { code: "MATH 003", name: "Calculus I" },
    ],
  },
  {
    pillar: "Physics & Humanities",
    summary:
      "Foundational physics alongside language and literature studies in German.",
    courses: [
      { code: "GERM 015", name: "German Studies & Literature", citation: true },
      { code: "PHYS 014", name: "Electricity and Magnetism" },
      { code: "PHYS 013", name: "Mechanics" },
    ],
  },
];

export const toolkit: SkillGroup[] = [
  {
    category: "Languages & Backend",
    items: ["C#", "Python", "Java", "C", "TypeScript"],
  },
  {
    category: "Frontend & Cloud",
    items: ["React.js", "Next.js", "Tailwind CSS", "Azure", "CI/CD"],
  },
  {
    category: "Scientific & Systems Tooling",
    items: ["MATLAB", "Bash", "Embedded & Control Systems"],
  },
];
