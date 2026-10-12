// Fixed labels only. Never retain raw URLs, referrers, arbitrary UTM values or browser IDs.
const sources = ["google", "linkedin", "email", "referral"] as const;
const media = ["organic", "social", "email", "referral", "cpc"] as const;
export type EnquiryAttribution = {
  variant: "a" | "b";
  source?: typeof sources[number];
  medium?: typeof media[number];
  campaign?: "workflow_pilot";
};

export function sanitizeEnquiryAttribution(value: unknown): EnquiryAttribution | undefined {
  if (!value || typeof value !== "object" || Array.isArray(value)) return;
  const input = value as Record<string, unknown>;
  if (input.variant !== "a" && input.variant !== "b") return;
  const result: EnquiryAttribution = { variant: input.variant };
  if (sources.includes(input.source as typeof sources[number])) result.source = input.source as typeof sources[number];
  if (media.includes(input.medium as typeof media[number])) result.medium = input.medium as typeof media[number];
  if (input.campaign === "workflow_pilot") result.campaign = "workflow_pilot";
  return result;
}

export function readEnquiryAttribution(pathname: string, search: string): EnquiryAttribution | undefined {
  const variant = pathname === "/campaigns/workflow-pilot-a" ? "a" : pathname === "/campaigns/workflow-pilot-b" ? "b" : undefined;
  if (!variant) return;
  const params = new URLSearchParams(search);
  return sanitizeEnquiryAttribution({ variant, source: params.get("utm_source"), medium: params.get("utm_medium"), campaign: params.get("utm_campaign") });
}
