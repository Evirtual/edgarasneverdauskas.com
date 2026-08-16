import Section from "./Section";
import { site } from "@/lib/content";

export default function Contact() {
  return (
    <Section id="contact" className="pb-16 md:pb-20">
      <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-raised)] px-6 py-14 md:px-16 md:py-20 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]">
          Get in touch
        </p>
        <h2 className="mx-auto mt-4 max-w-2xl text-balance text-3xl md:text-4xl font-medium tracking-tight text-[var(--color-ink)]">
          Let&apos;s build something worth shipping.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-balance text-[var(--color-ink-muted)]">
          Open to senior product/frontend engineering roles, local in{" "}
          {site.location} or remote.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`mailto:${site.email}`}
            className="rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-medium text-[var(--color-bg)] transition-opacity hover:opacity-90"
          >
            {site.email}
          </a>
          <a
            href={site.cvPath}
            className="rounded-full border border-[var(--color-border-strong)] px-6 py-3 text-sm text-[var(--color-ink)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            Download CV
          </a>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6 text-sm text-[var(--color-ink-muted)]">
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-ink)]"
          >
            LinkedIn
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--color-ink)]"
          >
            GitHub
          </a>
        </div>
      </div>
    </Section>
  );
}
