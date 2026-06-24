import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import { profile } from "@/content/site";
import { Providers } from "@/components/providers";
import { Backdrop } from "@/components/ui/backdrop";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { Preloader } from "@/components/ui/preloader";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "700"],
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const description =
  "Tushar Rathod — Software Engineer at Wayfair building multi-agent GenAI data tooling and resilient distributed systems. Linux enthusiast, gamer, and sci-fi nerd.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.url),
  title: {
    default: "Tushar Rathod — Software Engineer",
    template: "%s · Tushar Rathod",
  },
  description,
  keywords: [
    "Tushar Rathod",
    "Software Engineer",
    "Wayfair",
    "Distributed Systems",
    "GenAI",
    "Kubernetes",
    "Microservices",
    "Backend Engineer",
    "Portfolio",
  ],
  authors: [{ name: profile.name, url: profile.url }],
  creator: profile.name,
  openGraph: {
    type: "website",
    url: profile.url,
    title: "Tushar Rathod — Software Engineer",
    description,
    siteName: "Tushar Rathod",
    images: [{ url: "/tushar.jpg", width: 1200, height: 630, alt: profile.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tushar Rathod — Software Engineer",
    description,
    images: ["/tushar.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${mono.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="grain relative flex min-h-full flex-col bg-concrete-950 text-chalk">
        <Providers>
          <Preloader />
          <Backdrop />
          <CustomCursor />
          <Navbar />
          <main className="relative flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
