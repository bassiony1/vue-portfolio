// Single source of truth for all portfolio content.
// Bubble scene, detail windows, and the guided tour all read from here.

export const profile = {
  name: "Mahmoud Bassiony",
  title: "Software Engineer",
  tagline:
    "Junior Computer Engineer with a disciplined, results-oriented mindset — combining technical precision with the leadership and adaptability gained from high-pressure service.",
  location: "Cairo, Egypt",
  phone: "+20 115 409 64",
  email: "mahmoudbassiony17@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/bassiony17",
    github: "https://github.com/bassiony1",
  },
}

const projects = {
  backend: [
    {
      title: "ANEES (Autism Therapy)",
      desc: "Gamified RESTful API to treat delayed language in autistic children. Top 27 MENA Award Winner (Dell Envision).",
      tech: ["Django REST", "PostgreSQL", "Docker", "AI Integration"],
      link: "https://github.com/bassiony1/public-ANEES",
    },
    {
      title: "Store Core API",
      desc: "Production-ready E-commerce API handling carts, orders, and payments with Role-Based Access Control.",
      tech: ["DRF", "Redis Cache", "Stripe", "JWT"],
      link: "https://github.com/bassiony1/store-core",
    },
  ],
  fullstack: [
    {
      title: "Bondly (Real-Time Chat)",
      desc: "Architected unified WebSocket layer for instant messaging and notifications using Redis and Channels.",
      tech: ["Django Channels", "Redis", "Celery", "WebSockets"],
      link: "https://github.com/bassiony1/bondly",
    },
    {
      title: "Shelf Master (Library Management)",
      desc: "Full-stack library management solution streamlining membership, inventory tracking, and penalty enforcement.",
      tech: ["Django", "PostgreSQL", "Tailwind CSS", "Git"],
      link: "https://github.com/bassiony1/shelf-master",
    },
  ],
  frontend: [
    {
      title: "Khaier",
      desc: "A charity platform connecting donors with verified NGOs, featuring donation tracking and impact reports.",
      tech: ["React.js", "TypeScript", "React Router", "Styled Components", "Vite"],
      link: "https://khaier.vercel.app/",
    },
    {
      title: "Hekto E-commerce Landing Page",
      desc: "A modern e-commerce landing page with responsive design and interactive elements.",
      tech: ["React.js", "Styled Components", "Vite"],
      link: "https://project01-ecommerce-app.vercel.app/",
    },
    {
      title: "Fylo Dark Theme Landing Page",
      desc: "Layout-challenge landing page — a training ground for Flexbox and Grid skills.",
      tech: ["Tailwind CSS", "TypeScript", "Vite"],
      link: "https://fylo-dark-theme-landing-page-drab-phi.vercel.app/",
    },
    {
      title: "Bookmark Landing Page",
      desc: "A clean, modern bookmark landing page with responsive layout and interactive elements.",
      tech: ["HTML", "Vanilla CSS", "JS"],
      link: "https://bassiony1.github.io/bookmark-landing-page/",
    },
    {
      title: "X-O Game",
      desc: "Classic Tic Tac Toe with a sleek modern design; single-player and two-player modes.",
      tech: ["React.js", "Styled Components", "Vite"],
      link: "https://react-xo-game.vercel.app/",
    },
    {
      title: "Space Tourism Website",
      desc: "Multi-page space tourism website.",
      tech: ["Tailwind CSS", "React.js", "Vite"],
      link: "https://space-tourism-ten-beta.vercel.app/",
    },
    {
      title: "GitHub Finder App",
      desc: "Search GitHub profiles and view detailed information about users and their repositories.",
      tech: ["React.js", "Styled Components", "Vite"],
      link: "https://github-finder-bassiony1.vercel.app/",
    },
    {
      title: "Multi-step Form Component",
      desc: "Advanced form-building challenge with multi-step validation.",
      tech: ["Tailwind CSS", "React.js", "TypeScript", "Vite"],
      link: "https://multi-step-form-main-omega.vercel.app/",
    },
    {
      title: "Modern To-Do List",
      desc: "Sleek to-do list with light/dark mode, local storage, and drag-and-drop.",
      tech: ["Vanilla CSS", "Vanilla JS", "Vite"],
      link: "https://todo-app-pi-jade.vercel.app/",
    },
    {
      title: "Password Generator App",
      desc: "Creates strong, random passwords based on user-selected criteria.",
      tech: ["Vanilla CSS", "Vanilla JS"],
      link: "https://bassiony1.github.io/password-generator-app/",
    },
    {
      title: "Picker Wheel",
      desc: "Interactive picker wheel — input options and spin for a random selection.",
      tech: ["Vanilla CSS", "Vanilla JS"],
      link: "https://bassiony1.github.io/picker/",
    },
    {
      title: "Music Player App",
      desc: "Dark music player for anime Bleach soundtracks with OST management and playback controls.",
      tech: ["HTML", "CSS", "JS"],
      link: "https://bassiony1.github.io/music-player/",
    },
    {
      title: "Sticky Notes App",
      desc: "Create, edit, and delete notes on a virtual board.",
      tech: ["Vanilla CSS", "Vanilla JS"],
      link: "https://bassiony1.github.io/sticky-notes/",
    },
    {
      title: "Kayoanime Clone",
      desc: "A clone of KayoAnime.com.",
      tech: ["Bootstrap", "JS"],
      link: "https://kayo-anime-cloner.vercel.app/",
    },
    {
      title: "Interactive Card Details Form",
      desc: "DOM manipulation and form validation challenge.",
      tech: ["Tailwind CSS", "TypeScript", "Vite"],
      link: "https://interactive-card-details-form-main-nine.vercel.app/",
    },
    {
      title: "IP Address Tracker",
      desc: "Track IP addresses and view their location on an interactive map.",
      tech: ["Vanilla CSS", "JS"],
      link: "https://bassiony1.github.io/ip-tracker/",
    },
    {
      title: "URL Shortener",
      desc: "Create shortened links with a sleek modern UI.",
      tech: ["Vanilla CSS", "JS"],
      link: "https://bassiony1.github.io/url-shortner/",
    },
    {
      title: "Results Summary Component",
      desc: "A fun HTML & CSS practice component.",
      tech: ["Tailwind CSS", "TypeScript", "Vite"],
      link: "https://results-summary-component-main-teal-phi.vercel.app/",
    },
  ],
  automation: [
    {
      title: "TV-Shows Subtitle Renamer",
      desc: "Lightweight Windows Forms app renaming TV-show videos and subtitles to matching names from IMDB using scraping and regex.",
      tech: ["C#", ".NET WinForms", "IMDB Scraping"],
      link: "https://github.com/bassiony1/Tv-Shows-And-Subtitle-Renamer",
    },
  ],
}

