import { Post, AboutSummary } from "./types";

// TODO: Replace with Express API integration — GET /api/communities/:slug/posts
export const mockPosts: Post[] = [
  {
    id: "post-1",
    author: { name: "Ankit Verma", avatarLabel: "AV" },
    timestamp: "3h ago",
    title: "How to handle file uploads in Node.js with Express and Cloudinary?",
    excerpt:
      "I'm building a MERN app and need to integrate Cloudinary for image uploads. What's the best way to handle auth and file optimization?",
    tags: ["Node.js", "Express", "Cloudinary"],
    likeCount: 24,
    commentCount: 12,
    viewCount: "1.2K",
  },
  {
    id: "post-2",
    author: { name: "Neha Singh", avatarLabel: "NS" },
    timestamp: "8h ago",
    title: "State management: Context API vs Redux Toolkit in 2024",
    excerpt:
      "I'm confused between Context API and Redux Toolkit for a medium-sized project. What do you prefer and why?",
    likeCount: 18,
    commentCount: 23,
    viewCount: "987",
  },
];

// TODO: Replace with Express API integration — GET /api/communities/:slug
export const mockAboutSummary: AboutSummary = {
  description:
    "A community for MERN stack developers to connect, share knowledge, and build amazing full-stack applications.",
  createdAt: "May 12, 2021",
  type: "Public",
  rules: ["Be respectful and inclusive", "Stay on topic", "No spam or self-promotion"],
};