export interface Service {
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  tag: string;
  icon: string; // Icon name from lucide-react
  image: string;
  benefits: string[];
  mainKeyword: string;
}

export const SERVICES: Service[] = [
  {
    slug: "performance-marketing",
    title: "Performance Marketing",
    tag: "Paid Ads",
    shortDesc: "Drive high-intent traffic and maximize your ROI with data-driven ad campaigns.",
    fullDesc: "Our performance marketing services are designed for ambitious businesses that demand measurable results. We don't just focus on clicks; we focus on conversions, growth, and sustainable revenue. Our team manages your entire ad ecosystem across Google, Meta, and LinkedIn to ensure every dollar spent contributes to your bottom line.",
    icon: "Activity",
    image: "/service/performance-marketing-agency-roi.webp",
    benefits: [
      "Precision Audience Targeting",
      "Real-time ROI Tracking",
      "High-Converting Ad Copy",
      "Strategic Retargeting Sets"
    ],
    mainKeyword: "performance marketing agency"
  },
  {
    slug: "seo-services",
    title: "Advanced SEO Solutions",
    tag: "SEO",
    shortDesc: "Rank on the first page of Google and capture search intent before your competitors.",
    fullDesc: "Search Engine Optimization is the backbone of organic growth. We specialize in global SEO strategies, ensuring you rank for high-intent keywords that your customers are searching for across the globe. From technical SEO audits to advanced content engines, we help you dominate search results.",
    icon: "Search",
    image: "/service/advanced-seo-solutions-agency.webp",
    benefits: [
      "Keyword Research & Strategy",
      "On-Page Optimization",
      "Technical SEO Audits",
      "Quality Link Building"
    ],
    mainKeyword: "best SEO agency"
  },
  {
    slug: "lead-generation",
    title: "Strategic Lead Generation",
    tag: "Leads",
    shortDesc: "Consistent flow of qualified leads for B2B, Manufacturers, and IT Companies.",
    fullDesc: "Stop chasing dead leads. Our global lead generation system uses advanced funnel architecture to qualify prospects before they ever reach your sales team. We help Manufacturers, IT Companies, and Healthcare providers worldwide get serious inquiries that turn into sales.",
    icon: "UserPlus",
    image: "/service/strategic-lead-generation-system.webp",
    benefits: [
      "Qualified Lead Filtering",
      "Multi-Channel Acquisition",
      "CRM Integration",
      "Automated Follow-ups"
    ],
    mainKeyword: "lead generation company"
  },
  {
    slug: "sales-funnel-optimization",
    title: "Sales Funnel Optimization",
    tag: "Conversion",
    shortDesc: "Convert 3x more visitors into customers with automated high-converting funnels.",
    fullDesc: "A website without a funnel is just a brochure. We build intelligent sales funnels that guide your prospects through the awareness, consideration, and decision stages automatically. Our funnels are optimized for high-ticket sales and complex buyer journeys.",
    icon: "Layout",
    image: "/service/high-converting-sales-funnel-expert.webp",
    benefits: [
      "Landing Page Optimization",
      "Email Marketing Automation",
      "A/B Testing Strategies",
      "Reduced Customer Acquisition Cost"
    ],
    mainKeyword: "sales funnel expert"
  },
  {
    slug: "content-marketing-strategy",
    title: "Content Marketing 2.0",
    tag: "Creative",
    shortDesc: "Psychology-backed content that builds authority and drives engagement.",
    fullDesc: "Content is only King if it converts. We create persuasive copy and creative assets that resonate with your target audience's pain points and desires. Our strategy ensures your brand is perceived as the ultimate authority in your industry.",
    icon: "FileText",
    image: "/service/authority-content-marketing-strategy.webp",
    benefits: [
      "Authority Building Content",
      "Persuasive Sales Copy",
      "Visual Storytelling",
      "Cross-Platform Strategy"
    ],
    mainKeyword: "content marketing agency"
  }
];
