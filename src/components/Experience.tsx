import Link from "next/link";
import Section from "./Section";
import { experience, projects } from "@/lib/content";

// One rail, three stops: each marker is a chapter of the career rather than a
// job, and the roles held at the same time sit inside it as sub-entries. Seven
// markers all ending in the same year read as seven concurrent jobs; three
// chapters read as a story.
const productBySlug = new Map(projects.map((p) => [p.slug, p]));

export default function Experience() {
  return (
    <Section
      id="experience"
      index="03"
      eyebrow="Experience"
      title="Professional experience"
    >
      {/* The dot sits on the line and punches a hole in it with a ring in the
          page background, so the line reads as continuous behind each entry. */}
      <ol className="relative ml-1 border-l border-[var(--color-border)] pl-7 md:pl-10">
        {experience.map((chapter, i) => (
          <li
            key={chapter.title}
            className={i === experience.length - 1 ? "" : "pb-12 md:pb-14"}
          >
            <span
              aria-hidden="true"
              className={`absolute -left-[4.5px] mt-[7px] h-[9px] w-[9px] rounded-full ring-4 ring-[var(--color-bg)] ${
                i === 0
                  ? "bg-[var(--color-accent)]"
                  : "bg-[var(--color-border-strong)]"
              }`}
            />
            <p className="font-mono text-xs tracking-wide text-[var(--color-ink-faint)]">
              {chapter.period}
            </p>
            <h3 className="mt-2 text-lg font-medium text-[var(--color-ink)]">
              {chapter.title}
            </h3>
            <p className="mt-1 font-mono text-xs text-[var(--color-ink-faint)]">
              {chapter.location}
            </p>
            <p className="mt-3 max-w-2xl leading-relaxed text-[var(--color-ink-muted)]">
              {chapter.summary}
            </p>

            {chapter.products && (
              <ul className="mt-5 flex max-w-2xl flex-wrap gap-2">
                {chapter.products.map((slug) => {
                  const product = productBySlug.get(slug);
                  if (!product) throw new Error(`Experience lists unknown project "${slug}"`);
                  return (
                    <li key={slug}>
                      <Link
                        href={`/work/${slug}/`}
                        className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] py-1.5 pl-1.5 pr-3 text-sm text-[var(--color-ink-muted)] transition-colors hover:border-[var(--color-border-strong)] hover:text-[var(--color-ink)]"
                      >
                        <img
                          src={product.logo}
                          alt=""
                          width={20}
                          height={20}
                          className="h-5 w-5 shrink-0 object-contain"
                        />
                        {product.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}

            {chapter.roles && (
              <ul className="mt-6 max-w-2xl space-y-6 border-l border-[var(--color-border)] pl-5 md:pl-6">
                {chapter.roles.map((role) => (
                  <li key={role.org}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h4 className="text-base font-medium text-[var(--color-ink)]">
                        {role.org}
                      </h4>
                      <p className="font-mono text-xs tracking-wide text-[var(--color-ink-faint)]">
                        {role.period}
                      </p>
                    </div>
                    <p className="mt-1 font-mono text-xs text-[var(--color-ink-faint)]">
                      {role.location}
                    </p>
                    <p className="mt-2 leading-relaxed text-[var(--color-ink-muted)]">
                      {role.description}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
    </Section>
  );
}
