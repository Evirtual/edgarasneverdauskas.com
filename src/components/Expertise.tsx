import Section from "./Section";
import { expertise } from "@/lib/content";

export default function Expertise() {
  return (
    <Section id="expertise" index="04" eyebrow="Core expertise" title="What I work with">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {expertise.map((group) => (
          <div key={group.title}>
            <h3 className="text-sm font-medium text-[var(--color-ink)]">
              {group.title}
            </h3>
            <ul className="mt-4 space-y-2 font-mono text-[13px] text-[var(--color-ink-muted)]">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
