import Container from "./Container";
import Globe from "./Globe";
import { site } from "@/lib/content";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-14 pb-14 md:pt-20 md:pb-16">
      <Container className="relative lg:grid lg:grid-cols-[minmax(0,1fr)_380px] lg:items-center lg:gap-12 xl:grid-cols-[minmax(0,1fr)_440px]">
        <div className="relative z-10">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]">
            {site.location} — Open to local &amp; remote roles
          </p>

          <h1 className="max-w-4xl text-balance text-4xl font-medium leading-[1.1] tracking-tight text-[var(--color-ink)] sm:text-5xl md:text-6xl">
            {site.name}
          </h1>
          <p className="mt-3 text-xl md:text-2xl text-[var(--color-ink-muted)]">
            {site.title}
          </p>

          <p className="mt-8 max-w-2xl text-balance text-lg md:text-xl leading-relaxed text-[var(--color-ink)]/90">
            {site.tagline}
          </p>

          <p className="mt-4 max-w-2xl text-base text-[var(--color-ink-muted)]">
            {site.yearsExperience} years in software development, building React
            and TypeScript products across fintech, Web3 and AI-enabled
            workflows.
          </p>

          <div className="mt-6 flex flex-wrap gap-x-3 gap-y-2 font-mono text-sm text-[var(--color-ink-faint)]">
            {site.stack.map((item, i) => (
              <span key={item} className="flex items-center gap-3">
                {item}
                {i < site.stack.length - 1 && (
                  <span className="text-[var(--color-border-strong)]">·</span>
                )}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-medium text-[var(--color-accent-ink)] transition-opacity hover:opacity-90"
            >
              View selected work
            </a>
            <a
              href={site.cvPath}
              className="rounded-full border border-[var(--color-border-strong)] px-6 py-3 text-sm text-[var(--color-ink)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              Download CV
            </a>
            <div className="flex items-center gap-4 pl-2 text-sm text-[var(--color-ink-muted)]">
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[var(--color-ink)]"
              >
                LinkedIn
              </a>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[var(--color-ink)]"
              >
                GitHub
              </a>
              <a
                href="#contact"
                className="transition-colors hover:text-[var(--color-ink)]"
              >
                Contact
              </a>
            </div>
          </div>
        </div>

        {/* Faint backdrop behind the copy on small screens, a proper column at lg. */}
        <div className="pointer-events-none absolute inset-y-0 left-1/2 z-0 flex w-[125%] -translate-x-1/2 items-center opacity-[0.32] lg:static lg:z-auto lg:w-full lg:translate-x-0 lg:flex-col lg:justify-center lg:gap-4 lg:opacity-100">
          <Globe />
          <p className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--color-ink-faint)] lg:block">
            Phnom Penh — working globally
          </p>
        </div>
      </Container>
    </section>
  );
}
