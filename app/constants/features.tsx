import React from "react";
import { 
  Stethoscope, DollarSign, Layout, Calendar, Activity, 
  PieChart, FileText, Database, Zap, UserPlus, 
  PlusSquare, Pill, Microscope, Radio, Building2, 
  Truck, ClipboardList, ShieldCheck, HeartPulse, Boxes,
  Smartphone, BarChart3, Users, FlaskConical, Droplets
} from "lucide-react";

export interface FeatureDetail {
  slug: string;
  fullDescription: string;
  keyFeatures: string[];
  benefits: string[];
  seoKeywords: string[];
}

export interface Feature {
  id: number;
  slug: string;
  image: string;
  title: string;
  description: string;
  tag: string;
  icon?: any;
  detail: FeatureDetail;
}

export const FEATURES: Feature[] = [
  {
    id: 1,
    slug: "ai-medical-voice-scribe",
    image: "/ipd_images/opd ai prescription.webp",
    tag: "AI-Powered",
    title: "AI Medical Voice Scribe & Smart EMR",
    description: "Automate clinical documentation with our advanced AI voice scribe. Instantly transcribe symptoms and treatments into structured digital records.",
    icon: <Stethoscope size={18} />,
    detail: {
      slug: "ai-medical-voice-scribe",
      fullDescription: "Maximize clinical productivity with India's most advanced AI-powered medical voice scribe. Scale your hospital's output by automating high-fidelity documentation—instantly transcribing symptoms, histories, and clinical treatments directly into structured digital presets. Our AI understands medical terminology and context, reducing the time spent on data entry and allowing doctors to focus on patient care.",
      keyFeatures: [
        "Real-time voice-to-text transcription",
        "Medical-grade AI vocabulary",
        "Automated clinical summary generation",
        "Integration with existing EMR and HMS systems",
        "Multi-language support for diverse clinical settings"
      ],
      benefits: [
        "Saves doctors up to 2 hours of documentation daily",
        "Reduces burnout among medical staff",
        "Improves accuracy of clinical records",
        "Enhances patient-doctor interaction"
      ],
      seoKeywords: ["AI medical voice scribe", "best EMR software India", "hospital documentation automation", "smart clinic management software"]
    }
  },
  {
    id: 2,
    slug: "revenue-analytics-dashboard",
    image: "/ipd_images/opd admin.webp",
    tag: "Analytics",
    title: "Executive Revenue Analytics Dashboard",
    description: "Master your hospital's Revenue Cycle Management (RCM) with a high-density executive dashboard tracking cash vs digital collections.",
    icon: <DollarSign size={18} />,
    detail: {
      slug: "revenue-analytics-dashboard",
      fullDescription: "Master your hospital's Revenue Cycle Management (RCM) with a high-density executive dashboard. Track cash vs. digital collections in real-time, monitor department-wise growth, and gain actionable financial insights to drive practice profitability. Our dashboard provides a 360-degree view of your hospital's financial health, from daily collections to long-term revenue trends.",
      keyFeatures: [
        "Real-time revenue tracking",
        "Cash vs. Digital payment breakdown",
        "Department-wise performance metrics",
        "Automated financial forecasting",
        "Exportable reports for auditing and accounting"
      ],
      benefits: [
        "Identifies revenue leakages instantly",
        "Optimizes hospital resource allocation",
        "Empowers data-driven financial decisions",
        "Simplifies complex financial auditing"
      ],
      seoKeywords: ["hospital revenue management software", "healthcare analytics dashboard", "RCM software", "best hms software"]
    }
  },
  {
    id: 3,
    slug: "smart-appointment-booking",
    image: "/ipd_images/opd appoinment.webp",
    tag: "Digital",
    title: "Smart Appointment Booking System",
    description: "Streamline front-desk operations with a high-speed patient onboarding system and structured specialist scheduling engine.",
    icon: <Layout size={18} />,
    detail: {
      slug: "smart-appointment-booking",
      fullDescription: "Streamline your front-desk operations with a high-speed patient onboarding system. Eliminate manual entry errors with smart UHID search, automated demographic collection, and a structured specialist scheduling engine for 10x faster clinical registration. Our system ensures that patient appointments are managed efficiently, reducing wait times and improving patient satisfaction.",
      keyFeatures: [
        "Online and offline booking integration",
        "Automated SMS/Email reminders",
        "Doctor availability calendar sync",
        "Waitlist management",
        "Integrated tele-consultation scheduling"
      ],
      benefits: [
        "Reduces patient no-shows by 40%",
        "Eliminates wait-time frustration",
        "Improves front-desk productivity",
        "Smoother patient check-in experience"
      ],
      seoKeywords: ["doctor appointment booking system", "hospital patient registration software", "clinic management software", "best healthcare software"]
    }
  },
  {
    id: 4,
    slug: "intelligent-patient-queue",
    image: "/ipd_images/opd appoinment list.webp",
    tag: "Digital",
    title: "Intelligent Patient Queue Management",
    description: "Optimize patient throughput and eliminate hospital congestion with a real-time queuing module and automated status triggers.",
    icon: <Calendar size={18} />,
    detail: {
      slug: "intelligent-patient-queue",
      fullDescription: "Optimize patient throughput and eliminate hospital congestion with a real-time queuing module. Seamlessly coordinate appointments across specialized departments with automated status triggers and doctor-wise traffic filtering for a superior patient experience. Real-time updates help clinical staff manage flow effectively during peak hours.",
      keyFeatures: [
        "Live queue status display",
        "Automated token generation",
        "Priority queue management for emergencies",
        "Doctor-wise traffic analysis",
        "Mobile queue tracking for patients"
      ],
      benefits: [
        "Reduces crowd congestion in waiting areas",
        "Increases patient throughput capacity",
        "Provides predictable wait times",
        "Enhances overall patient journey"
      ],
      seoKeywords: ["patient queue management system", "hospital flow optimization", "healthcare traffic management", "best hms software"]
    }
  },
  {
    id: 5,
    slug: "specialist-performance-analytics",
    image: "/ipd_images/specialist graph.webp",
    tag: "Analytics",
    title: "Specialist Performance Analytics",
    description: "Identify top-performing consultants and departments with granular tracking and high-fidelity visual charts.",
    icon: <Activity size={18} />,
    detail: {
      slug: "specialist-performance-analytics",
      fullDescription: "Identify top-performing consultants and departments with granular specialist tracking. Use high-fidelity visual charts to analyze consultation volume, case-load trends, and department-wise revenue to optimize hospital staffing and resource allocation efficiently. Data is presented in easy-to-read graphs for executive decision-making.",
      keyFeatures: [
        "In-depth consultant performance KPIs",
        "Comparative department analysis",
        "Case-load trend visualization",
        "Revenue-per-consultant tracking",
        "Staffing optimization recommendations"
      ],
      benefits: [
        "Optimizes doctor-to-patient ratios",
        "Highlights high-growth clinical areas",
        "Improves surgical outcome tracking",
        "Enhances staff accountability"
      ],
      seoKeywords: ["healthcare specialist analytics", "doctor performance tracking", "hospital KPI software", "best hms software"]
    }
  },
  {
    id: 6,
    slug: "universal-lab-integration",
    image: "/ipd_images/lab comparision report.webp",
    tag: "Digital",
    title: "Laboratory Information System (LIS)",
    description: "Connect your diagnostic lab for instant cloud-synced reporting and trend analysis to highlight abnormal health values.",
    icon: <PieChart size={18} />,
    detail: {
      slug: "universal-lab-integration",
      fullDescription: "Connect your diagnostic lab system for instant, cloud-synced reporting. Our smart comparison engine highlights health trends and detects abnormal values (Red/Green), enabling faster clinical decisions and better patient outcomes. Our LIS covers the entire workflow from sample collection to report generation and delivery.",
      keyFeatures: [
        "Automated lab test result sync",
        "Trend analysis and health graphs",
        "Bi-directional instrument integration",
        "Abnormal value alerts",
        "Patient-facing test report portal"
      ],
      benefits: [
        "Faster turnaround time for lab reports",
        "Reduces manual data entry errors",
        "Enables longitudinal health tracking",
        "Improves diagnostic accuracy"
      ],
      seoKeywords: ["best lab management software", "LIS software", "diagnostic lab system", "blood test software company"]
    }
  },
  {
    id: 7,
    slug: "paperless-ipd-management",
    image: "/ipd_images/manage patinet ipd paper.webp",
    tag: "Paperless",
    title: "Paperless Indoor Patient File (IPD)",
    description: "Eliminate physical medical charts with a 100% paperless indoor patient file system digitally tracking nursing notes and treatments.",
    icon: <FileText size={18} />,
    detail: {
      slug: "paperless-ipd-management",
      fullDescription: "Eliminate physical medical charts with a 100% paperless indoor patient file system. Digitally track patient progress, nursing notes, and treatment charts in one secure EMR ecosystem. Streamline clinical workflows and ensure documentation continuity across the entire hospitalization cycle, from admission to discharge.",
      keyFeatures: [
        "Digitized vital sign charting",
        "Online drug administration notes",
        "Real-time nursing worklists",
        "Integrated discharge summary builder",
        "Multi-disciplinary clinical notes"
      ],
      benefits: [
        "Instant accessibility of patient files",
        "No more missing or illegible paper files",
        "Enhanced security of sensitive health data",
        "Coordinated care across medical teams"
      ],
      seoKeywords: ["IPD management software", "paperless hospital management", "EMR software", "indoor patient file system"]
    }
  },
  {
    id: 8,
    slug: "secure-medical-document-vault",
    image: "/ipd_images/ipd document.webp",
    tag: "Digital",
    title: "Secure Medical Document Vault",
    description: "Digitize and protect sensitive patient records with HIPAA-compliant storage for X-Rays, Scans and medical histories.",
    icon: <Database size={18} />,
    detail: {
      slug: "secure-medical-document-vault",
      fullDescription: "Digitize and protect sensitive patient records. Our structured Document Folder system provides secure, HIPAA-compliant storage for X-Rays, Scans, and external medical history reports in one central location. Advanced encryption ensures that only authorized personnel can access historical medical data.",
      keyFeatures: [
        "Encrypted cloud storage for DICOM images",
        "Historical medical history archiving",
        "Role-based access control (RBAC)",
        "Instant search and retrieval engine",
        "Consent-based data sharing"
      ],
      benefits: [
        "Ensures long-term data preservation",
        "Facilitates easy second opinions",
        "Reduces physical storage costs",
        "Enhances patient data privacy"
      ],
      seoKeywords: ["medical document archive system", "secure health record storage", "HIPAA compliant HMS", "best medical software"]
    }
  },
  {
    id: 9,
    slug: "intelligent-nursing-navigation",
    image: "/ipd_images/ipd paper switch paper.webp",
    tag: "Paperless",
    title: "Intelligent Nursing Navigation",
    description: "Empower nursing staff with one-tap access to patient records, ensuring continuity of care without the friction of paper browsing.",
    icon: <Zap size={18} />,
    detail: {
      slug: "intelligent-nursing-navigation",
      fullDescription: "Empower your nursing staff with one-tap access to patient records. Our floating navigation system allows for quick switching between clinical notes, ensuring continuity of care without the friction of paper browsing. This module is designed for the fast-paced hospital ward environment where speed and accuracy are paramount.",
      keyFeatures: [
        "Quick-switch patient dashboard",
        "Real-time vital alerts",
        "Nursing care plan integration",
        "Hand-over/Take-over documentation",
        "Medication administration record (MAR)"
      ],
      benefits: [
        "Decreases response time in ward care",
        "Standardizes nursing clinical practice",
        "Reduces errors in medication passing",
        "Improves shift-handover efficiency"
      ],
      seoKeywords: ["nursing station software", "ward management system", "digital nurse charting", "best hms software"]
    }
  },
  {
    id: 10,
    slug: "clinical-observation-digitization",
    image: "/ipd_images/ipd paper view.webp",
    tag: "Paperless",
    title: "Clinical Observation Digitization",
    description: "Capture clinical observations with the speed of handwriting and the efficiency of digital storage, mirroring traditional medical charts.",
    icon: <Activity size={18} />,
    detail: {
      slug: "clinical-observation-digitization",
      fullDescription: "Capture clinical observations with the speed of handwriting and the efficiency of digital storage. Mirror traditional medical charts with dynamic digital interfaces that track patient history, complaints, and drug allergies. This module bridges the gap between old-school charting and modern data analytics.",
      keyFeatures: [
        "Template-driven clinical input",
        "Drawing tools for anatomical notation",
        "Past history quick-fill options",
        "Allergy and contraindication alerts",
        "Dynamic treatment plan adjustments"
      ],
      benefits: [
        "Faster data entry than typing",
        "Maintains familiar clinical layouts",
        "Enables data extraction for research",
        "Higher accuracy in capturing symptoms"
      ],
      seoKeywords: ["clinical charting software", "medical observation digitization", "EHR systems", "best hms software company"]
    }
  },
  {
    id: 11,
    slug: "centralized-patient-intelligence",
    image: "/ipd_images/ipd patient details.webp",
    tag: "Digital",
    title: "Centralized Patient Intelligence System",
    description: "Achieve 360° clinical visibility with a centralized health record syncing registration, admissions and real-time bed assignments.",
    icon: <UserPlus size={18} />,
    detail: {
      slug: "centralized-patient-intelligence",
      fullDescription: "Achieve 360° clinical visibility with a centralized patient health record. Sync core registration, admission details, and real-time bed assignments. Empower your medical team with instant access to patient history and demographics for evidence-based care delivery. Centralized intelligence reduces data redundancy across departments.",
      keyFeatures: [
        "Universal Health ID (UHID) management",
        "Real-time bed occupancy tracking",
        "Patient demographic profiling",
        "Admission-Discharge-Transfer (ADT) sync",
        "Integrated patient billing status"
      ],
      benefits: [
        "One source of truth for patient data",
        "Faster patient check-ins and transfers",
        "Improved hospital bed management",
        "Better clinical outcome correlation"
      ],
      seoKeywords: ["centralized patient records", "hospital ADT software", "patient intelligence system", "best HMS software"]
    }
  },
  {
    id: 12,
    slug: "daily-performance-report",
    image: "/ipd_images/daily performance report.webp",
    tag: "Analytics",
    title: "Daily Performance Report (DPR)",
    description: "Gain complete hospital performance tracking with real-time operations summary including appointments, admissions and births.",
    icon: <Activity size={18} />,
    detail: {
      slug: "daily-performance-report",
      fullDescription: "Gain complete hospital performance tracking with our DPR system. Get a real-time operations summary including OPD appointments, IPD admissions, discharges, and births. Make data-driven decisions with a comprehensive service breakdown summary sent directly to your executive dashboard every morning.",
      keyFeatures: [
        "Automated daily operations summary",
        "Birth and death registry tracking",
        "Admission and discharge metrics",
        "Service-wise revenue breakdown",
        "Morning executive pulse email"
      ],
      benefits: [
        "Provides instant hospital health pulse",
        "Saves hours on manual data compilation",
        "Enhances administrative accountability",
        "Highlights operational bottlenecks daily"
      ],
      seoKeywords: ["hospital performance metrics", "healthcare operational reporting", "daily hospital report software", "best hms software"]
    }
  },
  {
    id: 13,
    slug: "ot-management-system",
    image: "/feature-image-13.png",
    tag: "Clinical",
    title: "Operation Theatre (OT) Management",
    description: "Coordinate complex surgical schedules, equipment allocation, and post-operative care tracking for maximum theatre efficiency.",
    icon: <PlusSquare size={18} />,
    detail: {
      slug: "ot-management-system",
      fullDescription: "Maximize your operation theatre utilization with an intelligent scheduling and management module. Coordinate surgical teams, equipment, anesthesia requirements, and post-operative care in one unified interface. The system ensures that theatre downtime is minimized and surgical safety protocols are followed strictly.",
      keyFeatures: [
        "OT scheduling and conflict detection",
        "Surgical team assignment",
        "Pre-operative and Post-operative notes",
        "Anesthesia record management",
        "OT consumables and stock tracking"
      ],
      benefits: [
        "Increases surgical throughput",
        "Reduces risk of scheduling conflicts",
        "Improves documentation of surgeries",
        "Enhances surgical safety compliance"
      ],
      seoKeywords: ["operation theatre software", "surgical management system", "OT scheduling software", "best hms software"]
    }
  },
  {
    id: 14,
    slug: "pharmacy-inventory-software",
    image: "/feature-image-14.png",
    tag: "Digital",
    title: "Pharmacy & Multi-Store Inventory",
    description: "Manage medicine inventory, expiry tracking, and real-time billing with integrated stock alerts and supplier management.",
    icon: <Pill size={18} />,
    detail: {
      slug: "pharmacy-inventory-software",
      fullDescription: "Transform your hospital pharmacy into a profit center with intelligent inventory management. Track stock levels across multiple locations, manage drug expiries, and automate re-ordering. Integrated billing with doctor prescriptions ensures that medications are dispensed accurately and revenue is captured instantly.",
      keyFeatures: [
        "Batch-wise inventory tracking",
        "Expiry date alerts and reports",
        "Automated purchase order generation",
        "Integrated POS and prescription billing",
        "GST-ready pharmacy accounts"
      ],
      benefits: [
        "Reduces dead stock and wastage",
        "Ensures no medication stock-outs",
        "Faster pharmacy service times",
        "Accurate drug margin analysis"
      ],
      seoKeywords: ["hospital pharmacy software", "inventory management for hospitals", "drug expiry tracking system", "best medical store software"]
    }
  },
  {
    id: 15,
    slug: "blood-bank-management",
    image: "/feature-image-15.png",
    tag: "Clinical",
    title: "Blood Bank Management System",
    description: "Track blood inventory, donor history, and cross-matching results with strict safety alerts and reporting for the blood center.",
    icon: <Droplets size={18} />,
    detail: {
      slug: "blood-bank-management",
      fullDescription: "Manage critical blood bank operations with a dedicated safety-first module. Track every unit of blood from donation to transfusion. The system manages donor registries, component separation, blood testing, and cross-matching, ensuring compliance with medical standards and real-time availability tracking.",
      keyFeatures: [
        "Donor registration and history",
        "Blood component management",
        "Cross-matching and compatibility testing",
        "Expiry and temperature tracking",
        "Blood requisition and issue workflow"
      ],
      benefits: [
        "Guarantees transfusion safety",
        "Real-time blood stock visibility",
        "Seamless integration with OT/IPD",
        "Meets regulatory compliance standards"
      ],
      seoKeywords: ["blood bank management software", "blood center system", "best blood bank software", "clinical blood tracking"]
    }
  },
  {
    id: 16,
    slug: "radiology-information-system",
    image: "/feature-image-16.png",
    tag: "Clinical",
    title: "Radiology Information System (RIS)",
    description: "Integrated radiology workflow from appointment to imaging and report delivery with PACS connectivity for X-Ray and Scans.",
    icon: <Radio size={18} />,
    detail: {
      slug: "radiology-information-system",
      fullDescription: "Streamline your radiology department with a modern RIS module. Manage imaging appointments, track scan statuses, and deliver reports digitally. Our system integrates with PACS to provide radiologists with the tools they need for accurate interpretation and swift reporting to referring physicians.",
      keyFeatures: [
        "Imaging modality scheduling",
        "Radiologist reporting templates",
        "PACS and DICOM integration",
        "Digital report delivery via SMS/Email",
        "Department-wise revenue tracking"
      ],
      benefits: [
        "Reduces imaging turnaround time",
        "Higher accuracy in radiological findings",
        "Eliminates paper-based reporting",
        "Better coordination with clinical teams"
      ],
      seoKeywords: ["radiology software", "RIS system", "imaging management software", "best diagnostic software"]
    }
  },
  {
    id: 17,
    slug: "tpa-insurance-claims",
    image: "/feature-image-17.png",
    tag: "Digital",
    title: "TPA & Insurance Claims Management",
    description: "Automate the cashless claims process with TPA tracking, pre-authorization management, and real-time claim status updates.",
    icon: <ShieldCheck size={18} />,
    detail: {
      slug: "tpa-insurance-claims",
      fullDescription: "Simplify the complex world of insurance and TPA claims. Our module manages pre-authorization requests, settlement tracking, and outstanding claim reports. Reduce claim rejection rates with built-in validation checks and ensure your hospital receives payments faster from insurance companies.",
      keyFeatures: [
        "Pre-authorization document upload",
        "TPA-wise outstanding tracking",
        "Claim status dashboard",
        "Cashless vs Reimbursement workflow",
        "Automated claim form generation"
      ],
      benefits: [
        "Reduces insurance claim rejections",
        "Faster payment realization cycles",
        "Improves patient's cashless experience",
        "Clear visibility on outstanding dues"
      ],
      seoKeywords: ["hospital TPA management software", "insurance claims system", "cashless hospital billing", "best hms software"]
    }
  },
  {
    id: 18,
    slug: "hr-payroll-healthcare",
    image: "/feature-image-18.jpeg",
    tag: "Analytics",
    title: "Healthcare HR & Payroll Management",
    description: "Manage hospital staff, duty rosters, payroll, and performance with a system built for healthcare-specific workforce needs.",
    icon: <Users size={18} />,
    detail: {
      slug: "hr-payroll-healthcare",
      fullDescription: "Manage your hospital's most valuable asset—your people. From nursing shift rotations to doctor incentive calculations, our HR module is built for the unique needs of healthcare. Manage attendance, payroll, performance reviews, and recruitment in one integrated portal.",
      keyFeatures: [
        "Nurse and staff duty rosters",
        "Doctor incentive and commission engine",
        "Biometric attendance integration",
        "GST-ready payroll processing",
        "Staff training and compliance tracking"
      ],
      benefits: [
        "Easier management of complex shifts",
        "Accurate and transparent payroll",
        "Reduces staff administrative burden",
        "Higher staff satisfaction rates"
      ],
      seoKeywords: ["hospital HR software", "healthcare payroll system", "doctor incentive management", "best hospital staff software"]
    }
  },
  {
    id: 19,
    slug: "ambulance-emergency-management",
    image: "/feature-image-19.jpeg",
    tag: "Clinical",
    title: "Ambulance & Emergency Response",
    description: "Coordinate emergency admissions, ambulance fleets, and trauma care with real-time tracking and swift clinical response.",
    icon: <Truck size={18} />,
    detail: {
      slug: "ambulance-emergency-management",
      fullDescription: "Optimize every second during clinical emergencies. Our module manages ambulance dispatch, ER patient intake, and triage workflows. Ensure that critical information is communicated to the medical team before the patient arrives, enabling life-saving preparations.",
      keyFeatures: [
        "Ambulance dispatch and GPS tracking",
        "ER triage and intake workflow",
        "Emergency medication tracking",
        "Priority admission protocols",
        "Real-time ER occupancy updates"
      ],
      benefits: [
        "Reduces response time in emergencies",
        "Better-prepared medical teams",
        "Smoother transition from ER to Ward",
        "Increases casualty survival rates"
      ],
      seoKeywords: ["ambulance management software", "ER system", "emergency response software", "best hms software"]
    }
  },
  {
    id: 20,
    slug: "telemedicine-virtual-consult",
    image: "/feature-image-20.jpeg",
    tag: "Digital",
    title: "Telemedicine & Virtual Consult Portal",
    description: "Extend your clinical reach with integrated video consultations, digital prescriptions, and online patient record sharing.",
    icon: <Smartphone size={18} />,
    detail: {
      slug: "telemedicine-virtual-consult",
      fullDescription: "Bridge the distance between doctor and patient with our integrated telemedicine portal. Conduct secure video consultations, share digital records, and send e-prescriptions instantly. This module allows your hospital to serve patients beyond geographical boundaries with a seamless digital experience.",
      keyFeatures: [
        "Integrated encrypted video calls",
        "Patient document sharing portal",
        "Digital e-prescription delivery",
        "Online payment integration",
        "Appointment slot-syncing"
      ],
      benefits: [
        "Extends hospital market reach",
        "Convenience for chronic care patients",
        "Reduced clinic waiting room load",
        "Additional revenue stream for doctors"
      ],
      seoKeywords: ["best telemedicine software", "virtual clinic platform", "teleconsultation system", "hospital video consult software"]
    }
  },
  {
    id: 21,
    slug: "patient-app-portal",
    image: "/feature-image-21.jpeg",
    tag: "Digital",
    title: "Patient Self-Service App & Portal",
    description: "Empower patients with mobile access to lab reports, appointment history, billing, and health trend tracking from their phone.",
    icon: <Smartphone size={18} />,
    detail: {
      slug: "patient-app-portal",
      fullDescription: "Empower your patients with a white-labeled mobile app and portal. Patients can view their lab results, book appointments, see their health trends, and manage their bills online. This self-service capability improves patient engagement and reduces the load on your front-office staff.",
      keyFeatures: [
        "Mobile lab report downloads",
        "Health trend visualization",
        "Online bill payment gateway",
        "Appointment history and re-booking",
        "Push notifications for reminders"
      ],
      benefits: [
        "Significantly higher patient loyalty",
        "Fewer inquiries for reports and bookings",
        "Better patient follow-up compliance",
        "Modern and tech-savvy brand image"
      ],
      seoKeywords: ["patient portal software", "hospital mobile app", "healthcare patient app", "best HMS patient software"]
    }
  },
  {
    id: 22,
    slug: "bio-medical-waste-tracking",
    image: "/feature-image-22.jpeg",
    tag: "Compliance",
    title: "Bio-Medical Waste Management",
    description: "Track waste collection, category-wise weighing, and disposal logs to ensure strict environmental and regulatory compliance.",
    icon: <ClipboardList size={18} />,
    detail: {
      slug: "bio-medical-waste-tracking",
      fullDescription: "Ensure your hospital stays compliant with environmental regulations. Our waste management module tracks the segregation, collection, and disposal of bio-medical waste. Generate audit-ready reports and maintain logs that meet international and local health-safety standards.",
      keyFeatures: [
        "Category-wise waste logging",
        "Waste disposal agency tracking",
        "Collection weight validation",
        "Incineration and disposal reports",
        "Compliance alert system"
      ],
      benefits: [
        "Guarantee regulatory compliance",
        "Clear audit trails for health inspectors",
        "Reduces environmental risk",
        "Safer hospital environment"
      ],
      seoKeywords: ["hospital waste management software", "BMW tracking system", "medical compliance software", "best HMS compliance"]
    }
  },
  {
    id: 23,
    slug: "hospital-mis-analytics",
    image: "/feature-image-23.jpeg",
    tag: "Analytics",
    title: "Advanced Hospital MIS & BI",
    description: "Deep-dive into hospital performance with multi-dimensional reports, business intelligence insights, and trend forecasting.",
    icon: <BarChart3 size={18} />,
    detail: {
      slug: "hospital-mis-analytics",
      fullDescription: "Turn your hospital data into a strategic asset. Our Advanced MIS & BI tool provides deep-dive analytics into every aspect of hospital operations. From occupancy trends to supply chain efficiency, gain insights that help you scale your healthcare business and improve clinical outcomes.",
      keyFeatures: [
        "Multi-dimensional business reports",
        "Custom report builder for executives",
        "Predictive patient flow analysis",
        "Revenue forecasting and budgeting",
        "Operational efficiency benchmarking"
      ],
      benefits: [
        "Uncovers hidden operational inefficiencies",
        "Identifies high-margin clinical services",
        "Drives strategic growth planning",
        "Higher ROI on hospital resources"
      ],
      seoKeywords: ["hospital business intelligence", "healthcare MIS software", "hospital data analytics", "best healthcare management Reports"]
    }
  },
  {
    id: 24,
    slug: "diet-kitchen-management",
    image: "/feature-image-24.jpeg",
    tag: "Clinical",
    title: "Diet & Kitchen Management",
    description: "Manage patient dietary requirements, meal schedules, and kitchen inventory integrated with clinical nutrition notes.",
    icon: <Users size={18} />,
    detail: {
      slug: "diet-kitchen-management",
      fullDescription: "Nurture your patients with precision nutrition. Our Diet & Kitchen module connects clinical recommendations with kitchen operations. Manage patient-specific meal plans based on medical conditions, track kitchen inventory, and ensure that the right food reaches the right patient at the right time.",
      keyFeatures: [
        "Patient-wise diet chart integration",
        "Meal scheduling and delivery tracking",
        "Kitchen stock and inventory management",
        "Specialized therapeutic meal planning",
        "Calorie and nutrition intake reports"
      ],
      benefits: [
        "Improves patient recovery with better diet",
        "Reduces kitchen waste and food costs",
        "Ensures no dietary errors for patients",
        "Better patient satisfaction scores"
      ],
      seoKeywords: ["hospital diet software", "kitchen management for healthcare", "patient nutrition software", "best hms software"]
    }
  },
  {
    id: 25,
    slug: "diagnostic-imaging-center",
    image: "/feature-image-25.jpeg",
    tag: "Clinical",
    title: "Diagnostic Imaging Center Suite",
    description: "Comprehensive software suite for standalone diagnostic centers managing diverse imaging modalities and report distribution.",
    icon: <FlaskConical size={18} />,
    detail: {
      slug: "diagnostic-imaging-center",
      fullDescription: "For standalone diagnostic centers or large hospital imaging departments, this suite offers end-to-end management. From front-desk registration to radiologist worklists and automated report delivery, our software ensures that your diagnostic facility runs like clockwork with zero documentation lag.",
      keyFeatures: [
        "Modality-wise appointment booking",
        "Automated lab and radiology billing",
        "Cloud-based report distribution",
        "Imaging history for repeat patients",
        "Diagnostic center franchisee management"
      ],
      benefits: [
        "Higher through-put for imaging centers",
        "Scalable for multi-location diagnostic chains",
        "Optimized center revenue management",
        "Superior experience for referring doctors"
      ],
      seoKeywords: ["diagnostic center software", "imaging center system", "best diagnostic HMS", "X-ray and scan software"]
    }
  },
];
