import { CategoryOption, SelectOption } from "./types";

// TODO: Replace with Express API integration — GET /api/categories
export const categoryOptions: CategoryOption[] = [
  { id: "technology", label: "Technology" },
  { id: "design", label: "Design" },
  { id: "business", label: "Business" },
  { id: "education", label: "Education" },
];

export const whoCanJoinOptions: SelectOption[] = [
  { id: "anyone", label: "Anyone" },
  { id: "invite-only", label: "Invite only" },
];

export const whoCanPostOptions: SelectOption[] = [
  { id: "members", label: "Members" },
  { id: "admins-only", label: "Admins only" },
];