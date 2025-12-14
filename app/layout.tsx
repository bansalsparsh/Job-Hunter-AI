import type { Metadata } from "next";
// If you are using Google fonts, keep your imports. 
// If your file looks different regarding fonts, just add the lines marked below.
import { Analytics } from "@vercel/analytics/react"; // <--- 1. ADD THIS IMPORT
import "./globals.css";

export const metadata: Metadata = {
  title: "Job Hunter AI",
  description: "AI Powered Resume Scanner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
