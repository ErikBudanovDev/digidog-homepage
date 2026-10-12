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
  contactFax?: string;
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
    return { success: true, enquiryId: typeof body.enquiryId === "string" ? body.enquiryId : undefined };
  } catch {
    return { success: false, error: "Network error. Please try again." };
  }
}
