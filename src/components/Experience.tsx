import Section from "./Section";
import { experience, earlierExperience } from "@/lib/content";

export default function Experience() {
  return (
    <Section
      id="experience"
      index="03"
      eyebrow="Experience"
      title="Professional experience"
    >
      {/* A rail with a marker per role. The dot sits on the line and punches a
          hole in it with a ring in the page background, so the line reads as
          continuous behind each entry rather than butting against it. */}
      <ol className="relative ml-1 border-l border-[var(--color-border)] pl-7 md:pl-10">
        {experience.map((entry, i) => (
          <li
            key={`${entry.role}-${entry.org}`}
            className={i === experience.length - 1 ? "" : "pb-10 md:pb-12"}
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
              {entry.period}
            </p>
            <h3 className="mt-2 text-base font-medium text-[var(--color-ink)]">
              {entry.role}
              <span className="text-[var(--color-ink-muted)]">
                {" "}
                · {entry.org}
              </span>
            </h3>
            <p className="mt-1 font-mono text-xs text-[var(--color-ink-faint)]">
              {entry.location}
            </p>
            <p className="mt-3 max-w-2xl leading-relaxed text-[var(--color-ink-muted)]">
              {entry.description}
            </p>
          </li>
        ))}
      </ol>

      <div className="mt-12 border-t border-[var(--color-border)] pt-8">
        <p className="text-sm text-[var(--color-ink-faint)]">
          Earlier career:{" "}
          <span className="text-[var(--color-ink-muted)]">
            {earlierExperience.join(", ")}
          </span>
        </p>
      </div>
    </Section>
  );
}
