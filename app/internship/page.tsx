import { Metadata } from "next";
import InternshipFormClient from "./InternshipFormClient";

export const metadata: Metadata = {
  title: "Women's Internship Application | First Option Agency",
  description:
    "Exclusive Internship Drive for female candidates and girls across Graphic Design, Web Development (HTML, JS, Next.js), Video Editing (Premiere Pro), Market Research, and Performance Marketing.",
  alternates: {
    canonical: "/internship",
  },
  openGraph: {
    title: "Women's Internship Drive | First Option Agency",
    description:
      "Exclusive internship opportunities for female students and graduates in Web Development, Graphic Design, Video Editing, and Performance Marketing.",
    url: "https://firstoptionagency.com/internship",
    type: "website",
  },
};

export default function InternshipPage() {
  return <InternshipFormClient />;
}
