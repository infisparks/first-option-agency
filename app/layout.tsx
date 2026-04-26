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
  title: "First Option Agency | Smart Funnels That Drive Customers",
  description:
    "We build systems that turn enquiries into paying clients. Predictable growth, serious inquiries, and real revenue for Doctors, Manufacturers, and IT Companies.",
  keywords:
    "marketing agency, sales funnels, lead generation, conversion rate optimization, ROI marketing, performance marketing, First Option Agency",
  authors: [{ name: "First Option Agency" }],
  openGraph: {
    title: "First Option Agency | We Build Systems That Turn Enquiries Into Paying Clients",
    description: "Turn your business into a client-getting machine with predictable growth systems.",
    url: "https://firstoptionagency.com",
    siteName: "First Option Agency",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "First Option Agency Marketing Systems",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "First Option Agency | Smart Funnels That Drive Customers",
    description: "We build systems that turn enquiries into paying clients.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/meta-logo.png",
    shortcut: "/meta-logo.png",
    apple: "/meta-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
