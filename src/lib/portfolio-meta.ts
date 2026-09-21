/**
 * Portfolio project metadata — slug, title, description.
 * Server-safe: no figma:asset or client imports.
 * Keep in sync with PortfolioSection.tsx projects array.
 */
export interface ProjectMeta {
  slug: string;
  title: string;
  description: string;
}

export const projectsMeta: ProjectMeta[] = [
  { slug: "united-nations-fp2030", title: "United Nations – FP2030", description: "Design implementation for the United Nations FP2030 Progress Report website, featuring interactive Highcharts data visualizations and parallax animations." },
  { slug: "mpa-online", title: "MPA.online Streaming Platform", description: "Fullstack web app development for a medical education streaming platform, built with Next.js, Strapi, and MongoDB with Vimeo integration." },
  { slug: "miso-supermarket", title: "Miso Supermarket & Bakery", description: "Modern web design and digital solution for a local supermarket with integrated online shop and ordering system." },
  { slug: "smileforyou", title: "SmileforYou – Conversion Optimization", description: "Full website redesign and conversion optimization for a leading German dental clinic chain, doubling their conversion rate from 5% to 11%." },
  { slug: "technik-hoffmann", title: "Technik Hoffmann – Fullstack Development", description: "Complex fullstack website for a German precision engineering company, featuring jQuery animations, cards view, and intricate design patterns." },
  { slug: "wickie-agency", title: "WICKIE – Digital Marketing Agency Redesign", description: "Complete website redesign for a digital marketing agency, delivering a clean, responsive WordPress site that preserves the client's brand identity." },
  { slug: "digidog-threejs", title: "Digidog – Three.js & WordPress Integration", description: "Resolved complex Three.js and Elementor conflicts on our agency website, implementing interactive 3D animations with SEO-optimized design." },
  { slug: "jobsvs-recruitment", title: "JobsVS – Recruitment Agency Website", description: "Design implementation and SEO for a recruitment agency, featuring Personio API integration to automatically display job listings from the HR system." },
  { slug: "cibaria-italiana", title: "Cibaria Italiana – Restaurant & eCommerce", description: "Elegant website with eCommerce, online reservation, and culinary course booking for an authentic Italian restaurant in Vienna." },
  { slug: "monte-ofelio-group", title: "Monte Ofelio Group – Multi-Brand Web Strategy", description: "Dynamic multi-website strategy for an Italian food group in Vienna, enabling online reservations, worldwide product sales, and brand storytelling." },
  { slug: "ai-jewelry-sketch", title: "AI Jewelry Sketch Automation", description: "AI automation built in Make that reads customer emails, extracts requirements, and generates custom jewelry sketches 24/7 — eliminating manual work." },
  { slug: "hubspot-dental-crm", title: "HubSpot CRM – Dental Clinic Chain", description: "Enterprise HubSpot CRM implementation across a 5-branch dental clinic chain, integrating patient workflows, IVORIS API, and Make.com automation." },
  { slug: "beoriginaltours-operations", title: "BeOriginalTours Operations Platform", description: "Automated booking, scheduling, and management platform for a European tour agency, built with Make.com, Python, MongoDB, and a custom Next.js dashboard." },
];
