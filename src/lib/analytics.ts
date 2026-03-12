declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (window.gtag) window.gtag("event", eventName, params);
  if (window.dataLayer) window.dataLayer.push({ event: eventName, ...params });
}

export function trackContactFormSubmit(formLocation: string, formData?: { name?: string; email?: string; service?: string }) {
  trackEvent("contact_form_submit", {
    form_location: formLocation,
    contact_name: formData?.name || "",
    contact_email: formData?.email || "",
    service_interest: formData?.service || "",
  });
  trackEvent("generate_lead", { currency: "EUR", value: 50, form_location: formLocation });
}

export function trackBookConsultationClick(location: string) {
  trackEvent("book_consultation_click", { click_location: location });
}
