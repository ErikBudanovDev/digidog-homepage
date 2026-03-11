import { useState, useRef, useCallback, useEffect } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { motion, useInView } from "motion/react";
import { Spaceship, StarShape } from "./CosmicElements";
import { colors, fonts } from "./ui/brand";
import { SectionContainer, SectionBadge, SectionHeading } from "./ui/section";
import { LinkWithArrow, CarouselNavButton } from "./ui/buttons";
import { ProjectCard, type ProjectCardData } from "./ui/cards";
import unFp2030Image from "figma:asset/c117ba0d114ddd4b6f7e4c70e3701d65dc9258d9.png";
import mpaOnlineImage from "figma:asset/8355901d8310aa8386a87aa2f57c48af458d57b5.png";
import jewelrySketchImage from "figma:asset/078b70a771f804e92b4698a48f21b197eb8533b2.png";
import beOriginalToursImage from "figma:asset/d2107e94ba7d2a4f4a9f6cfdbc6e9b05fd5e8aaa.png";
import beOriginalToursCoverImage from "figma:asset/71762655f43cebfa5f3e7b2c416bb82a40a595e3.png";
import smileForYouImage from "figma:asset/5380ec0feaae16c02acb62ca3aa85f3a7e221d4e.png";
import hoffmannTechnikImage from "figma:asset/b400b8a31dbc12a663236ebdf525198dd6022f95.png";
import hubspotCrmImage from "figma:asset/aceaf579e31eebab925faabe40f3b9f4e46272d5.png";
import wickieImage from "figma:asset/d849760fd1f5b6f771197fd106f62a4c614281cb.png";
import digidogThreejsImage from "figma:asset/a2f594d236ef884b789dbcc942e670e16a1f1fca.png";
import jobsvsImage from "figma:asset/d6bb65eaf8c1ef470fbf5ba285c0a0dc7dfd85a5.png";
import cibariaItalianaImage from "figma:asset/f3344c5d874bdaed8597c2a2a7697db100cfd76c.png";
import cibariaItalianaBolognaImage from "figma:asset/4aa21ed2e847271510ccf7d90dc12d67d518010f.png";
import cibariaItalianaServicesImage from "figma:asset/860b1f96f437e65d2e83efa384e45c4ac65fc981.png";
import cibariaItalianaMarioImage from "figma:asset/3bd5043c343cc118bf1353e2acfbb7852f23e18c.png";
import monteOfelioBarImage from "figma:asset/a1e43a0ca271ca27ec555aa2b403a94e7865b5b9.png";
import monteOfelioNewsImage from "figma:asset/d6e8abf341447412a4167b69730c8988829f7af0.png";
import monteOfelioLocationImage from "figma:asset/e64fabfbb0ba316f86fd5b115ed2ccaa77c94550.png";

const unFp2030ImageSrc = unFp2030Image as unknown as string;
const mpaOnlineImageSrc = mpaOnlineImage as unknown as string;
const jewelrySketchImageSrc = jewelrySketchImage as unknown as string;
const beOriginalToursImageSrc = beOriginalToursImage as unknown as string;
const beOriginalToursCoverImageSrc = beOriginalToursCoverImage as unknown as string;
const smileForYouImageSrc = smileForYouImage as unknown as string;
const hoffmannTechnikImageSrc = hoffmannTechnikImage as unknown as string;
const hubspotCrmImageSrc = hubspotCrmImage as unknown as string;
const wickieImageSrc = wickieImage as unknown as string;
const digidogThreejsImageSrc = digidogThreejsImage as unknown as string;
const jobsvsImageSrc = jobsvsImage as unknown as string;
const cibariaItalianaImageSrc = cibariaItalianaImage as unknown as string;
const cibariaItalianaBolognaImageSrc = cibariaItalianaBolognaImage as unknown as string;
const cibariaItalianaServicesImageSrc = cibariaItalianaServicesImage as unknown as string;
const cibariaItalianaMarioImageSrc = cibariaItalianaMarioImage as unknown as string;
const monteOfelioBarImageSrc = monteOfelioBarImage as unknown as string;
const monteOfelioNewsImageSrc = monteOfelioNewsImage as unknown as string;
const monteOfelioLocationImageSrc = monteOfelioLocationImage as unknown as string;

