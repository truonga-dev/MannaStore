import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";
import Providers from "@/components/auth/Providers";
import MainLayout from "@/components/layout/MainLayout";
import AnalyticsProvider from "@/components/AnalyticsProvider";

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
      <body suppressHydrationWarning className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <Providers>
          <AnalyticsProvider>
            <Toaster position="top-center" />
            <MainLayout>
              {children}
            </MainLayout>
          </AnalyticsProvider>
        </Providers>
      </body>
    </html>
  );
}
