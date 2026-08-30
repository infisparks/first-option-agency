export interface SkillOption {
  id: string;
  title: string;
  desc: string;
}

export const TARGET_SKILLS: SkillOption[] = [
  {
    id: "sales_consultant",
    title: "Sales Consultant",
    desc: "Client outreach, lead communication & deal closing",
  },
  {
    id: "meta_ads_manager",
    title: "Meta Ads Manager",
    desc: "Facebook & Instagram performance marketing & ad campaigns",
  },
  {
    id: "video_editing",
    title: "Video Editing",
    desc: "Commercial video editing, reels, shorts & creative post-production",
  },
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
