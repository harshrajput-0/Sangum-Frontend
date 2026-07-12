import type { SidebarCommunity } from "./types";

/**
 * Placeholder — replace with your real API call (fetch, axios, tRPC,
 * react-query, etc). Shape it to return SidebarCommunity[] so Sidebar
 * doesn't need to change.
 */
export async function fetchMyCommunities(): Promise<SidebarCommunity[]> {
  const res = await fetch("/api/communities/mine");
  if (!res.ok) {
    throw new Error(`Failed to load communities (${res.status})`);
  }
  const data = await res.json();

  return data.map(
    (c: { id: string; name: string; initials: string; color: string }): SidebarCommunity => ({
      key: c.id,
      name: c.name,
      initials: c.initials,
      color: c.color,
    })
  );
}