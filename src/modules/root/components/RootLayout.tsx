import { Geist, Geist_Mono } from "next/font/google";

import SideBar from "./SideBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="mx-auto flex min-h-full max-w-[2560px]">
        <SideBar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
