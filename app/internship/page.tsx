import { Metadata } from "next";
import InternshipFormClient from "./InternshipFormClient";

export const metadata: Metadata = {
  metadataBase: new URL("https://firstoptionagency.com"),
  title: "Women's Internship Drive 2026 | First Option Agency",
  description:
    "Exclusive Internship Drive for female candidates and girls in Graphic Design, Web Development (HTML, JS, Next.js), Video Editing (Premiere Pro), Market Research, and Performance Marketing at First Option Agency.",
  keywords: [
    "internship for girls",
    "women in tech internship",
    "graphic design internship",
    "web development internship",
    "video editing internship",
    "performance marketing internship",
    "First Option Agency",
  ],
  alternates: {
    canonical: "https://firstoptionagency.com/internship",
  },
  openGraph: {
    title: "Women's Internship Drive 2026 | First Option Agency",
    description:
      "Exclusive internship opportunities for female students and graduates in Web Development, Graphic Design, Video Editing, and Performance Marketing. Apply now!",
    url: "https://firstoptionagency.com/internship",
    siteName: "First Option Agency",
    images: [
      {
        url: "https://firstoptionagency.com/thumbnail_whatsapp.png",
        width: 1200,
        height: 630,
        alt: "First Option Agency - Women's Internship Drive 2026",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Women's Internship Drive 2026 | First Option Agency",
    description:
      "Exclusive internship opportunities for female students and graduates in Web Development, Graphic Design, Video Editing, and Performance Marketing.",
    images: ["https://firstoptionagency.com/thumbnail_whatsapp.png"],
  },
};

export default function InternshipPage() {
  return <InternshipFormClient />;
}
