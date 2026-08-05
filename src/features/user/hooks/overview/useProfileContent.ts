import { useEffect, useState } from "react";
import { fetchProfileContent } from "../../services/profile.service";
import type {
  CommunitySummary,
  PostSummary,
  ResourceItem,
} from "../../types/profile.types";

export interface UseProfileContentResult {
  posts: PostSummary[];
  resources: ResourceItem[];
  communities: CommunitySummary[];
  isLoading: boolean;
  error: string | null;
}

export function useProfileContent(username: string): UseProfileContentResult {
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [communities, setCommunities] = useState<CommunitySummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);

    fetchProfileContent(username)
      .then((data) => {
        if (cancelled) return;
        setPosts(data.posts);
        setResources(data.resources);
        setCommunities(data.communities);
      })
      .catch(() => {
        if (!cancelled) setError("We couldn't load this profile's content.");
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [username]);

  return { posts, resources, communities, isLoading, error };
}
