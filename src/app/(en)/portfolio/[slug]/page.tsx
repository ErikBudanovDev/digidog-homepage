/* ─────────────────────────────────────────────
 * Dynamic Project Page — SSR metadata + client
 * ───────────────────────────────────────────── */
import type { Metadata } from "next";
import ProjectPageClient from "@/app/client-pages/ProjectPageClient";
import { projectsMeta } from "@/lib/portfolio-meta";

export function generateStaticParams() {
  return projectsMeta.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsMeta.find((p) => p.slug === slug);
  const title = project
    ? `${project.title} – Digidog Digital Agency`
    : "Project – Digidog Digital Agency";
  const description = project?.description || "Case study and details for this Digidog project.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://digidog.org/portfolio/${slug}`,
    },
  };
}

export default function Page() {
  return <ProjectPageClient />;
}
