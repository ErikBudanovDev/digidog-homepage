import Link from "next/link";

const COPY = {
  EN: {
    label: "About the author",
    name: "Erik Budanov",
    role: "Founder of DigiDog",
    bio: "MSc Engineering, TU Wien. Before DigiDog: system development at SMA Solar Technology and digital project management at Siemens. Today he connects Claude and AI agents to the tools businesses already use. Top Rated Plus on Upwork with 100% Job Success.",
    about: "More about Erik",
    aboutHref: "/about",
    moreLabel: "Keep reading",
    links: [
      { href: "/services/ai-integration", text: "AI integration & AI agents for your business" },
      { href: "/blog/claude-code-for-business", text: "Claude Code for business: 5 real use cases" },
      { href: "/blog/building-with-ai-claude-workshop", text: "Workshop: from idea to a live business app with Claude" },
    ],
  },
  DE: {
    label: "Über den Autor",
    name: "Erik Budanov",
    role: "Gründer von DigiDog",
    bio: "MSc Engineering, TU Wien. Vor DigiDog: Systementwicklung bei SMA Solar Technology und digitales Projektmanagement bei Siemens. Heute verbindet er Claude und KI-Agenten mit den Tools, die Unternehmen schon nutzen. Top Rated Plus auf Upwork mit 100 % Job Success.",
    about: "Mehr über Erik",
    aboutHref: "/de/ueber-uns",
    moreLabel: "Weiterlesen",
    links: [
      { href: "/de/dienstleistungen/ki-integration", text: "KI-Integration & KI-Agenten für Ihr Unternehmen" },
      { href: "/de/blog/claude-code-fuer-unternehmen", text: "Claude Code für Unternehmen: 5 echte Einsatzbeispiele" },
      { href: "/de/blog/mit-ki-bauen-claude-workshop", text: "Workshop: Mit Claude von der Idee zur fertigen Business-App" },
    ],
  },
};

export function AuthorBox({ locale, currentSlug }: { locale: "EN" | "DE"; currentSlug: string }) {
  const c = COPY[locale];
  const links = c.links.filter((l) => !l.href.endsWith(`/${currentSlug}`));
  return (
    <aside className="mt-14 space-y-6" aria-label={c.label}>
      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 flex flex-col sm:flex-row gap-5">
        <div
          className="w-16 h-16 shrink-0 rounded-full flex items-center justify-center text-white text-xl font-bold"
          style={{ background: "linear-gradient(135deg, #0057ff, #a855f7)" }}
          aria-hidden="true"
        >
          EB
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">{c.label}</p>
          <p className="text-lg font-semibold text-gray-900">
            {c.name} <span className="font-normal text-gray-500">· {c.role}</span>
          </p>
          <p className="mt-2 text-[15px] leading-relaxed text-gray-600">{c.bio}</p>
          <div className="mt-3 flex flex-wrap gap-4 text-sm">
            <Link href={c.aboutHref} className="text-blue-600 hover:underline">
              {c.about}
            </Link>
            <a href="https://www.upwork.com/freelancers/erikbudanov" target="_blank" rel="noopener" className="text-blue-600 hover:underline">
              Upwork
            </a>
          </div>
        </div>
      </div>
      {links.length > 0 && (
        <div className="rounded-2xl border border-gray-200 p-6">
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-3">{c.moreLabel}</p>
          <ul className="space-y-2">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-[15px] text-blue-600 hover:underline">
                  {l.text} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}
