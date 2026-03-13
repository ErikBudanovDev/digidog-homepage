import type { Metadata } from "next";
import ContactPageClient from "../client-pages/ContactPageClient";
import en from "../../translations/english.json";

export const metadata: Metadata = {
  title: en.seo.contact.title,
  description: en.seo.contact.description,
  alternates: { canonical: "/contact" },
  openGraph: { title: en.seo.contact.title, description: en.seo.contact.description, type: "website" },
};

const localBusinessSchema = {
  "@context": "https://schema.org", "@type": "LocalBusiness",
  name: "Digidog — AI & Web Development Agency",
  url: "https://www.digidog.org",
  telephone: "+43-664-93020594",
  email: "info@digidog.org",
  address: { "@type": "PostalAddress", streetAddress: "Lvovyan 17/50", addressLocality: "Yerevan", addressCountry: "AM" },
  geo: { "@type": "GeoCoordinates", latitude: 40.1872, longitude: 44.5152 },
  priceRange: "€€€",
  openingHours: "Mo-Fr 09:00-18:00",
  areaServed: [{ "@type": "Country", name: "Germany" }, { "@type": "Country", name: "United States" }, { "@type": "Country", name: "Austria" }],
  knowsLanguage: ["English", "German"],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <ContactPageClient />
    </>
  );
}
