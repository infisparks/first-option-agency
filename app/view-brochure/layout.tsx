import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Best Marketing Strategy Roadmap | Performance Agency Gurgaon | First Option Agency",
  description: "View the First Option Agency growth roadmap. Discover how we scale businesses through performance marketing, lead generation, and sales funnels.",
  keywords: "Best Marketing Agency Gurgaon, ROI Marketing Delhi NCR, Lead Generation Agency India, Performance Marketing Gurgaon, Marketing Strategy Roadmap, Sales Funnel Optimization",
  openGraph: {
    title: "First Option Agency - Professional Marketing Roadmap",
    description: "Transform your business acquisition with India's most reliable performance agency. View our strategic roadmap.",
    images: ["/brochure/roadmap.png"],
  },
};

export default function BrochureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
