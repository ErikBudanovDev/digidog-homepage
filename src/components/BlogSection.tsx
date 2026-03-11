import { ScrollReveal } from "./ScrollReveal";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { colors } from "./ui/brand";
import { SectionContainer, SectionHeading } from "./ui/section";
import { BlogCard, type BlogCardData } from "./ui/cards";

const blogPosts: BlogCardData[] = [
  {
    title: "AI Automation for Mid-Size Companies: A Practical Guide",
    description: "Most mid-size companies waste 30-60% of their team's time on repetitive tasks. Here's exactly how AI automation changes that — with real workflows, not hype.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1080&q=80",
    tag: "AI Automation",
  },
  {
    title: "How We Automated CRM Operations with AI — Saving 25 Hours/Week",
    description: "A mid-size agency was drowning in manual CRM work. We built an AI system that handles lead qualification, follow-ups, and reporting automatically.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1080&q=80",
    tag: "Case Study",
  },
  {
    title: "What Is MCP (Model Context Protocol) and Why It Matters",
    description: "MCP is the protocol that turns AI from a chatbot into a business operator. Here's what it is, how it works, and why your company should care.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1080&q=80",
    tag: "AI Integration",
  },
];

export function BlogSection() {
  const cardsRef = useRef(null);
  const cardsInView = useInView(cardsRef, { once: true, margin: "-60px 0px" });

  return (
    <section
      className="relative py-16 md:py-24 overflow-hidden"
      style={{ background: colors.navy }}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-white rounded-full opacity-5 blur-[200px]" />
        <div className="absolute bottom-[-20%] right-[5%] w-[400px] h-[400px] bg-[#00C59B] rounded-full opacity-8 blur-[200px]" />
        <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] bg-[#DC43F4] rounded-full opacity-5 blur-[200px]" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${(i * 5.3) % 100}%`,
              top: `${(i * 7.1) % 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 3 + (i % 4),
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <SectionContainer className="relative">
        {/* Header */}
        <div className="text-center mb-12">
          <ScrollReveal>
            <SectionHeading theme="dark">
              Explore our world of ideas
            </SectionHeading>
          </ScrollReveal>
        </div>

        {/* Blog Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <BlogCard
              key={post.title}
              post={post}
              index={index}
              isInView={cardsInView}
            />
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}