export const projects: ProjectCardData[] = [
  /* ─── Web Design & Development ─── */
  {
    title: "United Nations – FP2030",
    description:
      "Design implementation for the United Nations FP2030 Progress Report website, featuring interactive Highcharts data visualizations and immersive parallax animations.",
    overview:
      "We had the incredible opportunity to collaborate with the United Nations in developing a remarkable website for FP2030. This project was truly exceptional and allowed us to showcase our expertise and creativity in some truly innovative ways. One of the standout features of the website is the stunning graphics we created using Highcharts JS — an incredible tool that empowers us to build interactive and visually captivating charts for presenting complex data in a way that is easy to comprehend and enjoyable to engage with.",
    goal: "Build a visually stunning, data-driven website for the United Nations FP2030 initiative that presents complex global health data through interactive charts and immersive animations.",
    improvements: [
      "Interactive data visualizations with Highcharts JS",
      "Immersive parallax scrolling animations throughout",
      "WordPress CMS with Elementor page builder",
      "Responsive design optimized for all devices",
      "Complex data presented in accessible, engaging formats",
      "Dynamic storytelling through visual design and motion",
    ],
    problem:
      "Complex global health data needed to be presented in an accessible, engaging way that would resonate with a worldwide audience and drive awareness for the FP2030 initiative.",
    solution:
      "A visually stunning website combining interactive Highcharts data visualizations, captivating parallax animations, and user-centric design to make complex data both comprehensible and memorable.",
    image: unFp2030ImageSrc,
    year: 2023,
    slug: "united-nations-fp2030",
    service: "Web Design & Development",
    category: "web",
    client: "United Nations – FP2030",
    link: "/services/web-design",
  },
  {
    title: "MPA.online Streaming Platform",
    description:
      "Fullstack web app development for a medical education streaming platform, built with Next.js, Strapi, and MongoDB with Vimeo integration.",
    overview:
      "MPA.online is a streaming platform designed to help medical assistants learn through video courses. Built over approximately 6 months, the project began with a discovery call where we drafted the architecture. After designing the site in Figma, we implemented the platform using Next.js and Strapi to create a seamless learning experience with integrated video streaming and powerful search capabilities.",
    goal: "Develop a fully functional streaming platform for medical education that enables medical assistants to learn through structured video courses with seamless search and playback.",
    improvements: [
      "Next.js frontend with server-side rendering for performance",
      "Strapi headless CMS for flexible content management",
      "Vimeo integration for reliable video streaming",
      "MongoDB with Mongo Atlas as Elasticsearch for video search",
      "Docker containerization for scalable deployment",
      "Custom-coded features for full platform functionality",
    ],
    problem:
      "Medical assistants lacked a dedicated, structured platform to learn essential clinical skills through video-based education.",
    solution:
      "A fullstack streaming platform built with Next.js and Strapi, featuring Vimeo video integration, MongoDB-powered search, and a user-friendly interface designed in Figma.",
    image: mpaOnlineImageSrc,
    year: 2024,
    slug: "mpa-online",
    service: "Web Design & Development",
    category: "web",
    client: "MPA.online",
    link: "/services/web-design",
  },
  {
    title: "Miso Supermarket & Bakery",
    description:
      "Modern web design and digital solution for a local supermarket with integrated online shop and ordering system.",
    overview:
      "Miso Supermarket & Bakery is a local family-run business in Düsseldorf offering fresh baked goods and Asian groceries. To meet growing customer demands, a complete digital transformation was carried out — from initial concept to design and technical implementation.",
    goal: "Build a professional online presence with an integrated ordering and shop system to digitally extend the brick-and-mortar business and reach new customer segments.",
    improvements: [
      "Performance optimization for fast load times",
      "Responsive design for all devices",
      "Integrated online ordering system with real-time availability",
      "Google Maps and location integration",
      "SEO optimization for local search terms",
      "Intuitive navigation and user-friendly interface",
    ],
    problem:
      "No online presence; customers couldn't pre-order — leading to long wait times and revenue loss during peak hours.",
    solution:
      "Responsive website with integrated online shop, real-time ordering system, and Google Maps integration for a seamless customer experience.",
    image:
      "https://images.unsplash.com/photo-1591538519435-4578c3ba26d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcm1hcmtldCUyMGJha2VyeSUyMHN0b3JlZnJvbnR8ZW58MXx8fHwxNzcyMjE0NzYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    year: 2021,
    slug: "miso-supermarket",
    service: "Web Design & Development",
    category: "web",
    client: "Miso GmbH",
    link: "/services/web-design",
  },
  {
    title: "TechVision Dashboard",
    description:
      "Complete redesign of an enterprise dashboard with modern UI/UX design and responsive layout.",
    overview:
      "TechVision is a growing SaaS company that provides real-time analytics tools for mid-sized businesses. The existing dashboard was outdated and lacked mobile support — a redesign was urgently needed to stay competitive.",
    goal: "Improve the dashboard through modern web development — focusing on performance, usability, and compliance-ready adjustments.",
    improvements: [
      "Performance optimization for real-time data processing",
      "Improved usability and user experience",
      "Compliance-ready adjustments (GDPR)",
      "Modernized, efficient, and user-centric interface",
      "Role-based access control system",
      "Mobile-optimized view for on-the-go use",
    ],
    problem:
      "Outdated dashboard with poor UX — employees took too long to find key KPIs, and mobile use was impossible.",
    solution:
      "Completely new UI/UX design with real-time data visualization, role-based access, mobile view, and GDPR-compliant data processing.",
    image:
      "https://images.unsplash.com/photo-1772037441147-5301691c4b57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWJzaXRlJTIwZGVzaWduJTIwbW9ja3VwfGVufDF8fHx8MTc3MjE0NzYyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    year: 2022,
    slug: "techvision-dashboard",
    service: "Web Design & Development",
    category: "web",
    client: "TechVision AG",
    link: "/services/web-design",
  },
  {
    title: "Bold Ideas Movement",
    description:
      "Creative brand strategy and visual storytelling for an innovative startup with a dynamic web presence.",
    overview:
      "Bold Ideas Movement is a creative startup from Berlin specializing in sustainable innovations. Without a clear brand identity, it was difficult to convince investors and customers — comprehensive brand design and a compelling website were key to success.",
    goal: "Develop a strong brand identity and a storytelling-driven website that excites investors and significantly boosts conversion rates.",
    improvements: [
      "Complete brand design with logo and style guide",
      "Storytelling website with animated scroll experience",
      "Integrated lead generation system",
      "Performance optimization (95+ Lighthouse Score)",
      "Social media integration and content strategy",
      "A/B-tested landing pages for maximum conversions",
    ],
    problem:
      "Startup without a clear brand identity — no recognition value, weak conversion rate, and no convincing digital presence for investors.",
    solution:
      "Complete brand design, storytelling website with animated scroll experience, lead generation system, and optimized landing pages.",
    image:
      "https://images.unsplash.com/photo-1771792278518-1ae81427d1f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib2xkJTIwdHlwb2dyYXBoeSUyMG1vdGlvbiUyMGRlc2lnbnxlbnwxfHx8fDE3NzIyMTQ3NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    year: 2023,
    slug: "bold-ideas",
    service: "Web Design & Development",
    category: "web",
    client: "Bold Ideas GmbH",
    link: "/services/web-design",
  },
  {
    title: "Bella Cucina Restaurant",
    description:
      "Elegant website with online reservation and digital menu for an upscale Italian restaurant.",
    overview:
      "Bella Cucina is an upscale Italian restaurant in Düsseldorf's old town. The existing website was outdated and not mobile-friendly — phone reservations overwhelmed staff, especially on weekends. A modern digital solution was needed.",
    goal: "Create an elegant, mobile-friendly website with seamless online reservation and digital menu to enhance the guest experience and relieve staff workload.",
    improvements: [
      "Online reservation system with real-time availability",
      "Digital menu with seasonal updates",
      "Instagram feed integration for social proof",
      "Google Business Profile optimization",
      "Mobile-optimized design for smartphone users",
      "Multilingual support (DE/EN/IT)",
    ],
    problem:
      "Phone reservations overwhelmed staff; the old website was not mobile-friendly and didn't match the restaurant's upscale standards.",
    solution:
      "Elegant responsive website with online reservation system, digital menu, Instagram integration, and multilingual support.",
    image:
      "https://images.unsplash.com/photo-1682778418768-16081e4470a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwd2Vic2l0ZSUyMGRlc2lnbnxlbnwxfHx8fDE3NzIxNzcxNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    year: 2024,
    slug: "bella-cucina",
    service: "Web Design & Development",
    category: "web",
    client: "Bella Cucina Ristorante",
    link: "/services/web-design",
  },
  {
    title: "SmileforYou – Conversion Optimization",
    description:
      "Full website redesign and conversion optimization for a leading German dental clinic chain, doubling their conversion rate from 5% to 11%.",
    overview:
      "We had the opportunity to work with SmileforYou, a leading dental clinic chain specializing in orthodontics — from traditional braces to innovative Invisalign technology. Based on Google Analytics data revealing that the majority of traffic comes from mobile devices, we adopted a mobile-first strategy. We renewed their existing website, created specialized landing pages for SEO, and developed a brand-new digital presence that is user-friendly, informative, and aligned with SmileforYou's exceptional standards.",
    goal: "Redesign and optimize the SmileforYou website with a mobile-first approach to significantly increase conversion rates and attract more patients through organic search.",
    improvements: [
      "Conversion rate doubled from 5% to 11%",
      "Mobile-first responsive design strategy",
      "SEO-optimized landing pages for patient acquisition",
      "WordPress CMS for easy content management",
      "Modern, friendly design reflecting the clinic's brand",
      "Ongoing collaboration for continuous enhancement",
    ],
    problem:
      "Outdated website with a low 5% conversion rate — poor mobile experience despite majority mobile traffic, and limited SEO visibility for patient acquisition.",
    solution:
      "Complete website redesign with mobile-first approach, SEO-optimized landing pages, and conversion-focused design — resulting in a 120% conversion rate increase to 11%.",
    image: smileForYouImageSrc,
    year: 2023,
    slug: "smileforyou",
    service: "Web Design & Development",
    category: "web",
    client: "SmileforYou",
    link: "/services/web-design",
  },
  {
    title: "Technik Hoffmann – Fullstack Development",
    description:
      "Complex fullstack website development for a German precision engineering company, featuring jQuery animated bubbles, cards view, and intricate design implementation.",
    overview:
      "This project involved a team of 2 developers, 1 designer, and 1 QA tester, with the design completed by an external company. As the project manager, we oversaw the implementation and management of the project, which utilized technologies such as WordPress, jQuery, and PHP. The project was complex due to the length of time required for communication and decision-making processes. Key highlights include a visually striking animated bubbles interface built with jQuery and an interactive cards-based navigation system.",
    goal: "Implement a complex, design-heavy corporate website for a precision engineering company with interactive jQuery animations, cards-based navigation, and seamless WordPress CMS integration.",
    improvements: [
      "jQuery animated bubbles for interactive service visualization",
      "Cards-view navigation with smooth transitions",
      "WordPress CMS with custom PHP development",
      "Complex design implementation from external design specs",
      "Multilingual support (German/English)",
      "Full project management with cross-team coordination",
    ],
    problem:
      "A precision engineering company needed a sophisticated digital presence that could showcase their complex service portfolio in an engaging, interactive way while managing a multi-team development process.",
    solution:
      "Fullstack WordPress website with custom jQuery animations, interactive bubble-based service visualization, cards navigation, and PHP backend — delivered through structured project management across a 4-person team.",
    image: hoffmannTechnikImageSrc,
    year: 2023,
    slug: "technik-hoffmann",
    service: "Web Design & Development",
    category: "web",
    client: "Hoffmann Technik",
    link: "/services/web-design",
  },
  {
    title: "WICKIE – Digital Marketing Agency Redesign",
    description:
      "Complete website redesign for a digital marketing agency, delivering a clean, responsive, and visually compelling WordPress site that preserves the client's brand identity.",
    overview:
      "Our client WICKIE helps businesses create, manage, and improve their social media presence. They develop strategies and campaigns to increase visibility, along with SEO strategies to drive more visitors to their website. WICKIE approached us with the idea of renewing and polishing their existing website. The goal was to create a clean, responsive, yet compelling and attractive redesign that fits the client's needs while staying true to their brand colors and fonts. We delivered a complete redesign of the entire website, and the project received a beautiful and grateful testimonial from the client.",
    goal: "Redesign and modernize WICKIE's existing website with a clean, responsive layout that reflects their brand identity and enhances their digital marketing credibility.",
    improvements: [
      "Complete website redesign preserving brand colors and fonts",
      "Responsive design optimized for all devices",
      "WordPress with WooCommerce integration",
      "Modern UX & UI design for improved engagement",
      "Clean, compelling visual layout for agency credibility",
      "5-star client testimonial received upon delivery",
    ],
    problem:
      "An outdated website that no longer reflected the agency's expertise in digital marketing — lacking modern design, responsiveness, and visual appeal to attract potential clients.",
    solution:
      "Full website redesign with a clean, responsive WordPress build that preserves the client's brand identity while delivering a compelling, modern digital presence worthy of a marketing agency.",
    image: wickieImageSrc,
    year: 2022,
    slug: "wickie-agency",
    service: "Web Design & Development",
    category: "web",
    client: "WICKIE Agentur",
    link: "/services/web-design",
  },
  {
    title: "Digidog – Three.js & WordPress Integration",
    description:
      "Resolved complex Three.js and Elementor conflicts on our own agency website, implementing interactive 3D animations with SEO-optimized design on WordPress.",
    overview:
      "This internal project involved implementing a new design for our own agency website (digidog.org) that blends seamlessly with keyword optimization, while integrating a Three.js 3D animation without compromising performance or layout within Elementor. The main challenge was a conflict between Three.js and Elementor — requiring manual code adjustments to ensure seamless integration. After developing the animation separately, staging integration, conflict identification, and rigorous cross-browser testing, the result was a smooth, interactive 3D experience with full Elementor and plugin compatibility.",
    goal: "Implement a new SEO-optimized design with integrated Three.js 3D animation on WordPress, resolving technical conflicts between Three.js and Elementor without compromising performance.",
    improvements: [
      "Three.js 3D animation integrated with WordPress/Elementor",
      "Manual code adjustments to resolve JS/Elementor conflicts",
      "SEO keyword optimization blended with new design",
      "Cross-browser and cross-device compatibility testing",
      "Staging environment for safe integration testing",
      "Full plugin compatibility maintained post-integration",
    ],
    problem:
      "Three.js animations conflicted with Elementor's rendering pipeline — causing layout breaks, performance issues, and plugin incompatibilities that required deep manual code resolution.",
    solution:
      "Separate Three.js development, staged integration, manual codebase adjustments to resolve conflicts, and rigorous cross-browser testing — resulting in a smooth 3D experience with full Elementor compatibility.",
    image: digidogThreejsImageSrc,
    year: 2023,
    slug: "digidog-threejs",
    service: "Web Design & Development",
    category: "web",
    client: "Digidog (Internal)",
    link: "/services/web-design",
  },
  {
    title: "JobsVS – Recruitment Agency Website",
    description:
      "Design implementation and SEO for a recruitment agency, featuring Personio API integration to automatically display job listings from the client's HR platform.",
    overview:
      "Our client JobsVS is a recruitment agency that enables companies and applicants to find each other. We handled design implementation and SEO for JobsVS, building a responsive and clear website. The website integrates with Personio (Persy) via API, so the website owner doesn't have to duplicate work — job applications are pulled directly from Personio and displayed on the website automatically. The client provided the design, and our team of experts implemented it with a focus on creating an appealing yet clear and quality look. We also provided personalized SEO services including speed optimization, keyword research, and backend updates.",
    goal: "Implement a provided design into a responsive, SEO-optimized recruitment website with seamless Personio API integration for automatic job listing synchronization.",
    improvements: [
      "Personio API integration for automatic job listings",
      "Responsive and clear design implementation",
      "Personalized SEO with keyword research and optimization",
      "Website speed optimization and backend updates",
      "Clean, appealing UX that matches agency branding",
      "Automated job data sync eliminating manual duplicate work",
    ],
    problem:
      "A recruitment agency needed their provided design implemented into a functional, SEO-optimized website with automated job listing management to avoid manual data entry.",
    solution:
      "Responsive website implementation with Personio API integration for automatic job display, combined with comprehensive SEO services including speed optimization and keyword research.",
    image: jobsvsImageSrc,
    year: 2022,
    slug: "jobsvs-recruitment",
    service: "Web Design & Development",
    category: "web",
    client: "JobsVS",
    link: "/services/web-design",
  },
  {
    title: "Cibaria Italiana – Restaurant & eCommerce",
    description:
      "Elegant website with eCommerce, online reservation, and culinary course booking for an authentic Italian restaurant bringing Genoa and Bologna flavors to Vienna.",
    overview:
      "Mario is an Italian restaurant manager who wants to bring the culinary traditions of Genoa and Bologna to Vienna. His restaurant is not only a place to eat but also a place where people can experience the Italian atmosphere. Pasta is homemade daily, culinary courses are organized during the day, and high-quality products are imported directly from Italy and sold in the shop. Mario recognized the importance of a strong digital presence and asked DigiDog to build an elegant website with multiple functionalities while maintaining the light concept of the brand.",
    goal: "Build an elegant, multi-functional website that increases brand awareness, creates an e-commerce store for premium Italian products, and allows customers to book tables or culinary courses online easily.",
    improvements: [
      "E-commerce store for premium Italian products",
      "Online table reservation system",
      "Culinary course booking integration",
      "Elegant design maintaining the light brand concept",
      "Multiple functionalities within a cohesive experience",
      "Digital marketing support for franchise expansion",
    ],
    problem:
      "An authentic Italian restaurant in Vienna needed a strong digital presence to showcase their unique culinary experience, sell premium imported Italian products online, and enable easy table and course bookings.",
    solution:
      "An elegant, multi-functional website combining eCommerce for Italian products, online table reservations, culinary course bookings, and a brand-true design — with ongoing digital marketing support that contributed to franchise expansion into Germany.",
    image: cibariaItalianaImageSrc,
    year: 2021,
    slug: "cibaria-italiana",
    service: "Web Design & Development",
    category: "web",
    client: "Cibaria Italiana",
    link: "/services/web-design",
    gallery: [cibariaItalianaBolognaImageSrc, cibariaItalianaServicesImageSrc, cibariaItalianaMarioImageSrc],
  },
  {
    title: "Monte Ofelio Group – Multi-Brand Web Strategy",
    description:
      "Dynamic multi-website digital strategy for an Italian bar and food group in Vienna, enabling online reservations, worldwide product sales, and brand expansion.",
    overview:
      "The Monte Ofelio Group was founded by the Formisano brothers, Dario and Luca, who come from rural Naples. Their goal was to bring the naturalness and sustainability of Italian products to Vienna and export traditional Italian foods to Austria. Their first store was inspired by the traditional Italian bar, where customers can enjoy breakfast and appetizers made exclusively with high-quality Italian products. After several years of success, the brothers decided to expand their business, planning to open more bars and bakeries in Vienna. To support this expansion, they needed a strong digital presence — DigiDog developed three different websites aligned with the group's market strategy, along with several brands connected to the Monte Ofelio Group.",
    goal: "Create a multi-website digital strategy that increases brand awareness, allows products to be sold worldwide online, and represents the authentic Italian atmosphere of the Monte Ofelio bars.",
    improvements: [
      "Three separate websites aligned with market strategy",
      "Online table reservation system across locations",
      "E-commerce for worldwide product ordering",
      "Multiple brand identities under one group umbrella",
      "Social media management integration",
      "Scalable digital presence for business expansion",
    ],
    problem:
      "A growing Italian food group in Vienna needed a cohesive multi-brand digital presence to support expansion into new locations, enable online product sales, and maintain their authentic Italian identity across multiple brands.",
    solution:
      "Three strategically aligned websites with online reservation, e-commerce capabilities, and integrated social media management — driving increased sales and exceeding initial project goals through collaborative digital marketing.",
    image: monteOfelioBarImageSrc,
    year: 2021,
    slug: "monte-ofelio-group",
    service: "Web Design & Development",
    category: "web",
    client: "Monte Ofelio Group",
    link: "/services/web-design",
    gallery: [monteOfelioNewsImageSrc, monteOfelioLocationImageSrc],
  },

  /* ─── AI Solutions & Automation ─── */
  {
    title: "AI Jewelry Sketch Automation",
    description:
      "Complete AI automation built in Make that reads customer emails, extracts requirements, and generates custom jewelry sketches 24/7 — eliminating 5–10 hours of daily manual work.",
    overview:
      "A jewelry business was spending 5–10 hours daily creating custom sketches from email requests. We built a complete AI automation in Make in just 6 hours that automatically reads customer emails, extracts requirements, and generates jewelry sketches nonstop. The result: eliminated manual work, enabled 24/7 sketch generation, reduced costs, improved response time, and created a fully scalable workflow that increased overall profitability.",
    goal: "Eliminate manual sketch creation by building an end-to-end AI automation that reads customer emails, extracts jewelry requirements, and generates custom sketches automatically around the clock.",
    improvements: [
      "AI-powered email parsing and requirement extraction",
      "Automated jewelry sketch generation via AI image models",
      "24/7 nonstop operation without human intervention",
      "Make automation workflow built in just 6 hours",
      "Fully scalable pipeline for growing order volumes",
      "Dramatic cost reduction and faster customer response times",
    ],
    problem:
      "Manual jewelry sketch creation from email requests consumed 5–10 hours daily — slow, costly, and impossible to scale.",
    solution:
      "End-to-end AI automation in Make that reads emails, extracts requirements, and generates custom jewelry sketches 24/7 with zero manual effort.",
    image: jewelrySketchImageSrc,
    year: 2024,
    slug: "ai-jewelry-sketch",
    service: "AI Solutions & Automation",
    category: "ai",
    client: "Jewelry Business (Confidential)",
    link: "/services/ai-solutions",
  },
  {
    title: "FitPulse Health App",
    description:
      "Mobile-first fitness platform with AI-powered training plans and real-time progress tracking.",
    overview:
      "FitPulse is an innovative fitness platform that uses AI technology to create personalized training plans. The goal was to develop a mobile-first application that dynamically adapts to each user's progress and ensures long-term motivation.",
    goal: "Develop an AI-powered fitness app with adaptive training plans, real-time tracking, and gamification elements to significantly increase user retention.",
    improvements: [
      "AI-powered training plan engine with adaptive workouts",
      "Real-time progress tracking with data visualization",
      "Gamification elements for long-term motivation",
      "Push notifications and reminders",
      "Integration with wearables (Apple Watch, Fitbit)",
      "Social features for community building",
    ],
    problem:
      "Users abandoned generic training plans — lacking personalization, no progress feedback, and no long-term motivation.",
    solution:
      "AI-powered training plan engine with adaptive workouts, real-time tracking, gamification elements, and wearable integration.",
    image:
      "https://images.unsplash.com/photo-1769893841740-fc98ce39a3cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRnZXNzJTIwYXBwJTIwbW9iaWxlJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc3MjI2MTY0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    year: 2025,
    slug: "fitpulse-app",
    service: "AI Solutions & Automation",
    category: "ai",
    client: "FitPulse GmbH",
    link: "/services/ai-solutions",
  },
  {
    title: "SmartAssist AI Chatbot",
    description:
      "Intelligent AI chatbot with NLP integration for automated customer service and lead qualification.",
    overview:
      "SmartAssist was developed for a mid-sized insurance company that manually processed hundreds of customer inquiries daily. The AI chatbot now handles initial consultations, automatically qualifies leads, and routes complex inquiries to the right advisor.",
    goal: "Implement AI-powered customer communication that automatically answers 80% of standard inquiries and reduces response time to under 3 seconds.",
    improvements: [
      "Natural Language Processing for natural conversation flow",
      "Automatic lead qualification and CRM integration",
      "Multilingual support (DE/EN/TR)",
      "Sentiment analysis for escalation detection",
      "24/7 availability without personnel costs",
      "Self-learning engine with continuous improvement",
    ],
    problem:
      "Overwhelmed customer service with long wait times — manual processing was expensive, slow, and error-prone.",
    solution:
      "AI chatbot with NLP, automatic lead qualification, CRM integration, and real-time sentiment analysis for a 24/7 customer experience.",
    image:
      "https://images.unsplash.com/photo-1757310998437-b2e8a7bd2e97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwY2hhdGJvdCUyMGludGVyZmFjZXxlbnwxfHx8fDE3NzIyNjEyOTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    year: 2024,
    slug: "smartassist-chatbot",
    service: "AI Solutions & Automation",
    category: "ai",
    client: "SecureLife Insurance",
    link: "/services/ai-solutions",
  },
  {
    title: "SmartHome IoT Platform",
    description:
      "AI-controlled smart home platform with automated energy optimization and predictive maintenance.",
    overview:
      "For a leading provider of smart home systems, we developed an AI platform that analyzes energy consumption in real time, detects patterns, and automatically makes optimizations — from heating control to predictive device maintenance.",
    goal: "Develop an intelligent IoT platform that reduces energy consumption by 30% and prevents device failures through predictive maintenance.",
    improvements: [
      "AI-based real-time energy consumption optimization",
      "Predictive maintenance through machine learning models",
      "Voice control via Alexa and Google Assistant",
      "Automated scenarios based on user behavior",
      "Dashboard with detailed consumption analytics",
      "IoT device management for 50+ device classes",
    ],
    problem:
      "High energy consumption due to manual control, no predictive maintenance — frequent device failures and unnecessary costs.",
    solution:
      "AI-controlled IoT platform with real-time energy optimization, predictive maintenance, voice control, and automated scenarios.",
    image:
      "https://images.unsplash.com/photo-1623113879540-476117b4be1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGhvbWUlMjBhdXRvbWF0aW9uJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc3MjMwODI0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    year: 2025,
    slug: "smarthome-iot",
    service: "AI Solutions & Automation",
    category: "ai",
    client: "NexaHome Technologies",
    link: "/services/ai-solutions",
  },

  /* ─── Custom Software ─── */
  {
    title: "HubSpot CRM – Dental Clinic Chain",
    description:
      "Enterprise HubSpot CRM implementation across a 5-branch dental clinic chain, integrating patient workflows, IVORIS API, and Make.com automation.",
    overview:
      "We implemented HubSpot CRM for a multi-branch orthodontic clinic chain with five locations. The project involved defining a unified process across all branches — standardizing workflows, patient management, and administrative practices. We integrated HubSpot with the internal Orthodontic Platform via IVORIS API and the clinic website, using Make.com to orchestrate the entire integration. Patient data was managed as both contacts and deals, with careful data migration ensuring accuracy and compliance with healthcare regulations.",
    goal: "Implement a unified CRM system across 5 dental clinic branches that standardizes patient workflows, automates deal pipelines, and integrates seamlessly with existing orthodontic software.",
    improvements: [
      "Unified CRM process across 5 clinic branches",
      "HubSpot integration with IVORIS orthodontic API",
      "Make.com workflow automation for seamless data flow",
      "Custom deal pipeline with orthodontic-specific stages",
      "Comprehensive staff training across all locations",
      "Ongoing monitoring and iterative improvement system",
    ],
    problem:
      "Five branches operating with different workflows, no centralized CRM, and complex integration requirements between HubSpot, the orthodontic platform, and the website.",
    solution:
      "Enterprise HubSpot CRM implementation with unified processes, IVORIS API integration, Make.com automation, custom deal pipelines, and comprehensive training programs across all branches.",
    image: hubspotCrmImageSrc,
    year: 2024,
    slug: "hubspot-dental-crm",
    service: "Custom Software",
    category: "software",
    client: "Dental Clinic Chain (Confidential)",
    link: "/services/custom-software",
  },
  {
    title: "BeOriginalTours Operations Platform",
    description:
      "Automated booking, scheduling, and management platform for a European tour agency, built with Make.com, Python, MongoDB, and a custom Next.js dashboard.",
    overview:
      "BeOriginalTours is a European tour agency that we helped automate the booking and scheduling process for. The platform utilizes Make.com to automate workflows, and Python scripts were used to extract email information from bookings. We also built an event scheduling system to streamline the process. Additionally, a custom dashboard was created using Next.js, where the team can view monthly and weekly tour schedules, track guides, and manage payments. The entire architecture runs seamlessly through Make.com and Discord, ensuring an efficient and automated workflow for the agency.",
    goal: "Automate the entire booking and scheduling pipeline for a tour agency — from email extraction to guide management and payment tracking — with a custom dashboard for full operational visibility.",
    improvements: [
      "Make.com workflow automation for booking pipeline",
      "Python scripts for automated email data extraction",
      "Custom Next.js dashboard for schedules and payments",
      "MongoDB database for bookings and guide management",
      "Discord integration for team communication and alerts",
      "Event scheduling system for weekly and monthly tours",
    ],
    problem:
      "Manual booking processing, scattered scheduling across spreadsheets, and no centralized view of guides, tours, or payments — leading to errors and inefficiency.",
    solution:
      "End-to-end automated architecture using Make.com, Python email extraction, MongoDB storage, Discord notifications, and a custom Next.js dashboard for full operational control.",
    image: beOriginalToursCoverImageSrc,
    year: 2024,
    slug: "beoriginaltours-operations",
    service: "Custom Software",
    category: "software",
    client: "BeOriginalTours",
    link: "/services/custom-software",
  },
  {
    title: "Luxe Mode Online Shop",
    description:
      "High-end e-commerce solution with personalized recommendations and seamless checkout experience.",
    overview:
      "Luxe Mode is a premium fashion brand specializing in exclusive designer wear. The existing online shop had a high cart abandonment rate and offered no personalized product suggestions — significant revenue potential was left untapped.",
    goal: "Build a custom e-commerce platform with AI-powered recommendations, optimized checkout, and data-driven conversion optimization.",
    improvements: [
      "AI-powered real-time product recommendations",
      "One-click checkout for minimal friction",
      "A/B-optimized sales funnel",
      "Personalized email automation",
      "Mobile-first shopping experience",
      "Integration with payment providers (Stripe, Klarna, PayPal)",
    ],
    problem:
      "High cart abandonment rate and no personalized product suggestions — significant revenue potential was left untapped.",
    solution:
      "Custom e-commerce platform with AI recommendations, one-click checkout, A/B-optimized funnel, and automated email strategy.",
    image:
      "https://images.unsplash.com/photo-1585144860106-998ca0f2922a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBmYXNoaW9uJTIwb25saW5lJTIwc2hvcHxlbnwxfHx8fDE3NzIyNjE2NDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    year: 2025,
    slug: "luxe-mode",
    service: "Custom Software",
    category: "software",
    client: "Luxe Mode AG",
    link: "/services/custom-software",
  },
  {
    title: "LogiTrack Warehouse System",
    description:
      "Custom warehouse management software with real-time tracking, barcode scanning, and automatic reordering.",
    overview:
      "LogiTrack was developed for a growing logistics company in NRW that had reached its limits with Excel spreadsheets and manual inventory management. The custom warehouse management software digitizes the entire goods process from receiving to shipping.",
    goal: "Develop a scalable warehouse management solution that reduces inventory errors by 95% and accelerates order processing by 60%.",
    improvements: [
      "Real-time inventory tracking across all warehouse locations",
      "Barcode and QR code scanning via mobile device",
      "Automatic reordering when minimum stock is reached",
      "Integrated shipping management with DHL/DPD connection",
      "Role-based access system for employees",
      "Detailed reporting and analytics dashboards",
    ],
    problem:
      "Manual inventory management with Excel — frequent errors, no real-time overview, and slow order processing.",
    solution:
      "Custom warehouse management software with real-time tracking, mobile barcode scanning, automatic reordering, and shipping integration.",
    image:
      "https://images.unsplash.com/photo-1627915589334-14a3c3e3a741?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXJlaG91c2UlMjBpbnZlbnRvcnklMjBtYW5hZ2VtZW50JTIwc29mdHdhcmV8ZW58MXx8fHwxNzcyMzA4MjQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    year: 2024,
    slug: "logitrack-warehouse",
    service: "Custom Software",
    category: "software",
    client: "LogiTrack Logistics GmbH",
    link: "/services/custom-software",
  },
  {
    title: "MediConnect Practice Software",
    description:
      "Custom practice management software with appointment scheduling, digital patient records, and billing module.",
    overview:
      "MediConnect was developed for a group practice in Düsseldorf that struggled with outdated practice software. The custom solution unifies appointment scheduling, digital patient records, and billing management in a modern, GDPR-compliant platform.",
    goal: "Replace the outdated practice software with a modern, integrated solution that makes daily operations more efficient and improves patient satisfaction.",
    improvements: [
      "Online appointment booking with automatic reminders",
      "Digital patient records with document management",
      "Integrated billing module (public/private insurance)",
      "GDPR-compliant data storage and processing",
      "Waiting room management with real-time status",
      "Interfaces to laboratory and pharmacy",
    ],
    problem:
      "Outdated practice software without online booking — high administrative effort, media breaks, and dissatisfied patients.",
    solution:
      "Modern practice management software with online booking, digital patient records, billing module, and GDPR-compliant architecture.",
    image:
      "https://images.unsplash.com/photo-1747224317356-6dd1a4a078fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwaGVhbHRoY2FyZSUyMHNvZnR3YXJlJTIwcGxhdGZvcm18ZW58MXx8fHwxNzcyMzA4MjQzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    year: 2023,
    slug: "mediconnect-praxis",
    service: "Custom Software",
    category: "software",
    client: "Group Practice Dr. Weber & Partners",
    link: "/services/custom-software",
  },
];

