/* ─────────────────────────────────────────────
 * Dynamic Project Page — SSR metadata + client
 * ───────────────────────────────────────────── */
import type { Metadata } from "next";
import ProjectPageClient from "../../client-pages/ProjectPageClient";

export const metadata: Metadata = {
  title: "Project – Digidog Digital Agency",
  description: "Case study and details for this Digidog project.",
};

export default function Page() {
  return <ProjectPageClient />;
}
