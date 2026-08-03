import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SITE_CONFIG } from "./config/siteConfig";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${SITE_CONFIG.companyName} — Official Site Under Construction`,
  description: SITE_CONFIG.subtext,
  keywords: [SITE_CONFIG.companyName, "Enterprise Networking", "Site Under Construction"],
  openGraph: {
    title: `${SITE_CONFIG.companyName} — Official Site Under Construction`,
    description: SITE_CONFIG.subtext,
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
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#0b0f19] text-slate-100 selection:bg-blue-600/30 selection:text-blue-200">
        {children}
      </body>
    </html>
  );
}
