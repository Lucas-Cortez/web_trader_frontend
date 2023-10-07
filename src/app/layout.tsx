import { NextAuthProvider } from "@/providers/NextAuthProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WebTrader",
  description: "Plataforma de auto-trading",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <script
          src="https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js"
          async
        />
      </head>
      <body className={`${inter.className}`}>
        <NextAuthProvider>{children}</NextAuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
