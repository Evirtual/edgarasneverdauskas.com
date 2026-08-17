import Section from "./Section";
import { services, site } from "@/lib/content";

export default function Advisory() {
  return (
    <Section
      id="advisory"
      index="02"
      eyebrow="Advice & second opinions"
      title="How I can help"
      description={`I've spent ${site.yearsExperience} years building products — my own and other people's. If you're working on something and want an experienced second opinion, we can look at it together. Often that's a single conversation.`}
    >
      <div className="grid gap-6 md:grid-cols-2">
        {services.map((service) => (
          <div
            key={service.title}
            className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-raised)] p-6 md:p-8"
          >
            <h3 className="text-xl font-medium text-[var(--color-ink)]">
              {service.title}
            </h3>

            <p className="mt-4 text-[15px] leading-relaxed text-[var(--color-ink-muted)]">
              {service.summary}
            </p>

            <ul className="mt-6 space-y-2.5">
              {service.points.map((point) => (
                <li
                  key={point}
                  className="flex gap-3 text-[15px] leading-relaxed text-[var(--color-ink-muted)]"
                >
                  <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-dashed border-[var(--color-border)] p-6 md:flex-row md:items-center md:justify-between md:p-8">
        <div>
          <p className="text-base font-medium text-[var(--color-ink)]">
            Not sure which of these you need?
          </p>
          <p className="mt-1 text-sm text-[var(--color-ink-muted)]">
            Most people aren&apos;t. Tell me what you&apos;re working on. If I
            think I can help, we can spend an hour looking at it together — and
            if I&apos;m not the right person, I&apos;ll say so.
          </p>
        </div>
        <a
          href={`mailto:${site.email}?subject=${encodeURIComponent(
            "Advisory enquiry"
          )}`}
          className="shrink-0 self-start rounded-full bg-[var(--color-accent)] px-6 py-3 text-sm font-medium text-[var(--color-accent-ink)] transition-opacity hover:opacity-90 md:self-auto"
        >
          Start a conversation
        </a>
      </div>
    </Section>
  );
}
