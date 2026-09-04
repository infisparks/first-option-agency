import { Metadata } from "next";
import InternshipFormClient from "./InternshipFormClient";

export const metadata: Metadata = {
  metadataBase: new URL("https://firstoptionagency.com"),
  title: "Internship Drive 2026 | First Option Agency",
  description:
    "Apply for the Official Internship Drive 2026 at First Option Agency in Graphic Design, Web Development (HTML, JS, Next.js), Video Editing, Sales Consultation, and Performance Marketing.",
  keywords: [
    "internship drive 2026",
    "digital marketing internship",
    "web development internship",
    "video editing internship",
    "sales consultant internship",
    "performance marketing internship",
    "First Option Agency",
  ],
  alternates: {
    canonical: "https://firstoptionagency.com/internship",
  },
  openGraph: {
    title: "Internship Drive 2026 | First Option Agency",
    description:
      "Kickstart your career with high-impact internship opportunities in Web Development, Graphic Design, Video Editing, Sales, and Performance Marketing. Apply now!",
    url: "https://firstoptionagency.com/internship",
    siteName: "First Option Agency",
    images: [
      {
        url: "https://firstoptionagency.com/thumbnail_whatsapp.png",
        width: 1200,
        height: 630,
        alt: "First Option Agency - Internship Drive 2026",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Internship Drive 2026 | First Option Agency",
    description:
      "Apply now for high-impact internship opportunities in Web Development, Video Editing, Performance Marketing, and Sales at First Option Agency.",
    images: ["https://firstoptionagency.com/thumbnail_whatsapp.png"],
  },
};

import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export default function InternshipPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#F5F6F8",
          }}
        >
          <Loader2 size={32} className="animate-spin text-[#7C3AED]" />
        </div>
      }
    >
      <InternshipFormClient />
    </Suspense>
  );
}
