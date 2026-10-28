import { ScrollReveal } from "./ScrollReveal";
import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { StarShape, Planet } from "./CosmicElements";
import { colors, fonts } from "./ui/brand";
import { SectionContainer, SectionBadge, SectionHeading } from "./ui/section";
import { LinkWithArrow } from "./ui/buttons";
import { useTranslation } from "@/i18n/i18n-context";
import { ReviewCard, type ReviewCardData } from "./ui/cards";

const reviews: ReviewCardData[] = [
  {
    name: "CAPPA",
    role: "WordPress development & site optimisation",
    rating: 5,
    date: "Sep 2025 – May 2026",
    text: "Erik has been an exceptional partner for our team. While he joined us as a contractor, he quickly became an integral part of our day-to-day operations and truly feels like an in-house team member. … Erik is incredibly reliable and dependable. We can count on him to deliver on time, communicate clearly, and follow through on every detail.",
    image: "",
    source: "Upwork",
    project: "WordPress",
  },
  {
    name: "AI agents & automation client",
    role: "AI in lead generation, outreach and CRM",
    rating: 5,
    date: "Feb – May 2026",
    text: "Erik is a great developer. He helped us integrate AI into our lead generation pipeline and outreach system, including integration with our CRM system, which enabled automated outreach records and follow-ups. We have been working with Erik for a long time and have already completed many projects together.",
    image: "",
    source: "Upwork",
    project: "AI Agents",
  },
  {
    name: "Upwork enterprise client",
    role: "Web administration after an acquisition",
    rating: 5,
    date: "Aug 2022 – Dec 2025",
    text: "Erik transitioned into our team after an acquisition and was responsible for the majority of site updates for several years. Erik was great to work with, communicated well, and often times thought outside of the box … In the future, we likely will reach out to Erik when we are in need of a web dev.",
    image: "",
    source: "Upwork",
    project: "Enterprise web",
  },
  {
    name: "WooCommerce client, Germany",
    role: "WooCommerce & WordPress support",
    rating: 5,
    date: "May 2022 – Sep 2026",
    text: "Erik and his team are very professional and responsive. They were a great support for all our Wordpress projects. Meanwhile, we hired an internal person for this task. We thank Erik for his valuable work!",
    image: "",
    source: "Upwork",
    project: "WooCommerce",
  },
  {
    name: "Strapi project client",
    role: "Custom plugin on Strapi",
    rating: 5,
    date: "Jan 2025",
    text: "Eric is an excellent full-stack JavaScript developer, and it was a pleasure having him on my Strapi project. He showcased his expertise by supporting us with the installation of a custom plugin on Strapi and successfully implementing it.",
    image: "",
    source: "Upwork",
    project: "Strapi / JavaScript",
  },
  {
    name: "WordPress, SEO & Python client",
    role: "WordPress, SEO and Python",
    rating: 5,
    date: "Aug 2024 – May 2025",
    text: "Great communicator and always on point!",
    image: "",
    source: "Upwork",
    project: "WordPress / SEO",
  },
  {
    name: "Callbot Crypto",
    role: "Project Manager for MVP development",
    rating: 5,
    date: "Nov 2022 – Jul 2023",
    text: "Outstanding work! Managed the MVP project proficiently, demonstrating deep knowledge of React. Great communication also, and timely delivery. Highly recommend for future projects. Thanks.",
    image: "",
    source: "Upwork",
    project: "React / MVP",
  },
  {
    name: "Davit Roth",
    role: "Website Architecture and Creation",
    rating: 5,
    date: "Apr – Jul 2022",
    text: "Top Work! Reliable, honest and determined to complete promises. Very good know-how in the field of expertise.",
    image: "",
    source: "Upwork",
    project: "Web Architecture",
  },
  {
    name: "Klaudia Jovcevska",
    role: "WordPress Elementor Developer",
    rating: 5,
    date: "Feb – Apr 2022",
    text: "DigiDog is super reliable and supportive. They always consulted and followed the time schedule. They work precisely and accurately. I can recommend working with them to anyone.",
    image: "",
    source: "Upwork",
    project: "WordPress",
  },
  {
    name: "Simon Bowen",
    role: "WordPress Developer & Designer",
    rating: 5,
    date: "Jan 2022",
    text: "Good WordPress developer, highly recommended.",
    image: "",
    source: "Upwork",
    project: "WordPress",
  },
  {
    name: "Joel Elsener",
    role: "Change-over Usercentrics/Borlabs",
    rating: 5,
    date: "Nov 2021 – Jan 2022",
    text: "DigiDog was very pleasant to work with, they did a great job. Thank you!",
    image: "",
    source: "Upwork",
    project: "WordPress",
  },
  {
    name: "Kristina Hirta",
    role: "WordPress Developer",
    rating: 5,
    date: "Oct – Nov 2021",
    text: "DigiDog was great, it was a pleasure working with them! They did a great job, finished ahead of schedule and communicated very well throughout the project. Can definitely recommend!",
    image: "",
    source: "Upwork",
    project: "WordPress",
  },
  {
    name: "Matthias Björk",
    role: "WordPress Customizations & Updates",
    rating: 5,
    date: "Aug – Dec 2021",
    text: "DigiDog is one of best one's out there. When they take on a new project, they don't need to have all the information needed for the project, but take it as the project evolves.",
    image: "",
    source: "Upwork",
    project: "WordPress",
  },
  {
    name: "Mario Calzone",
    role: "WooCommerce Development",
    rating: 5,
    date: "Jul 2021",
    text: "It is always a pleasure to work with DigiDog, they are perfect consultants and understand also business requirements and not only blind coding. We worked together twice – was always nice to cooperate.",
    image: "",
    source: "Upwork",
    project: "WooCommerce",
  },
];

