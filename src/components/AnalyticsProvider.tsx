"use client";

import { useAnalytics } from "@/hooks/useAnalytics";

export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  useAnalytics();
  return <>{children}</>;
}
