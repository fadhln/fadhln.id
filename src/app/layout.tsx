import type { Metadata } from "next";

import RootLayout from "-/modules/root/components/RootLayout";

import "./globals.css";

export const metadata: Metadata = {
  title: "Index • fadhln.id",
  description: "Personal site by Muhammad Fadhlan",
  authors: [
    {
      name: "Muhammad Fadhlan",
      url: "https://fadhln.id",
    },
  ],
};

export default RootLayout;
