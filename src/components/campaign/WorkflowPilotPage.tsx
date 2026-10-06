"use client";

import { useEffect, useState } from "react";
import { submitContactForm } from "@/lib/contact";
import { trackEvent, trackContactFormSubmit } from "@/lib/analytics";
import copy from "./copy.json";
import styles from "./WorkflowPilotPage.module.css";

export function WorkflowPilotPage({ variant }: { variant: "a" | "b" }) {
  const framing = copy.variants[variant];
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const formLocation = `workflow_pilot_${variant}`;
  useEffect(() => {
    trackEvent("campaign_landing_view", { campaign: "workflow_pilot", variant });
  }, [variant]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError("");
    const fields = new FormData(e.currentTarget);
    const result = await submitContactForm({
      name: String(fields.get("name")), email: String(fields.get("email")),
      company: String(fields.get("company")),
      message: `Company website: ${fields.get("website") || "Not provided"}\nBased in: ${fields.get("country")}\n\n${fields.get("message")}`,
      source: `Workflow pilot ${variant.toUpperCase()}`,
    });
    setSending(false);
    if (result.success) {
      trackContactFormSubmit(formLocation);
      setSubmitted(true);
    } else setError(result.error || "Could not send your enquiry. Please try again.");
  };
  const cta = <a className={styles.button} href="#pilot-enquiry" onClick={() => trackEvent("campaign_cta_click", { campaign: "workflow_pilot", variant })}>Discuss a workflow pilot <span aria-hidden="true">↗</span></a>;
  return <div className={styles.page}>
    <a className={styles.skip} href="#main">Skip to content</a>
    <header className={styles.header}><a href="/" className={styles.logo}>digi<span>dog</span><i aria-hidden="true">.</i></a><span>Independent product engineering<br /><strong>Erik Budanov</strong></span></header>
    <main id="main">
      <section className={styles.hero}>
        <div><p className={styles.eyebrow}>AI workflow pilots for established B2B teams</p><h1>{framing.title}</h1><p className={styles.intro}>{framing.intro}</p>{cta}<p className={styles.note}>Paid discovery. One focused pilot.<br />Evidence for your next decision.</p></div>
        <aside className={styles.workflow} aria-label="Illustrative pilot workflow">
          <div className={styles.cardTop}><span>THE WORK, CONNECTED</span><span>01 → 04</span></div>
          {[["01", "A business question", "Approved information · a clear owner"], ["02", "Investigate & reason", "Evidence · options · assumptions"], ["03", "People review", "Check the plan and approve the next step"], ["04", "Move work forward", "Approved actions in your existing systems"]].map(([n,t,d]) => <div className={styles.flowRow} key={n}><span>{n}</span><div><h2>{t}</h2><p>{d}</p></div></div>)}
          <p className={styles.flowFoot}>Selected work can progress outside office hours.<br />Human approvals stay with your people.</p>
        </aside>
      </section>
      <div className={styles.audience}>{copy.audience}</div>
      <section className={styles.capacity}><p className={styles.eyebrow}>BEYOND OFFICE HOURS</p><h2>Intelligence that keeps your business moving, around the clock.</h2><p>Configured workflows can analyze incoming requests, develop options, and prepare work for review while your team is offline.</p></section>
      <section className={styles.section}><p className={styles.eyebrow}>WHAT AI CAN CONTRIBUTE</p><h2>{framing.benefitTitle}</h2><div className={styles.grid}>{copy.benefits.map(([title,body],i)=><article key={title}><span className={styles.number}>0{i+1}</span><h3>{framing.benefitHeads[i] || title}</h3><p>{body}</p></article>)}</div></section>
      <section className={`${styles.section} ${styles.soft}`}><p className={styles.eyebrow}>WORKFLOW EXAMPLES</p><h2>Choose one practical starting point</h2><div className={styles.grid}>{copy.workflows.map(([title,body])=><article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div><p className={styles.small}>These are candidate starting points. Discovery identifies one valuable problem and the parts of the work that are suitable for a pilot.</p></section>
      <section className={styles.section}><p className={styles.eyebrow}>ONE PROBLEM. A CLEAR DECISION.</p><h2>From a valuable problem to a measured pilot</h2><div className={styles.steps}>{copy.steps.map(([title,body])=><article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div><div className={styles.guardrails}><h3>Keep the pilot accountable</h3><ul>{copy.guards.map(g=><li key={g}>{g}</li>)}</ul></div></section>
      <section className={`${styles.section} ${styles.soft}`}><p className={styles.eyebrow}>RELEVANT EXPERIENCE</p><h2>AI applied to real business work</h2><div className={styles.proof}>{copy.proof.map(([title,body,attribution])=><article key={title}><h3>{title}</h3><p>{body}</p><p className={styles.attribution}>{attribution}</p></article>)}</div><p className={styles.small}>Direct senior ownership from Erik Budanov, independent product engineer and founder of DigiDog, with AI-assisted delivery.</p></section>
      <section className={styles.section}><p className={styles.eyebrow}>BEFORE WE START</p><h2>Frequently asked questions</h2><div className={styles.faqs}>{copy.faqs.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section>
      <section id="pilot-enquiry" className={styles.contact}><div><p className={styles.eyebrow}>START WITH ONE VALUABLE PROBLEM</p><h2>Make your next AI decision with evidence</h2><p>{framing.closing}</p><p className={styles.small}>Paid discovery followed by a pilot only if there is a suitable use case and you approve the scope. Cost and timing are agreed before each phase.</p></div><div>
        <h3>What would you like your team to work through?</h3>
        {submitted ? <p role="status" className={styles.success}>Thanks. Your workflow enquiry has been received.</p> : <form onSubmit={handleSubmit}>
          <div className={styles.fields}><label>Name<input name="name" autoComplete="name" required /></label><label>Work email<input name="email" type="email" autoComplete="email" required /></label><label>Company<input name="company" autoComplete="organization" required /></label><label>Company website (optional)<input name="website" type="url" placeholder="https://" autoComplete="url" /></label></div>
          <label>Where is your company based?<input name="country" autoComplete="country-name" required /></label>
          <label>What business problem or decision would you like help working through?<textarea name="message" rows={4} required aria-describedby="enquiry-help" /></label>
          <p id="enquiry-help" className={styles.small}>A short description is enough. Please leave out confidential records and customer data. <a href="/privacy">Privacy information</a>.</p>
          {error && <p role="alert">{error}</p>}
          <button className={styles.button} type="submit" disabled={sending}>{sending ? "Sending…" : "Discuss a workflow pilot"}<span aria-hidden="true">↗</span></button>
        </form>}
      </div></section>
    </main>
    <footer className={styles.footer}><span>DigiDog · Erik Budanov</span><div><a href="/privacy">Privacy</a><a href="/imprint">Imprint</a></div></footer>
  </div>;
}
