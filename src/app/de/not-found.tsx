import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 16px", background: "#0b1b34", color: "#fff", fontFamily: "system-ui, sans-serif", textAlign: "center" }}>
      <div>
        <p style={{ fontSize: 14, opacity: 0.6, marginBottom: 8 }}>404</p>
        <h1 style={{ fontSize: 28, marginBottom: 12 }}>Seite nicht gefunden</h1>
        <p style={{ opacity: 0.75, marginBottom: 24 }}>Diese Seite gibt es nicht oder sie wurde verschoben.</p>
        <Link href="/de" style={{ color: "#22d3ee", fontWeight: 600 }}>Zur Startseite →</Link>
      </div>
    </main>
  );
}
