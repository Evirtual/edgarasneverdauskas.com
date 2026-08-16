import Section from "./Section";
import { experience, earlierExperience } from "@/lib/content";

export default function Experience() {
  return (
    <Section
      id="experience"
      index="02"
      eyebrow="Experience"
      title="Professional experience"
    >
      <div className="divide-y divide-[var(--color-border)] border-t border-[var(--color-border)]">
        {experience.map((entry) => (
          <div
            key={`${entry.role}-${entry.org}`}
            className="grid gap-2 py-7 md:grid-cols-[220px_1fr] md:gap-8"
          >
            <div>
              <p className="font-mono text-xs text-[var(--color-ink-faint)]">
                {entry.period}
              </p>
            </div>
            <div>
              <h3 className="text-base font-medium text-[var(--color-ink)]">
                {entry.role}
                <span className="text-[var(--color-ink-muted)]"> · {entry.org}</span>
              </h3>
              <p className="mt-1 text-sm text-[var(--color-ink-faint)]">
                {entry.location}
              </p>
              <p className="mt-3 max-w-2xl leading-relaxed text-[var(--color-ink-muted)]">
                {entry.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 border-t border-[var(--color-border)] pt-8">
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
