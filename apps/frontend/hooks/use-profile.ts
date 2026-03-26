"use client";
import { useCallback, useEffect, useState } from "react";
import { UserProfile } from "@/types";
import { profileService } from "@/services/profile.service";
import { useSession } from "next-auth/react";

export function useProfile() {
  const { status } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await profileService.getProfile();
      setProfile(data.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === "loading") {
      return;
    } else if (status === "unauthenticated") {
      setLoading(false);
      setProfile(null);
    } else {
      fetchProfile();
    }
  }, [fetchProfile, status]);

  return { profile, loading, error, refetch: fetchProfile };
}
