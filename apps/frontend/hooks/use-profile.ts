"use client";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { UserProfile } from "@/types";

export function useProfile() {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    if (!session?.user?.accessToken) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:4000/api/auth/authorized/me", {
        headers: { Authorization: `Bearer ${session.user.accessToken}` },
      });

      if (!res.ok) throw new Error("Failed to fetch profile");

      const data = await res.json();
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
  }, [session?.user?.accessToken]);

  useEffect(() => {
    if (status !== "loading") {
      fetchProfile();
    }
  }, [fetchProfile, status]);

  return { profile, loading, error, refetch: fetchProfile };
}