// Bubble graph: 6 category bubbles; some burst into child bubbles.
// `related` ids power the tether lines between bubbles on the canvas.
export const categories = [
  {
    id: "summary",
    label: "Summary",
    icon: "user",
    accent: "cyan",
    size: 1.15,
    blurb: "Who I am",
  },
  {
    id: "projects",
    label: "Projects",
    icon: "rocket",
    accent: "rose",
    size: 1.3,
    blurb: "What I've built",
    children: [
      {
        id: "projects.backend",
        label: "Backend",
        count: projects.backend.length,
        items: projects.backend,
        related: ["skills.backend", "skills.databases", "skills.devops"],
      },
      {
        id: "projects.fullstack",
        label: "Full Stack",
        count: projects.fullstack.length,
        items: projects.fullstack,
        related: ["skills.backend", "skills.databases", "skills.frontend"],
      },
      {
        id: "projects.frontend",
        label: "Frontend",
        count: projects.frontend.length,
        items: projects.frontend,
        related: ["skills.frontend"],
      },
      {
        id: "projects.automation",
        label: "Automation & Desktop",
        count: projects.automation.length,
        items: projects.automation,
        related: ["skills.languages"],
      },
    ],
  },
  {
    id: "skills",
    label: "Skills",
    icon: "layers",
    accent: "emerald",
    size: 1.2,
    blurb: "Technical arsenal",
    children: [
      {
        id: "skills.backend",
        label: "Backend",
        tags: ["Python", "Django & DRF", "Channels", "Celery", "Node", "Express", "WebSockets"],
        related: ["projects.backend", "projects.fullstack"],
      },
      {
        id: "skills.databases",
        label: "Databases",
        tags: ["PostgreSQL", "MySQL", "MongoDB", "MS SQL Server", "Redis"],
        related: ["projects.backend", "projects.fullstack"],
      },
      {
        id: "skills.devops",
        label: "DevOps & Tools",
        tags: ["Docker", "Docker Compose", "Git/GitHub", "Postman"],
        related: ["projects.backend"],
      },
      {
        id: "skills.frontend",
        label: "Frontend",
        tags: ["HTML", "CSS", "Bootstrap", "Tailwind", "JS/TS", "React.js", "Redux Toolkit", "Vue.js"],
        related: ["projects.frontend", "projects.fullstack"],
      },
      {
        id: "skills.languages",
        label: "Languages",
        tags: ["Python", "JS", "C#", "C", "C++", "Java"],
        related: ["projects.automation"],
      },
      {
        id: "skills.core",
        label: "Core Concepts",
        tags: ["Data Structures & Algorithms", "Design Patterns", "Unit Testing", "System Design Basics"],
        related: [],
      },
    ],
  },
  {
    id: "education",
    label: "Education",
    icon: "cap",
    accent: "blue",
    size: 1.1,
    blurb: "Degrees & grades",
    children: [
      {
        id: "education.advanced",
        label: "Advanced Diploma",
        entry: {
          period: "Spring 2025",
          title: "Advanced Engineering Diploma",
          field: "Computer Engineering & Control Systems",
          place: "Mansoura University",
          grade: "A+ (4.0 GPA)",
        },
        related: [],
      },
      {
        id: "education.basic",
        label: "Basic Diploma",
        entry: {
          period: "Fall 2024",
          title: "Basic Engineering Diploma",
          field: "Computer Engineering & Control Systems",
          place: "Mansoura University",
          grade: "A+ (4.0 GPA)",
        },
        related: [],
      },
      {
        id: "education.bsc",
        label: "B.Sc.",
        entry: {
          period: "2018 – 2023",
          title: "B.Sc. in Computer Engineering",
          field: "Computer Engineering",
          place: "Mansoura University",
          grade: "Excellent with Honors",
        },
        related: [],
      },
    ],
  },
  {
    id: "history",
    label: "History",
    icon: "clock",
    accent: "indigo",
    size: 1.1,
    blurb: "Training & character",
    children: [
      {
        id: "history.iti-python",
        label: "ITI Python",
        entry: {
          period: "Aug 2021",
          title: "ITI — Python Backend Trainee",
          points: [
            "Completed a 150-hour intensive bootcamp covering Python, PostgreSQL, and Django.",
            "Designed relational database schemas and developed RESTful logic for web applications.",
            "Built a capstone project integrating the full stack (HTML, CSS, JS) with a Django backend.",
          ],
        },
        related: ["skills.backend", "projects.backend"],
      },
      {
        id: "history.iti-android",
        label: "ITI Android",
        entry: {
          period: "Sep 2022",
          title: "ITI — Android Development Trainee",
          points: [
            "Intensive technical track focused on Native Android Development using Java.",
            "Developed functional mobile applications using Android Layouts, Intents, and Adapter Views.",
          ],
        },
        related: ["skills.languages"],
      },
      {
        id: "history.aspire",
        label: "Aspire Program",
        entry: {
          period: "Mar 2022",
          title: "Aspire Employability & Leadership Program",
          points: [
            "Training focused on professional character, competence, and commitment.",
            "Adopted strategies for high-performance team collaboration and conflict resolution.",
            "Developed audience-tailored presentation and business communication skills.",
          ],
        },
        related: [],
      },
      {
        id: "history.military",
        label: "Military Service",
        entry: {
          period: "Reserve Officer",
          title: "Military Service — Platoon Leader",
          points: [
            "Led teams under high-pressure conditions as a Reserve Officer (Platoon Leader).",
            "Gained extensive experience in leadership, discipline, and high-pressure decision making.",
          ],
        },
        related: [],
      },
    ],
  },
  {
    id: "contact",
    label: "Contact",
    icon: "mail",
    accent: "amber",
    size: 1.0,
    blurb: "Get in touch",
  },
]

export const attributes = [
  {
    title: "Leadership & Discipline",
    desc: "Proven experience leading teams under high-pressure conditions as a Military Officer (Platoon Leader).",
  },
  {
    title: "Integrity & Accountability",
    desc: "Committed to absolute professional honesty; full ownership of deliverables and deadlines.",
  },
  {
    title: "Adaptability",
    desc: "Rapid learner capable of mastering new technologies quickly, with a strong ability to execute directives.",
  },
  {
    title: "Meticulous Attention to Detail",
    desc: "Translating military precision into software development — clean code and error-free deployments.",
  },
]

export const summaryText = [
  "Junior Computer Engineer with a disciplined, results-oriented mindset.",
  "I specialize in architecting scalable backend systems using Python, Django, and Docker, with solid expertise in real-time communication and database optimization — combining technical precision with the leadership and adaptability gained from high-pressure service.",
]

// flat lookup: id -> node (categories and children)
export const nodeById = Object.fromEntries(
  categories.flatMap((c) => [[c.id, c], ...(c.children ?? []).map((ch) => [ch.id, ch])]),
)

// order used by the guided tour
export const tourOrder = ["summary", "skills", "projects", "education", "history", "contact"]
