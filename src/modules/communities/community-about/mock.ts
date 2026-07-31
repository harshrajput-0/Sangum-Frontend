import { Calendar, Globe, Circle, MapPin } from "lucide-react";
import { CommunityAboutInfo, AboutRule, TopTopic, AdminMember } from "./types";

// TODO: Replace with Express API integration — GET /api/communities/:slug/about
export const mockAboutInfo: CommunityAboutInfo = {
  description:
    "We are a community of MERN stack developers who love building modern web applications. Share knowledge, get help, showcase your projects, and grow together.",
  stats: [
    { icon: Calendar, label: "Created", value: "May 12, 2021" },
    { icon: Globe, label: "Language", value: "English" },
    { icon: Circle, label: "Type", value: "Public" },
    { icon: MapPin, label: "Location", value: "Worldwide" },
  ],
};

// TODO: Replace with Express API integration — GET /api/communities/:slug/rules
export const mockRules: AboutRule[] = [
  {
    title: "Be respectful and inclusive",
    description: "Treat everyone with respect. No harassment or discrimination.",
  },
  {
    title: "Stay on topic",
    description: "Keep discussions relevant to MERN and web development.",
  },
  {
    title: "No spam or self-promotion",
    description: "Avoid spamming, unsolicited promotions, or irrelevant links.",
  },
];

// TODO: Replace with Express API integration — GET /api/communities/:slug/topics
export const mockTopTopics: TopTopic[] = [
  { label: "React", postCountLabel: "3.2K posts" },
  { label: "Node.js", postCountLabel: "2.8K posts" },
  { label: "MongoDB", postCountLabel: "2.1K posts" },
];

// TODO: Replace with Express API integration — GET /api/communities/:slug/admins
export const mockAdmins: AdminMember[] = [
  { id: "admin-1", name: "Arjun Sharma", avatarLabel: "AS" },
];