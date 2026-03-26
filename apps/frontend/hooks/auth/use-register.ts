import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { authService } from "@/services/auth.service";
import { RegisterPayload } from "@/types";
import { toast } from "sonner";

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const register = async (data: RegisterPayload) => {
    setIsLoading(true);
    try {
      await authService.register(data);

      toast.success("Account created successfully! Logging you in...");

      const signInResult = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (signInResult?.error) {
        toast.error("Auto-login failed. Please login manually.");
        router.push("/login");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("เกิดข้อผิดพลาดในการเชื่อมต่อ");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading };
}
