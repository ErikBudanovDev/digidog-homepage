import { ScrollReveal } from "./ScrollReveal";
import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { StarShape, Planet } from "./CosmicElements";
import { colors, fonts } from "./ui/brand";
import { SectionContainer, SectionBadge, SectionHeading } from "./ui/section";
import { LinkWithArrow } from "./ui/buttons";
import { ReviewCard, type ReviewCardData } from "./ui/cards";

const reviews: ReviewCardData[] = [
  {
    name: "Callbot Crypto",
    role: "Project Manager for MVP development",
    rating: 5,
    date: "Nov 2022 – Jul 2023",
    text: "Outstanding work! Managed the MVP project proficiently, demonstrating deep knowledge of React. Great communication also, and timely delivery. Highly recommend for future projects. Thanks.",
    image:
      "https://images.unsplash.com/photo-1634133472760-e5c2bd346787?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjB0ZWNoJTIwc3RhcnR1cCUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc3MzA1Mjc3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    source: "Upwork",
    project: "React / MVP",
  },
  {
    name: "Davit Roth",
    role: "Website Architecture and Creation",
    rating: 5,
    date: "Apr – Jul 2022",
    text: "Top Work! Reliable, honest and determined to complete promises. Very good know-how in the field of expertise.",
    image:
      "https://images.unsplash.com/photo-1685328403783-00925c2a4301?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWRkbGUlMjBhZ2VkJTIwYnVzaW5lc3NtYW4lMjBwb3J0cmFpdCUyMGNvbmZpZGVudHxlbnwxfHx8fDE3NzMwNTI3NzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    source: "Upwork",
    project: "Web Architecture",
  },
  {
    name: "Klaudia Jovcevska",
    role: "WordPress Elementor Developer",
    rating: 5,
    date: "Feb – Apr 2022",
    text: "DigiDog is super reliable and supportive. They always consulted and followed the time schedule. They work precisely and accurately. I can recommend working with them to anyone.",
    image:
      "https://images.unsplash.com/photo-1565828052994-aa2276b131a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldXJvcGVhbiUyMHdvbWFuJTIwcHJvZmVzc2lvbmFsJTIwb2ZmaWNlJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczMDUyNzc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    source: "Upwork",
    project: "WordPress",
  },
  {
    name: "Simon Bowen",
    role: "WordPress Developer & Designer",
    rating: 5,
    date: "Jan 2022",
    text: "Good WordPress developer, highly recommended.",
    image:
      "https://images.unsplash.com/photo-1524666041070-9d87656c25bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicml0aXNoJTIwbWFuJTIwZGV2ZWxvcGVyJTIwY2FzdWFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczMDUyNzc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    source: "Upwork",
    project: "WordPress",
  },
  {
    name: "Joel Elsener",
    role: "Change-over Usercentrics/Borlabs",
    rating: 5,
    date: "Nov 2021 – Jan 2022",
    text: "DigiDog was very pleasant to work with, they did a great job. Thank you!",
    image:
      "https://images.unsplash.com/photo-1590496552566-41aca09db352?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2lzcyUyMG1hbiUyMGJ1c2luZXNzJTIwcHJvZmVzc2lvbmFsJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczMDUyNzc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    source: "Upwork",
    project: "WordPress",
  },
  {
    name: "Kristina Hirta",
    role: "WordPress Developer",
    rating: 5,
    date: "Oct – Nov 2021",
    text: "DigiDog was great, it was a pleasure working with them! They did a great job, finished ahead of schedule and communicated very well throughout the project. Can definitely recommend!",
    image:
      "https://images.unsplash.com/photo-1675186914580-94356f7c012c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGRldmVsb3BlciUyMHByb2Zlc3Npb25hbCUyMHNtaWxpbmclMjBoZWFkc2hvdHxlbnwxfHx8fDE3NzMwNTI3NzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    source: "Upwork",
    project: "WordPress",
  },
  {
    name: "Matthias Björk",
    role: "WordPress Customizations & Updates",
    rating: 5,
    date: "Aug – Dec 2021",
    text: "DigiDog is one of best one's out there. When they take on a new project, they don't need to have all the information needed for the project, but take it as the project evolves.",
    image:
      "https://images.unsplash.com/photo-1590665157754-d7f52a57bf41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2FuZGluYXZpYW4lMjBtYW4lMjBjcmVhdGl2ZSUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MzA1Mjc3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    source: "Upwork",
    project: "WordPress",
  },
  {
    name: "Mario Calzone",
    role: "WooCommerce Development",
    rating: 5,
    date: "Jul 2021",
    text: "It is always a pleasure to work with DigiDog, they are perfect consultants and understand also business requirements and not only blind coding. We worked together twice – was always nice to cooperate.",
    image:
      "https://images.unsplash.com/photo-1764711274301-dcd9c97db41c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwbWFuJTIwcmVzdGF1cmFudCUyMG93bmVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczMDUyNzc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    source: "Upwork",
    project: "WooCommerce",
  },
];

const VISIBLE_COUNT = 3;

export function ReviewsSection() {
  const cardsRef = useRef(null);
  const cardsInView = useInView(cardsRef, { once: true, margin: "-60px 0px" });
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(reviews.length / VISIBLE_COUNT);

  const visibleReviews = reviews.slice(
    page * VISIBLE_COUNT,
    page * VISIBLE_COUNT + VISIBLE_COUNT
  );

  return (
    <section className="bg-white py-16 md:py-24 relative overflow-hidden">
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
              Client Reviews
            </SectionBadge>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <SectionHeading
              theme="light"
              subtitle="Discover what our clients say about working with digidog. Authentic reviews from real partners on Upwork."
            >
              Simply honest!
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
                  Top Rated on Upwork
                </span>
              </div>
              <div className="h-4 w-px" style={{ background: "rgba(0,0,0,0.12)" }} />
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="#14A800"
                      stroke="#14A800"
                      strokeWidth="2"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <span
                  className="text-[14px]"
                  style={{ fontFamily: fonts.display, fontWeight: 600, color: colors.textDark }}
                >
                  5.0
                </span>
                <span
                  className="text-[13px]"
                  style={{ fontFamily: fonts.display, color: colors.textMuted }}
                >
                  ({reviews.length} reviews)
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
                100% Job Success
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="mt-4">
              <LinkWithArrow href="#portfolio">Explore our portfolio</LinkWithArrow>
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