const DESKTOP_VISIBLE = 3;
const MOBILE_VISIBLE = 1;

/* ─── Timeline ─── */
function Timeline({
  page,
  totalPages,
  visibleCount,
  onGoTo,
}: {
  page: number;
  totalPages: number;
  visibleCount: number;
  onGoTo: (p: number) => void;
}) {
  const years = Array.from(new Set(projects.map((p) => p.year))).sort((a, b) => a - b);
  const visibleStart = page * visibleCount;
  const visibleEnd = visibleStart + visibleCount - 1;

  return (
    <div className="relative mt-12 md:mt-16 px-2">
      
    </div>
  );
}

export function PortfolioSection() {
  const [page, setPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const cardsRef = useRef(null);
  const cardsInView = useInView(cardsRef, { once: true, margin: "-60px 0px" });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const visibleCount = isMobile ? MOBILE_VISIBLE : DESKTOP_VISIBLE;
  const totalPages = Math.ceil(projects.length / visibleCount);

  useEffect(() => {
    setPage((prev) => Math.min(prev, totalPages - 1));
  }, [totalPages]);

  const nextPage = useCallback(() => {
    setPage((prev) => Math.min(prev + 1, totalPages - 1));
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setPage((prev) => Math.max(prev - 1, 0));
  }, []);

  const goToPage = useCallback(
    (p: number) => {
      setPage(Math.max(0, Math.min(p, totalPages - 1)));
    },
    [totalPages]
  );

  const touchStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx < -50) nextPage();
    else if (dx > 50) prevPage();
  };

  const visibleProjects = projects.slice(
    page * visibleCount,
    page * visibleCount + visibleCount
  );

  return (
    <section
      id="portfolio"
      className="relative py-16 md:py-24"
      style={{ background: colors.white }}
    >
      {/* Figma-matching gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(196,224,254,0) 0%, rgba(196,224,254,0.5) 15%, rgba(196,224,254,0) 50%)",
        }}
      />

      {/* Subtle cosmic decorations */}
      <motion.div
        className="absolute hidden lg:block z-[1]"
        style={{ top: "5%", left: "2%" }}
        animate={{ x: [0, 8, 0], y: [0, -5, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <Spaceship size={70} style={{ opacity: 0.15 }} />
      </motion.div>
      <motion.div
        className="absolute hidden md:block z-[1]"
        style={{ bottom: "15%", right: "1%" }}
        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      >
        <StarShape size={16} color={`${colors.blue}1F`} />
      </motion.div>

      <SectionContainer className="relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <ScrollReveal>
            <SectionBadge variant="light" className="mb-6">
              Our Portfolio
            </SectionBadge>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <SectionHeading theme="light">
              Completed projects
              <br />
              as a guiding light
            </SectionHeading>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="mt-4">
              <LinkWithArrow href="/portfolio">
                Explore our portfolio
              </LinkWithArrow>
            </div>
          </ScrollReveal>
        </div>

        {/* Carousel */}
        <div ref={cardsRef} className="relative">
          <div
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <motion.div
              className={`grid gap-6 ${isMobile ? "grid-cols-1" : "grid-cols-3"}`}
              key={page}
              initial={{ opacity: 0, x: 60 }}
              animate={cardsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {visibleProjects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </motion.div>
          </div>

          {/* Nav buttons */}
          {page > 0 && (
            <CarouselNavButton
              direction="prev"
              onClick={prevPage}
              className="absolute -left-4 md:-left-6 top-[120px] md:top-[140px] z-20"
            />
          )}
          {page < totalPages - 1 && (
            <CarouselNavButton
              direction="next"
              onClick={nextPage}
              className="absolute -right-4 md:-right-6 top-[120px] md:top-[140px] z-20"
            />
          )}
        </div>

        {/* Timeline */}
        <Timeline
          page={page}
          totalPages={totalPages}
          visibleCount={visibleCount}
          onGoTo={goToPage}
        />
      </SectionContainer>
    </section>
  );
}