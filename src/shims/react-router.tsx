/* ─────────────────────────────────────────────────────
 * react-router SHIM for Next.js
 *
 * Existing Vite components import useNavigate,
 * useLocation, useParams, useSearchParams, and Link
 * from "react-router". This module re-exports Next.js
 * equivalents so those components work without any
 * source changes.
 * ─────────────────────────────────────────────────── */
"use client";

import {
  useRouter,
  usePathname,
  useSearchParams as useNextSearchParams,
  useParams as useNextParams,
} from "next/navigation";
import NextLink from "next/link";
import React from "react";

/**
 * Drop-in replacement for react-router's useNavigate.
 * Returns a function matching navigate(path) usage.
 */
export function useNavigate() {
  const router = useRouter();
  return (to: string) => router.push(to);
}

/**
 * Drop-in replacement for react-router's useLocation.
 * Returns an object with { pathname } matching common usage.
 */
export function useLocation() {
  const pathname = usePathname();
  return { pathname };
}

/**
 * Drop-in replacement for react-router's useParams.
 * Next.js useParams returns the same shape already.
 */
export function useParams<T extends Record<string, string> = Record<string, string>>(): T {
  return useNextParams() as T;
}

/**
 * Drop-in replacement for react-router's useSearchParams.
 * react-router returns [searchParams, setSearchParams].
 * We replicate that tuple interface using Next.js primitives.
 */
export function useSearchParams(): [URLSearchParams, (params: Record<string, string>) => void] {
  const nextSearchParams = useNextSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const setSearchParams = React.useCallback(
    (params: Record<string, string>) => {
      const sp = new URLSearchParams(params);
      const qs = sp.toString();
      router.push(qs ? `${pathname || '/'}?${qs}` : pathname || '/');
    },
    [router, pathname]
  );

  /* nextSearchParams is ReadonlyURLSearchParams — wrap in mutable URLSearchParams */
  const mutable = React.useMemo(
    () => new URLSearchParams(nextSearchParams?.toString() ?? ''),
    [nextSearchParams]
  );

  return [mutable, setSearchParams];
}

/**
 * Drop-in <Link> component compatible with react-router API.
 * Supports `to` prop (react-router style) in addition to `href`.
 */
export function Link({
  to,
  href,
  children,
  ...rest
}: {
  to?: string;
  href?: string;
  children?: React.ReactNode;
  [key: string]: unknown;
}) {
  return (
    <NextLink href={to || href || "#"} {...rest}>
      {children}
    </NextLink>
  );
}

/* Re-export anything else components might reference as no-ops */
export function RouterProvider({ children }: { children?: React.ReactNode }) {
  return <>{children}</>;
}
export function createBrowserRouter(routes: unknown[]) {
  return routes;
}
