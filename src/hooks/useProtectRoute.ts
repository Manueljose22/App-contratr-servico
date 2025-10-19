"use client"

import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useProtectRoute = (requiredRole?: string) => {
  const router = useRouter();
  const { user } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!user) {
      router.replace("/");
    } else if (requiredRole && user.role !== requiredRole) {
      router.replace("/");
    } else {
      setIsChecking(false);
    }
  }, [user, requiredRole, router]);

  return { isChecking };
};

