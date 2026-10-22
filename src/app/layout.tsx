import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["vietnamese"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["vietnamese"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://manna-store-eight.vercel.app"),
  title: "Manna Store — Trang bị đức tin vào từng ngày",
  description:
    "Manna Store — Christian Lifestyle Brand. Khám phá một không gian nơi đức tin, phong cách và những điều có ý nghĩa gặp nhau trong đời sống thường nhật.",
  openGraph: {
    title: "Manna Store — Trang bị đức tin vào từng ngày",
    description:
      "Christian Lifestyle × Faith × Fashion × Meaning. Khám phá thương hiệu Manna Store.",
    url: "https://manna-store-eight.vercel.app/",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col font-sans bg-background text-foreground"
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
