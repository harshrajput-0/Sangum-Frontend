import { Member } from "./types";

// TODO: Replace with Express API integration — GET /api/communities/:slug/members
export const mockMembers: Member[] = [
  {
    id: "member-1",
    name: "Arjun Sharma",
    handle: "arjunsharma",
    avatarLabel: "AS",
    role: "admin",
    joinedLabel: "Joined May 2021",
  },
  {
    id: "member-2",
    name: "Priya Nair",
    handle: "priyanair",
    avatarLabel: "PN",
    role: "moderator",
    joinedLabel: "Joined Jul 2021",
  },
  {
    id: "member-3",
    name: "Ankit Verma",
    handle: "ankitverma",
    avatarLabel: "AV",
    role: "member",
    joinedLabel: "Joined Jan 2022",
  },
  {
    id: "member-4",
    name: "Neha Singh",
    handle: "nehasingh",
    avatarLabel: "NS",
    role: "member",
    joinedLabel: "Joined Mar 2022",
  },
];