import type { EnquiryAttribution } from "./enquiry-attribution";

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
  source?: string;
  attribution?: EnquiryAttribution;
}

export async function submitContactForm(data: ContactFormData): Promise<{ success: boolean; error?: string; enquiryId?: string }> {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return { success: false, error: body.error || "Failed to send message" };
    }

    const body = await res.json().catch(() => ({}));
    trackEvent("generate_lead", { form: data.source || "contact", service: data.service || "" });
    return { success: true, enquiryId: typeof body.enquiryId === "string" ? body.enquiryId : undefined };
  } catch {
    return { success: false, error: "Network error. Please try again." };
  }
}

/** Send a GA4 event if gtag is on the page (no-op otherwise). */
export function trackEvent(name: string, params: Record<string, string | number> = {}) {
  if (typeof window === "undefined") return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const g = (window as any).gtag;
  if (typeof g === "function") g("event", name, params);
}
