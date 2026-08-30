import { Metadata } from "next";
import InternshipFormClient from "./InternshipFormClient";

export const metadata: Metadata = {
  title: "Internship Application Form | First Option Agency",
  description:
    "Apply for internship roles in Full Stack Development, React/Next.js, UI/UX Design, Graphic Design, Video Editing, Market Research, and Performance Marketing at First Option Agency.",
  alternates: {
    canonical: "/internship",
  },
  openGraph: {
    title: "Internship Application | First Option Agency",
    description:
      "Apply for high-impact internship opportunities across Web Development, Graphic Design, Video Editing, UI/UX, and Performance Marketing.",
    url: "https://firstoptionagency.com/internship",
    type: "website",
  },
};

export default function InternshipPage() {
  return <InternshipFormClient />;
}
