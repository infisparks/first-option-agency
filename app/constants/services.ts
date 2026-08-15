export interface Service {
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  tag: string;
  icon: string; // Icon name from lucide-react
  image: string;
  secondaryImage: string;
  benefits: string[];
  mainKeyword: string;
  ctaText?: string;
}

export const SERVICES: Service[] = [
  {
    slug: "performance-marketing",
    title: "Performance Ads",
    tag: "Paid Ads",
    shortDesc: "High-intent Google & Meta campaigns engineered for conversions, not clicks.",
    fullDesc: "Our performance ad campaigns are built for ambitious businesses demanding measurable ROI. We manage your entire ad ecosystem across Google, Meta, and LinkedIn with continuous testing and data-driven creative.",
    icon: "Activity",
    image: "/service/performance-marketing-agency-roi.webp",
    secondaryImage: "/service/insideservice/performance-marketing-roi-growth.png",
    benefits: [
      "Precision Audience Targeting",
      "Real-time ROI Tracking",
      "High-Converting Ad Copy",
      "Strategic Retargeting Sets"
    ],
    mainKeyword: "performance marketing agency",
    ctaText: "Explore Ads →"
  },
  {
    slug: "seo-services",
    title: "SEO & Content",
    tag: "SEO",
    shortDesc: "Rank higher, get found first, and own your industry's search results organically.",
    fullDesc: "Dominate search engine results with advanced organic strategy. From technical SEO architecture to authoritative content, we turn search intent into sustainable, high-margin customer acquisition.",
    icon: "Search",
    image: "/service/advanced-seo-solutions-agency.webp",
    secondaryImage: "/service/insideservice/advanced-seo-solutions-strategy.png",
    benefits: [
      "Keyword Strategy & Mapping",
      "On-Page & Technical SEO",
      "Authority Content Engine",
      "High-Quality Link Building"
    ],
    mainKeyword: "best SEO agency",
    ctaText: "Boost Rankings →"
  },
  {
    slug: "sales-funnel-optimization",
    title: "Landing Page CRO",
    tag: "Conversion",
    shortDesc: "Conversion-focused pages that turn traffic into leads and leads into revenue.",
    fullDesc: "Stop burning ad budget on low-converting pages. We build high-converting landing pages and CRO systems engineered to turn cold visitors into sales-ready leads.",
    icon: "Layout",
    image: "/service/high-converting-sales-funnel-expert.webp",
    secondaryImage: "/service/insideservice/sales-funnel-optimization-conversion.png",
    benefits: [
      "Conversion-Focused UX Design",
      "Persuasive Direct Copy",
      "A/B Split Testing",
      "Higher Conversion Rates"
    ],
    mainKeyword: "sales funnel expert",
    ctaText: "See Examples →"
  },
  {
    slug: "lead-generation",
    title: "Marketing Automation",
    tag: "Leads",
    shortDesc: "Smart funnels and email flows that nurture leads while you focus on business.",
    fullDesc: "Automate your lead qualification and follow-up pipeline. We build smart funnels and email automation flows that engage prospects 24/7 and deliver booked appointments to your team.",
    icon: "UserPlus",
    image: "/service/strategic-lead-generation-system.webp",
    secondaryImage: "/service/insideservice/strategic-b2b-lead-generation.png",
    benefits: [
      "Automated Nurture Sequences",
      "CRM & Pipeline Integration",
      "Lead Scoring & Filtering",
      "24/7 Prospect Engagement"
    ],
    mainKeyword: "lead generation company",
    ctaText: "Automate Growth →"
  }
];
