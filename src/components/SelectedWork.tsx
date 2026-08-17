import Link from "next/link";
import Section from "./Section";
import { projects, otherWork } from "@/lib/content";

export default function SelectedWork() {
  return (
    <Section
      id="work"
      index="01"
      eyebrow="Selected work"
      title="Products I've built and shipped"
      description="Projects spanning fintech, Web3, AI and consumer products — from data pipelines to production DeFi interfaces."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}/`}
            prefetch={false}
            className="group flex flex-col justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-6 md:p-8 transition-colors hover:border-[var(--color-border-strong)]"
          >
            <div>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  {project.logo && (
                    <img
                      src={project.logo}
                      alt=""
                      width={32}
                      height={32}
                      loading="lazy"
                      className="h-8 w-8 shrink-0 object-contain"
                    />
                  )}
                  <h3 className="text-xl font-medium text-[var(--color-ink)]">
                    {project.name}
                  </h3>
                </div>
                <span className="whitespace-nowrap font-mono text-xs text-[var(--color-ink-faint)]">
                  {project.period}
                </span>
              </div>
              <p className="mt-1 text-sm text-[var(--color-accent)]">
                {project.role}
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
                {project.summary}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.tech.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-[var(--color-border)] px-2.5 py-1 font-mono text-[11px] text-[var(--color-ink-faint)]"
                >
                  {t}
                </span>
              ))}
            </div>

            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-accent)]">
              Read case study
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5"
              >
                <path
                  d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-dashed border-[var(--color-border)] p-6 md:p-8">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-ink-faint)]">
          Other work
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {otherWork.map((item) => (
            <div key={item.name}>
              <p className="text-sm font-medium text-[var(--color-ink)]">
                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--color-accent)]"
                  >
                    {item.name} ↗
                  </a>
                ) : (
                  item.name
                )}
              </p>
              <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
