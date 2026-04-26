import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ROI-driven Performance Marketing Agency | First Option",
  description:
    "Leading Performance Marketing Agency specializing in ROI-driven lead generation, sales funnels, and SEO for Manufacturers, IT Companies, and Healthcare across the globe.",
  keywords:
    "performance marketing agency, best SEO agency, lead generation company, sales funnel expert, ROI marketing, First Option Agency",
  authors: [{ name: "First Option Agency" }],
  openGraph: {
    title: "First Option Agency | Global ROI-driven Performance Marketing",
    description: "Build high-conversion marketing funnels and ROI-driven ad strategies for predictable business growth worldwide.",
    url: "https://firstoptionagency.com",
    siteName: "First Option Agency",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "First Option Agency - Performance Marketing",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "First Option Agency | ROI-driven Performance Marketing",
    description: "We build systems that turn enquiries into paying clients.",
    images: ["/og-image.webp"],
  },
  icons: {
    icon: "/meta-logo.webp",
    shortcut: "/meta-logo.webp",
    apple: "/meta-logo.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} antialiased`}>
      <head>
        <link rel="preload" href="/hero-bg-image.webp" as="image" />
      </head>
      <body>{children}</body>
    </html>
  );
}
