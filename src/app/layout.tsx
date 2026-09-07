import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

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
  metadataBase: new URL("https://fadhln.id"),
  title: "Index • fadhln.id",
  description: "Personal site by Muhammad Fadhlan",
  openGraph: {
    type: "website",
    siteName: "fadhln.id",
    url: "/",
  },
  twitter: {
    card: "summary",
  },
  authors: [
    {
      name: "Muhammad Fadhlan",
      url: "https://fadhln.id",
    },
  ],
};

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      {children}
    </html>
  );
}
