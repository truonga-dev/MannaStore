import type { Metadata } from "next";
import BrandNav from "@/components/brand-landing/BrandNav";
import BrandHero from "@/components/brand-landing/BrandHero";
import BrandAbout from "@/components/brand-landing/BrandAbout";
import BrandVision from "@/components/brand-landing/BrandVision";
import BrandMeaning from "@/components/brand-landing/BrandMeaning";
import BrandEcosystem from "@/components/brand-landing/BrandEcosystem";
import BrandPhilosophy from "@/components/brand-landing/BrandPhilosophy";
import BrandLifestyle from "@/components/brand-landing/BrandLifestyle";
import BrandMessage from "@/components/brand-landing/BrandMessage";
import BrandFeatures from "@/components/brand-landing/BrandFeatures";
import BrandExperienceFlow from "@/components/brand-landing/BrandExperienceFlow";
import BrandFinalCTA from "@/components/brand-landing/BrandFinalCTA";
import BrandFooter from "@/components/brand-landing/BrandFooter";
import BrandCursor from "@/components/brand-landing/BrandCursor";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://manna-store-eight.vercel.app"),
  title: "Manna Store — Trang bị đức tin vào từng ngày",
  description:
    "Manna Store — Christian Lifestyle Brand. Khám phá một không gian nơi đức tin, phong cách và những điều có ý nghĩa gặp nhau trong đời sống thường nhật.",
  openGraph: {
    title: "Manna Store — Trang bị đức tin vào từng ngày",
    description:
      "Christian Lifestyle × Faith × Fashion × Meaning. Khám phá dự án Manna Store.",
    url: "https://manna-store-eight.vercel.app/manna-landing",
    siteName: "Manna Store",
    images: [
      {
        url: "/banners/banner2_v2.jpg",
        width: 1200,
        height: 630,
        alt: "Manna Store Brand Presentation",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
};

export default function MannaLandingPage() {
  return (
    <div className="relative min-h-screen bg-[#FAF8F5] dark:bg-[#0B0F18] text-[#0B1B3D] dark:text-[#F8F7F4] selection:bg-[#0B1B3D] selection:text-white dark:selection:bg-white dark:selection:text-[#0B1B3D] overflow-x-hidden">
      {/* Dynamic Ambient Glassmorphism Lighting Mesh (Glowing Orbs Behind Glass) */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Warm Golden / Champagne Orb */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#D4AF37]/20 via-[#C5A880]/15 to-transparent blur-[120px] dark:from-[#D4AF37]/10" />
        
        {/* Soft Sage / Olive Orb */}
        <div className="absolute top-[25%] -right-32 w-[650px] h-[650px] rounded-full bg-gradient-to-bl from-[#5B6E57]/18 via-[#7C8B74]/10 to-transparent blur-[130px] dark:from-[#5B6E57]/10" />
        
        {/* Soft Peach / Amber Dawn Orb */}
        <div className="absolute top-[50%] left-[10%] w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-amber-200/20 via-orange-100/15 to-transparent blur-[140px] dark:from-amber-500/5" />
        
        {/* Deep Slate / Charcoal Atmospheric Orb */}
        <div className="absolute top-[75%] -right-20 w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-[#0B1B3D]/12 via-[#15274d]/8 to-transparent blur-[130px] dark:from-blue-500/5" />

        {/* Subtle Organic Dot Matrix Grid */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle at 1.5px 1.5px, currentColor 1.5px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Custom Glassmorphism Interactive Cursor */}
      <BrandCursor />

      {/* 1. Minimal Glass Navigation */}
      <BrandNav />

      <main>
        {/* 2. Cinematic Hero (Brand Concept 3D Composition) */}
        <BrandHero />

        {/* 3. What is Manna Store? */}
        <BrandAbout />

        {/* 4. The Vision */}
        <BrandVision />

        {/* 5. The Meaning Behind Manna */}
        <BrandMeaning />

        {/* 6. Product Ecosystem (Conceptual Categories: APPAREL, BOOKS, ACCESSORIES, GIFTS) */}
        <BrandEcosystem />

        {/* 7. Brand Philosophy (FAITH, PURPOSE, LOVE) */}
        <BrandPhilosophy />

        {/* 8. Visual / Lifestyle Showcase */}
        <BrandLifestyle />

        {/* 9. Christian Message */}
        <BrandMessage />

        {/* 10. Project Features (DISCOVER, CONNECT, EXPRESS, SHARE) */}
        <BrandFeatures />

        {/* 11. Experience Flow (DISCOVER -> EXPLORE -> CONNECT -> EXPERIENCE) */}
        <BrandExperienceFlow />

        {/* 12. Final Call To Action */}
        <BrandFinalCTA />
      </main>

      {/* 13. Minimal Brand Footer */}
      <BrandFooter />
    </div>
  );
}
