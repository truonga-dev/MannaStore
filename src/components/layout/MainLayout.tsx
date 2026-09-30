"use client";

import { usePathname } from 'next/navigation';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ZaloChatWidget from "@/components/layout/ZaloChatWidget";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');
  const isLanding = pathname === '/' || pathname?.includes('landing');

  return (
    <>
      {!isAdmin && !isLanding && <Header />}
      <main className="flex-1">{children}</main>
      {!isAdmin && !isLanding && <Footer />}
      {!isAdmin && !isLanding && <ZaloChatWidget />}
    </>
  );
}
