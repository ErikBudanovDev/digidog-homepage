/* ─────────────────────────────────────────────
 * Client-Only Cosmic Elements Wrapper
 *
 * Wraps cosmic background components to prevent
 * hydration mismatches caused by Math.random().
 * Components only render after client mount.
 * ───────────────────────────────────────────── */
"use client";

import { useEffect, useState } from "react";
import {
  StarField as OriginalStarField,
  ShootingStar as OriginalShootingStar,
  Spaceship as OriginalSpaceship,
  Planet as OriginalPlanet,
  StarShape as OriginalStarShape,
  TwinkleStar as OriginalTwinkleStar,
} from "@/app/components/CosmicElements";

export function StarField(props: Parameters<typeof OriginalStarField>[0]) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <OriginalStarField {...props} />;
}

export function ShootingStar(props: Parameters<typeof OriginalShootingStar>[0]) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <OriginalShootingStar {...props} />;
}

export function Spaceship(props: Parameters<typeof OriginalSpaceship>[0]) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <OriginalSpaceship {...props} />;
}

export function Planet(props: Parameters<typeof OriginalPlanet>[0]) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <OriginalPlanet {...props} />;
}

export function StarShape(props: Parameters<typeof OriginalStarShape>[0]) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <OriginalStarShape {...props} />;
}

export function TwinkleStar(props: Parameters<typeof OriginalTwinkleStar>[0]) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return <OriginalTwinkleStar {...props} />;
}
