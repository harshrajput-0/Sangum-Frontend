import { SettingsSection, GeneralInfo, VisibilityOption } from "./types";

export const settingsSections: SettingsSection[] = [
  { id: "general", label: "General" },
  { id: "privacy", label: "Privacy & Access" },
  { id: "roles", label: "Members & Roles" },
  { id: "rules", label: "Rules" },
  { id: "banned", label: "Banned" },
];

// TODO: Replace with Express API integration — GET /api/communities/:slug/settings
export const mockGeneralInfo: GeneralInfo = {
  name: "MERN Developers",
  slug: "mern-developers",
  tagline: "Build, share, and grow together.",
  description:
    "A community for MERN stack developers to connect, share knowledge, and build amazing full-stack applications.",
};

export const visibilityOptions: VisibilityOption[] = [
  { id: "public", label: "Public", description: "Anyone can find and join." },
  { id: "private", label: "Private", description: "Only invited people can join." },
];