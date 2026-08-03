export interface Member {
  id: string;
  name: string;
  handle: string;
  avatarLabel: string;
  avatarImageUrl?: string;
  role: "admin" | "moderator" | "member";
  joinedLabel: string;
}