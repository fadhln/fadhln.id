import { Geist, Geist_Mono } from "next/font/google";

import Footer from "./Footer";
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
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className="relative mx-auto flex min-h-full max-w-380">
        <SideBar />
        <div className="flex flex-1 flex-col">
          <main className="diagonal-stripes flex min-h-svh flex-col">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
