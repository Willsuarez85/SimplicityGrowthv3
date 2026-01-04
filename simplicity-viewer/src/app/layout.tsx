import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SidebarWrapper } from "@/components/SidebarWrapper";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Simplicity Viewer",
  description: "Client dashboard for Simplicity Growth Marketing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex h-screen overflow-hidden">
          <SidebarWrapper />
          <main className="flex-1 overflow-auto bg-white">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
