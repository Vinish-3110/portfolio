import type { Metadata, Viewport } from "next";
import { Outfit, Fira_Code } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#08090d",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Vinish Purohit — Web Developer & Frontend Engineer (2+ Years)",
  description:
    "Portfolio of Vinish Purohit, a Web Developer with 2+ years of professional experience specializing in Next.js, React, Node.js, TypeScript, Python, and modern modular architectures.",
  keywords: [
    "Vinish Purohit",
    "Web Developer",
    "Frontend Engineer",
    "Full-Stack Developer",
    "Next.js Developer",
    "React",
    "TypeScript",
    "Node.js",
    "Python",
    "FastAPI",
  ],
  authors: [{ name: "Vinish Purohit" }],
  openGraph: {
    title: "Vinish Purohit — Web Developer & Frontend Engineer",
    description: "Building modern digital experiences & scalable web applications with Next.js, React, Node.js, and Python.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${firaCode.variable}`} suppressHydrationWarning data-scroll-behavior="smooth">
      <body suppressHydrationWarning>
        <ThemeProvider>
          {children}
          <AnalyticsTracker />
        </ThemeProvider>
        <SpeedInsights />
        <Script
          src="https://platform.linkedin.com/badges/js/profile.js"
          strategy="lazyOnload"
          type="text/javascript"
        />
      </body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  );
}
