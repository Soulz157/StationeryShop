import { fetchClient } from "@/lib/fetcher";
import { UpdateProfilePayload } from "@/types";

export const profileService = {
  updateProfile: (data: UpdateProfilePayload) =>
    fetchClient("/api/authorized/auth/me", {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  getProfile: () =>
    fetchClient("/api/authorized/auth/me", {
      method: "GET",
    }),
};
