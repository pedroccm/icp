import type { Metadata } from "next";
import "./globals.css";
import MainNavigation from "@/components/MainNavigation";

export const metadata: Metadata = {
  title: "MADE ICP Personas - 10K Analysis",
  description: "Comprehensive creator segment profiles based on 10,000 YouTube channels",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <MainNavigation />
          {children}
        </div>
      </body>
    </html>
  );
}
