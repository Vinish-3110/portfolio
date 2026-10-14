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

export async function generateMetadata(): Promise<Metadata> {
  try {
    const base = process.env.NEXT_PUBLIC_API_URL || 'https://api.vinishpurohit.in/api';
    const response = await fetch(`${base}/profile`, { next: { revalidate: 60 } });
    if (!response.ok) return { title: 'Portfolio' };
    const profile = await response.json();
    const copy = profile.site_settings?.copy || {};
    return {
      title: copy.seoTitle || profile.display_name || 'Portfolio',
      description: copy.seoDescription || profile.hero_description || '',
      authors: profile.engineer_name ? [{ name: profile.engineer_name }] : undefined,
      openGraph: {
        title: copy.seoTitle || profile.display_name || 'Portfolio',
        description: copy.seoDescription || profile.hero_description || '',
        type: 'website',
        locale: 'en_US',
      },
    };
  } catch {
    return { title: 'Portfolio' };
  }
}

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
