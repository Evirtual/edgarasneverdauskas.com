import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI-Built Product Audit | Edgaras Neverdauskas",
  description:
    "A focused product and technical audit for founders shipping with Cursor, Claude Code, Codex, or other AI coding agents.",
};

const checks = [
  "Product and onboarding friction",
  "AI-generated regressions and brittle behaviour",
  "Architecture and unnecessary complexity",
  "Duplicate logic and maintainability risks",
  "Mobile and responsive UX issues",
  "Where to simplify before adding more features",
  "Practical AI opportunities worth building",
  "A prioritized next-step roadmap",
];

export default function AuditPage() {
  const subject = encodeURIComponent("AI-Built Product Audit — $129");
  const body = encodeURIComponent(
    "Hi Edgaras,\n\nI would like an AI-Built Product Audit.\n\nProduct URL:\nCode/repo URL (optional):\nWhat I am most concerned about:\n\nThanks"
  );

  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-ink)]">
      <div className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-24">
        <a
          href="/"
          className="text-sm text-[var(--color-ink-muted)] transition-opacity hover:opacity-70"
        >
          ← Edgaras Neverdauskas
        </a>

        <section className="mt-14 max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-[var(--color-accent)]">
            For founders shipping with AI coding agents
          </p>
          <h1 className="mt-5 text-4xl font-medium leading-tight md:text-6xl">
            Your AI can ship faster than you can review.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[var(--color-ink-muted)] md:text-xl">
            I review the product as both a user and an engineer, then give you a
            compact list of what is fragile, confusing, overbuilt, or worth fixing next.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:contact@edgarasneverdauskas.com?subject=${subject}&body=${body}`}
              className="rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-medium text-[var(--color-accent-ink)] transition-opacity hover:opacity-90"
            >
              Request an audit — $129
            </a>
            <span className="text-sm text-[var(--color-ink-muted)]">
              Flat price · no subscription
            </span>
          </div>
        </section>

        <section className="mt-20 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-7 md:p-8">
            <p className="text-sm font-medium uppercase tracking-[0.14em] text-[var(--color-ink-muted)]">
              What I check
            </p>
            <ul className="mt-6 space-y-3">
              {checks.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                  <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-7 md:p-8">
            <p className="text-sm font-medium uppercase tracking-[0.14em] text-[var(--color-ink-muted)]">
              What you get
            </p>
            <h2 className="mt-4 text-2xl font-medium">A prioritized review, not a dashboard.</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
              You receive a concise written audit with screenshots or code references where useful,
              the highest-impact issues first, and a practical sequence for fixing them.
            </p>
            <div className="mt-6 border-t border-[var(--color-border)] pt-6 text-sm text-[var(--color-ink-muted)]">
              Best fit: working MVPs and early-stage products built quickly with Cursor, Claude Code,
              Codex, Copilot, Lovable, Bolt, or similar tools.
            </div>
          </div>
        </section>

        <section className="mt-20 rounded-2xl border border-dashed border-[var(--color-border)] p-7 md:p-10">
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-[var(--color-ink-muted)]">
            Why this exists
          </p>
          <h2 className="mt-4 max-w-2xl text-2xl font-medium md:text-3xl">
            AI made adding features cheap. It did not make product judgment, architecture, or regression risk disappear.
          </h2>
          <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
            I have spent 10+ years building software products across web, AI, fintech, and Web3.
            I use AI coding agents heavily myself, so the goal is not to tell you to stop using them.
            It is to catch what fast AI-assisted development makes easy to miss.
          </p>
        </section>

        <section className="mt-20 text-center">
          <h2 className="text-3xl font-medium">Have something already live?</h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
            Send the product URL. A repository is optional. If the product is not a good fit for this audit,
            I will say so before taking payment.
          </p>
          <a
            href={`mailto:contact@edgarasneverdauskas.com?subject=${subject}&body=${body}`}
            className="mt-7 inline-block rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-medium text-[var(--color-accent-ink)] transition-opacity hover:opacity-90"
          >
            Request an audit — $129
          </a>
        </section>
      </div>
    </main>
  );
}
