"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Hero from "@/components/sections/Hero";

export default function HomeIntro() {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const navigatedRef = useRef(false);

  useEffect(() => {
    if (navigatedRef.current) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const delay = reducedMotion ? 0 : 2000;

    timerRef.current = setTimeout(() => {
      navigatedRef.current = true;
      router.push("/portfolio");
    }, delay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [router]);

  return <Hero />;
}
