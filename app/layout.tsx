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
        url: "/whatsapp.png",
        width: 1200,
        height: 630,
        alt: "First Option Agency - Performance Marketing Excellence",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "First Option Agency | ROI-driven Performance Marketing",
    description: "We build systems that turn enquiries into paying clients.",
    images: ["/whatsapp.png"],
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href="/hero-bg-image.webp" as="image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "First Option Agency",
              "url": "https://firstoptionagency.com",
              "logo": "https://firstoptionagency.com/meta-logo.webp",
              "image": "https://firstoptionagency.com/og-image.webp",
              "description": "Leading ROI-driven Performance Marketing Agency specializing in lead generation, sales funnels, and SEO for B2B and High-End services.",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN"
              },
              "sameAs": [
                "https://www.linkedin.com/company/first-option-agency",
                "https://twitter.com/firstoption"
              ]
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
