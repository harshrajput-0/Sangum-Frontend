import { CategoryOption, CommunitySummaryCard } from "./types";

export const categoryOptions: CategoryOption[] = [
  { id: "all", label: "All" },
  { id: "technology", label: "Technology" },
  { id: "design", label: "Design" },
  { id: "business", label: "Business" },
  { id: "education", label: "Education" },
];

// TODO: Replace with Express API integration — GET /api/communities?featured=true
export const mockFeaturedCommunities: CommunitySummaryCard[] = [
  {
    id: "mern-developers",
    name: "MERN Developers",
    avatarLabel: "N",
    isVerified: true,
    description:
      "A community for MERN stack developers to connect, share knowledge, and build full-stack apps.",
    memberCountLabel: "24.8K members",
    isJoined: true,
    bannerGradientClassName: "from-primary via-info to-accent",
  },
  {
    id: "ui-ux-designers",
    name: "UI/UX Designers Hub",
    avatarLabel: "U",
    description: "Share your designs, get feedback, and discuss the latest trends in product design.",
    memberCountLabel: "18.3K members",
    isJoined: false,
    bannerGradientClassName: "from-violet-700 to-fuchsia-950",
  },
  {
    id: "startup-founders",
    name: "Startup Founders Circle",
    avatarLabel: "S",
    description: "Connect with fellow founders, share resources, and get advice on scaling your startup.",
    memberCountLabel: "12.1K members",
    isJoined: false,
    bannerGradientClassName: "from-neutral-800 to-black",
  },
];

// TODO: Replace with Express API integration — GET /api/communities
export const mockAllCommunities: CommunitySummaryCard[] = [
  {
    id: "python-devs",
    name: "Python Developers",
    avatarLabel: "P",
    description: "Everything Python — Django, FastAPI, data science, and automation.",
    memberCountLabel: "31.4K members",
    isJoined: false,
    bannerGradientClassName: "from-slate-700 to-slate-900",
  },
  {
    id: "devops-engineers",
    name: "DevOps Engineers",
    avatarLabel: "D",
    description: "CI/CD, Kubernetes, cloud infra, and everything in between.",
    memberCountLabel: "9.7K members",
    isJoined: false,
    bannerGradientClassName: "from-info to-primary",
  },
  {
    id: "game-devs",
    name: "Game Developers Guild",
    avatarLabel: "G",
    description: "Unity, Unreal, and indie game dev — share your builds and get playtested.",
    memberCountLabel: "14.2K members",
    isJoined: true,
    bannerGradientClassName: "from-success to-info",
  },
];