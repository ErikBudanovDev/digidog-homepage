import { notFound } from "next/navigation";

/* Catch-all so unknown URLs get the EN root layout's 404 (multiple root layouts). */
export default function CatchAll() {
  notFound();
}
