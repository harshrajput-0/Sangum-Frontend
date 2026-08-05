// NOTE: apiRequest from "./apiClient" isn't imported yet — every function
// below is still mocked. Import it once the TODOs are wired to real routes.
import { simulateLatency } from "../lib/simulateLatency";
import type {
  CommunitySummary,
  EditProfileFormData,
  PostSummary,
  ProfileData,
  ResourceItem,
} from "../types/profile.types";

/* ============================================================
 * Mock data — mirrors the source mockup so the UI renders
 * identically to the design during development, with no backend.
 * Delete once fetchProfile/fetchProfileContent hit real endpoints.
 * ============================================================ */

const MOCK_PROFILE: ProfileData = {
  id: "user_aaryan",
  username: "aaryan.dev",
  fullName: "Aaryan Verma",
  verified: true,
  roleBadge: "Developer",
  headline: "Full Stack Developer | Open Source Enthusiast",
  bio: "Full stack developer who loves building products and sharing knowledge with the community.",
  location: "Jaipur, India",
  joinedAt: "2021-05-01T00:00:00.000Z",
  professionalTitle: "Full Stack Developer",
  company: "Freelance",
  experienceLevel: "mid",
  availability: "open_to_work",
  socialLinks: {
    website: "https://aaryanverma.dev",
    github: "https://github.com/aaryan-dev",
    twitter: "https://x.com/aaryandev",
    linkedin: "https://linkedin.com/in/aaryanverma",
    youtube: "https://youtube.com/@aaryandev",
  },
  // Raw numbers — compact formatting ("4.2K") happens at render time, not here.
  stats: { posts: 128, comments: 542, followers: 4200, following: 286 },
  connectionStatus: "own",
};

const MOCK_POSTS: PostSummary[] = [
  {
    id: "post_1",
    author: { name: "Aaryan Verma" },
    createdAtLabel: "2h ago",
    body: "Just shipped a new feature for resource collections. Would love your feedback! 🚀",
    reactions: { likes: 128, comments: 24, shares: 12 },
  },
  {
    id: "post_2",
    author: { name: "Aaryan Verma" },
    createdAtLabel: "1d ago",
    body: "Wrote a short guide on windowed rendering for long lists in React — link in bio. Feedback welcome!",
    reactions: { likes: 86, comments: 9, shares: 31 },
  },
];

const MOCK_RESOURCES: ResourceItem[] = [
  {
    id: "resource_1",
    title: "Windowed Rendering for Long Lists — a practical guide",
    sourceLabel: "Saved from dev.to · 3 days ago",
  },
  {
    id: "resource_2",
    title: "sangum/component-library",
    sourceLabel: "github.com · Bookmarked",
  },
  {
    id: "resource_3",
    title: "Community AMA: Scaling React Apps — notes",
    sourceLabel: "Shared in MERN Developers · 1 week ago",
  },
];

const MOCK_COMMUNITIES: CommunitySummary[] = [
  { id: "community_1", name: "MERN Developers", memberCountLabel: "12.4K members", avatarInitials: "N", avatarColorToken: "success" },
  { id: "community_2", name: "TypeScript Nation", memberCountLabel: "8.1K members", avatarInitials: "TS", avatarColorToken: "info" },
  { id: "community_3", name: "Open Source Collective", memberCountLabel: "3.9K members", avatarInitials: "OS", avatarColorToken: "primary" },
  { id: "community_4", name: "Frontend & UI Design", memberCountLabel: "6.7K members", avatarInitials: "UI", avatarColorToken: "warning" },
];

/* ============================================================
 * Service functions
 * ============================================================ */

export async function fetchProfile(username: string): Promise<ProfileData> {
  // TODO(express-integration): replace with:
  // return apiRequest<ProfileData>(`/api/users/${username}/profile`);
  void username; // mock ignores the param for now
  await simulateLatency();
  return MOCK_PROFILE;
}

export async function updateProfile(
  payload: Partial<EditProfileFormData>,
): Promise<Partial<ProfileData>> {
  // TODO(express-integration): replace with:
  // return apiRequest<Partial<ProfileData>>(`/api/users/me/profile`, {
  //   method: "PATCH",
  //   body: JSON.stringify(payload),
  // });
  await simulateLatency();
  return payload as Partial<ProfileData>;
}

export interface ProfileContent {
  posts: PostSummary[];
  resources: ResourceItem[];
  communities: CommunitySummary[];
}

export async function fetchProfileContent(username: string): Promise<ProfileContent> {
  // TODO(express-integration): replace with:
  // return apiRequest<ProfileContent>(`/api/users/${username}/profile-content`);
  void username;
  await simulateLatency();
  return { posts: MOCK_POSTS, resources: MOCK_RESOURCES, communities: MOCK_COMMUNITIES };
}

export interface UploadedImage {
  url: string;
}

export async function uploadAvatar(file: File): Promise<UploadedImage> {
  // TODO(express-integration): replace with a multipart upload, e.g.:
  // const form = new FormData();
  // form.append("avatar", file);
  // return apiRequest<UploadedImage>(`/api/users/me/avatar`, { method: "POST", body: form });
  await simulateLatency();
  // Mock returns a local object URL so the preview still works without a backend.
  return { url: URL.createObjectURL(file) };
}

export async function uploadCover(file: File): Promise<UploadedImage> {
  // TODO(express-integration): replace with a multipart upload, e.g.:
  // const form = new FormData();
  // form.append("cover", file);
  // return apiRequest<UploadedImage>(`/api/users/me/cover`, { method: "POST", body: form });
  await simulateLatency();
  return { url: URL.createObjectURL(file) };
}
