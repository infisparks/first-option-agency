import { Metadata } from "next";
import SalesConsultantFormClient from "./SalesConsultantFormClient";

export const metadata: Metadata = {
  metadataBase: new URL("https://firstoptionagency.com"),
  title: "Sales Consultant – Application Form | First Option Agency",
  description:
    "Apply for the Sales Consultant position at First Option Agency. Join our high-performance sales team driving client acquisitions, agency outreach, and revenue growth. 100% Free Application.",
  keywords: [
    "sales consultant application",
    "sales jobs",
    "business development",
    "agency sales representative",
    "performance marketing sales",
    "First Option Agency careers",
  ],
  alternates: {
    canonical: "https://firstoptionagency.com/sales-consultant",
  },
  openGraph: {
    title: "Sales Consultant – Application Form | First Option Agency",
    description:
      "Join First Option Agency as a Sales Consultant. High commissions, growth opportunities, and client acquisition projects. Apply online for free!",
    url: "https://firstoptionagency.com/sales-consultant",
    siteName: "First Option Agency",
    images: [
      {
        url: "https://firstoptionagency.com/thumbnail_whatsapp.png",
        width: 1200,
        height: 630,
        alt: "First Option Agency - Sales Consultant Application Form",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sales Consultant – Application Form | First Option Agency",
    description:
      "Join First Option Agency as a Sales Consultant. Apply online for free today!",
    images: ["https://firstoptionagency.com/thumbnail_whatsapp.png"],
  },
};

import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export default function SalesConsultantPage() {
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <Loader2
              size={36}
              className="animate-spin"
              style={{ color: "#7C3AED" }}
            />
            <span
              style={{
                fontSize: "14px",
                color: "#6B7280",
                fontWeight: 500,
              }}
            >
              Loading Application Form...
            </span>
          </div>
        </div>
      }
    >
      <SalesConsultantFormClient />
    </Suspense>
  );
}
