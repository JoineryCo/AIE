import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Estimator Dashboard - Multi-Agent Joinery Estimation System",
  description: "AI-powered estimation dashboard for joinery tendering",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full w-full overflow-hidden">
        {children}
      </body>
    </html>
  );
}
