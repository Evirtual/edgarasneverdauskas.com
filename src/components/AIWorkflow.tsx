import Section from "./Section";

const responsibilities = [
  "Product direction and requirements",
  "Architecture and technical decisions",
  "Evaluating and integrating generated code",
  "Debugging and testing strategy",
  "UX and production quality",
];

export default function AIWorkflow() {
  return (
    <Section
      id="ai-workflow"
      index="03"
      eyebrow="How I work"
      title="AI-assisted engineering"
      description="I use OpenAI Codex and Claude Code as part of my day-to-day engineering workflow — not as a novelty, but as tools that make me faster at implementation, refactoring, debugging and research."
    >
      <div className="grid gap-10 md:grid-cols-2">
        <p className="leading-relaxed text-[var(--color-ink-muted)]">
          These tools accelerate the mechanical parts of software engineering:
          writing implementation, refactoring, debugging, testing and
          exploring architectural options. That speed changes how much I can
          build, but not who&apos;s accountable for it.
        </p>
        <div>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-ink-faint)]">
            What I still own
          </p>
          <ul className="space-y-2.5">
            {responsibilities.map((item) => (
              <li
                key={item}
                className="flex gap-3 leading-relaxed text-[var(--color-ink)]"
              >
                <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
