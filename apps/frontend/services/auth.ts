import { RegisterPayload } from "@/types";
import { fetchClient } from "@/lib/fetcher";

export const authService = {
  register: (data: RegisterPayload) =>
    fetchClient("/api/public/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  async logout() {
    return fetchClient("/api/authorized/auth/logout", {
      method: "POST",
    });
  },
};
