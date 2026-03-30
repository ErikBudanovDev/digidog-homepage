/**
 * Portfolio project metadata — slug + title only.
 * Server-safe: no figma:asset or client imports.
 * Keep in sync with PortfolioSection.tsx projects array.
 */
export interface ProjectMeta {
  slug: string;
  title: string;
}

export const projectsMeta: ProjectMeta[] = [
  { slug: "united-nations-fp2030", title: "United Nations – FP2030" },
  { slug: "mpa-online", title: "MPA.online Streaming Platform" },
  { slug: "miso-supermarket", title: "Miso Supermarket & Bakery" },
  { slug: "techvision-dashboard", title: "TechVision Dashboard" },
  { slug: "bold-ideas", title: "Bold Ideas Movement" },
  { slug: "bella-cucina", title: "Bella Cucina Restaurant" },
  { slug: "smileforyou", title: "SmileforYou – Conversion Optimization" },
  { slug: "technik-hoffmann", title: "Technik Hoffmann – Fullstack Development" },
  { slug: "wickie-agency", title: "WICKIE – Digital Marketing Agency Redesign" },
  { slug: "digidog-threejs", title: "Digidog – Three.js & WordPress Integration" },
  { slug: "jobsvs-recruitment", title: "JobsVS – Recruitment Agency Website" },
  { slug: "cibaria-italiana", title: "Cibaria Italiana – Restaurant & eCommerce" },
  { slug: "monte-ofelio-group", title: "Monte Ofelio Group – Multi-Brand Web Strategy" },
  { slug: "ai-jewelry-sketch", title: "AI Jewelry Sketch Automation" },
  { slug: "fitpulse-app", title: "FitPulse Health App" },
  { slug: "smartassist-chatbot", title: "SmartAssist AI Chatbot" },
  { slug: "smarthome-iot", title: "SmartHome IoT Platform" },
  { slug: "hubspot-dental-crm", title: "HubSpot CRM – Dental Clinic Chain" },
  { slug: "beoriginaltours-operations", title: "BeOriginalTours Operations Platform" },
  { slug: "luxe-mode", title: "Luxe Mode Online Shop" },
  { slug: "logitrack-warehouse", title: "LogiTrack Warehouse System" },
  { slug: "mediconnect-praxis", title: "MediConnect Practice Software" },
];
