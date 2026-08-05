import { useCallback, useEffect, useState } from "react";
import { fetchProfile } from "../../services/profile.service";
import type { ProfileData } from "../../types/profile.types";

export interface UseProfileDataResult {
  profile: ProfileData | null;
  isLoading: boolean;
  error: string | null;
  setProfile: (profile: ProfileData) => void;
  refetch: () => void;
}

export function useProfileData(username: string): UseProfileDataResult {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refetchToken, setRefetchToken] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);

    fetchProfile(username)
      .then((data) => {
        if (!cancelled) setProfile(data);
      })
      .catch(() => {
        if (!cancelled) {
          setError("We couldn't load this profile. Please try again.");
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [username, refetchToken]);

  const refetch = useCallback(() => setRefetchToken((t) => t + 1), []);

  return { profile, isLoading, error, setProfile, refetch };
}
