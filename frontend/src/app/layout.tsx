import type { Metadata } from "next";
import { Outfit, Fira_Code } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Script from "next/script";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vinish | Portfolio",
  description: "Dynamic Portfolio of Vinish - Web Developer & Designer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${firaCode.variable}`}>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Script src="https://platform.linkedin.com/badges/js/profile.js" strategy="lazyOnload" type="text/javascript" />
      </body>
    </html>
  );
}
