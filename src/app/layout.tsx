import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Supply Chain Risk Predictor — Predict Disruptions Before They Happen",
  description: "Real-time AI-powered supply chain risk intelligence platform. Predict disruptions, monitor suppliers, forecast demand, and ensure compliance with explainable machine learning.",
  keywords: ["supply chain", "risk management", "AI", "machine learning", "predictive analytics", "supplier risk", "demand forecasting", "compliance"],
  authors: [{ name: "AI Supply Chain Team" }],
  openGraph: {
    title: "AI Supply Chain Risk Predictor",
    description: "Real-time AI-powered supply chain risk intelligence. Predict disruptions before they happen.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <div className="relative min-h-screen flex flex-col">
          {children}
          <Toaster />
        </div>
      </body>
    </html>
  );
}
