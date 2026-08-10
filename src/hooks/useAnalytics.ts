"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export function useAnalytics() {
  const pathname = usePathname();
  const { data: session } = useSession();

  useEffect(() => {
    // Only track if we are in browser
    if (typeof window !== "undefined") {
      fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "pageview",
          path: pathname,
          userId: session?.user?.id || null,
        }),
      }).catch(err => console.error("Analytics tracking failed:", err));
    }
  }, [pathname, session?.user?.id]);

  const trackAction = (action: string, element?: string) => {
    if (typeof window !== "undefined") {
      fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "action",
          action,
          element,
          path: pathname,
          userId: session?.user?.id || null,
        }),
      }).catch(err => console.error("Analytics tracking failed:", err));
    }
  };

  return { trackAction };
}
