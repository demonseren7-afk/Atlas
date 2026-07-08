import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { Nav } from "../components/Nav";
import { RegisterServiceWorker } from "../components/RegisterServiceWorker";
import "./globals.css";

export const metadata: Metadata = {
  title: "Atlas",
  description: "Atlas 是你的 AI 身体成长伙伴",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Atlas"
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" }
    ],
    apple: "/icons/apple-touch-icon.png"
  }
};

export const viewport: Viewport = {
  themeColor: "#111827"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <Nav />
        {children}
        <RegisterServiceWorker />
      </body>
    </html>
  );
}
