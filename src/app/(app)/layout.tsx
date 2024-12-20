import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";




const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OpecChats || Keep it Screcet",
  description: "Ask anything fearlessly",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo-black.svg" type="image/x-icon" sizes="any" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
