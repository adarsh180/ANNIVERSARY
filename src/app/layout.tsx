import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

/**
 * Root Layout
 * ===========
 * Main layout wrapper for the anniversary website.
 * 
 * CUSTOMIZATION: Update the metadata title and description below.
 */

export const metadata: Metadata = {
  title: "Happy 1st Anniversary 💕", // CUSTOMIZE: Change your title
  description: "A celebration of our one year journey together", // CUSTOMIZE: Change description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
