"use client";

import { SessionProvider, useSession as useNextAuthSession } from "next-auth/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

export function useAuthSession() {
  return useNextAuthSession();
}
