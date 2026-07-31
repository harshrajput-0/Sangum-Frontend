import { ResourceTypeOption, Resource } from "./types";

export const resourceTypeOptions: ResourceTypeOption[] = [
  { id: "all", label: "All" },
  { id: "article", label: "Articles" },
  { id: "video", label: "Videos" },
  { id: "tool", label: "Tools" },
  { id: "doc", label: "Docs" },
];

// TODO: Replace with Express API integration — GET /api/communities/:slug/resources
export const mockResources: Resource[] = [
  {
    id: "resource-1",
    title: "Complete Guide to React Server Components",
    description:
      "A deep dive into RSCs, how they work under the hood, and when to use them in your Next.js apps.",
    type: "article",
    tags: ["React", "Next.js"],
    metaLabel: "Added by Priya Nair · 2 days ago",
    isBookmarked: true,
  },
  {
    id: "resource-2",
    title: "Building REST APIs with Express and MongoDB",
    description:
      "Step-by-step video walkthrough covering routing, middleware, and Mongoose schema design.",
    type: "video",
    tags: ["Express", "MongoDB"],
    metaLabel: "Added by Arjun Sharma · 5 days ago",
    isBookmarked: false,
  },
  {
    id: "resource-3",
    title: "Postman Collection: MERN Auth Flows",
    description:
      "Ready-to-import Postman collection covering signup, login, refresh tokens, and password reset.",
    type: "tool",
    tags: ["Postman", "Auth"],
    metaLabel: "Added by Neha Singh · 1 week ago",
    isBookmarked: false,
  },
  {
    id: "resource-4",
    title: "Official Mongoose Documentation",
    description: "Bookmark for quick reference on schemas, models, validation, and population.",
    type: "doc",
    tags: ["MongoDB", "Reference"],
    metaLabel: "Added by Ankit Verma · 2 weeks ago",
    isBookmarked: true,
  },
];