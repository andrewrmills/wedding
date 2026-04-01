import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "mcw_bc_search",
  description: "A lightweight, mobile-friendly React (Vite) web app that searches Microsoft Business Central CRM Contacts via API. This is a local proof-of-concept.
",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
