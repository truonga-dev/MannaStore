import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";
import Providers from "@/components/auth/Providers";
import MainLayout from "@/components/layout/MainLayout";
import AnalyticsProvider from "@/components/AnalyticsProvider";
import PixelEvents from "@/components/PixelEvents";
import SplashOnboarding from "@/components/SplashOnboarding";
import CookieConsent from "@/components/CookieConsent";
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
  title: "Manna Store",
  description: "Cửa hàng sản phẩm Cơ Đốc",
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
      <body suppressHydrationWarning className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <ThemeProvider>
          <SplashOnboarding />
        <CookieConsent />
        <Providers>
          <AnalyticsProvider>
            <Toaster position="top-center" />
            <MainLayout>
              {children}
            </MainLayout>
            <PixelEvents />
          </AnalyticsProvider>
        </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
