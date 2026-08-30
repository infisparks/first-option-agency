export interface SkillCategory {
  category: string;
  skills: string[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Design & Creative",
    skills: [
      "Graphic Design",
      "UI/UX Design",
      "Figma",
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Adobe Premiere Pro",
      "Adobe After Effects",
      "Canva",
      "Video Editing",
      "Motion Graphics",
      "3D Design / Blender",
      "Brand Identity Design",
      "Thumbnail Design",
    ],
  },
  {
    category: "Web & Software Development",
    skills: [
      "HTML5",
      "CSS3 / Tailwind CSS",
      "JavaScript (ES6+)",
      "TypeScript",
      "React.js",
      "Next.js",
      "Node.js",
      "Express.js",
      "Python",
      "Java",
      "C++",
      "SQL / PostgreSQL",
      "MongoDB",
      "Git & GitHub",
      "REST APIs",
      "WordPress",
      "Shopify",
    ],
  },
  {
    category: "Marketing & Strategy",
    skills: [
      "Market Research",
      "SEO (Search Engine Optimization)",
      "Google Ads (PPC)",
      "Meta Ads (Facebook & Instagram)",
      "Social Media Marketing",
      "Content Writing",
      "Copywriting",
      "Email Marketing",
      "Conversion Rate Optimization (CRO)",
      "Google Analytics 4",
      "Performance Marketing",
    ],
  },
  {
    category: "Business & Management",
    skills: [
      "Business Development",
      "Sales & Outreach",
      "Lead Generation",
      "Data Analysis (Excel / Sheets)",
      "Power BI",
      "Project Management",
      "Client Communication",
      "Human Resources (HR)",
    ],
  },
];

export const POPULAR_SKILLS = [
  "Graphic Design",
  "HTML5",
  "JavaScript",
  "Next.js",
  "React.js",
  "Adobe Premiere Pro",
  "Figma",
  "UI/UX Design",
  "Video Editing",
  "Market Research",
  "SEO",
  "Copywriting",
  "Social Media Marketing",
  "Python",
  "Tailwind CSS",
];

export const QUALIFICATION_OPTIONS = [
  "12th Standard / Higher Secondary (10+2) Completed",
  "Diploma / Polytechnic (Completed)",
  "Pursuing Bachelor's Degree (1st / 2nd / 3rd / Final Year)",
  "Bachelor's Degree Completed (Graduate)",
  "Pursuing Master's Degree / Post-Graduation",
  "Master's Degree Completed (Post-Graduate)",
  "Doctorate / PhD / Other Professional Degree",
];

export const STREAM_OPTIONS = [
  "B.Tech / B.E (Computer Science / IT / AI / DS)",
  "B.Tech / B.E (Electronics / Mechanical / Civil / Other)",
  "BCA (Bachelor of Computer Applications)",
  "B.Sc (Computer Science / Information Technology)",
  "B.Sc (Other Science Streams)",
  "BBA / BMS (Business & Marketing)",
  "B.Com / Accounting / Finance",
  "B.Des / BFA (Design / Fine Arts / Animation)",
  "BA (Humanities / English / Mass Comm / Journalism)",
  "MCA (Master of Computer Applications)",
  "M.Tech / M.E (Computer Science / Engineering)",
  "MBA / PGDM (Marketing / HR / Operations / Finance)",
  "M.Sc / MA / M.Com",
  "12th Science (PCM / PCB)",
  "12th Commerce",
  "12th Arts / Humanities",
  "Other / Vocational",
];

export const PASSING_YEARS = [
  "2029 or later",
  "2028",
  "2027",
  "2026",
  "2025",
  "2024",
  "2023",
  "2022",
  "2021",
  "2020",
  "Before 2020",
];

export const INTERNSHIP_ROLES = [
  "Frontend Web Development (React / Next.js)",
  "Full Stack / Backend Development (Node / Python / Next.js)",
  "UI/UX Design & Product Design (Figma)",
  "Graphic Design & Visual Creatives (Photoshop / Illustrator)",
  "Video Editing & Motion Graphics (Premiere Pro / After Effects)",
  "Performance Marketing & Ads (Meta / Google Ads)",
  "Social Media & Organic Marketing",
  "Content Writing & Copywriting",
  "Market Research & Business Development",
  "Human Resources & Talent Acquisition",
];

export const DURATION_OPTIONS = [
  "1 Month (Fast Track)",
  "2 Months",
  "3 Months (Standard)",
  "6 Months (Long-term / PPO Track)",
];

export const AVAILABILITY_OPTIONS = [
  "Immediate (Starting this week)",
  "Within 1 - 2 Weeks",
  "Within 1 Month",
  "Flexible / Next Semester",
];

export const WORK_MODES = [
  { id: "remote", label: "Remote (Work from Home)" },
  { id: "hybrid", label: "Hybrid" },
  { id: "onsite", label: "On-site / Office" },
];

export const COUNTRY_CODES = [
  { code: "+91", country: "India", flag: "🇮🇳", minDigits: 10, maxDigits: 10 },
  { code: "+1", country: "United States / Canada", flag: "🇺🇸", minDigits: 10, maxDigits: 10 },
  { code: "+44", country: "United Kingdom", flag: "🇬🇧", minDigits: 10, maxDigits: 11 },
  { code: "+971", country: "United Arab Emirates", flag: "🇦🇪", minDigits: 9, maxDigits: 9 },
  { code: "+65", country: "Singapore", flag: "🇸🇬", minDigits: 8, maxDigits: 8 },
  { code: "+61", country: "Australia", flag: "🇦🇺", minDigits: 9, maxDigits: 9 },
  { code: "+49", country: "Germany", flag: "🇩🇪", minDigits: 10, maxDigits: 11 },
  { code: "+966", country: "Saudi Arabia", flag: "🇸🇦", minDigits: 9, maxDigits: 9 },
  { code: "+880", country: "Bangladesh", flag: "🇧🇩", minDigits: 10, maxDigits: 10 },
  { code: "+977", country: "Nepal", flag: "🇳🇵", minDigits: 10, maxDigits: 10 },
];
