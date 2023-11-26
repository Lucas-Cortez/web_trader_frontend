import { NextAuthProvider } from "@/providers/NextAuthProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster as ShadToaster } from "@/components/ui/toaster";
import { Toaster as HotToaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WebTrader",
  description: "Plataforma de auto-trading",
};

// export const dynamic = "force-static";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${inter.className}`}>
        <NextAuthProvider>{children}</NextAuthProvider>
        <ShadToaster />
        <HotToaster />
      </body>
    </html>
  );
}
