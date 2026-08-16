import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/Container";
import { projects } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return buildMetadata();

  return buildMetadata({
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}/` },
    openGraph: {
      type: "article",
      url: `/work/${project.slug}/`,
      title: `${project.name} — Edgaras Neverdauskas`,
      description: project.summary,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: project.name,
        },
      ],
    },
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article className="py-16 md:py-24">
      <Container className="max-w-3xl">
        <Link
          href="/#work"
          className="mb-10 inline-flex items-center gap-1.5 text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M11 7H3M3 7L6.5 3.5M3 7L6.5 10.5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to selected work
        </Link>

        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]">
          {project.status}
        </p>
        <h1 className="mt-3 text-3xl md:text-5xl font-medium tracking-tight text-[var(--color-ink)]">
          {project.name}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[var(--color-ink-muted)]">
          <span>{project.role}</span>
          <span className="text-[var(--color-border-strong)]">·</span>
          <span className="font-mono">{project.period}</span>
        </div>

        {project.links.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-3">
            {project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-sm font-medium text-[var(--color-accent-ink)] transition-opacity hover:opacity-90"
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        )}

        <p className="mt-10 text-balance text-xl leading-relaxed text-[var(--color-ink)]/90">
          {project.summary}
        </p>

        <div className="mt-14 grid gap-12">
          <section>
            <h2 className="text-lg font-medium text-[var(--color-ink)]">
              The problem
            </h2>
            <p className="mt-3 leading-relaxed text-[var(--color-ink-muted)]">
              {project.problem}
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-[var(--color-ink)]">
              What I owned
            </h2>
            <ul className="mt-3 space-y-2.5">
              {project.ownership.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 leading-relaxed text-[var(--color-ink-muted)]"
                >
                  <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-medium text-[var(--color-ink)]">
              Technical challenges
            </h2>
            <ul className="mt-3 space-y-2.5">
              {project.challenges.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 leading-relaxed text-[var(--color-ink-muted)]"
                >
                  <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-medium text-[var(--color-ink)]">
              Engineering decisions
            </h2>
            <ul className="mt-3 space-y-2.5">
              {project.decisions.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 leading-relaxed text-[var(--color-ink-muted)]"
                >
                  <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-medium text-[var(--color-ink)]">
              Technology
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-[var(--color-border)] px-3 py-1 font-mono text-xs text-[var(--color-ink-faint)]"
                >
                  {t}
                </span>
              ))}
            </div>
          </section>

          {project.note && (
            <p className="border-l-2 border-[var(--color-border-strong)] pl-4 text-sm italic text-[var(--color-ink-faint)]">
              {project.note}
            </p>
          )}
        </div>

        <div className="mt-16 border-t border-[var(--color-border)] pt-10">
          <Link
            href="/#work"
            className="text-sm text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
          >
            ← Back to selected work
          </Link>
        </div>
      </Container>
    </article>
  );
}
