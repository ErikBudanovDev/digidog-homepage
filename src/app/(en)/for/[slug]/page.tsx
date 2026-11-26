import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { landings, getLanding } from "@/lib/landing-data";
import NicheLanding from "@/components/NicheLanding";

interface Props { params: Promise<{ slug: string }> }

export const dynamicParams = false;
export async function generateStaticParams() {
  return landings.filter((l) => l.lang === "en").map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const d = getLanding("en", slug);
  if (!d) return {};
  const en = d.lang === "en" ? d.path : d.alt;
  const de = d.lang === "de" ? d.path : d.alt;
  return {
    title: d.metaTitle,
    description: d.metaDescription,
    alternates: { canonical: d.path, languages: { en, de, "x-default": en } },
    openGraph: { title: d.metaTitle, description: d.metaDescription, type: "website", url: d.path, images: [{ url: "/og-default.jpg", width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title: d.metaTitle, description: d.metaDescription },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const d = getLanding("en", slug);
  if (!d) notFound();
  const service = {
    "@context": "https://schema.org", "@type": "Service", name: d.metaTitle, description: d.metaDescription,
    provider: { "@id": "https://digidog.org/#org" }, url: `https://digidog.org${d.path}`, inLanguage: d.lang, serviceType: "AI agents and automation",
  };
  const faq = {
    "@context": "https://schema.org", "@type": "FAQPage", inLanguage: d.lang,
    mainEntity: d.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <NicheLanding data={d} />
    </>
  );
}
