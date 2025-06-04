"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/loaders/loading-screen";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Wait for 4 seconds (100% of loading progress) before redirecting
    const timer = setTimeout(() => {
      router.push("/landing");
    }, 3500);

    return () => clearTimeout(timer);
  }, [router]);

  return <LoadingScreen />;
}