const VISIBLE_COUNT = 3;

export function ReviewsSection() {
  const { locale } = useTranslation();
  const cardsRef = useRef(null);
  const cardsInView = useInView(cardsRef, { once: true, margin: "-60px 0px" });
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(reviews.length / VISIBLE_COUNT);

  const visibleReviews = reviews.slice(
    page * VISIBLE_COUNT,
    page * VISIBLE_COUNT + VISIBLE_COUNT
  );

  return (
    <section id="reviews" className="bg-white py-16 md:py-24 relative overflow-hidden">
      {/* Subtle cosmic decorations */}
      <motion.div
        className="absolute hidden lg:block"
        style={{ top: "10%", right: "3%" }}
        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      >
        <StarShape size={18} color="rgba(0,87,255,0.12)" />
      </motion.div>
      <motion.div
        className="absolute hidden md:block"
        style={{ bottom: "12%", left: "2%" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        <StarShape size={14} color="rgba(168,85,247,0.1)" />
      </motion.div>
      <motion.div
        className="absolute hidden lg:block"
        style={{ top: "50%", left: "1%" }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Planet size={30} color="rgba(0,87,255,0.15)" ringColor="rgba(0,87,255,0.08)" />
      </motion.div>

      <SectionContainer>
        {/* Header */}
        <div className="text-center mb-12">
          <ScrollReveal>
            <SectionBadge variant="light" className="mb-6">
              {locale === "DE" ? "Kundenbewertungen" : "Client Reviews"}
            </SectionBadge>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <SectionHeading
              theme="light"
              subtitle={locale === "DE"
                ? "Bewertungen von Kunden aus abgeschlossenen Upwork-Projekten, unverändert übernommen."
                : "Reviews from clients on completed Upwork projects, quoted as written."}
            >
              {locale === "DE" ? "Was Kunden sagen" : "What clients say"}
            </SectionHeading>
          </ScrollReveal>

          {/* Upwork stats bar */}
          <ScrollReveal delay={0.15}>
            <div className="flex items-center justify-center gap-6 mt-6 flex-wrap">
              <div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.858-3.066 2.838-3.066 1.119 0 2.03.915 2.03 2.04 0 1.124-.912 2.037-2.03 2.037v.334zm0-5.746c-2.451 0-3.885 1.609-4.555 3.32-.978-1.467-1.717-3.236-2.15-4.726H9.543v5.873c0 1.065-.863 1.93-1.926 1.93-1.063 0-1.926-.865-1.926-1.93V6.006H3.377v5.873c0 2.185 1.782 3.973 3.962 3.973s3.962-1.788 3.962-3.973v-.983c.427.882.977 1.764 1.663 2.51l-1.412 6.636h2.37l1.02-4.804c1.1.699 2.356 1.12 3.62 1.12 2.368 0 4.293-1.932 4.293-4.307s-1.925-4.339-4.293-4.339z"
                    fill="#14A800"
                  />
                </svg>
                <span
                  className="text-[14px]"
                  style={{ fontFamily: fonts.display, fontWeight: 700, color: "#14A800" }}
                >
                  {locale === "DE" ? "Top Rated Plus auf Upwork" : "Top Rated Plus on Upwork"}
                </span>
              </div>
              <div className="h-4 w-px hidden sm:block" style={{ background: "rgba(0,0,0,0.12)" }} />
              <div className="flex items-center gap-1.5">

                <span
                  className="text-[14px]"
                  style={{ fontFamily: fonts.display, fontWeight: 600, color: colors.textDark }}
                >
                  100%
                </span>
                <span
                  className="text-[13px]"
                  style={{ fontFamily: fonts.display, color: colors.textMuted }}
                >
                  Job Success
                </span>
              </div>
              <div
                className="h-4 w-px hidden sm:block"
                style={{ background: "rgba(0,0,0,0.12)" }}
              />
              <span
                className="text-[13px] hidden sm:inline"
                style={{ fontFamily: fonts.display, fontWeight: 600, color: colors.textMuted }}
              >
                {locale === "DE" ? "$300K+ · 7.830 Stunden" : "$300K+ · 7,830 hours"}
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="mt-4">
              <LinkWithArrow href="https://www.upwork.com/freelancers/erikbudanov">{locale === "DE" ? "Alle Bewertungen auf Upwork lesen" : "Read all reviews on Upwork"}</LinkWithArrow>
            </div>
          </ScrollReveal>
        </div>

        {/* Review Cards — paginated 3 at a time */}
        <div ref={cardsRef}>
          <motion.div
            key={page}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {visibleReviews.map((review, index) => (
              <ReviewCard
                key={review.name}
                review={review}
                index={index}
                isInView={cardsInView}
              />
            ))}
          </motion.div>
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center
                         hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              aria-label="Previous reviews"
            >
              <ChevronLeft size={18} color={colors.textDark} />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className="cursor-pointer transition-all duration-200"
                  aria-label={`Page ${i + 1}`}
                >
                  <div
                    className="rounded-full transition-all duration-200"
                    style={{
                      width: page === i ? 24 : 8,
                      height: 8,
                      background: page === i ? "#14A800" : "rgba(0,0,0,0.15)",
                      borderRadius: 999,
                    }}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center
                         hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              aria-label="Next reviews"
            >
              <ChevronRight size={18} color={colors.textDark} />
            </button>
          </div>
        )}
      </SectionContainer>
    </section>
  );
}