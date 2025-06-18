"use client";

import { useAuth } from "@/contexts/auth-context";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import LoadingScreen from "@/components/loaders/loading-screen";
import { useUserStore } from "@/store/use-user-store";
import { User } from "@/types/user";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useUserStore((state: { user: User | null }) => state.user);
  const { loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user && !pathname.startsWith("/auth")) {
      router.push("/auth/login");
    }
  }, [user, loading, router, pathname]);

  if (loading) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
}
